import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Never-ending and temporary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Never-ending and temporary
        </h1>

        <p className={styles.description}>
          New exhibition by the University of Bergen Special collections, coming in the beginning of 2023.
        </p>

      </main>

      <footer className={styles.footer}>
        <p>Under development by the University of Bergen Library</p>
      </footer>
    </div>
  )
}

export default Home
