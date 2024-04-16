/**
 * @description - This is login page. It conditionally renders login component & registration component.
 */
//Imports
import React, {useState } from 'react'
import twcLoginArt from '../assets/img/TWCImgLogin.svg'
import Login from '../components/LoginComponent'
import Registration from '../components/RegisterComponent'

function LoginPage() {

  const [showLogin, setShowLogin] = useState(true)


  const toggleView = () => {
    setShowLogin(!showLogin);
  };


  return (
    <div className='w-screen h-screen flex bg-doodle-art bg-contain overflow-hidden'>

      <div className=" w-6/12 h-screen flex justify-center items-center flex-col bg-round-ellipse bg-right  bg-no-repeat">
        {showLogin ?
          <Login toggleView = {toggleView}/>
          :
          <Registration toggleView = {toggleView}/>
        }
      </div>
      <div className='w-3/6 h-screen flex justify-center items-center flex-col'>
        <img src={twcLoginArt} />
      </div>
    </div>
  )
}

export default LoginPage