import axios from "axios"
import { deleteCookie } from "cookies-next";
import { useContext } from "react"
import { AuthenticationContext } from "../app/context/AuthContext";

interface inputProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
}

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext)

    const signIn = async ({ email, password }:
        { email: string, password: string }, handleClose: () => void) => {
        setAuthState({
            loading: true,
            data: null,
            error: null
        })
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/signin", {
                email,
                password
            })
            setAuthState({
                loading: false,
                data: response.data,
                error: null
            })
            handleClose()
        } catch (error: any) {
            setAuthState({
                loading: false,
                data: null,
                error: error.response.data.error
            })
        }
    }
    const signUp = async ({ email, password, firstName, lastName, phone, city }: inputProps, handleClose: () => void) => {
        setAuthState({
            loading: true,
            data: null,
            error: null
        })
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/signup", {
                email,
                password,
                firstName,
                lastName,
                phone,
                city
            })
            setAuthState({
                loading: false,
                data: response.data,
                error: null
            })
            handleClose()
        } catch (error: any) {
            setAuthState({
                loading: false,
                data: null,
                error: error.response.data.error
            })
        }
    }
    const logOut = () => {
        setAuthState({ data: null, error: null, loading: false })
        deleteCookie('jwt');
    }
    return {
        signIn,
        signUp,
        logOut
    }
}

export default useAuth