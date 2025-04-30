'use client'
import React from 'react'
import CreateOptions from './CreateOptions'
import { Camera, Plus, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'

function LatestInterviews() {
    const [interviewList, setInterviewList] = React.useState([])

    return (
    <div className='my-5'>
        <h2 className='my-3 font-bold text-2xl'>Previously Created Interviews</h2>
        {interviewList?.length==0&&
        <div className='bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4'>
            <Video className='text-gray-400 w-20 h-20 mx-auto'/>
            <h2 className='text-lg font-bold text-center'>No Interviews Created Yet</h2> 
            <Button className=' mt-5 bg-purple-800'><Plus/>Create New Interview</Button>
            </div>
        }
        </div>        

  )
}

export default LatestInterviews