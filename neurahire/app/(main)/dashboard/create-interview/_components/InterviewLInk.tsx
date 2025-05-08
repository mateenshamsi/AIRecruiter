'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Calendar, Clock, Copy, List, Mail, MessageCircle, Plus, Slack } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function InterviewLink({ interview_id,formData }) {
  const [interviewLink, setInterviewLink] = useState('')

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview_id}`
        setInterviewLink(url)
        console.log("Link",interview_id)
      } catch (err) {
        console.error('Failed to generate interview link:', err)
      }
    }

    fetchLink()
  }, [interview_id])

  const onCopyLink = async() => {
    await   navigator.clipboard.writeText(interviewLink)
    toast.success('Link copied to clipboard')
  }

  return (
    <div className='flex flex-col items-center w-full justify-center gap-4'>
      <Image src='/check.png' alt='check' width={50} height={50} />
      <h2 className='font-bold text-lg'>Your AI interview link is ready</h2>
      <p>Share this link with your candidates to start the interview process</p>
      <div className='w-full p-7 mt-6 rounded-2xl bg-[#f0e6ff] border-2 border-[#c8b3e6] px-3'>
        <div className='flex justify-between items-center gap-2  rounded-xl py-4'>
         
          <h2>Interview Link</h2>
          <h2 className='p-1 px-2 text-[#8a4fff] font-bold  rounded cursor-pointer'>
            Valid for 30 days
          </h2>
          </div>
        <div className='mt-3 flex gap-3 w-full items-center justify-between'>
        <Input className='border-2  border-purple-800 text-[#5c2e91]' value={interviewLink} disabled />
          <Button className='bg-[#6a3ea1]' onClick={()=>onCopyLink()}><Copy/>Copy Link</Button>
        </div>
        <hr className="my-7 border border-[#c8b3e6]"/>
       
        <div className='flex gap-5'> 
          <div className="text-sm flex items-center gap-2 text-gray-500"><Clock className='h-4 w-4'/>30Min{formData?.interviewDuration}</div>
          <div className="text-sm flex items-center gap-2 text-gray-500"><List className='h-4 w-4'/>10 Questions</div>
          <div className="text-sm flex items-center gap-2 text-gray-500">< Calendar className='h-4 w-4'/>Expires </div>
        
        </div> 
        
        </div>
        <div className='mt-7 bg-[#f0e6ff] border-2 border-[#c8b3e6] flex flex-col   p-5 rounded-xl w-full'>
          <h2 className='text-[#8a4fff] font-bold'> Share via</h2>
          <div className='mt-2 flex gap-2'>
        <Button variant={'outline'} className=' bg-[#6a3ea1] text-white'><Slack/>Slack</Button>
        <Button variant={'outline'} className=' bg-[#6a3ea1] text-white'><Mail/>Email</Button>
        <Button variant={'outline'} className=' bg-[#6a3ea1] text-white'><MessageCircle />Whatsapp</Button>
            
             </div>
        </div> 
        <div className='flex w-full gap-5 justify-between mt-6 '>
          <Link href={'/dashboard'} >
          <Button variant={"outline"}><ArrowLeft/>Back To Dashboard</Button>
          </Link>
          <Link href={"/dashboard/create-interview"}>
          <Button className='bg-purple-800'><Plus />Create New Interview</Button>
          </Link>
        </div>
      </div>
    
  )
}

export default InterviewLink
