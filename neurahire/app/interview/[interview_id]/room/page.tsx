"use client"

import { InterviewContext } from "@/context/InterviewContext"
import { UserDetailContext } from "@/context/UserContext"
import { Mic, Phone } from "lucide-react"
import Image from "next/image"
import React, { useEffect } from "react"
import Vapi from "@vapi-ai/web"
import AlertConfirmation from "./_components/AlertConfirmation"
import toast from "react-hot-toast"

function InterviewRoom() {
  const { user } = React.useContext(UserDetailContext)
  const { interviewInfo, setInterviewInfo } = React.useContext(InterviewContext)
  const [isUserSpeaking, setIsUserSpeaking] = React.useState(false)
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY as string)

  useEffect(() => {
    console.log("Interview", interviewInfo)
    interviewInfo && startCall()
  }, [interviewInfo])

  const startCall = async () => {
    let questionList = ""
    interviewInfo?.interviewData[0]?.questionList.forEach(
      (item, index) =>
        (questionList =
          questionList +
          item.question +
          (index === interviewInfo?.interviewData[0]?.questionList?.length - 1 ? "" : ", ")),
    )

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData[0].jobPosition}?`,
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
"Hey there! Welcome to your ${interviewInfo?.interviewData[0].jobPosition} interview. Let's get started with a few questions!"
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

    vapi.start(assistantOptions)
  }

  const stopInterview = async () => {
    await vapi.stop()
  }

  vapi.on("call-start", () => {
    toast.success("Call has started")
  })

  vapi.on("speech-start", () => {
    setIsUserSpeaking(false)
  })

  vapi.on("speech-end", () => {
    setIsUserSpeaking(true)
  })

  vapi.on("call-end", () => {
    toast.success("Call has ended")
    setInterviewInfo(null)
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto px-4 py-8">
      <div className="w-full max-w-3xl bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Interview Room</h1>
          <p className="text-gray-600">
            {interviewInfo
              ? `Interview for ${interviewInfo?.interviewData[0]?.jobPosition} position`
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
                className={`absolute inset-0 rounded-full ${isUserSpeaking ? "bg-green-500/20 animate-pulse" : "bg-transparent"} transition-all duration-300`}
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
          <button
            className="flex items-center justify-center w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full shadow-md transition-colors duration-200"
            aria-label="Mute microphone"
          >
            <Mic className="h-6 w-6 text-gray-700" />
          </button>

          <AlertConfirmation stopInterview={stopInterview}>
            <button
              className="flex items-center justify-center w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full shadow-md transition-colors duration-200"
              aria-label="End call"
            >
              <Phone className="h-6 w-6 text-white" />
            </button>
          </AlertConfirmation>
        </div>

        {/* Interview Status */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">{isUserSpeaking ? "Your turn to speak" : "AI is speaking..."}</p>
        </div>
      </div>
    </div>
  )
}

export default InterviewRoom
