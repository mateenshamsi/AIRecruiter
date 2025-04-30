import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'
import AppSideBar from './_components/AppSideBar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

function DashboardProvider({children}) {
  return (
    <div>
        <SidebarProvider>
            <AppSideBar/>
            <main className='w-full '>
                {/* <SidebarTrigger/>  */}
                
                {children}

            </main>
        </SidebarProvider>
    </div>
  )
}

export default DashboardProvider