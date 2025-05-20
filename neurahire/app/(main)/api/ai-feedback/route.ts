
import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req:NextRequest){
       const {conversation} = await req.json() 
       const FINAL_PROMPT = process.env.FEEDBACK_PROMPT?.replace('{{conversation}}',JSON.stringify(conversation))
       try{
            const openai = new OpenAI({
                       baseURL: "https://openrouter.ai/api/v1",
                       apiKey: process.env.OPENROUTER_API_KEY|| "",
                });
                 const completion = await openai.chat.completions.create({
                        
                 })
        }
        catch(err:any){
            
        }
}