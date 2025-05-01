'use client'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import toast from 'react-hot-toast'

function CreateInterviews() {
  const router = useRouter()
  const [progress, setProgress] = React.useState(1)
  const [formData, setFormData] = React.useState({}) 
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
  return (
    <div className='mt-10 px-10 md:px-2 lg:px-44 xl:px-56 flex flex-col gap-5'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=>router.back()}/>
            <span className='text-lg font-bold'>Create New Interview</span>
            
        </div>
        <Progress value={progress*33} className='text-purple-200'/>
        {progress==1?<FormContainer handleInputChange={handleInputChange} GoToNext={GoToNext}/>:progress==2?<QuestionList>2</QuestionList>:<div>3</div>}
    </div>
  )
}

export default CreateInterviews