import React from 'react'
import InterviewHeader from './_components/InterviewHeader'

function InterviewLayout({children}: { children: React.ReactNode }) {
  return (
    <div>
        <InterviewHeader/>
        {children} 
    </div>
  )
}

export default InterviewLayout