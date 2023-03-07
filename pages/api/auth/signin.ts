import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator"
import bcrypt from "bcrypt"
import * as jose from 'jose'




const prisma = new PrismaClient()

export default async function SignIn(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body

    if (req.method === "POST") {
        const errors: string[] = []
        const validationSchema = [{
            valid: validator.isEmail(email),
            errorMessage: "Please enter a valid email address"
        },
        {
            valid: validator.isLength(password, {
                min: 1
            }),
            errorMessage: "Please enter a valid password"
        }]

        validationSchema.forEach(check => {
            if (!check.valid) {
                errors.push(check.errorMessage)
            }
        })
        if (errors.length) {
            res.status(400).json({
                error: errors[0]
            })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!existingUser) {
            res.status(401).json({
                error: "You don't have any existing account. Please create an account"
            })
        } else {
            const isMatch = await bcrypt.compare(password, existingUser.password)
            if (!isMatch) {
                return res.status(401).json({
                    error: "Invalid Password"
                })
            }
        }

        const secret = new TextEncoder().encode(process.env.JWT_SIGN)
        const alg = 'HS256'

        const jwt = await new jose.SignJWT({ email: existingUser?.email })
            .setProtectedHeader({ alg })
            .setExpirationTime('24h')
            .sign(secret)

        return res.status(200).json({
            token: jwt
        })
    }
    return res.status(404).json("Unknown endpoint")

}