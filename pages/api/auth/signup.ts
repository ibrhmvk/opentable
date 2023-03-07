import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator"
import bcrypt from "bcrypt"
import * as jose from 'jose'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { firstName, lastName, email, phone, city, password } = req.body

    if (req.method === "POST") {

        const errors: string[] = []

        const validationSchema = [{
            valid: validator.isLength(firstName, {
                min: 1,
                max: 20
            }),
            errorMessage: "first name is invalid"
        },
        {
            valid: validator.isLength(lastName, {
                min: 1,
                max: 20
            }),
            errorMessage: "last name is invalid"

        },
        {
            valid: validator.isEmail(email),
            errorMessage: "email is invalid"

        },
        {
            valid: validator.isMobilePhone(phone),
            errorMessage: "phone number is invalid"

        },
        {
            valid: validator.isLength(city, { min: 1 }),
            errorMessage: "city is invalid"
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage: "password is invalid"
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
        const userWithEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (userWithEmail) {
            return res.status(400).json({
                "error": "You already have an account. Please Log In"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                password: hashedPassword,
                email,
                city,
                phone
            }
        })

        const secret = new TextEncoder().encode(process.env.JWT_SIGN)
        const alg = 'HS256'

        const jwt = await new jose.SignJWT({ email: newUser.email })
            .setProtectedHeader({ alg })
            .setExpirationTime('24h')
            .sign(secret)

        return res.status(200).json({
            result: jwt
        })
    }
    return res.status(404).json("Unknown endpoint")
}