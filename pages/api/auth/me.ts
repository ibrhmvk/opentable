import { NextApiRequest, NextApiResponse } from "next";
import * as jose from 'jose'
import jwt from 'jsonwebtoken'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function Me(req: NextApiRequest, res: NextApiResponse) {


    if (req.method === "GET") {
        const bearerToken = req.headers["authorization"] as string

        if (!bearerToken) {
            return res.status(401).json({
                error: "Unauthorized request"
            })
        }
        const token = bearerToken.split(" ")

        if (token[0] !== "Bearer") {
            return res.status(401).json({
                error: "Unauthorized request"
            })
        }
        if (!token[1]) {
            return res.status(401).json({
                error: "Unauthorized request"
            })
        }
        const secret = new TextEncoder().encode(process.env.JWT_SIGN)
        try {
            await jose.jwtVerify(token[1], secret)
        } catch (error) {
            return res.status(401).json({
                error: "Unauthorized request"
            })
        }

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