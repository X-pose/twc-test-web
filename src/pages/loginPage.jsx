import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import twcLoginArt from '../assets/img/loginDivRight.svg'

function loginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordMismatchError, setPasswordMismatchError] = useState('')
  const [authenticateError, setAuthenticateError] = useState('')
  const [loginState, setLoginState] = useState(false)
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {

    checkLoginState()

  }, [loginState]);

  const checkLoginState = async () => {
    const retrivedToken = await localStorage.getItem('TWCtoken')

    if (retrivedToken) {
      console.log('Retrived TOken : ' + retrivedToken)
      setLoginState(true)
    }

    if (loginState) {
      navigate('/')
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRegConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const validateEmail = () => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address')
      return false
    } else {
      setEmailError('')
      return true
    }
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
    if (confirmPassword !== password){
      setPasswordMismatchError('Passwords do not match. Please double-check and try again')
      return false
    }else{
      setPasswordMismatchError('')
      return true
    }
  }

  const handleRegSubmit = async (e) => {
    e.preventDefault()
    //validating user inputs
    const validEmail = validateEmail()
    const validPassword = validatePassword()
    const passwordMatch = checkPasswordMatch()

    if (validEmail && validPassword && passwordMatch) {
      //Send logic here.
      const payload = {
        email: email,
        password: password
      }

      await axios.post('http://localhost:4000/api/auth/register', payload).then(res => {

        const token = res.data.TWCtoken

        // Store the token in localStorage
        localStorage.setItem('TWCtoken', token)
        setLoginState(true)

      }).catch(error => {
        setAuthenticateError("User registration failed!")
        console.log('Axios error in registration : ' + error)
      })
    }


  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //validating user inputs
    const validEmail = validateEmail()
    const validPassword = validatePassword()


    if (validEmail && validPassword) {
      //Send logic here.
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
    <div className='w-screen h-screen flex bg-doodle-art bg-contain'>

      <div className=" w-6/12 h-screen flex justify-center items-center flex-col bg-eclipse-green bg-contain bg-no-repeat">
        {showLogin ?
          <div className='w-fit h-fit'>
            <div className=' w-fit h-fit text-white flex flex-col justify-start items-start'>
              <span className=' font-FuturaMdBt font-bold text-5xl'>Hi there,</span>
              <br />
              <span className=' font-FuturaMdBt font-normal text-4xl '>welcome to our <br /> contacts portal</span>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div >
                  <input className=' font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-extrabold text-[#083F46] rounded-3xl'
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
                  <input className='font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-extrabold text-[#083F46] rounded-3xl'
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder='password'
                    required
                  />
                  {passwordError && <p className=" text-red-500">{passwordError}</p>}
                </div>
                <div className=' w-full mt-10 justify-start'>
                  <button type="submit" className=' font-FuturaMdBt w-fit h-fit pl-8 pr-8 pt-2 pb-2 font-medium text-white border-white border-2 rounded-3xl'> login</button>
                  <span className='font-FuturaMdBt ml-4 mr-4 text-white font-medium'>or</span>
                  <a href='#' onClick={() => setShowLogin(false)}  className=' font-FuturaMdBt text-white font-medium text-decoration-line: underline underline-offset-2'>Click here to Register</a>
                </div>
                {authenticateError && <p className=" text-red-500">{authenticateError}</p>}
              </form>
            </div>
          </div>
          :
          <div className='w-fit h-fit'>
            <div className=' w-fit h-fit text-white flex flex-col justify-start items-start'>
              <span className=' font-FuturaMdBt font-bold text-5xl'>Register Now!</span>
            </div>
            <div>
              <form onSubmit={handleRegSubmit}>
                <div >
                  <input className=' font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-extrabold text-[#083F46] rounded-3xl'
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
                  <input className='font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-extrabold text-[#083F46] rounded-3xl'
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
                  <input className='font-FuturaMdBt w-96 h-12 pl-10 mt-9 bg-white font-extrabold text-[#083F46] rounded-3xl'
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
                <a href='' onClick={() => setShowLogin(true)} className='font-FuturaMdBt text-white text-xl font-medium underline underline-offset-2'>{'<'} Back to login</a>
              </div>

            </div>

          </div>
        }
      </div>
      <div className='w-3/6 h-screen flex justify-center items-center flex-col'>
        <img src={twcLoginArt} />
      </div>
    </div>
  )
}

export default loginPage