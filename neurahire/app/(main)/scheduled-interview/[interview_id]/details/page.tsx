'use client'
import { supabase } from '@/services/supabaseClient'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useUser } from '@/app/provider'
import InterviewDetailComponent from './components/InterviewDetailComponent'
import CandidateList from './components/CandidateList'
function InterviewDetails() {
  const {interview_id} = useParams() 
  const {user} = useUser() as { user: { email: string } | null }
  const [interviewDetail, setInterviewDetail] = React.useState(null)
  useEffect
(() => {
    if (user?.email) {
      getInterviewDetail()
    }
  }, [user])
  const getInterviewDetail = async()=>{
    const res = await supabase.from('interview') 
        .select(`
            id,
            jobPosition,
            jobDescription,
            type,
            duration,
            questionList,
            userEmail,
            created_at,
            interview-feedback (
            userEmail,
            userName,
            feedback,
            created_at
            )
        `)
        .eq('userEmail',user?.email)
        .eq('interview_id', interview_id)
    console.log('Interview Detail:', res)
    if (res.error) {
      console.error('Error fetching interview details:', res.error)
      return null
    }
    setInterviewDetail(res?.data[0])
    console.log(res)    
}
    return (
    <div className='mt-5'>
        <h2 className='font-bold'>Interview Detail</h2>
        <InterviewDetailComponent interviewDetail={interviewDetail}/>
       <CandidateList interviewFeedback={interviewDetail?.['interview-feedback'] || []} />

    </div>
  )
}

export default InterviewDetails