import React from "react";
import type { GetStaticProps, NextPage } from 'next'
import { getClient } from '../lib/sanity.server'
import { mainNav, siteSettings } from '../lib/queries/fragments'
import Head from "next/head";
import { AppShell, HeaderShell, LocaleSwitch, PanesShell, Pane, Menu, MarcusIcon, Modal } from "ui";
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
      <AppShell>

        <PanesShell>
          <Pane intent='sidebar'>
            <HeaderShell className='order-3'>
              <Link href={`/`}>
                {label[locale || '']}
              </Link>
            </HeaderShell>

            <Menu className='order-1' aria-label='primary navigation'>
              <MainNav value={mainNav} />
              <div className='p-3 border-t flex gap-2'>
                <a
                  href={`/studio`}
                  target="_blank"
                  rel="noreferrer"
                  className='text-xs font-semibold'
                >
                  Studio
                </a>
                <Modal buttonLabel="Data" title="Data">
                  <pre className='text-xs max-h-[70vh] overflow-scroll border p-3'>
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </Modal>
              </div>
            </Menu>

            <div className='grow order-2' aria-hidden>&nbsp;</div>

            <nav className='order-4' aria-label='secondary'>
              <a href="https://marcus.uib.no" aria-label='Go to Marcus'>
                <MarcusIcon className='max-sm:w-6 max-sm:h-6 md:w-10 md:h-10' />
              </a>
            </nav>
          </Pane>


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

        </PanesShell>
      </AppShell>
    </>
  );
};

export default Home;
