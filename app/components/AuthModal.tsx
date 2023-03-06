"use client"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        password: ''
    })
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const renderContent = (loginContent: string, signUpContent: string) => {
        return isSignUp ? signUpContent : loginContent
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
                    <div className="p-2 h-[330px]">
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
                        >
                            {renderContent("Log In", "Create Account")}
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}