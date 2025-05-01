import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Helper function to get header lines
function getHeaderLines() {
    return [
        `"HTTP-Referer": "${process.env.NEXT_PUBLIC_APP_URL}"`,
        `"X-Title": "Your Application Name"` // Replace with your app name
    ];
}

export async function POST(req: NextRequest) {
    try {
        const {jobPosition, jobDescription, interviewDuration, interviewType} = await req.json()
        
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY|| "",

        });

        // Parse the request body

        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
                {
                    role: "user", content: `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: ${jobPosition}

Job Description:${jobDescription}

Interview Duration: ${interviewDuration}

Interview Type: ${interviewType}

📝 Your task:

Analyze the job description to identify key responsibilities, required skills, and expected experience.

Generate a list of interview questions depends on interview duration

Adjust the number and depth of questions to match the interviewXXXXXX duration.

Ensure the questions match the tone and structure of a real-life ${interviewType} interview.

🧩 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
 question:'',
 type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'
},{
...
}]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a ${jobPosition}  role`
                }
            ],
        })
        // Make your API call here
        // const response = await openai.chat.completions.create({...});
        console.log(completion.choices[0].message.content)
        // Return the response
        return NextResponse.json({ success: true,
data:completion.choices[0].message.content

        }, { status: 200 });
    } catch (error) {
        console.error('OpenAI API error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}