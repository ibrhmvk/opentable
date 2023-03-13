'use client'

import axios from "axios"
import { getCookie } from "cookies-next"
import { useState, createContext, useEffect } from "react"

interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    city: string
}

interface State {
    loading: boolean,
    data: User | null,
    error: string | null
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    setAuthState: () => { }
})

export default function AuthContext({ children }: { children: React.ReactNode }) {
    const fetchUser = async () => {
        try {
            setAuthState({
                loading: true,
                data: null,
                error: null
            })
            const jwt = getCookie('jwt')
            if (!jwt) {
                return setAuthState({
                    loading: false,
                    data: null,
                    error: null
                })
            }
            const response = await axios.get('http://localhost:3000/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`
            setAuthState({
                loading: false,
                data: response.data,
                error: null
            })
        } catch (error: any) {
            setAuthState({
                loading: false,
                data: null,
                error: error.response.data.error
            })
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const [authState, setAuthState] = useState<State>({
        loading: false,
        data: null,
        error: null
    })

    return <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>{children}</AuthenticationContext.Provider>
}