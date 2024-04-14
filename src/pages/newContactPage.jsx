import React, { useEffect, useState } from 'react'
import twcLoginArt from '../assets/img/TWCImgMain.svg'
import Logout from '../components/LogoutComponent'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function NewContactPage() {

  const navigate = useNavigate()
  const [loginState, setLoginState] = useState(false)

  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [gender, setGender] = useState('')

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

      if (res.data){
        navigate('/contacts')
      }


    }).catch(error => {
      
      console.log('Axios error in newContactPage : ' + error)
    })
    
  }


  return (
    <div className='w-screen h-screen flex bg-doodle-art bg-contain overflow-hidden'>
      <div className=' w-screen relative h-screen flex flex-col bg-angled-ellipse bg-center bg-no-repeat items-center justify-center'>
        <div className=' h-fit w-fit flex justify-start flex-col text-white ml-4 mr-4 pl-64 pr-64'>
          <div className='w-fit h-fit mb-20 flex justify-center items-center flex-col'>
            <img src={twcLoginArt} className=' size-44' />
          </div>
          <div>
            <form onSubmit={handleAddContactBtn} className="grid grid-cols-2 gap-10">
              <div className='flex items-center mt-2'>
                <input className='font-FuturaMdBt w-96 h-12 pl-10  bg-white font-extrabold text-[#083F46] rounded-3xl'
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={handleNameChange}
                  placeholder='Full Name'
                  required
                />
              </div>
              <div className='flex items-center mt-2'>
                <input className='font-FuturaMdBt w-96 h-12 pl-10  bg-white font-extrabold text-[#083F46] rounded-3xl'
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNo}
                  onChange={handlePhoneNumberChange}
                  placeholder='Phone Number'
                  minLength="10"
                  required
                />
              </div>
              <div className='flex items-center mt-2'>
                <input className='font-FuturaMdBt w-96 h-12 pl-10  bg-white font-extrabold text-[#083F46] rounded-3xl'
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder='E-mail'
                  required
                />
              </div>
              <div className='flex items-center justify-between mt-2'>
                <span className="mr-4 font-FuturaMdBt">Gender:</span>
                <label className="mr-4">
                  <input type="radio" className='indeterminate: border-white border-2 bg-transparent' name="gender" value="Male" checked={gender === "Male"} onChange={handleGenderChange} />
                  <span className="ml-2 font-FuturaMdBt">Male</span>
                </label>
                <label>
                  <input type="radio" className='indeterminate: border-white border-2 bg-transparent' name="gender" value="Female" checked={gender === "Female"} onChange={handleGenderChange} />
                  <span className="ml-2 font-FuturaMdBt">Female</span>
                </label>
              </div>
              <div className='col-span-2'>
                <button type="submit" className='mt-20 font-FuturaMdBt w-fit h-fit pl-8 pr-8 pt-2 pb-2 font-medium text-white border-white border-2 rounded-3xl'>Add Your First Contact</button>
              </div>
            </form>

          </div>



        </div>
        <Logout/>
      </div>
    </div>
  )
}

export default NewContactPage