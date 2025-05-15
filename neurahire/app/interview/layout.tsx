'use client'
import React from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { Inter } from 'next/font/google'
import { InterviewContext } from '@/context/InterviewContext'

function InterviewLayout({children}: { children: React.ReactNode }) {
  const [interviewInfo, setInterviewInfo] = React.useState()
  return (
    <InterviewContext.Provider value={{interviewInfo,setInterviewInfo}}>
    <div > 
        <InterviewHeader/>
        {children} 
    </div>
    </InterviewContext.Provider>

  )
}

export default InterviewLayout