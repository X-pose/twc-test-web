import React, { useEffect, useState } from 'react'
import twcLoginArt from '../assets/img/TWCImgMain.svg'
import Logout from '../components/LogoutComponent'
import { useNavigate } from 'react-router-dom'
import ContactsTable from '../components/contactsTableComponent'
import { jwtDecode } from 'jwt-decode'

function AllContactPage() {


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
    navigate('/contacts/new')
  }


  return (

    <div className='w-screen h-screen flex bg-doodle-art bg-contain overflow-hidden'>
      <div className=' w-screen h-screen relative flex flex-col bg-angled-ellipse bg-center bg-no-repeat items-center'>
        <div className=' h-fit w-fit flex justify-start flex-col text-white mt-10 mx-4 '>
          <div className='w-fit h-fit mb-10 flex justify-center items-center flex-col'>
            <img src={twcLoginArt} className=' size-44' />
          </div>

          <div className='flex justify-between flex-row items-center mb-5'>
            <span className='font-FutuBd font-bold text-5xl'>Contacts</span>
            <button onClick={handleAddContactBtn} className=' font-FuturaMdBt w-fit h-fit pl-8 pr-8 pt-2 pb-2 font-medium text-white border-white border-2 rounded-3xl'> add new contact</button>

          </div>

          <ContactsTable />

        </div>
       <Logout/>
      </div>
    </div>
  )
}

export default AllContactPage