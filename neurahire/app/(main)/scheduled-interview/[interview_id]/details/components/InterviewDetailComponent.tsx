import { Calendar, Clock } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function InterviewDetailComponent({ interviewDetail }: { interviewDetail: any }) {
  console.log('Interview Detail:', interviewDetail)

  return (
    <div className='p-5 bg-white rounded-lg mt-5 border shadow-md'>
      <h2 className='text-xl font-bold'>{interviewDetail?.jobPosition}</h2>

      <div className='mt-4 flex justify-between items-center lg:pr-52'>
        <div>
          <h2 className='text-xs text-gray-500'>Duration</h2>
          <h2 className='flex text-md items-center gap-3 font-bold'>
            <Clock className='w-4 h-4' />
            {interviewDetail?.duration}
          </h2>
        </div>

        <div>
          <h2 className='text-xs text-gray-500'>Created On</h2>
          <h2 className='flex text-md font-bold items-center gap-3'>
            <Calendar className='w-4 h-4' />
            {moment(interviewDetail?.created_at).format('MMM DD YYYY')}
          </h2>
        </div>

        <div>
          <h2 className='text-xs text-gray-500'>Type</h2>
          <h2 className='flex text-md items-center gap-3 font-bold'>
            <Clock className='w-4 h-4' />
            {(() => {
              try {
                return interviewDetail?.type
                  ? JSON.parse(interviewDetail.type)[0]
                  : 'N/A'
              } catch {
                return 'Invalid'
              }
            })()}
          </h2>
        </div>
      </div>

      <div className='mt-5'>
        <h2 className='font-bold'>Job Description</h2>
        <p className='mt-2 text-sm leading-6'>{interviewDetail?.jobDescription}</p>
      </div>

      <div className='mt-5 '>
        <h2 className='font-bold'>Interview Questions</h2>
         <div className='grid grid-cols-1 md:grid-cols-2  gap-4 mt-2'>   
        {interviewDetail?.questionList?.length > 0 ? (
  interviewDetail.questionList.map(
    (questionObj: { question: string; type?: string }, index: number) => (
      <div key={index} className='mt-2 '>
        <h2 className='text-sm font-semibold'>
          {index + 1}. {questionObj.question}
        </h2>
      </div>
    )
  )
) : (
  <p className='text-sm text-gray-500 mt-2'>No questions available.</p>
)}
</div>
    
      </div>
    </div>
  )
}

export default InterviewDetailComponent
