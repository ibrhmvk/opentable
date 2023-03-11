import axios from "axios"

interface inputProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
}

const useAuth = () => {
    const signIn = async ({ email, password }:
        { email: string, password: string }) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/signin", {
                email,
                password
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const signUp = async ({ email, password, firstName, lastName, phone, city }: inputProps) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/signup", {
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