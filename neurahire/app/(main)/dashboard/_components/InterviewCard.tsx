import React from 'react'
import moment from 'moment'
import { Copy,MoveRightIcon,Send, View} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Interview = {
    createdAt: string 
    jobPosition:string
    duration: string 
    interview_id: string 
}

function InterviewCard({ interview,viewDetail=false }: { interview: Interview,viewDetail?:boolean}) {
   const copyLink = ()=>{
    const url = process.env.NEXT_PUBLIC_HOST_URL +"/"+ interview?.interview_id
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
   }
   console.log('int',interview)
   const handleSend = () => {
    window.location.href = `mailto:?subject=Interview Link&body=Join the interview at: ${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;
   }
    return (
        <div className='flex flex-col bg-white rounded-lg p-5  border  gap-4'>
            <div className='flex items-center justify-between gap-5'>
            <div className='h-[40px] w-[40px] bg-gray-400 rounded-full flex  items-center justify-center text-white text-sm'></div>

            <p className='text-gray-600 text-sm'>
                {moment(interview?.createdAt).format('MMM Do, YYYY')}
            </p>
            </div>
            <h2 className='font-bold'>{interview.jobPosition}</h2>
            <h2 className='mt-1 flex justify-between text-gray-500'>{interview.duration}
                <span className='text-green-700 font-bold'>{interview['interview-feedback'].length} Candidates</span>
            </h2>
            { !viewDetail && (
            <div className='flex '>
                
                <Button variant="outline" className=' border-2 bg-white p-4' onClick={copyLink}><Copy/>Copy Link</Button>
                <Button  onClick={handleSend} className='w-[50%] bg-purple-500'><Send/>Send</Button>
                
            </div>
            )}
            {viewDetail &&(
                <Link href={'/scheduled-interview/'+interview?.interview_id+"/details"} className='w-full'>
                <Button className='mt-5 w-full bg-white text-black border shadow'>View Detail <MoveRightIcon/> </Button>
                </Link>
            )}
            </div>

 
)
}

export default InterviewCard
