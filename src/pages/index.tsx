import Banner from '@components/Banner'
import Header from '@components/Header'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Airbnb Clone</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Header */}
            <Header />
            {/* Banner */}
            <Banner />
        </div>
    )
}

export default Home
