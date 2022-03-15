import Banner from '@components/Banner'
import Header from '@components/Header'
import MediumCard from '@components/MediumCard'
import SmallCard from '@components/SmallCard'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

interface IExploreData {
    img: string
    location: string
    distance: string
}

interface ICardsData {
    img: string
    title: string
}

interface Props {
    exploreData: [IExploreData]
    cardsData: [ICardsData]
}

export default function Home({ exploreData, cardsData }: Props) {
    console.log(exploreData)
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
            <main className={`max-w-7xl mx-auto px-8 sm:px-16`}>
                <section className={`pt-6`}>
                    <h2 className={`text-4xl font-semibold pb-5`}>
                        Explore Nearby
                    </h2>
                    {/* Pull some data from a server - API endpoint */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {exploreData?.map(({ img, location, distance }) => (
                            <SmallCard key={img}
                                img={img}
                                location={location}
                                distance={distance}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
                    <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3'>
                        {cardsData?.map(({ img, title }) => (
                            <MediumCard key={img}
                                img={img}
                                title={title}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const exploreData = await fetch('http://localhost:3000/api/explore-data')
        .then(res => res.json())
    const cardsData = await fetch('http://localhost:3000/api/cards-data')
        .then(res => res.json())
    return {
        props: {
            exploreData,
            cardsData
        }
    }
}
