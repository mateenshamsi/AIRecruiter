"use client"
import { Button } from '@/components/ui/button'

import Image from 'next/image' 
import React from 'react'
import {supabase} from '@/services/supabaseClient'
function Login() {
  const signInWithGoogle =async()=>{
    const {error}= await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if(error){
      console.error("Error",error.message) 
    }
  }
  return (
    <div>
      <div className="flex border rounded-2xl p-8  items-center flex-col justify-center h-screen w-full">
        
        <div > 
          <Image src={'/recruiter.png'} alt='login' width={600} height={400}/>
        </div>
        <h2 className='text-2xl font-bold text-center '>Welcome to NeuraHire</h2>
        
        <Button className='mt-4 w-1/4 font-bold ' onClick={signInWithGoogle}> 
          Login With Google
        </Button>
      </div>
    </div>
  )
}

export default Login