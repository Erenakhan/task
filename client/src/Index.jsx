import React from 'react'
import register from '../public/register.png'
import update from '../public/update.png'
import { Link } from 'react-router-dom';

export default function Index() {
  return (
   <div className='h-screen'>
     
      <h2 className='pt-10 font-bold text-xl md:text-3xl text-center'>
        Register and Profile Update Page</h2>
        <div className='flex justify-center mt-5 md:mt-20 text-center '>
          <div className='md:flex gap-7 my-auto'>
          <Link to={'/register'}>
          <div className='border-2 m-5 md:m-0  border-gray-300 rounded-lg w-fit h-fit text-center
          hover:bg-blue-200 transition-all '>
            <h2 className='font-bold my-4 text-2xl'>Register</h2>
            <img src={register} alt="" />
          </div>
          </Link>
          <Link to={'/update'}>
          <div className='border-2  m-5 md:m-0  border-gray-300 rounded-lg w-fit h-fit text-center
          hover:bg-blue-200 transition-all'>
          <h2 className='font-bold my-4 text-2xl'>Update Profile</h2>
            <img src={update} alt="" />
          </div>
          </Link>
        </div>
      </div>
   </div>
  )
}
