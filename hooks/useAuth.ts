import axios from "axios"
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
    const { loading, data, error, setAuthState } = useContext(AuthenticationContext)

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
    const signUp = async ({ email, password, firstName, lastName, phone, city }: inputProps) => {
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
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        signIn,
        signUp
    }

}

export default useAuth