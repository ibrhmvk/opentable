import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import RestaurantCard from "./components/RestaurantCard"
import { PrismaClient, Location, PRICE, Cuisine, Review } from "@prisma/client"

const prisma = new PrismaClient()

export interface RestaurantCardType {
    id: number,
    name: string,
    main_image: string
    location: Location,
    cuisine: Cuisine,
    price: PRICE,
    slug: string,
    reviews: Review[]
}
export interface searchParamsType {
    city: string;
    cuisine?: string;
    price?: PRICE
}
const fetchRestaurant = (searchParams: searchParamsType): Promise<RestaurantCardType[]> => {
    const where: any = {}
    const select = {
        id: true,
        name: true,
        main_image: true,
        location: true,
        cuisine: true,
        price: true,
        slug: true,
        reviews: true
    }
    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLocaleLowerCase()
            }
        }
        where.location = location
    }
    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLocaleLowerCase()
            }
        }
        where.cuisine = cuisine
    }
    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price
    }
    return prisma.restaurant.findMany({
        where,
        select
    })
}
const fetchLocation = () => {
    return prisma.location.findMany({
        select: {
            name: true
        }
    })
}
const fetchCuisine = () => {
    return prisma.cuisine.findMany({
        select: {
            name: true
        }
    })
}

export default async function Search({ searchParams }: { searchParams: searchParamsType }) {
    const locations = await fetchLocation()
    const cuisines = await fetchCuisine()
    const restaurants = await fetchRestaurant(searchParams)
    return (<>
        <Header />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
            <Sidebar locations={locations} cuisines={cuisines} searchParams={searchParams} />
            <div className="w-5/6">
                {restaurants.length ? restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                )) : <h1>there is no resturant at this location</h1>}
            </div>
        </div>
    </>
    )
}
