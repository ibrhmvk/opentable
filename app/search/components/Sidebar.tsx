import { PRICE } from "@prisma/client"
import Link from "next/link"
import { searchParamsType } from "../page"

interface props {
    locations: { name: string }[],
    cuisines: { name: string }[],
    searchParams: searchParamsType
}
const prices = [
    {
        price: PRICE.CHEAP,
        label: "$"
    },
    {
        price: PRICE.REGULAR,
        label: "$$"
    },
    {
        price: PRICE.EXPENSIVE,
        label: "$$$"
    },
]
const Sidebar = ({ locations, cuisines, searchParams }: props) => {
    return (
        <div className="w-1/5">
            <div className="border-b pb-4 flex flex-col">
                <h1 className="mb-2">Region</h1>
                {locations.map(location => (
                    <Link href={{
                        pathname: '/search',
                        query: { ...searchParams, city: location.name },
                    }} className="font-light text-reg capitalize">
                        {location.name}
                    </Link>
                ))}
            </div>
            <div className="border-b pb-4 mt-3 flex flex-col">
                {cuisines.map(cuisine => (
                    <Link href={{
                        pathname: '/search',
                        query: { ...searchParams, cuisine: cuisine.name },
                    }} className="font-light text-reg capitalize">
                        {cuisine.name}
                    </Link>
                ))}
            </div>
            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    {prices.map(({ price, label }) => (
                        <Link href={{
                            pathname: '/search',
                            query: { ...searchParams, price: price },
                        }} className="border w-full text-reg font-light rounded text-center p-2">
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
