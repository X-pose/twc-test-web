/**
 * @description - This component handles the login logic
 */

//imports
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'



export default function Login({ toggleView }) {

  const navigate = useNavigate()
  //States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [authenticateError, setAuthenticateError] = useState('')
  const [loginState, setLoginState] = useState(false)


  useEffect(() => {
    checkLoginState()
  }, [loginState])//useEffect runs every time loginState changes to redirect the user to welcome page

  //Checks for the login state by validating JWT token
  const checkLoginState = async () => {
    const retrivedToken = await localStorage.getItem('TWCtoken')

    if (retrivedToken) {
      console.log('Retrived TOken : ' + retrivedToken)

      try {
        const decodedToken = jwtDecode(retrivedToken)

        // getting expiration time in seconds
        const currentTime = Date.now() / 1000

        if (decodedToken.exp > currentTime) {
          setLoginState(true)
          navigate('/') //Redirecting the user to welcome page
        }else{
          //Removing the token if expired
          await localStorage.removeItem('TWCtoken')
        }

      } catch (err) {
        console.error("Error decoding token:", err)
      }

    }

  }
  
  //State change handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

 //Validating password to ensure it has at least 8 characters.
  const validatePassword = () => {

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long')
      return false
    } else {
      setPasswordError('')
      return true
    }
  }

  //Sending login request to the server
  const handleSubmit = async (e) => {
    e.preventDefault()

    //validating user inputs 
    const validPassword = validatePassword()


    if (validPassword) {
     
      const payload = {
        email: email,
        password: password
      }

      await axios.post('http://localhost:4000/api/auth/login', payload).then(res => {

        const token = res.data.TWCtoken

        // Store the token in localStorage
        localStorage.setItem('TWCtoken', token)
        setLoginState(true)

      }).catch(error => {
        setAuthenticateError("User authentication failed!")
        console.log('Axios error in login : ' + error)
      })
    }
  }

  return (

    <div className='w-fit h-fit lg:scale-100 md:scale-75 sm:scale-50'>
      <div className=' w-fit h-fit text-white flex flex-col justify-start items-start'>
        <span className=' font-FutuBd font-bold text-5xl'>Hi there,</span>
        <br />
        <span className=' font-FuturaMdBt font-normal text-4xl '>Welcome to our <br /> contacts portal</span>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div >
            <input className='placeholder-[#083F46] ::placeholder font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-normal text-[#083F46] rounded-3xl'
              type="email"
              id="email"
              name="email"
              value={email}
              onFocus={() => setEmail('')}
              onChange={handleEmailChange}
              placeholder='e-mail'
              required
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div >
            <input className=' placeholder-[#083F46] ::placeholder font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-normal text-[#083F46] rounded-3xl'
              type="password"
              id="password"
              name="password"
              value={password}
              onFocus={() => setPassword('')}
              onChange={handlePasswordChange}
              placeholder='password'
              required
            />
            {passwordError && <p className=" text-red-500">{passwordError}</p>}
          </div>
          <div className=' w-full mt-10 justify-start'>
            <button type="submit" className=' hover:scale-105 font-FuturaMdBt w-fit h-fit pl-8 pr-8 py-1 text-lg  font-medium text-white border-white border-2 rounded-3xl'> login</button>
            <span className='font-FuturaMdBt ml-4 mr-4 text-white font-medium'>or</span>
            <span onClick={toggleView} className='cursor-pointer font-FuturaMdBt text-white text-lg font-medium text-decoration-line: underline underline-offset-2'>Click here to Register</span>
          </div>
          {authenticateError && <p className=" text-red-500">{authenticateError}</p>}
        </form>
      </div>
    </div>

  )
}
