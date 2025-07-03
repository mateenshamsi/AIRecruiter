import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { FEEDBACK_PROMPT } from "@/services/Constant";
export async function POST(req: NextRequest) {
  try {
    const { conversation } = await req.json();

    // Safeguard: Ensure there's valid input
    if (!conversation || conversation.length === 0) {
      return NextResponse.json({ error: "Conversation is empty" }, { status: 400 });
    }

    const FINAL_PROMPT =FEEDBACK_PROMPT?.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY1 || "",
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        {
          role: "system",
          content: "You are an AI that gives helpful feedback on job application forms.",
        },
        {
          role: "user",
          content: FINAL_PROMPT || JSON.stringify(conversation),
        }
      ],
    });

    const content = completion.choices[0]?.message?.content || "No feedback generated";

    return NextResponse.json({ content });
  } catch (err: any) {
    console.error("Error generating feedback:", err);
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
}
