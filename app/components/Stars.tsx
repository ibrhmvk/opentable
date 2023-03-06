import Image from 'next/image'
import React from 'react'
import FullStar from '../../public/icons/full-star.png'
import HalfStar from '../../public/icons/half-star.png'
import EmptyStar from '../../public/icons/empty-star.png'
import { Review } from '@prisma/client'
import getAverageRating from '../../utils/CalculateAverageRating'


export default function Stars({ reviews, rating }: { reviews: Review[], rating?: number }) {
    const Averagerating = rating || getAverageRating(reviews)

    const renderStars = () => {
        const stars = []
        for (let i = 0; i < 5; i++) {
            const difference = parseFloat((Averagerating - i).toFixed(1))
            if (difference >= 1) stars.push(FullStar)
            else if (difference < 1 && difference > 0) {
                if (difference <= 0.2) stars.push(EmptyStar)
                else if (difference > 0.2 && difference <= 0.6) stars.push(HalfStar)
                else stars.push(FullStar)
            }
            else stars.push(EmptyStar)
        }
        return stars.map((star, index) => (
            <Image src={star} alt='' className='w-4 h-4 mr-1' key={index} />
        ))
    }

    return (
        <div className="flex mb-1">
            {renderStars()}
        </div>
    )
}
