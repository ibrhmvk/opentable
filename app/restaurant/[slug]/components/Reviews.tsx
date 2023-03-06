import { Review } from "@prisma/client"
import ReviewCard from "./ReviewCard"

export const Reviews = ({ reviews }: { reviews: Review[] }) => {
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                {reviews.length > 0 ? `What ${reviews.length} ${reviews.length === 1 ? 'person is' : 'people are'} saying` : 'There is no reviews for this restaurant'}
            </h1>
            <div>{reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
            ))}
            </div>
        </div>
    )
}
