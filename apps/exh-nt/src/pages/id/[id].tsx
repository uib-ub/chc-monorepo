import React from "react";
import type { GetStaticProps, NextPage } from 'next'
import { getClient } from '../../lib/sanity.server'
import { usePreviewSubscription } from '../../lib/sanity'
import { mainNav, siteSettings, item } from '../../lib/queries/fragments'
import { publicDocumentTypes } from '../../lib/constants'
import Head from "next/head";
import { LocaleSwitch, MarcusIcon, Minimap, Palette, Pane, Spacer, Subjects, Layout } from "ui";
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { ThemeSwitch } from '../../components/ThemeSwitch';
import { groq } from 'next-sanity'
import SanityImage from '../../components/SanityImage';
import { MainNav } from '../../components/Header/MainNav';
import ErrorPage from 'next/error'
import dynamic from "next/dynamic";
import { Description } from '../../components/Props/Description';
import { CodeBracketSquareIcon, IdentificationIcon } from '@heroicons/react/24/outline';

const ManifestViewer = dynamic(() => import("../../components/IIIF/ManifestViewer"), {
  ssr: false,
});

interface IData {
  item: any
  siteSettings: any
  mainNav: any
}

/**
* Helper function to return the correct version of the document
* If we're in "preview mode" and have multiple documents, return the draft
*/
function filterDataToSingleItem(data: IData, preview: boolean) {
  if (!Array.isArray(data)) return data

  return data.item.length > 1 && preview
    ? data.item.filter((item: any) => item._id.startsWith(`drafts.`)).slice(-1)[0]
    : data.item.slice(-1)[0]
}

const idsQuery = groq`
  *[_type in $publicDocumentTypes] {
    _id
  }
`

const typeQuery = groq`
  *[_id == $id][0] {
    _type
  }
`

export const getStaticProps: GetStaticProps = async ({ params, locale, preview = false }) => {
  //console.log('Params: ', params)
  const ID = typeof params?.id === 'string' ? params.id : params?.id?.pop()
  const { _type: type, notFound = false } = await getClient(preview).fetch(typeQuery, { id: ID })
  //console.log('Type: ', type)

  if (notFound === true) return { notFound }

  const query = `{
    'item': *[_id == $id] {
      ${type === 'HumanMadeObject' ? item : ''}
    },
    ${siteSettings},
    ${mainNav}
  }`

  const queryParams = { id: ID, language: locale }
  const data = await getClient(preview).fetch(query, queryParams)

  // console.log(JSON.stringify(data, null, 2))

  // Escape hatch, if our query failed to return data
  if (!data) return { notFound: true }

  // Helper function to reduce all returned documents down to just one
  const page = filterDataToSingleItem(data, preview)
  // console.log(JSON.stringify(page, null, 2))

  return {
    props: {
      // Pass down the "preview mode" boolean to the client-side
      preview,
      // Pass down the initial content, and our query
      data: { page, query, queryParams },
      //messages: (await import(`../../messages/${locale}.json`)).default
    },
  }
}

export async function getStaticPaths() {
  const results = await getClient().fetch(idsQuery, { publicDocumentTypes })
  //console.log('Results: ', results)
  return {
    paths: [
      ...results?.map((item: any) => ({
        params: {
          id: item._id,
          locale: 'en'
        },
      })),
      ...results?.map((item: any) => ({
        params: {
          id: item._id,
          locale: 'no'
        },
      }))
    ] || [],
    fallback: 'blocking',
  }
}


