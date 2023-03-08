import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function Me(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {

        const bearerToken = req.headers["authorization"] as string
        const token = bearerToken.split(" ")

        const payload = jwt.decode(token[1]) as { email: string, exp: number }

        if (!payload.email) {
            return res.status(401).json({
                error: "Unauthorized request"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                phone: true,
                city: true
            }
        })

        return res.status(200).json({
            email: user
        })
    }

}