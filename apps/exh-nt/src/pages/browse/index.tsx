import React from "react";
import type { GetStaticProps, NextPage } from 'next'
import { getClient } from '../../lib/sanity.server'
import { mainNav, siteSettings, items } from '../../lib/queries/fragments'
import Head from "next/head";
import { AppShell, NavigationShell, HeaderShell, LocaleSwitch, PaneShell, MarcusIcon, ContentShell, Menu, SidebarPane, Modal } from "ui";
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { ThemeSwitch } from '../../components/ThemeSwitch';
import { groq } from 'next-sanity'
import SanityImage from '../../components/SanityImage';
import { MainNav } from '../../components/Header/MainNav';
import { Bars4Icon } from '@heroicons/react/24/outline';

const itemsQuery = groq`
  {
    ${siteSettings},
    ${mainNav},
    ${items}
  }
`

export const getStaticProps: GetStaticProps = async ({ locale, preview = false }) => {
  const data = await getClient(preview).fetch(itemsQuery, { language: locale })
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
  const { mainNav, siteSettings: { label }, items } = data

  return (
    <>
      <Head>
        <title>{label[locale || '']}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell>
        <PaneShell>
          <SidebarPane>
            <HeaderShell className='order-3'>
              <Link href={`/`}>
                {label[locale || '']}
              </Link>
            </HeaderShell>

            <Menu className='order-1' aria-label='primary navigation'>
              <MainNav value={mainNav} />
              <div className='p-3 border-t flex gap-2'>
                <a
                  href={`${process.env.NEXT_PUBLIC_STUDIO_URL}/studio`}
                  target="_blank"
                  rel="noreferrer"
                  className='text-xs font-semibold'
                >
                  Studio
                </a>
                <Modal buttonLabel="Data" title="Data">
                  <pre className='text-[10px] max-h-[50vh] overflow-scroll border p-3'>
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
          </SidebarPane>

          <ContentShell>
            <div className='flex flex-wrap justify-center items-center gap-5 w-full p-5'>
              {items && items.map((item: any) => (
                <div key={item.id} className="flex justify-center">
                  <div className="rounded-lg shadow-lg md:w-64 lg:max-w-sm">
                    <Link href={`/id/${item._id}`}>
                      <SanityImage
                        image={item.image}
                        alt={''}
                      />
                    </Link>
                    <div className="p-6">
                      <h5 className="text-xl font-medium mb-2">{item.label[locale || ''] || 'Missing title'}</h5>
                      <p className="text-base mb-4">
                        {item.referredToBy?.[locale || '']}
                      </p>
                      {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                    </div>
                  </div>
                </div>
              ))}
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
            </footer>
          </ContentShell>
        </PaneShell>
      </AppShell>
    </>
  );
};

export default Home;
