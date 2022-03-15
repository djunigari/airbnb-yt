import Image from "next/image";
import { GlobeAltIcon, SearchIcon } from "@heroicons/react/outline"
import { UserCircleIcon, MenuIcon, UserIcon } from "@heroicons/react/solid"
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    placeholder?: string
}

export default function Header({ placeholder }: Props) {
    const router = useRouter()
    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [numberOfGuests, setNumberOfGuests] = useState(1)

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const handleSelect = (ranges: RangeKeyDict) => {
        setStartDate(ranges['selection'].startDate!)
        setEndDate(ranges['selection'].endDate!)
    }

    const resetInput = () => {
        setSearchInput('')
        setStartDate(new Date())
        setEndDate(new Date())
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuests: numberOfGuests
            }
        })
        resetInput()
    }

    return (
        <header className={`
        sticky top-0 z-50 grid grid-cols-3
        bg-white shadow-md
        p-5 md:px-10
    `}>
            {/* left - Logo */}
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image onClick={() => router.push('/')} src='https://links.papareact.com/qd3' alt="Logo"
                    layout="fill"
                    objectFit="contain"
                    objectPosition='left'
                />
            </div>
            {/* Middle - Search */}
            <div className={`
                flex items-center rounded-full 
                py-2 md:border-2 md:shadow-sm
                group 
            `}>
                <input value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text" placeholder={placeholder || "Start your search"}
                    className={`
                        flex-grow pl-5 bg-transparent outline-none 
                        text-sm text-gray-600 placeholder-gray-400
                `} />
                <SearchIcon className={`
                    hidden md:inline-flex h-8 
                    bg-red-400 text-white rounded-full p-2 
                    cursor-pointer md:mx-2 group-focus-within:animate-pulse group-hover:animate-pulse
                `} />
            </div>
            {/* Right */}
            <div className={`flex items-center justify-end space-x-4 text-gray-500`}>
                <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
                <GlobeAltIcon className={`h-6 cursor-pointer`} />
                <div className={`
                    flex items-center space-x-2 border-2 rounded-full p-2 cursor-pointer 
                    hover:bg-gray-300 hover:text-white active:bg-gray-200
                `}>
                    <MenuIcon className={`h-6`} />
                    <UserCircleIcon className={`h-6`} />
                </div>
            </div>
            {searchInput && (
                <div className="relative col-span-3 flex flex-col mx-auto">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={['#FD5861']}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow border-semibold">
                            Number of Guests
                        </h2>
                        <UserIcon className="h-5" />
                        <input type="number"
                            value={numberOfGuests}
                            onChange={e => setNumberOfGuests(+e.target.value)}
                            min={1}
                            max={100}
                            className="w-12 text-lg outline-none text-red-400 pl-2"
                        />
                    </div>
                    <div className="flex justify-around">
                        <button onClick={resetInput} className="text-gray-500">
                            Cancel
                        </button>
                        <button onClick={search} className="text-red-400">
                            Search
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}
