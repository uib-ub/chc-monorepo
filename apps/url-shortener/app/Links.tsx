export const revalidate = 30;

import Image from 'next/image'
import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { LinksRecord, XataClient } from '../utils/xata';
import React from 'react';

const xata = new XataClient();

async function getData() {
  return await xata.db.links.getAll()
}

const Links = async () => {
  const data: LinksRecord[] = await getData();

  return (
    <div className='flex flex-col gap-5 mt-10 max-w-prose'>
      {data && data.map((link: LinksRecord) => (
        <div key={link.id} className='flex flex-row gap-5 bg-gray-200 p-5 shadow-lg'>
          <div className='flex-grow'>
            <div className='font-black text-xl'>{link.title || 'No title'}</div>
            <div className='text-sm'>
              <a href={`https://${link.domain}/${link.path}`}>
                {`https://${link.domain}/${link.path}`}
              </a> <ArrowRightIcon className='inline w-4 h-4' /> <strong>redirects to</strong> <ArrowRightIcon className='inline w-4 h-4' />
              <a href={link.originalURL} target='_blank' rel='noreferrer' className='flex items-baseline'>
                {link.originalURL} <ArrowTopRightOnSquareIcon className='ml-2 h-4 w-4' />
              </a>
            </div>
          </div>
          <Image alt='' className='' width={150} height={150} src={`data:image/svg+xml;utf8,${encodeURIComponent(link.qr)}`} />
        </div>
      ))}
    </div>
  )
}

export default Links