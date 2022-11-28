import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          UiB-UB URL shortener
        </h1>

        <p className={styles.description}>
          WIP. Goal is to create an app that makes creating short urls and QR codes easy and cheap. The actual API is in the api-ub repo. This will be the user interface.
        </p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
