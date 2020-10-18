import Head from 'next/head'
import Layout from '../../src/components/Layout/Layout'
import Confirm from '../../src/containers/Confirm'

export default function ConfirmPage() {
  return (
    <>
      <Head>
        <title>Confirm Action</title>
      </Head>

      <Layout>
        <Confirm />
      </Layout>
    </>
  )
}
