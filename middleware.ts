import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'


export async function middleware(req: NextRequest, res: NextResponse) {

    const bearerToken = req.headers.get("authorization") as string

    if (!bearerToken) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), { status: 401 })
    }
    const token = bearerToken.split(" ")

    if (token[0] !== "Bearer") {
        return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), { status: 401 })

    }
    if (!token[1]) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), { status: 401 })

    }
    const secret = new TextEncoder().encode(process.env.JWT_SIGN)
    try {
        await jose.jwtVerify(token[1], secret)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), { status: 401 })

    }
}

export const config = {
    matcher: ['/api/auth/me']
}