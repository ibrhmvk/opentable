"use client"

import { Alert, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import AuthModalInputs from './AuthModalInputs';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal({ isSignUp }: { isSignUp?: boolean }) {
    const { loading, error, data, setAuthState } = useContext(AuthenticationContext)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false),
            setAuthState(prev => ({ ...prev, error: null }))
    };
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        password: ''
    })
    const [disabled, setIsDisabled] = useState(true)
    const { signIn, signUp } = useAuth()
    useEffect(() => {
        if (!isSignUp) {
            if (input.email && input.password) {
                return setIsDisabled(false)
            }
            return setIsDisabled(true)
        } else {
            if (input.firstName &&
                input.lastName &&
                input.email &&
                input.city &&
                input.password &&
                input.phone) {
                return setIsDisabled(false)
            }
            return setIsDisabled(true)
        }
    }, [input])

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const renderContent = (loginContent: string, signUpContent: string) => {
        return isSignUp ? signUpContent : loginContent
    }
    const handleClick = () => {
        if (!isSignUp) {
            signIn({
                email: input.email,
                password: input.password
            }, handleClose)
        } else {
            signUp({
                email: input.email,
                password: input.password,
                firstName: input.firstName,
                lastName: input.lastName,
                city: input.city,
                phone: input.phone
            }, handleClose)
        }
    }
    return (
        <div>
            <button
                className={`p-1 px-4 rounded ${renderContent('bg-blue-400 text-white border mr-3', 'border')}`}
                onClick={handleOpen}
            >
                {renderContent('Log In', 'Sign Up')}
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loading ?
                        <div className='py-24 flex justify-center px-2 h-[430px]'>
                            <CircularProgress />
                        </div>
                        :
                        <div className="p-2 h-[430px]">
                            {!isSignUp ? error ? <Alert severity="error" className=' mb-3'>{error}</Alert> : null : error ? <Alert severity="error" className=' mb-3'>{error}</Alert> : null}

                            <div className='border-b-2 mb-2'>
                                <p className="text-sm text-center font-bold mb-2 uppercase">{renderContent('Log In', 'Create Account')}</p>
                            </div>
                            <div className="m-auto">
                                <h2 className="text-2xl font-light text-center">
                                    {renderContent(
                                        "Log Into Your Account",
                                        "Create Your OpenTable Account"
                                    )}
                                </h2>
                            </div>
                            <AuthModalInputs inputs={input} handleChangeInput={handleChangeInput} isSignUp={isSignUp} />
                            <button
                                className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                                disabled={disabled}
                                onClick={handleClick}>
                                {renderContent("Log In", "Create Account")}
                            </button>
                        </div>}
                </Box>
            </Modal>
        </div>
    );
}