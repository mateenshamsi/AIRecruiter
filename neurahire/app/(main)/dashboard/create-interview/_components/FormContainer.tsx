'use client'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useState, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constant'
import { Button } from '@/components/ui/button'
import { Forward } from 'lucide-react'

function FormContainer({ handleInputChange,GoToNext}) {
    // Use useState without the type annotation in the component definition
    const [interviewType, setInterviewType] = useState('')
    
    useEffect(() => {
        if (interviewType) {
            handleInputChange('interviewType', interviewType)
        }
        
    }, [interviewType])
    const AddInterviewType = (type) => {
        const data =interviewType.includes(type) 
        if (!data){
            setInterviewType((prev) => [...prev, type.title]) 
        }
        else 
        { 
            setInterviewType((prev) => prev.filter((item) => item !== type))

        }
    }
    return (
        <div className='p-5 flex flex-col gap-2'>
            <div>
                <h2 className='text-sm'>Job Position</h2>
                <Input
                    type='text'
                    placeholder='e.g. FullStack Developer'
                    onChange={(e) => handleInputChange('jobPosition', e.target.value)}
                    className='w-full my-2 border border-black'
                />
            </div>
            
            <div className='mt-5'>
                <h2 className='text-sm'>Job Description</h2>
                <Textarea
                    placeholder='Enter Details'
                    onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                    className='w-full my-2 border h-[100px] border-black'
                />
            </div>
            
            <div className='mt-5'>
                <h2 className='text-sm'>Interview Duration</h2>
                <Select onValueChange={(value) => handleInputChange('interviewDuration', value)}>
                    <SelectTrigger className="w-full my-2 border border-black">
                        <SelectValue placeholder="15min" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5 Min">5 Min</SelectItem>
                        <SelectItem value="15 Min">15 Min</SelectItem>
                        <SelectItem value="30 Min">30 Min</SelectItem>
                        <SelectItem value="45 Min">45 Min</SelectItem>
                        <SelectItem value="60 Min">60 Min</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <div className='mt-5'>
                <h2 className='text-sm'>Interview Types</h2>
                <div className='flex flex-wrap gap-2'>
                    {InterviewType.map((type, index) => {
                        // Use client-side only comparison with useEffect
                        return (
                            <div
                                key={index}
                                onClick={() => AddInterviewType(type)}
                                className={`flex items-center gap-2 my-2 p-2 px-4 border rounded-full hover:cursor-pointer
                                    ${interviewType.includes(type.title)
                                        ? 'bg-purple-500 text-amber-50 border-purple-500'
                                        : 'bg-purple-100 border-purple-500 hover:bg-purple-500 hover:text-amber-50'
                                    }
                                `}
                            >
                                {typeof type.icon === 'function' && <type.icon className='text-2xl' />}
                                <span>{type.title}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='mt-5' onClick={()=>GoToNext()}>
                    <Button className='w-full bg-purple-500 hover:bg-purple-200 hover:text-purple-500 '>Get Questions<Forward/></Button>
            </div>
        </div>
    )
}

export default FormContainer