import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidateList({ interviewFeedback }: { interviewFeedback: any[] }) {
  console.log('Interview Feedback:', interviewFeedback)
  
  return (
    <div className=''>
      <h2 className='font-bold mt-5'>Candidates</h2>
      <div className='mt-2 flex justify-between'>
        {!interviewFeedback || interviewFeedback.length === 0 ? (
          <p className='text-sm text-gray-500'>
            No candidates available for this interview.
          </p>
        ) : (
            
            interviewFeedback.map((feedback, index) => (
            <div>
            <div key={index} className='mt-1 flex items-center gap-2 '>
              <p className='text-xs  bg-purple-500 text-white  rounded-[50%] shadow-md w-fit p-4 border s'>
                {feedback.userName[0].toUpperCase() }
              </p>  <div className='ml-2'>
              <h2 className=' text-lg font-bold'>{feedback.userName}</h2>
           <p className='text-sm text-gray-500'>
  Completed On: {moment(feedback.created_at).format('MMM DD YYYY')}
</p>

              </div>
            </div>
         
            </div>
          ))
        )}
           <CandidateFeedbackDialog interviewFeedback={interviewFeedback} />
      </div>
    </div>
  )
}

export default CandidateList
