import Image from "next/image"

interface Props {
    img: string
    title: string
}

export default function MediumCard({ img, title }: Props) {
    return (
        <div className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out">
            <div className="relative h-80 w-80">
                <Image src={img} layout="fill" className="rounded-xl" />
            </div>
            <h3 className="text-2xl mt-3">{title}</h3>
        </div>
    )
}
