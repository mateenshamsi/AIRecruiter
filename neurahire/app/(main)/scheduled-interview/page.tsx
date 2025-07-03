'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@/app/provider'
import { supabase } from '@/services/supabaseClient'
import InterviewCard from '@/app/(main)/dashboard/_components/InterviewCard'
import { Video, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Interview = {
  id: string
  jobPosition: string
  duration: string
  userEmail: string
  created_at: string
  interview_feedback: {
    userEmail: string
    feedback: string
    created_at: string
  }[]
}

function ScheduledInterview() {
  const { user } = useUser() as { user: { email: string } | null }
  const [interviewList, setInterviewList] = useState<Interview[]>([])

  useEffect(() => {
    if (user?.email) {
      getInterviews()
    }
  }, [user])

  const getInterviews = async () => {
    const res = await supabase
      .from('interview')
      .select(`
        id,
        jobPosition,
        duration,
        userEmail,
        created_at,
        interview_id,
        interview-feedback (
          userEmail,
          feedback,
          created_at
        )
      `)
      .eq('userEmail', user.email)
      .order('created_at', { ascending: false })

    console.log('scheduled interview', res)
    setInterviewList(res.data || [])
  }

  return (
    <div className="my-5">
      <h2 className="my-3 font-bold text-2xl">Scheduled Interviews</h2>

      {interviewList.length === 0 ? (
        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4">
          <Video className="text-gray-400 w-20 h-20 mx-auto" />
          <h2 className="text-lg font-bold text-center">
            No Interviews Created Yet
          </h2>
          <Button className="mt-5 bg-purple-800">
            <Plus className="mr-2" /> Create New Interview
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interviewList.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} viewDetail={true} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ScheduledInterview
