import { Review } from "@prisma/client";

export default function getAverageRating(reviews: Review[]) {
    if (!reviews.length) return 0;
    const ratings = reviews.map(review => review.rating);
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return sum / ratings.length;
}