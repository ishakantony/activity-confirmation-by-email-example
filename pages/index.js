import Head from 'next/head'
import Layout from '../src/components/Layout/Layout'
import Home from '../src/containers/Home'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Layout>
        <Home />
      </Layout>
    </>
  )
}
