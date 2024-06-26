/**
 * @description - This page handles adding new contacts to the system
 */
//Imports
import React, { useEffect, useState } from 'react'
import twcLoginArt from '../assets/TWCImgMain.svg'
import Logout from '../components/LogoutComponent'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function NewContactPage() {

  const navigate = useNavigate()
  //States
  const [loginState, setLoginState] = useState(false)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [gender, setGender] = useState('')

  useEffect(() => {

    checkLoginState()


  }, [loginState])//useEffect runs every time loginState changes to redirect the user to the relevant page

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

        } else {
          //Removing the token 
          await localStorage.removeItem('TWCtoken')
          navigate('/login')
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

  const handleNameChange = (e) => {
    setFullName(e.target.value)
  }

  const handlePhoneNumberChange = (e) => {
    setPhoneNo(e.target.value)
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }

  //Creates a new contact in DB
  const handleAddContactBtn = async (e) => {

    e.preventDefault()

    const token = localStorage.getItem('TWCtoken')

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    const payload = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNo,
      gender: gender
    }


    await axios.post('http://localhost:4000/api/contact/', payload, config).then(res => {

      console.log(res.data)

      if (res.data) {
        navigate('/contacts') //Navigates to Allcontacts page
      }


    }).catch(error => {

      console.log('Axios error in newContactPage : ' + error)
    })

  }


  return (
    <div className='w-screen h-screen flex bg-doodle-art bg-contain overflow-hidden'>
      <div className=' w-screen relative h-screen flex flex-col bg-angled-ellipse bg-center bg-no-repeat items-center justify-center'>
        <div className='lg:scale-100 md:scale-75 sm:scale-50 h-screen w-fit flex justify-start flex-col text-white ml-4 mr-4 pl-64 pr-64'>
          <div className='w-fit h-fit mt-10 mb-16 flex justify-center items-center flex-col'>
            <img src={twcLoginArt} className=' size-36' />
          </div>
          <div>
            <span className='font-FutuBd font-bold text-5xl'>New contact</span>
          </div>
          <div className='mt-16'>
            <form onSubmit={handleAddContactBtn} className="grid lg:grid-cols-2 gap-10 ">
              <div className='flex items-center mt-2'>
                <input className=' placeholder-[#083F46] ::placeholder font-FuturaMdBt w-96 h-12 pl-10  bg-white font-normal text-lg text-[#083F46] rounded-3xl'
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={handleNameChange}
                  placeholder='full name'
                  required
                />
              </div>

              <div className='flex items-center mt-2'>
                <input className='placeholder-[#083F46] ::placeholder font-FuturaMdBt w-96 h-12 pl-10  bg-white font-normal text-lg text-[#083F46] rounded-3xl'
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder='e-mail'
                  required
                />
              </div>
              <div className='flex items-center mt-2'>
                <input className='placeholder-[#083F46] ::placeholder font-FuturaMdBt w-96 h-12 pl-10  bg-white font-normal text-lg text-[#083F46] rounded-3xl'
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNo}
                  onChange={handlePhoneNumberChange}
                  placeholder='phone number'
                  minLength="10"
                  required
                />
              </div>
              <div className='flex items-center justify-between mt-2'>
                <span className="mr-4 font-FuturaMdBt">gender:</span>
                <label className="mr-4 flex items-center">
                  <input
                    type="radio"
                    className="hidden"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={handleGenderChange}
                  />
                  <div className={`w-3 h-3 rounded-full border-2 border-white  ${gender === "Male" ? "bg-gray-500" : "bg-[#083F46]"}`}></div>
                  <span className="ml-2 font-FuturaMdBt">male</span>
                </label>
                <label className="mr-4 flex items-center">
                  <input
                    type="radio"
                    className="hidden"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={handleGenderChange}
                  />
                  <div className={`w-3 h-3 rounded-full border-2 border-white  ${gender === "Female" ? "bg-gray-500" : "bg-[#083F46]"}`}></div>
                  <span className="ml-2 font-FuturaMdBt">female</span>
                </label>
              </div>
              <div className='col-span-2'>
                <button type="submit" className='hover:scale-105 mt-10 font-FuturaMdBt w-fit h-fit pl-8 pr-8 py-1 text-lg font-medium text-white border-white border-2 rounded-3xl'>add your first contact</button>
              </div>
            </form>

          </div>



        </div>
        <Logout />
      </div>
    </div>
  )
}

export default NewContactPage