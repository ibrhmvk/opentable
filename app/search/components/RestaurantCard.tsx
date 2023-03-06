import Link from "next/link"
import getAverageRating from "../../../utils/CalculateAverageRating"
import { Price } from "../../components/Price"
import Stars from "../../components/Stars"
import { RestaurantCardType } from "../page"

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantCardType }) => {

    const renderRatingText = () => {
        const averageRating = getAverageRating(restaurant.reviews);
        if (averageRating > 4) return "Awesome"
        else if (averageRating > 2.5) return "Good"
        else if (averageRating <= 2.5) return "Bad"
        else return "No rating"
    }

    return (
        <div className="border-b flex pb-5 ml-6">
            <img
                src={restaurant.main_image}
                alt=""
                className="w-44 rounded h-36"
            />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.name}</h2>
                <div className="flex items-start">
                    <div className="flex mb-2"><Stars reviews={restaurant.reviews} /></div>
                    <p className="ml-2 text-sm">{renderRatingText()}</p>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <Price price={restaurant.price} />
                        <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
                        <p className="mr-4 capitalize">{restaurant.location.name}</p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link href={`restaurant/${restaurant.slug}`}>View more information</Link>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard