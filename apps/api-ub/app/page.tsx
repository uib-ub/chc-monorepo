import Link from 'next/link'
import { ThemeSwitch } from './ThemeSwitch'

const IS_PROD = process.env.NODE_ENV == 'production' ? true : false

export default function Home() {
  return (
    <div className='px-16'>
      <main className='min-h-screen flex flex-grow flex-col justify-center content-center'>
        <h1 className='my-2 text-7xl font-black text-center tracking-tighter'>
          University of Bergen Library API
        </h1>

        <h2 className='m-0 text-4xl font-black text-center tracking-tighter'>
          Cultural Heritage Collections at the Special collections
        </h2>

        <div className='flex content-center justify-center'>
          <span className="w-max my-10 text-4xl font-black text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
            <Link href={`/spec`}>
              OpenAPI Spec
            </Link>
          </span>
        </div>

        <p className='my-5 text-center text-lg'>
          IIIF Presentation API v3 compliant. The API serves objects from <a href="https://marcus.uib.no">Marcus</a> and <a href="https://skeivtarkiv.no">The Norwegian archive for queer history</a>.
          The API is a simple wrapper over a SPARQL endpoint that maps the result to a simple IIIF manifest.
          <br />
          Any valid id or <i>signature</i> from these datasets will be resolved. Test some example manifests!
        </p>


        <h2 className='my-2 text-4xl font-black text-center tracking-tighter'>
          IIIF manifest examples
        </h2>

        <table className='border-collapse border border-slate-500'>
          <thead>
            <tr>
              <th className='border border-slate-600 p-2'>Source</th>
              <th className='border border-slate-600 p-2'>JSON</th>
              <th className='border border-slate-600 p-2'>Manifest</th>
              <th className='border border-slate-600 p-2'>Mirador</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ms-0003">/v1/items/ubb-ms-0003</a></td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ms-0003/manifest">/v1/items/ubb-ms-0003/manifest</a></td>
              <td className='border border-slate-700 p-2'>
                {IS_PROD && (
                  <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ms-0003/manifest`} target="_blank" rel='noreferrer'>open in new window</a>
                )}
                {!IS_PROD && ('-')}
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ms-0185-j-a-007">/v1/items/ubb-ms-0185-j-a-007</a></td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ms-0185-j-a-007/manifest">/v1/items/ubb-ms-0185-j-a-007/manifest</a></td>
              <td className='border border-slate-700 p-2'>{IS_PROD && (
                <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ms-0185-j-a-007/manifest`} target="_blank" rel='noreferrer'>open in new window</a>
              )}
                {!IS_PROD && ('-')}</td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-wil-f-208">/v1/items/ubb-wil-f-208</a></td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-wil-f-208/manifest">/v1/items/ubb-wil-f-208/manifest</a></td>
              <td className='border border-slate-700 p-2'>{IS_PROD && (
                <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-wil-f-208/manifest`} target="_blank" rel='noreferrer'>open in new window</a>
              )}
                {!IS_PROD && ('-')}</td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Skeivt arkiv</td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ska-0001-f-01-01-02">/v1/items/ubb-ska-0001-f-01-01-02</a></td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ska-0001-f-01-01-02/manifests">/v1/items/ubb-ska-0001-f-01-01-02/manifest</a></td>
              <td className='border border-slate-700 p-2'>
                {IS_PROD && (
                  <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ska-0001-f-01-01-02/manifest`} target="_blank" rel='noreferrer'>open in new window</a>
                )}
                {!IS_PROD && ('-')}
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Skeivt arkiv</td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ska-a0009-u-457">/v1/items/ubb-ska-a0009-u-457</a></td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ska-a0009-u-457/manifest">/v1/items/ubb-ska-a0009-u-457/manifest</a></td>
              <td className='border border-slate-700 p-2'>{IS_PROD && (
                <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ska-a0009-u-457/manifest`} target="_blank" rel='noreferrer'>open in new window</a>
              )}
                {!IS_PROD && ('-')}</td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Skeivt arkiv</td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ska-a0033-u-0002">/v1/items/ubb-ska-a0033-u-0002</a></td>
              <td className='border border-slate-700 p-2'><a href="/v1/items/ubb-ska-a0033-u-0002/manifest">/v1/items/ubb-ska-a0033-u-0002/manifest</a></td>
              <td className='border border-slate-700 p-2'>{IS_PROD && (
                <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ska-a0033-u-0002/manifest`} target="_blank" rel='noreferrer'>open in new window</a>
              )}
                {!IS_PROD && ('-')}</td>
            </tr>
          </tbody>
        </table>

        <p className='my-5 text-center'>
          <Link href="https://github.com/uib-ub/chc-monorepo">Github</Link>
        </p>
      </main>

      {/* <footer>
        <a
          href="https://uib.no/ub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <UiBIcon />
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
