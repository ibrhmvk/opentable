import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";

const prisma = new PrismaClient()

export default async function Availability(req: NextApiRequest, res: NextApiResponse) {
    const { slug, day, time, partySize } = req.query as {
        slug: string,
        day: string,
        time: string,
        partySize: string
    }

    if (!day || !time || !partySize) {
        return res.status(400).json({
            errorMessage: "Invalid data provided"
        })
    }

    const searchTimes = times.find(t => {
        return t.time === time
    })?.searchTimes

    if (!searchTimes) {
        return res.status(400).json({
            errorMessage: "Invalid data provided"
        })
    }
    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
            }
        },
        select: {
            number_of_people: true,
            booking_time: true,
            tables: true
        }
    })
    return res.json({
        searchTimes,
        bookings
    })
}