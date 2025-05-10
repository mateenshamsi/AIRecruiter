import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className=' border-b-2 border-gray-300 flex flex-col gap-5 '>
        <Image src={'/log.png'} alt='logo' width={200} height={200} className='w-40 h-40' />
        
    </div>
  )
}

export default InterviewHeader