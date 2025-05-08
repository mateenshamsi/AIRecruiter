'use client'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import toast from 'react-hot-toast'
import InterviewLInk from './_components/InterviewLInk'

function CreateInterviews() {
  const router = useRouter()
  const [progress, setProgress] = React.useState(1)
  const [formData, setFormData] = React.useState({}) 
  const [interviewId,setInterviewId]=useState('')
  const handleInputChange = (field,value)=>{ 
    setFormData((prev)=>({...prev,[field]:value})) 
    console.log(formData)
  }
  const GoToNext=()=>{ 
    if(!formData?.jobPosition || !formData?.jobDescription || !formData?.interviewDuration || !formData?.interviewType) { 
      toast.error('Please fill all the fields')
      return 
    }
    setProgress((prev)=>prev+1)
  }
  const createInterviewLink = async(interview_id)=>{ 
    try{ 
        setInterviewId(interview_id)
        setProgress((prev)=>prev+1)

    }
    catch(err:any){ 
      toast.error('Error creating interview link', err) 
    } 
     

  } 

  return (
    <div className='mt-10 px-10 md:px-2 lg:px-44 xl:px-56 flex flex-col gap-5'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=>router.back()}/>
            <span className='text-lg font-bold '>Create New Interview</span>
            
        </div>
        <Progress value={progress*33} className='text-purple-200'/>
        {progress==1?<FormContainer handleInputChange={handleInputChange} GoToNext={GoToNext}/>:progress==2?<QuestionList formData={formData}  onCreateLink={(id)=>createInterviewLink(id)} />:progress==3?<div className='flex flex-col gap-5'>
         <InterviewLInk interview_id={interviewId} formData={formData}/></div>:null}
    </div>
  )
}

export default CreateInterviews