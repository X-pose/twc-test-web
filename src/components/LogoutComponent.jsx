import React from 'react'
import logoutImg from '../assets/img/logOutCircle.svg'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
 
    const navigate = useNavigate()
    
    const handleLogOut = async () => {

        await localStorage.removeItem('TWCtoken')
    
        navigate('/login')
    
      }
    

    return (
        <div className=' cursor-pointer absolute flex w-screen h-fit bottom-10 right-20 justify-end  ' onClick={handleLogOut}>
            <div className='w-fit h-fit flex mr-6'>
                <img src={logoutImg} />
            </div>
            <div className='flex items-center'>
                <span className='font-FuturaMdBt text-white font-medium text-2xl text-decoration-line: underline underline-offset-2'>logout</span>
            </div>
        </div>
    )
}