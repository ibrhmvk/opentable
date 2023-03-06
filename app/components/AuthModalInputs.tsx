
interface Props {
    inputs: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        city: string,
        password: string
    }, 
    handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isSignUp?: boolean
}

export default function AuthModalInputs({ inputs, handleChangeInput, isSignUp }: Props) {
    return (
        <>
            {isSignUp && <div className="w-full mt-2 flex justify-between text-sm">
                <input
                    type="text"
                    placeholder="first name"
                    value={inputs.firstName}
                    className="p-2 border w-[49%]"
                    name='firstName'
                    onChange={handleChangeInput}
                />
                <input
                    type="text"
                    placeholder="last name"
                    value={inputs.lastName}
                    className="p-2 border w-[49%]"
                    name="lastName"
                    onChange={handleChangeInput}

                />
            </div>}
            <div className="w-full mt-2 flex justify-between text-sm">
                <input
                    type='email'
                    placeholder="Email address"
                    value={inputs.email}
                    className="p-2 border w-full"
                    name="email"
                    onChange={handleChangeInput}
                />
            </div>
            {isSignUp && <div className="w-full mt-2 flex justify-between text-sm">
                <input
                    type="text"
                    placeholder="phone"
                    value={inputs.phone}
                    className="p-2 border w-[49%]"
                    name="phone"
                    onChange={handleChangeInput}
                />
                <input
                    type="text"
                    placeholder="city"
                    value={inputs.city}
                    className="p-2 border w-[49%]"
                    name="city"
                    onChange={handleChangeInput}
                />
            </div>}
            <div className="w-full mt-2 mb-2 flex justify-between text-sm">
                <input
                    type="password"
                    placeholder="password"
                    value={inputs.password}
                    className="p-2 border w-full"
                    name="password"
                    onChange={handleChangeInput}
                />
            </div>
        </>
    )
}
