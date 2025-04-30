'use client'
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { SideBarOptions } from "@/services/Constant"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

  export default function AppSidebar() {
    const path =usePathname()
    return (
      <Sidebar className="w-[300px]">
        <SidebarHeader className="flex ">
            <Image src={'/log-removebg-preview.png'} alt="NeuraHire" width={200} height={200}/>
            <Button className="w-full mt-5 bg-purple-800"><Plus/>Create New Interview</Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup >
            {
                SideBarOptions.map((option,index)=>(
                    <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild >
                            <Link href={option.path} className={`p-5 ${path==option.path && 'bg-purple-200 '}  `}>
                            <option.icon className={`${path==option.path && 'text-blue-600'}`}/>
                            <span className={`text-2xl ${path==option.path && 'text-blue-600'}`}>{option.name}</span>
                            </Link>
                        </SidebarMenuButton>
                        
                    </SidebarMenuItem>
                ))
            }
          </SidebarGroup >
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  