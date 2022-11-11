import React from "react";
import type { GetStaticProps, NextPage } from 'next'
import { getClient } from '../../lib/sanity.server'
import { usePreviewSubscription } from '../../lib/sanity'
import { mainNav, siteSettings, item } from '../../lib/queries/fragments'
import { publicDocumentTypes } from '../../lib/constants'
import Head from "next/head";
import { AppShell, NavigationShell, HeaderShell, LocaleSwitch } from "ui";
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { ThemeSwitch } from '../../components/ThemeSwitch';
import { groq } from 'next-sanity'
import SanityImage from '../../components/SanityImage';
import { MainNav } from '../../components/Header/MainNav';
import ErrorPage from 'next/error'
import dynamic from "next/dynamic";

const ManifestViewer = dynamic(() => import("../../components/IIIF/ManifestViewer"), {
  ssr: false,
});

interface IData {
  item: any
  siteSettings: any
  mainNav: any
}

interface ICloverIIIF {
  id: string
  config: any
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
        <div className='flex gap-5 px-3 pt-3 pb-1 border-b'>
          <HeaderShell>
            <Link href="/">
              <a>
                {label[locale || '']}
              </a>
            </Link>
          </HeaderShell>
          <NavigationShell>
            <MainNav value={mainNav} />
          </NavigationShell>

          <div className='grow'>&nbsp;</div>

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


        <div className='p-5'>
          <h1 className='text-6xl'>{item[0].label[locale || ''] || `Missing ${locale} title`}</h1>
          {/* <div className='py-5'>
            <SanityImage
              image={item[0].image}
              alt={''}
            />
          </div> */}

          {item[0]?.manifest ?
            <div className='py-5'>
              <ManifestViewer id={item[0].manifest} options={{ renderAbout: false, showIIIFBadge: false, showTitle: false, showInformationToggle: false }} />
            </div>
            : null
          }
          <pre className=''>
            {JSON.stringify(item, null, 2)}
          </pre>
        </div>

        <footer>
        </footer>

      </AppShell>
    </>
  );
};

export default Home;
