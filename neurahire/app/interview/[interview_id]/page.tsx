"use client"
import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import { Clock, Info, Loader2Icon, User, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/services/supabaseClient"
import { InterviewContext } from "@/context/InterviewContext"
import { UserDetailContext } from "@/context/UserContext"

function Interview() {
  const { interview_id } = useParams()
  const [interviewDetails, setInterviewDetails] = useState({
    jobPosition: "Full Stack Developer",
    jobDescription: "",
    duration: "30 Minutes",
    type: ""
  })
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const{interviewInfo,setInterviewInfo} = useContext(InterviewContext) 
  const { user } = useContext(UserDetailContext)
  const router = useRouter() 
  useEffect(() => {
    if (interview_id) {
      getInterviewDetails()
    }
  }, [interview_id])

  const getInterviewDetails = async () => {
    try {
      setIsLoading(true)
      const { data:interview, error } = await supabase
        .from('interview')
        .select('jobPosition, jobDescription, duration, type')
        .eq('interview_id', interview_id)
        .single()

      if (error) {
        console.error("Error fetching interview data:", error)
        return
      }

      if (interview) {
        console.log("Interview data:", interview)
        setInterviewDetails({
          jobPosition: interview.jobPosition || "Full Stack Developer",
          jobDescription: interview.jobDescription || "",
          duration: interview.duration || "30 Minutes",
          type: interview.type || ""
        })
      }


    } catch (err) {
      console.error("Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNameChange = (e) => {
    setUserName(e.target.value)
  }

  const handleJoin = async() => {
    setIsLoading(true)
    if (!userName.trim()) {
      alert("Please enter your name before joining")
      return
    }
    let {data:interview, error} = await supabase
      .from('interview').select('*')
      .eq('interview_id', interview_id)
    setIsLoading(false)
    console.log("Interview",interview)
    console.log("User",user)
    setInterviewInfo({
      
      userName:user?.name ,
      interviewData:interview
    })
    router.push(`/interview/${interview_id}/room`)
  }

  return (
    <div className="mt-16 md:px-28 px-10">
      <div className="flex flex-col justify-center border rounded-xl  items-center p-5 lg:px-48 xl:px-96">
        <Image src="/log.png" alt="logo" width={200} height={200} className="w-40 h-40" />

        {/* Main heading with gradient text */}
        <h1 className="font-bold text-2xl md:text-3xl tracking-tight mb-2">
          AI-Powered Interview Platform
        </h1>

        <Image src="/recruiter.png" alt="logo" width={400} height={400} className="w-80 h-80" />

        {/* Interview type with underline accent */}
        <h2 className="font-bold text-xl md:text-2xl text-gray-800 relative pb-2 mb-1">
          {interviewDetails?.jobPosition} Interview
        </h2>

        {/* Time indicator with enhanced styling */}
        <h2 className="flex items-center gap-2 text-gray-500 font-medium">
          <Clock className="h-4 w-4 text-purple-500" />
          <span>{interviewDetails?.duration}</span>
        </h2>

        <div className="mt-16 w-full">
          {/* Form label with improved styling */}
          <h2 className="text-gray-700 font-medium mb-1 text-sm tracking-wide">ENTER YOUR NAME</h2>
          <Input
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="Eg John Smith"
            className="bg-[#f0e6ff] border-2 border-[#c8b3e6] rounded-2xl p-2 mt-2 w-full focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          />
        </div>

        {/* Info box with enhanced styling */}
        <div className="p-5 bg-[#f0e6ff] rounded-xl mt-6 mb-6 w-full flex gap-5 shadow-sm">
          <Info className="h-5 w-5 mt-1 flex-shrink-0" />
          <div className="">
            <h2 className="font-semibold mb-2">Before you begin</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ensure you have a stable internet connection</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-500">•</span>
                <span>Test your camera and microphone</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-500">•</span>
                <span>Find a quiet place for interview</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Button with enhanced styling */}
        <Button 
          onClick={handleJoin}
          disabled={!userName.trim()}
          className="bg-purple-600 w-full hover:bg-purple-700 text-xl text-white font-medium px-3 py-2 h-auto rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
         {!isLoading&&<Video className="h-4 w-4" />}  {isLoading&&<Loader2Icon/>}Join Interview 
        </Button>
      </div>
    </div>
  )
}

export default Interview