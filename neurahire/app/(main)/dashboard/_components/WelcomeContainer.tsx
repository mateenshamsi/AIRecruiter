'use client'
import { useUser } from '@/app/provider'
import Image from 'next/image'
import React, { useContext } from 'react'

function WelcomeContainer() {
  const {user} = useUser()
  console.log(user)  
  return (
    <div> 
        <div className='bg-white p-3 rounded-2xl  flex flex-col   w-full'> 
            <h2 className='text-lg font-bold'>Welcome Back,{user?.name}</h2>
            <h2 className='text-gray-500'>AI-Driven Interviews,Hassel-Free Hiring</h2>
        
        </div>      
        {/* {user&&<Image src={user?.photo} alt='login' width={50} height={40} className='round' />} */}
    </div>
  )
}

export default WelcomeContainer