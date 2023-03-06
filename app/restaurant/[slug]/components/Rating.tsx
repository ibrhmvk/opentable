import { Review } from "@prisma/client"
import getAverageRating from "../../../../utils/CalculateAverageRating"
import Stars from "../../../components/Stars"

export const Rating = ({ reviews }: { reviews: Review[] }) => {
    const averageRating = getAverageRating(reviews).toFixed(1)
    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <Stars reviews={reviews} />
                <p className="text-reg ml-3">{averageRating}</p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Review{reviews.length === 1 ? '' : 's'}</p>
            </div>
        </div>
    )
}
