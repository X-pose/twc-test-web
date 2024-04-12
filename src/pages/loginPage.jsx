import React, { useEffect, useState } from 'react'

function loginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Send logic here. validate first
  };

  return (
    <div className='w-screen h-screen flex  bg-lime-300'>

      <div className=" w-3/6 h-screen flex justify-center items-center bg-slate-600 flex-col">
        <div className='w-fit h-fit'>
          <div className=' w-fit h-fit text-white flex flex-col justify-start items-start'>
            <span className=' font-FuturaMdBt font-bold text-5xl'>Hi there,</span>
            <br/>
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
                  placeholder='email'
                  required
                />
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
              </div>
              <div className=' w-full mt-10 justify-start'>
                <button type="submit" className=' font-FuturaMdBt w-fit h-fit pl-8 pr-8 pt-2 pb-2 font-medium text-white border-white border-2 rounded-3xl'> login</button>
                <span className='font-FuturaMdBt ml-4 mr-4 text-white font-medium'>or</span>
                <a href='#' className=' font-FuturaMdBt text-white font-medium text-decoration-line: underline underline-offset-2'>Click here to Register</a>
              </div>

            </form>
          </div>
        </div>

      </div>
      <div className='w-3/6 h-screen flex bg-red-200 justify-center items-center flex-col'>
        <span>twc</span>
        <span>Contacts</span>
        <span>portal</span>
      </div>
    </div>
  )
}

export default loginPage