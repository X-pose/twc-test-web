import React, { useEffect, useState } from 'react'
import twcLoginArt from '../assets/img/TWCImgMain.svg'
import logoutImg from '../assets/img/logOutCircle.svg'
import { useNavigate } from 'react-router-dom'

function WelcomePage() {

  const navigate = useNavigate()
  const [loginState, setLoginState] = useState(false)

  useEffect(() => {

    checkLoginStatus()

   
  }, [loginState])

  const checkLoginStatus = async () => {
    const retrievedToken = await localStorage.getItem('TWCtoken')

    if (retrievedToken !== null) {
      console.log('Retrieved Token : ' + retrievedToken)
      setLoginState(true)
    } else {
      navigate('/login')
    }
  }

  const handleAddContactBtn = () => {
    navigate('contacts/new')
  }

  const handleLogOut = async () => {

    await localStorage.removeItem('TWCtoken')

    navigate('/login')
    
  }

  return (
    <div className='w-screen h-screen flex bg-doodle-art bg-contain'>
      <div className=' w-screen h-screen flex flex-col bg-angled-ellipse bg-center bg-no-repeat items-center justify-center'>
        <div className=' h-fit w-fit flex justify-start flex-col text-white ml-4 mr-4 pl-64 pr-64'>
          <div className='w-fit h-fit mb-20 flex justify-center items-center flex-col'>
            <img src={twcLoginArt} className=' size-44' />
          </div>
          <span className='font-FuturaMdBt font-bold text-5xl'>Welcome,</span>
          <span className='font-FuturaMdBt mt-8 font-normal text-4xl '>This is where your contacts will live. Click the button below  to add a new contact.</span>
          <button onClick={handleAddContactBtn} className=' mt-20 font-FuturaMdBt w-fit h-fit pl-8 pr-8 pt-2 pb-2 font-medium text-white border-white border-2 rounded-3xl'> add your first contact</button>
        </div>
        <div className=' cursor-pointer flex w-screen h-fit bottom-0 justify-end mt-20 mr-20 ' onClick={ handleLogOut}>
          <div className='w-fit h-fit flex mr-6'>
            <img src={logoutImg} />
          </div>
          <div className='flex items-center'>
            <span className='font-FuturaMdBt text-white font-medium text-2xl text-decoration-line: underline underline-offset-2'>logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage