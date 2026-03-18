import { NextRequest, NextResponse } from 'next/server'
import { chatCompletion } from '@/lib/groq'
import { TOPICS_PROMPT } from '@/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const { ceoName, industry, targetAudience, tweets, problems, solutions } = await req.json()

    const prompt = TOPICS_PROMPT(ceoName, industry, targetAudience, tweets, problems, solutions)
    const text = await chatCompletion(prompt, 1024)

    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Topics error:', error)
    return NextResponse.json(
      { error: 'Failed to generate topics. Please try again.' },
      { status: 500 }
    )
  }
}
