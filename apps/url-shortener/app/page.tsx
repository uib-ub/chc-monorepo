export const revalidate = 30;

import { Suspense } from 'react';
import Links from './Links';

export default async function Home() {
  return (
    <div className='flex flex-col items-center align-center p-5 min-h-screen'>
      <main>
        <h1 className='text-4xl font-bold text-center'>
          UiB-UB URL shortener
        </h1>

        <Suspense fallback={<p>Loading links...</p>}>
          {/* @ts-expect-error Server Component */}
          <Links />
        </Suspense>

      </main>

      <footer className=''>
      </footer>
    </div>
  )
}
