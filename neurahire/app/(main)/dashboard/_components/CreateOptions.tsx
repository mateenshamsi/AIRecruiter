import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className="grid md:grid-cols-2 gap-5 p-4  rounded-lg ">
        <Link href="/dashboard/create-interview" className='bg-white border-2 lg:flex lg:flex-row flex-col gap-4  border-gray-300 p-4 rounded-lg shadow-md cursor-pointer '>  
            <div>
            <Video className="p-3 text-purple-500  bg-purple-200 rounded-lg h-14 w-14"/>
            </div>
            <div>
            <h2 className='text-lg font-bold'>Create New Interview</h2>
            <p className='text-gray-400'>Create AI interview and schedule them with Candidates </p>    
            </div>
        </Link>
        <div className='bg-white border-2 lg:flex lg:flex-row flex-col gap-4  border-gray-300 p-4 rounded-lg shadow-md'>  
            <div>
            <Phone className="p-3 text-purple-500  bg-purple-200 rounded-lg h-14 w-14"/>
            </div>
            <div>
            <h2 className='text-lg font-bold'>Create Phone Screening Call</h2>
            <p className='text-gray-400'>Schedule Phone Screening Call with candidates</p>    
            </div>
        </div>
    </div>
  )
}

export default CreateOptions