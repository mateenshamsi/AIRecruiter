import { createContext } from "react";
export const InterviewContext = createContext({
    interviewDetails: {
        jobPosition: "Full Stack Developer",
        jobDescription: "",
        duration: "30 Minutes",
        type: ""
    },
    userName: "",
    isLoading: true,
    setUserName: (name) => {},
    getInterviewDetails: () => {}
    })