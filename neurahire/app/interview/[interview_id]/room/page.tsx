"use client"

import { InterviewContext } from "@/context/InterviewContext"
import { UserDetailContext } from "@/context/UserContext"
import { Mic, Phone } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import Vapi from "@vapi-ai/web"
import AlertConfirmation from "./_components/AlertConfirmation"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabaseClient"
function InterviewRoom() {
  const { user } = React.useContext(UserDetailContext)
  const { interviewInfo, setInterviewInfo } = React.useContext(InterviewContext)
  const router = useRouter()
  // State
  const [conversation, setConversation] = useState(null)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const [isMute, setIsMute] = useState(false)
  const [conversationHistory, setConversationHistory] = useState([])
  
  // Refs to store latest conversation data (to avoid closure issues)
  const conversationRef = useRef(null)
  const conversationHistoryRef = useRef([])
  const vapiRef = useRef(null)

  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY)

      vapiRef.current.on("call-start", () => {
        toast.success("Call has started")
        console.log("Call started - preserving existing conversation data")
      })

      vapiRef.current.on("speech-start", () => {
        setIsUserSpeaking(false)
      })

      vapiRef.current.on("speech-end", () => {
        setIsUserSpeaking(true)
      })

      vapiRef.current.on("call-end", () => {
        toast.success("Call has ended")
        console.log("Call ended - conversation data at end:", conversationRef.current)
        console.log("Call ended - history at end:", conversationHistoryRef.current)
        
        setTimeout(() => {
          generateFeedback()
        }, 2000)
      })

      // Register message listener
      vapiRef.current.on("message", (message) => {
        console.log("Message received:", message)
        
        if (message.conversation) {
          console.log("Conversation updated:", message.conversation)
          
          // Update state
          setConversation(message.conversation)
          
          // Update ref immediately
          conversationRef.current = message.conversation
          
          // Store in history
          setConversationHistory(prev => {
            const updated = [...prev, message.conversation]
            conversationHistoryRef.current = updated
            console.log("Conversation history updated:", updated)
            return updated
          })
        } else {
          console.log("Message received but no conversation data:", message)
        }
      })
    }

    // Cleanup function
    return () => {
      if (vapiRef.current) {
        vapiRef.current.removeAllListeners()
      }
    }
  }, [])

  useEffect(() => {
    if (interviewInfo) {
      startCall()
    }
  }, [interviewInfo])

  const startCall = async () => {
    if (!vapiRef.current || !interviewInfo) return

    const questionList = interviewInfo.interviewData[0]?.questionList
      .map((q) => q.question)
      .join(", ")

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo.userName}, how are you? Ready for your interview on ${interviewInfo.interviewData[0].jobPosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo.interviewData[0].jobPosition} interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
`.trim(),
          },
        ],
      },
    }

    await vapiRef.current.start(assistantOptions)
  }

  const stopInterview = async () => {
    console.log("stopInterview called")
    await vapiRef.current?.stop()
    generateFeedback()
  }

  const toggleMute = async () => {
    if (!vapiRef.current) return

    if (isMute) {
      await vapiRef.current.setMuted(false)
      setIsMute(false)
      toast.success("Mic unmuted")
    } else {
      await vapiRef.current.setMuted(true)
      setIsMute(true)
      toast.success("Mic muted")
    }
  }

  const generateFeedback = async () => {
    console.log("Generating feedback...")
    
    // Use refs to get the most current data
    const currentConversation = conversationRef.current
    const currentHistory = conversationHistoryRef.current
    
    console.log("Current conversation (from ref):", currentConversation)
    console.log("Conversation history (from ref):", currentHistory)
    console.log("Current conversation (from state):", conversation)
    console.log("Conversation history (from state):", conversationHistory)
    
    // Use the most recent conversation or the full history
    const conversationToSend = currentConversation || (currentHistory && currentHistory.length > 0 ? currentHistory[currentHistory.length - 1] : null)
    
    if (!conversationToSend) {
      console.log("No conversation data available for feedback")
      console.log("Debugging - ref conversation:", conversationRef.current)
      console.log("Debugging - ref history:", conversationHistoryRef.current)
      console.log("Debugging - state conversation:", conversation)
      console.log("Debugging - state history:", conversationHistory)
      
      toast.error("No conversation data available for feedback")
      return
    }

    try {
      console.log("Sending conversation data to API:", conversationToSend)
      
      const res = await axios.post('/api/ai-feedback', {
        conversation: conversationToSend,
        conversationHistory: currentHistory
      })
      
      console.log("Feedback response:", res.data)
    console.log("Interview info for feedback:", interviewInfo)
  const { data, error } = await supabase
    .from('interview-feedback')
    .insert([
      {
        userName: interviewInfo.userName,
        userEmail: interviewInfo.userEmail,
        interview_id: interviewInfo.interview_id,
        feedback: res.data, // or JSON.stringify(res.data) if needed
      },
    ])
    .select()

  if (error) throw error;

  console.log("Inserted feedback data:", data)
  router.push(`interview`+interviewInfo.interview_id+"completed")

} catch (insertError) {
  console.error("Supabase insert error:", insertError)
  toast.error("Failed to save feedback to database")
}
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto px-4 py-8">
      <div className="w-full max-w-3xl bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Interview Room</h1>
          <p className="text-gray-600">
            {interviewInfo
              ? `Interview for ${interviewInfo.interviewData[0]?.jobPosition} position`
              : "Welcome to your interview session"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* AI Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full ${!isUserSpeaking ? "bg-purple-500/20 animate-pulse" : "bg-transparent"} transition-all duration-300`}
              ></div>
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image src="/ai.png" alt="AI Interviewer" fill className="object-cover" />
              </div>
              {!isUserSpeaking && (
                <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-full shadow-lg">
                  <Mic className="h-4 w-4" />
                </div>
              )}
            </div>
            <h3 className="mt-4 font-semibold text-gray-800">AI Recruiter</h3>
            <p className="text-sm text-gray-500">Interviewer</p>
          </div>

          {/* User Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full ${
                  isUserSpeaking ? "bg-green-500/20 animate-pulse" : "bg-transparent"
                } transition-all duration-300`}
              ></div>
              <div className="relative w-40 h-40 flex items-center justify-center rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-5xl font-bold">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              {isUserSpeaking && (
                <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full shadow-lg">
                  <Mic className="h-4 w-4" />
                </div>
              )}
            </div>
            <h3 className="mt-4 font-semibold text-gray-800">{user?.name || "User"}</h3>
            <p className="text-sm text-gray-500">Candidate</p>
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex justify-center space-x-6 mt-6">
          {/* Mute / Unmute */}
          <button
            onClick={toggleMute}
            className={`flex items-center justify-center w-14 h-14 ${
              isMute ? "bg-yellow-100 hover:bg-yellow-200" : "bg-gray-100 hover:bg-gray-200"
            } rounded-full shadow-md transition-colors duration-200`}
            aria-label="Toggle microphone"
          >
            <Mic className={`h-6 w-6 ${isMute ? "text-yellow-600" : "text-gray-700"}`} />
          </button>

          {/* End Call */}
          <AlertConfirmation stopInterview={stopInterview}>
            <div
              className="flex items-center justify-center w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full shadow-md transition-colors duration-200"
              aria-label="End call"
            >
              <Phone className="h-6 w-6 text-white" />
            </div>
          </AlertConfirmation>
        </div>

        {/* Interview Status */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {isMute
              ? "Your mic is muted"
              : isUserSpeaking
              ? "Your turn to speak"
              : "AI is speaking..."}
          </p>
        
        </div>
      </div>
    </div>
  )
}

export default InterviewRoom