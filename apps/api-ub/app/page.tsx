import Link from 'next/link'
import { API_URL } from '../lib/constants'

const IS_DEV = process.env.NODE_ENV == 'development' ? true : false

export default function Home() {
  return (
    <div className='px-16'>
      <main className='min-h-screen py-20 flex flex-grow flex-col justify-center content-center'>
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
          This API serves data from <a href="https://marcus.uib.no">Marcus</a> and <a href="https://skeivtarkiv.no">The Norwegian archive for queer history</a>.
          The API is a simple wrapper over a SPARQL endpoint. The manifests served are IIIF Presentation API v3 compliant.
          <br />
          Any valid id or <i>signature</i> from these datasets will be resolved. Test some example manifests!
        </p>

        <h2 className='my-2 text-4xl font-black text-center tracking-tighter'>
          UBBONT
        </h2>

        <div className='flex gap-5 content-center justify-center my-5 text-center text-lg'>
          <a href={`/ns/ubbont/context.json`}>
            JSONLD Context
          </a>
          <a href={`/ns/ubbont/ubbont.owl`}>
            UBBONT Ontology
          </a>
        </div>

        <h2 className='my-2 text-4xl font-black text-center tracking-tighter'>
          API paths
        </h2>
        <div className='flex content-center justify-center'>
          <ul className='my-5'>
            <li><a href="/items/ubb-ms-0003" target={'_blank'} rel='noreferrer'>/items&#123;id&#125; (ubb-ms-0003 as example)</a></li>
            <li><a href="/items/ubb-ms-0003/manifest" target={'_blank'} rel='noreferrer'>/items/&#123;id&#125;/manifest (ubb-ms-0003 as example)</a></li>
            <li><a href="/collections/search?id=ubb-kk-" target={'_blank'} rel='noreferrer'>/collections/search?id=&#123;id&#125; (ub-kk- as example)</a></li>
            <li><a href="/collections/search?id=ubb-kk-&page=2" target={'_blank'} rel='noreferrer'>/collections/search?id=&#123;id&#125;&page=&#123;page&#125; (ub-kk- as example)</a></li>
            <li><a href="/events" target={'_blank'} rel='noreferrer'>/events</a></li>
            <li><a href="/events/06432057-3664-4600-b1e7-4a752413ddc7" target={'_blank'} rel='noreferrer'>/events&#123;id&#125; (06432057-3664-4600-b1e7-4a752413ddc7 as example)</a></li>
            <li><a href="/actors" target={'_blank'} rel='noreferrer'>/actors</a></li>
            <li><a href="/actors/03f5c6c6-ce72-41b2-9797-034658c7950c" target={'_blank'} rel='noreferrer'>/actors&#123;id&#125; (03f5c6c6-ce72-41b2-9797-034658c7950c as example)</a></li>
            <li><a href="/links" target={'_blank'} rel='noreferrer'>/links</a></li>
          </ul>
        </div>


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
              <td className='border border-slate-700 p-2'><a href="/collections/search?id=astrup-samlingen">/collections/search?id=astrup-samlingen</a></td>
              <td className='border border-slate-700 p-2'>---</td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/collections/search?id=astrup-samlingen`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ms-0003">/items/ubb-ms-0003</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ms-0003/manifest">/items/ubb-ms-0003/manifest</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ms-0003/manifest`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-jg-n-0614-06">/items/ubb-jg-n-0614-06</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-jg-n-0614-06/manifest">/items/ubb-jg-n-0614-06/manifest</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-jg-n-0614-06/manifest`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ms-0185-j-a-007">/items/ubb-ms-0185-j-a-007</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ms-0185-j-a-007/manifest">/items/ubb-ms-0185-j-a-007/manifest</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ms-0185-j-a-007/manifest`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-wil-f-208">/items/ubb-wil-f-208</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-wil-f-208/manifest">/items/ubb-wil-f-208/manifest</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-wil-f-208/manifest`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Skeivt arkiv</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-0001-f-01-01-02">/items/ubb-ska-0001-f-01-01-02</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-0001-f-01-01-02/manifest">/items/ubb-ska-0001-f-01-01-02/manifest</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ska-0001-f-01-01-02/manifest`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Skeivt arkiv</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-a0009-u-457">/items/ubb-ska-a0009-u-457</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-a0009-u-457/manifest">/items/ubb-ska-a0009-u-457/manifest</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ska-a0009-u-457/manifest`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Skeivt arkiv</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-a0033-u-0002">/items/ubb-ska-a0033-u-0002</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-a0033-u-0002/manifest">/items/ubb-ska-a0033-u-0002/manifest</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ska-a0033-u-0002/manifest`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
          </tbody>
        </table>
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
