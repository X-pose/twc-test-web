import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Registration({toggleView}) {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordMismatchError, setPasswordMismatchError] = useState('')
    const [authenticateError, setAuthenticateError] = useState('')



    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleRegConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }



    const validatePassword = () => {

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long')
            return false
        } else {
            setPasswordError('')
            return true
        }
    }

    const checkPasswordMatch = () => {
        if (confirmPassword !== password) {
            setPasswordMismatchError('Passwords do not match. Please double-check and try again')
            return false
        } else {
            setPasswordMismatchError('')
            return true
        }
    }


    const handleRegSubmit = async (e) => {
        e.preventDefault()
        //validating user inputs

        const validPassword = validatePassword()
        const passwordMatch = checkPasswordMatch()

        if (validPassword && passwordMatch) {
            //Send logic here.
            const payload = {
                email: email,
                password: password
            }

            await axios.post('http://localhost:4000/api/auth/register', payload).then(res => {

                const token = res.data.TWCtoken

                // Store the token in localStorage
                localStorage.setItem('TWCtoken', token)
                navigate('/')

            }).catch(error => {
                setAuthenticateError("User registration failed!")
                console.log('Axios error in registration : ' + error)
            })
        }


    }


    return (
        <div className='w-fit h-fit'>
            <div className=' w-fit h-fit text-white flex flex-col justify-start items-start'>
                <span className=' font-FutuBd font-bold text-5xl'>Register Now!</span>
            </div>
            <div>
                <form onSubmit={handleRegSubmit}>
                    <div >
                        <input className='placeholder-[#083F46] ::placeholder font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-extrabold text-[#083F46] rounded-3xl'
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder='e-mail'
                            required
                        />
                        {emailError && <p className="text-red-500">{emailError}</p>}
                    </div>
                    <div >
                        <input className='placeholder-[#083F46] ::placeholder font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-extrabold text-[#083F46] rounded-3xl'
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}

                            placeholder='create password'
                            required
                        />
                        {passwordError && <p className=" text-red-500">{passwordError}</p>}
                    </div>
                    <div >
                        <input className='placeholder-[#083F46] ::placeholder font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-extrabold text-[#083F46] rounded-3xl'
                            type="password"
                            id="password"
                            name="password"
                            value={confirmPassword}
                            onChange={handleRegConfirmPasswordChange}
                            placeholder='confirm password'
                            required
                        />
                        {passwordMismatchError && <p className=" text-red-500">{passwordMismatchError}</p>}
                    </div>
                    <div className='w-full mt-10 flex-col'>
                        <button type="submit" className='font-FuturaMdBt w-fit h-fit pl-8 pr-8 pt-2 pb-2 font-medium text-white border-white border-2 rounded-3xl'>register</button>

                    </div>
                    {authenticateError && <p className=" text-red-500">{authenticateError}</p>}

                </form>
                <div className='mt-28'>
                    <span onClick={toggleView} className=' cursor-pointer font-FuturaMdBt text-white text-xl font-medium underline underline-offset-2'>{'<'} Back to login</span>
                </div>

            </div>

        </div>
    )
}