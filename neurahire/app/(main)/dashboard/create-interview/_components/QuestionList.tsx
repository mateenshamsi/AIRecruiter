import React, { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Loader, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { UserDetailContext } from '@/context/UserContext'
import { useUser } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid'
function QuestionList({ formData,onCreateLink }) {
    const [questionList, setQuestionList] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [saveLoading, setSaveLoading] = React.useState(false)
    const { user } = useUser()
    const interview_id = uuidv4()

    useEffect(() => {
        if (formData) {
            GenerateQuestionList()

        }
    }, [formData])
    const GenerateQuestionList = async () => {
        try {
            const res = await axios.post('/api/ai-model', {
                ...formData
            })
            console.log(res)
            const content = res.data.data
            const finalContent = content.replace('```json', '').replace('```', '')
            setQuestionList(JSON.parse(finalContent).interviewQuestions)
            setLoading(false)

        }
        catch (err: any) {
            toast.error('Error generating questions', err)
            setLoading(false)
        }
    }
    const onFinish = async () => {
        setSaveLoading(true)
        try {
            const { data, error } = await supabase.from('interview').insert({
                ...formData,
                questionList: questionList,
                userEmail: user?.email,
                interview_id: interview_id,
            }).select()
            console.log("D",data)
            setSaveLoading(false)
            onCreateLink(interview_id)
        }
        catch (err: any) {
            toast.error('Error creating interview link', err)
        }
        finally {
            setSaveLoading(false)
        }
    }
    return (
        <div className='flex flex-col gap-5 border border-purple-200 p-5 rounded-2xl mt-5'>
            {loading && <div className='bg-purple-300 rounded-2xl border border-purple-200 p-5 flex gap-5 items-center'>
                <Loader2Icon className='animate-spin' />
                <div className="">
                    <h2 className='text-sm'>Generating Questions...</h2>
                    <p className='text-xs'>This may take a few seconds</p>
                </div>

            </div>}
            {
                !loading && questionList.length > 0 ? questionList.map((question, index) => (
                    <div key={index} className='bg-purple-300 rounded-2xl border border-purple-500 p-5  gap-5 items-center'>
                        <h2 className='lg:text-lg text-md  '>{question.question}</h2>
                        <p className='md:text-lg  mt-2 '>Type:{question.type}</p>
                    </div>
                )) : !loading && <div className='bg-purple-300 rounded-2xl border border-purple-200 p-5 flex gap-5 items-center'>
                    <h2 className='text-md'>No Questions Found</h2>
                </div>
            }
            <div>
                <Button onClick={onFinish} className='w-full bg-purple-500 hover:bg-purple-200 hover:text-purple-500 '>
                    Create Interview Link & Finish
                </Button>
            </div>
            {saveLoading && <div className='bg-purple-300 rounded-2xl border border-purple-200 p-5 flex gap-5 items-center'>
                <Loader2Icon className='animate-spin' />
                <div className="">
                    <h2 className='text-sm'>Generating Interview Link...</h2>
                    <p className='text-xs'>This may take a few seconds</p>
                </div>
            </div>}
            {!setSaveLoading && <div className='bg-purple-300 rounded-2xl border border-purple-200 p-5 flex gap-5 items-center'>    
                </div>
            }
            
        </div>
        
    )}
            export default QuestionList