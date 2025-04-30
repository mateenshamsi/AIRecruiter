'use client'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import FormContainer from './_components/FormContainer'

function CreateInterviews() {
  const router = useRouter()
  const [progress, setProgress] = React.useState(1)
  const [formData, setFormData] = React.useState({}) 
  const handleInputChange = (field,value)=>{ 
    setFormData((prev)=>({...prev,[field]:value})) 
    console.log(formData)
  }
  return (
    <div className='mt-10 px-10 md:px-2 lg:px-44 xl:px-56 flex flex-col gap-5'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=>router.back()}/>
            <span className='text-lg font-bold'>Create New Interview</span>
            
        </div>
        <Progress value={progress*33} className='text-purple-200'/>
        <FormContainer handleInputChange={handleInputChange}/>
    </div>
  )
}

export default CreateInterviews