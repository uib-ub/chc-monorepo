import React from "react";
import type { GetStaticProps, NextPage } from 'next'
import { Disclosure } from '@headlessui/react'
import { getClient } from '../../lib/sanity.server'
import { usePreviewSubscription } from '../../lib/sanity'
import { mainNav, siteSettings, item } from '../../lib/queries/fragments'
import { publicDocumentTypes } from '../../lib/constants'
import Head from "next/head";
import { AppShell, NavigationShell, HeaderShell, LocaleSwitch, MainShell, MarcusIcon, PaneShell, Modal, Menu } from "ui";
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { ThemeSwitch } from '../../components/ThemeSwitch';
import { groq } from 'next-sanity'
import SanityImage from '../../components/SanityImage';
import { MainNav } from '../../components/Header/MainNav';
import { TextBlocks } from '../../components/TextBlocks';
import ErrorPage from 'next/error'
import dynamic from "next/dynamic";
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Bars4Icon } from '@heroicons/react/24/outline';

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


const Home: NextPage = ({ data, preview }: any) => {
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
      <AppShell>
        <PaneShell>
          <NavigationShell>
            <Menu>
              <MainNav value={mainNav} />
            </Menu>
            <div className='grow'>&nbsp;</div>
            <HeaderShell>
              <Link href={`/`}>
                {label[locale || '']}
              </Link>
            </HeaderShell>

            <a href="https://marcus.uib.no">
              <MarcusIcon className='w-10 h-10' />
            </a>
          </NavigationShell>

          <MainShell>
            {item[0]?.manifest ?
              <div className='pb-5 min-h-[50vh] max-sm:hidden'>
                <ManifestViewer id={item[0].manifest} options={{ renderAbout: false, showIIIFBadge: false, showTitle: false, showInformationToggle: false }} />
              </div>
              : null
            }
            <div className='py-b md:hidden'>
              <SanityImage
                image={item[0].image}
                alt={''}
              />
            </div>

            <div className='flex flex-wrap justify-center items-center gap-5'>
              <h1 className='text-2xl md:text-4xl lg:text-6xl'>{item[0].label[locale || ''] || `Missing ${locale} title`}</h1>


              {item[0]?.referredToBy[0] ?
                <div className='max-w-prose py-5'>
                  <TextBlocks value={item[0]?.referredToBy[0].body} />
                </div>
                : null
              }
            </div>

            <footer className='flex gap-3 items-center'>
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
              <a
                href={`${process.env.NEXT_PUBLIC_STUDIO_URL}/studio`}
                target="_blank"
                rel="noreferrer"
                className='text-xs text-slate-600 font-semibold py-1 px-2'
              >
                Studio
              </a>
              <Modal buttonLabel="Data" title="Data">
                <pre className='text-[10px] max-h-[50vh] overflow-scroll border p-3'>
                  {JSON.stringify(item, null, 2)}
                </pre>
              </Modal>
            </footer>
          </MainShell>
        </PaneShell>

      </AppShell>
    </>
  );
};

export default Home;
