import Footer from "@components/Footer";
import Header from "@components/Header";
import InfoCard from "@components/InfoCard";
import Map from "@components/Map";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface resultData {
    img: string
    location: string
    title: string
    price: string
    total: string
    description: string
    long: number
    lat: number
    star: number
}

interface Props {
    searchResults: [resultData]
}

export default function Search({ searchResults }: Props) {
    const router = useRouter()
    const { location, startDate, endDate, numberOfGuests } = router.query

    const formattedStartDate = format(new Date(startDate as string || new Date()), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate as string || new Date()), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${numberOfGuests} guests`} />
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">
                        300+ Stay - {range} - for {numberOfGuests} numbers of guests
                    </p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">
                        Stay in {location}
                    </h1>
                    <div className="hidden lg:inline-flex space-x-3 text-gray-800 whitespace-nowrap mb-4">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>
                    <div className="flex flex-col">
                        {searchResults.map(({ img, location, title, price, total, description, long, lat, star }) => (
                            <InfoCard
                                key={img}
                                img={img}
                                location={location}
                                title={title}
                                price={price}
                                total={total}
                                description={description}
                                long={long}
                                lat={lat}
                                star={star}
                            />
                        ))}
                    </div>
                </section>
                <section className="relative xl:min-w-[600px] xl:h-[400px]">
                    <Map searchResults={searchResults} />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { location, startDate, endDate, numberOfGuests } = query
    const searchResults = await fetch('https://links.papareact.com/isz').then(res => res.json())

    return {
        props: {
            searchResults
        },
    }
}