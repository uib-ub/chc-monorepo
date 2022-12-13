import React from "react";
import type { GetStaticProps, NextPage } from 'next'
import { getClient } from '../lib/sanity.server'
import { mainNav, siteSettings } from '../lib/queries/fragments'
import Head from "next/head";
import { LocaleSwitch, MarcusIcon, Layout, Pane } from "ui";
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { groq } from 'next-sanity'
import { MainNav } from '../components/Header/MainNav';

const frontpageQuery = groq`
  {
    ${siteSettings},
    ${mainNav}
  }
`

export const getStaticProps: GetStaticProps = async ({ locale, preview = false }) => {
  const data = await getClient(preview).fetch(frontpageQuery, { language: locale })
  //console.log(JSON.stringify(data, null, 2))
  return {
    props: {
      data,
      locale,
      preview,
      //messages: (await import(`../messages/${locale}.json`)).default
    },
  }
}

const Home: NextPage = ({ data, preview }: any) => {
  const { locale, locales, asPath, defaultLocale }: NextRouter = useRouter()
  const { mainNav, siteSettings: { label } } = data

  return (
    <>
      <Head>
        <title>{label[locale || '']}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        data={data}
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
        <Pane intent='content'>
          <main className='flex flex-grow justify-center items-center'>
            <div className={`bg-[url('https://data.ub.uib.no/files/bs/ubb/ubb-jg/ubb-jg-n/ubb-jg-n-0313/ubb-jg-n-0313-03/jpg/ubb-jg-n-0313-03_md.jpg')] bg-center bg-cover bg-no-repeat h-5/6`}>
              <div className={`flex flex-col justify-end items-center h-full`}>
                <div className="p-5 bg-white dark:bg-black flex flex-col gap-3">

                  <h1 className="text-xl md:text-6xl text-center font-bold font-sans">{label[locale || '']}</h1>

                  <p className='text-sm md:text-xl text-center font-light'>
                    {locale == 'en' && 'New exhibition by the University of Bergen Special collections, coming in the beginning of 2023.'}
                    {locale == 'no' && 'Ny utstilling fra Spesialsamlingene ved Universitetsbiblioteket i Bergen lanseres i starten av 2023.'}
                  </p>
                </div>
              </div>
            </div>
          </main>

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
          </footer>
        </Pane>
      </Layout>
    </>
  );
};

export default Home
