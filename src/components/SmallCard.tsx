import Image from "next/image"

interface Props {
    img: string
    location: string
    distance: string
}

export default function SmallCard({ img, location, distance }: Props) {
    return (
        <div className={`
            flex items-center space-x-4 rounded-xl cursor-pointer m-2 mt-5
            hover:bg-gray-100 hover:scale-105 transition-transform duration-200 ease-out
        `}>
            {/* left */}
            <div className="relative h-16 w-16">
                <Image src={img} layout="fill" className="rounded-lg" />
            </div>
            {/* right */}
            <div>
                <h2>{location}</h2>
                <h3 className="text-gray-500">{distance}</h3>
            </div>
        </div>
    )
}
