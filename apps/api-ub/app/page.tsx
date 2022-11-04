import Link from 'next/link'

import styles from './page.module.css'

const IS_PROD = process.env.NODE_ENV == 'production' ? true : false

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          UBB IIIF Manifest API
        </h1>
        <h2>
          University of Bergen Library IIIF manifest for objects in the Special collection.
        </h2>
        <p className={styles.description}>
          IIIF Presentation API v3 compliant. The API serves objects from <a href="https://marcus.uib.no">Marcus</a> and <a href="https://skeivtarkiv.no">The Norwegian archive for queer history</a>.
          The API is a simple wrapper over a SPARQL endpoint that maps the result to a simple IIIF manifest.
          <br />
          Any valid id or <i>signature</i> from these datasets will be resolved. Test some example manifests!
        </p>

        <h2>Examples</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Source</th>
              <th>Manifest</th>
              <th>Mirador</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Marcus</td>
              <td><a href="/v1/items/ubb-ms-0003">/v1/items/ubb-ms-0003</a></td>
              <td>
                {IS_PROD && (
                  <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ms-0003`} target="_blank" rel='noreferrer'>open in new window</a>
                )}
                {!IS_PROD && ('-')}
              </td>
            </tr>
            <tr>
              <td>Marcus</td>
              <td><a href="/v1/items/ubb-ms-0185-j-a-007">/v1/items/ubb-ms-0185-j-a-007</a></td>
              <td>{IS_PROD && (
                <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ms-0185-j-a-007`} target="_blank" rel='noreferrer'>open in new window</a>
              )}
                {!IS_PROD && ('-')}</td>
            </tr>
            <tr>
              <td>Marcus</td>
              <td><a href="/v1/items/ubb-wil-f-208">/v1/items/ubb-wil-f-208</a></td>
              <td>{IS_PROD && (
                <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-wil-f-208`} target="_blank" rel='noreferrer'>open in new window</a>
              )}
                {!IS_PROD && ('-')}</td>
            </tr>
            <tr>
              <td>Skeivt arkiv</td>
              <td><a href="/v1/items/ubb-ska-0001-f-01-01-02">/v1/items/ubb-ska-0001-f-01-01-02</a></td>
              <td>
                {IS_PROD && (
                  <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ska-0001-f-01-01-02`} target="_blank" rel='noreferrer'>open in new window</a>
                )}
                {!IS_PROD && ('-')}
              </td>
            </tr>
            <tr>
              <td>Skeivt arkiv</td>
              <td><a href="/v1/items/ubb-ska-a0009-u-457">/v1/items/ubb-ska-a0009-u-457</a></td>
              <td>{IS_PROD && (
                <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ska-a0009-u-457`} target="_blank" rel='noreferrer'>open in new window</a>
              )}
                {!IS_PROD && ('-')}</td>
            </tr>
            <tr>
              <td>Skeivt arkiv</td>
              <td><a href="/v1/items/ubb-ska-a0033-u-0002">/v1/items/ubb-ska-a0033-u-0002</a></td>
              <td>{IS_PROD && (
                <a href={`https://projectmirador.org/embed/?manifest=https://${process.env.VERCEL_URL || ''}/v1/items/ubb-ska-a0033-u-0002`} target="_blank" rel='noreferrer'>open in new window</a>
              )}
                {!IS_PROD && ('-')}</td>
            </tr>
          </tbody>
        </table>

        <p className={styles.description}>
          Add a manifest to <Link href="https://mirador-dev.netlify.app/">Mirador 3</Link>
        </p>

        <p className={styles.description}>
          <Link href="https://github.com/uib-ub/chc-monorepo">Github</Link>
        </p>
      </main>

      {/* <footer className={styles.footer}>
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
