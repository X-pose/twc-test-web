import React, { useEffect, useState } from 'react'
import twcLoginArt from '../assets/img/TWCImgMain.svg'
import Logout from '../components/LogoutComponent'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function WelcomePage() {

  const navigate = useNavigate()
  const [loginState, setLoginState] = useState(false)

  useEffect(() => {

   checkLoginState()

   
  }, [loginState])

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

  const handleAddContactBtn = () => {
    navigate('contacts/new')
  }

 

  return (
    <div className='w-screen h-screen flex bg-doodle-art bg-contain overflow-hidden'>
      <div className=' w-screen relative h-screen flex flex-col bg-angled-ellipse bg-center bg-no-repeat items-center justify-center'>
        <div className=' h-fit w-fit flex justify-start flex-col text-white ml-4 mr-4 pl-64 pr-64'>
          <div className='w-fit h-fit mb-20 flex justify-center items-center flex-col'>
            <img src={twcLoginArt} className=' size-44' />
          </div>
          <span className='font-FuturaMdBt font-bold text-5xl'>Welcome,</span>
          <span className='font-FuturaMdBt mt-8 font-normal text-4xl '>This is where your contacts will live. Click the button below  to add a new contact.</span>
          <button onClick={handleAddContactBtn} className=' mt-20 font-FuturaMdBt w-fit h-fit pl-8 pr-8 pt-2 pb-2 font-medium text-white border-white border-2 rounded-3xl'> add your first contact</button>
        </div>
        <Logout/>
      </div>
    </div>
  )
}

export default WelcomePage