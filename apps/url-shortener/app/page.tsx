export const revalidate = 30;

import Image from 'next/image'
import { ArrowDownIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { XataClient } from '../utils/xata';

const xata = new XataClient();

async function getData() {
  return await xata.db.links.getAll()
}

export default async function Home() {
  const data = await getData();

  return (
    <div className='flex flex-col items-center align-center p-5 h-screen'>
      <main>
        <h1 className='text-6xl font-bold'>
          UiB-UB URL shortener
        </h1>

        <p className=''>
          WIP. Goal is to create an app that makes creating short urls and QR codes easy and cheap. The actual API is in the api-ub repo. This will be the user interface.
        </p>

        <div className='flex flex-col gap-3 mt-10'>
          {data && data.map(link => (
            <div key={link.id} className='flex flex-row gap-5 bg-gray-200 p-3 shadow-md'>
              <div className='flex-grow'>
                <div className='font-black text-xl'>{link.title || 'No title'}</div>
                <div>
                  <a href={`https://${link.domain}/${link.path}`}>
                    {`https://${link.domain}/${link.path}`}
                  </a>
                  <ArrowDownIcon className='w-8 h-8' />
                  <a href={link.originalURL} target='_blank' rel='noreferrer' className='flex items-center'>
                    {link.originalURL} <ArrowTopRightOnSquareIcon className='h-4 w-8' />
                  </a>
                </div>
              </div>
              <Image alt='' className='' width={150} height={150} src={`data:image/svg+xml;utf8,${encodeURIComponent(link.qr)}`} />
            </div>
          ))}
        </div>
      </main>

      <footer className=''>
      </footer>
    </div>
  )
}
