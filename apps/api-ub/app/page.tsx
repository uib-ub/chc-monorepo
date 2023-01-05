import Link from 'next/link'
import { API_URL } from '../lib/constants'
const IS_DEV = process.env.NODE_ENV == 'development' ? true : false

export default function Home() {
  return (
    <div className='px-16'>
      <main className='min-h-screen py-20 flex flex-grow flex-col '>
        <h1 className='my-2 text-7xl font-black tracking-tighter'>
          University of Bergen Library API
        </h1>

        <h2 className='m-0 text-4xl font-black tracking-tighter'>
          Cultural Heritage Collections at the Special collections
        </h2>

        <div className='flex'>
          <span className="w-max my-10 text-4xl font-black text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">
            <Link href={`/spec`}>
              OpenAPI Spec
            </Link>
          </span>
        </div>

        <p className='my-5 text-lg'>
          This API serves data from <a href="https://marcus.uib.no">Marcus</a> and <a href="https://skeivtarkiv.no">The Norwegian archive for queer history</a>.
          The API is a simple wrapper over a SPARQL endpoint. The manifests served are IIIF Presentation API v3 compliant.
          <br />
          Any valid id or <i>signature</i> from these datasets will be resolved. Test some example manifests!
        </p>

        <h2 className='my-2 text-4xl font-black tracking-tighter'>
          UBBONT
        </h2>

        <div className='flex gap-5 my-5 text-lg'>
          <a href={`/ns/ubbont/context.json`}>
            JSONLD Context
          </a>
          <a href={`/ns/ubbont/ubbont.owl`}>
            UBBONT Ontology
          </a>
        </div>

        <h2 className='my-2 text-4xl font-black tracking-tighter'>
          API paths
        </h2>
        <div>
          <h3 className='text-2xl my-2'>JSON-LD</h3>
          <pre className='bg-neutral-900 text-neutral-100 px-5 py-2 rounded my-3'>
            <code>
              {API_URL}/items/ubb-ms-0003
            </code>
          </pre>
          <p className='text-sm text-neutral-500'>
            <a href="/items/ubb-ms-0003" target={'_blank'} rel='noreferrer'>/items&#123;id&#125; (ubb-ms-0003 as example)</a>
          </p>

          <h3 className='text-2xl mb-2 mt-5'>IIIF Object Manifest</h3>
          <pre className='bg-neutral-900 text-neutral-100 px-5 py-2 rounded my-3'>
            <code>
              {API_URL}/items/ubb-ms-0003?as=iiif
              <br />
              {API_URL}/items/ubb-ms-0003/manifest
            </code>
          </pre>
          <p className='text-sm text-neutral-500'>
            <a href="/items/ubb-ms-0003?as=iiif" target={'_blank'} rel='noreferrer'>/items/&#123;id&#125;?as=iiif (ubb-ms-0003 as example)</a>
          </p>

          <h3 className='text-2xl mb-2 mt-5'>RDF Object (defaults to JSON-LD)</h3>
          <pre className='bg-neutral-900 text-neutral-100 px-5 py-2 rounded my-3'>
            <code>
              {API_URL}/items/ubb-ms-0003?as=rdf
            </code>
          </pre>
          <p className='text-sm text-neutral-500'>
            <a href="/items/ubb-ms-0003?as=rdf" target={'_blank'} rel='noreferrer'>/items/&#123;id&#125;?as=rdf (ubb-ms-0003 as example)</a>. Default response format is JSON-LD, equalt to <code>&format=json</code>.
          </p>

          <h3 className='text-2xl mb-2 mt-5'>RDF Object as turtle</h3>
          <pre className='bg-neutral-900 text-neutral-100 px-5 py-2 rounded my-3'>
            <code>
              {API_URL}/items/ubb-ms-0003?as=rdf&format=turtle
            </code>
          </pre>
          <p className='text-sm text-neutral-500'>
            <a href="/items/ubb-ms-0003?as=rdf&format=turtle" target={'_blank'} rel='noreferrer'>/items/&#123;id&#125;?as=rdf&format=turtle (ubb-ms-0003 as example)</a>.
          </p>

          <h3 className='text-2xl mb-2 mt-5'>RDF Object as XML</h3>
          <pre className='bg-neutral-900 text-neutral-100 px-5 py-2 rounded my-3'>
            <code>
              {API_URL}/items/ubb-ms-0003?as=rdf&format=xml
            </code>
          </pre>
          <p className='text-sm text-neutral-500'>
            <a href="/items/ubb-ms-0003?as=rdf&format=xml" target={'_blank'} rel='noreferrer'>/items/&#123;id&#125;?as=rdf&format=xml (ubb-ms-0003 as example)</a>.
          </p>

          <h3 className='text-2xl mb-2 mt-5'>IIIF Collection Manifest</h3>
          <pre className='bg-neutral-900 text-neutral-100 px-5 py-2 rounded my-3'>
            <code>
              {API_URL}/collections
            </code>
          </pre>
          <p className='text-sm text-neutral-500'>
            <a href="/collections" target={'_blank'} rel='noreferrer'>/collections</a>
          </p>

          <h3 className='text-2xl mb-2 mt-5'>Other endpoints</h3>
          <ul>
            <li><a href="/collections/billedsamlingen" target={'_blank'} rel='noreferrer'>/collections/&#123;id&#125; (billedsamlingen as example)</a></li>
            <li><a href="/collections/search?id=ubb-kk-" target={'_blank'} rel='noreferrer'>/collections/search?id=&#123;id&#125; (ub-kk- as example)</a></li>
            <li><a href="/collections/search?id=ubb-kk-&page=2" target={'_blank'} rel='noreferrer'>/collections/search?id=&#123;id&#125;&page=&#123;page&#125; (ub-kk- as example)</a></li>
            <li><a href="/events" target={'_blank'} rel='noreferrer'>/events</a></li>
            <li><a href="/events/06432057-3664-4600-b1e7-4a752413ddc7" target={'_blank'} rel='noreferrer'>/events&#123;id&#125; (06432057-3664-4600-b1e7-4a752413ddc7 as example)</a></li>
            <li><a href="/actors" target={'_blank'} rel='noreferrer'>/actors</a></li>
            <li><a href="/actors/03f5c6c6-ce72-41b2-9797-034658c7950c" target={'_blank'} rel='noreferrer'>/actors&#123;id&#125; (03f5c6c6-ce72-41b2-9797-034658c7950c as example)</a></li>
            <li><a href="/links" target={'_blank'} rel='noreferrer'>/links</a></li>
          </ul>
        </div>

        <h2 className='my-4 text-4xl font-black tracking-tighter'>
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
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ms-0003?as=iiif">/items/ubb-ms-0003?as=iiif</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ms-0003?as=iiif`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-jg-n-0614-06">/items/ubb-jg-n-0614-06</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-jg-n-0614-06?as=iiif">/items/ubb-jg-n-0614-06?as=iiif</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-jg-n-0614-06?as=iiif`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ms-0185-j-a-007">/items/ubb-ms-0185-j-a-007</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ms-0185-j-a-007?as=iiif">/items/ubb-ms-0185-j-a-007?as=iiif</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ms-0185-j-a-007?as=iiif`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Marcus</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-wil-f-208">/items/ubb-wil-f-208</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-wil-f-208?as=iiif">/items/ubb-wil-f-208?as=iiif</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-wil-f-208?as=iiif`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Skeivt arkiv</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-0001-f-01-01-02">/items/ubb-ska-0001-f-01-01-02</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-0001-f-01-01-02?as=iiif">/items/ubb-ska-0001-f-01-01-02?as=iiif</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ska-0001-f-01-01-02?as=iiif`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Skeivt arkiv</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-a0009-u-457">/items/ubb-ska-a0009-u-457</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-a0009-u-457?as=iiif">/items/ubb-ska-a0009-u-457?as=iiif</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ska-a0009-u-457?as=iiif`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
              </td>
            </tr>
            <tr>
              <td className='border border-slate-700 p-2'>Skeivt arkiv</td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-a0033-u-0002">/items/ubb-ska-a0033-u-0002</a></td>
              <td className='border border-slate-700 p-2'><a href="/items/ubb-ska-a0033-u-0002?as=iiif">/items/ubb-ska-a0033-u-0002?as=iiif</a></td>
              <td className='border border-slate-700 p-2'>
                <a href={`https://projectmirador.org/embed/?manifest=${API_URL || ''}/items/ubb-ska-a0033-u-0002?as=iiif`} target="_blank" rel='noreferrer' style={{ pointerEvents: IS_DEV ? 'none' : 'unset' }}>open in new window</a>
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