const Id: NextPage = ({ data, preview }: any) => {
  const { locale, locales, asPath, defaultLocale, isFallback }: NextRouter = useRouter()

  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  //console.log('Is fallback?: ', isFallback)
  //console.log('Page data: ', JSON.stringify(data, null, 2))

  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (!isFallback && !data?.page?.item[0]?._id) {
    return <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <ErrorPage statusCode={404} />
    </>
  }

  // Client-side uses the same query, so we may need to filter it down again
  const page = filterDataToSingleItem(previewData, preview)
  // Get Open Graph images in different sizes
  // const openGraphImages = getOpenGraphImages(page?.item[0]?.image, page?.item[0]?.label[locale])

  // Notice the optional?.chaining conditionals wrapping every piece of content?
  // This is extremely important as you can't ever rely on a single field
  // of data existing when Editors are creating new documents.
  // It'll be completely blank when they start!

  const { siteSettings: { label }, mainNav, item } = page

  return (
    <>
      <Head>
        <title>{label[locale || '']}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        data={page}
        header={
          <Link href={`/`}>
            {label[locale || '']}
          </Link>
        }
        icon={
          <a href="https://marcus.uib.no" aria-label='Go to Marcus'>
            <MarcusIcon className='max-sm:w-6 max-sm:h-6 md:w-8 md:h-8' />
          </a>
        }
        nav={<MainNav value={mainNav} />}
      >
        <main className='md:flex md:flex-grow min-h-screen'>
          <Pane intent='aside'>
            <div>
              <SanityImage
                image={item[0].image}
                alt={''}
                className='object-contain object-left md:max-h-72'
              />
            </div>


            <h1 className='text-3xl md:text-2xl lg:text-3xl'>{item[0].label[locale || ''] || `Missing ${locale} title`}</h1>

            {item[0]?.activityStream && item[0].activityStream
              .filter((activity: any) => ['crm:BeginningOfExistence', 'crm:Production'].includes(activity.subType))
              .map((activity: any) => (
                <div key={activity._id || activity._key}>
                  <div>{activity.contributionAssignedBy?.[0].assignedActor?.label[locale || ''] || Object.values(activity.contributionAssignedBy?.[0].assignedActor?.label)[1]}</div>
                  <div className='text-xs text-slate-700 dark:text-slate-300 m-0 p-0'>{activity.timespan?.edtf}</div>
                  <div className='flex flex-col text-xs font-light'>
                    {activity.usedGeneralTechnique && activity.usedGeneralTechnique.map((t: any) => (
                      <div key={t._id ?? item._key}>{t.label[locale || '']}</div>
                    ))}
                  </div>
                </div>
              ))
            }

            <Spacer />

            {item[0]?.depicts ? (
              <Minimap label={item[0]?.depicts?.[0].label[locale ?? '']} lnglat={[item[0]?.depicts?.[0].definedBy?.lng, item[0]?.depicts?.[0].definedBy?.lat]} />
            ) : null}

            <div className='flex flex-col gap-1'>
              {item[0]?.preferredIdentifier ?
                <div className='flex gap-1 items-center font-light text-xs text-gray-700 dark:text-gray-300 mb-1'>
                  <IdentificationIcon className='w-3 h-3' />
                  <p className='text-xs dark:text-gray-300'>{item[0]?.preferredIdentifier}</p>

                  <Spacer />

                  <Link
                    href={`https://api-ub.vercel.app/items/${item[0]?.preferredIdentifier}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <CodeBracketSquareIcon className='w-3 h-3' />
                    <span className="sr-only">JSON data</span>
                  </Link>
                </div>
                : null
              }

              {item[0]?.image?.palette ?
                <Palette colors={item[0]?.image?.palette} />
                : null
              }
            </div>

            <div className='md:flex gap-2 max-md:hidden border-t border-gray-200 dark:border-gray-600 pt-1'>
              <LocaleSwitch
                locales={locales || []}
                locale={locale || ''}
                defaultLocale={defaultLocale || ''}
                asPath={asPath}
                labels={{
                  no: 'Norsk',
                  en: 'English'
                }}
              />
              <ThemeSwitch />
            </div>
          </Pane>

          <Pane intent='content'>
            {item[0]?.manifest ?
              <div className='pb-5 min-h-[65vh] max-md:hidden'>
                <ManifestViewer id={item[0].manifest} options={{ canvasHeight: '65vh', renderAbout: false, showIIIFBadge: false, showTitle: false, showInformationToggle: false }} />
              </div>
              : null
            }

            <div className='flex flex-wrap justify-center items-center gap-5'>
              {/* <h1 className='text-2xl md:text-4xl lg:text-6xl sm:hidden'>{item[0].label[locale || ''] || `Missing ${locale} title`}</h1> */}

              {item[0]?.referredToBy ?
                <div className='max-w-prose py-5 xl:text-2xl'>
                  <Description value={item[0]?.referredToBy} language={locale || ''} />
                </div>
                : null
              }

              {item[0]?.subject ?
                <Subjects value={item[0]?.subject} language={locale || ''} />
                : null
              }

            </div>
          </Pane>
        </main>

      </Layout>

    </>
  );
};

export default Id;
