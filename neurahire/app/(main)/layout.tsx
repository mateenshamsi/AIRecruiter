import React from 'react'
import DashboardProvider from './provider'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

function DashboardLayout({children}) {
  return (
    <div suppressHydrationWarning>   
      <DashboardProvider>
        <div className='p-20 w-full '>  
            <WelcomeContainer/>
            {children}
            </div>
      </DashboardProvider>
    </div>
  )
}

export default DashboardLayout