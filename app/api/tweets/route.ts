import { NextRequest, NextResponse } from 'next/server'
import { chatCompletion } from '@/lib/groq'
import { TWEETS_PROMPT } from '@/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const { ceoName, industry, targetAudience, intro, problems, solutions, trends } = await req.json()

    const prompt = TWEETS_PROMPT(ceoName, industry, targetAudience, intro, problems, solutions, trends)
    const text = await chatCompletion(prompt, 1024)

    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Tweets error:', error)
    return NextResponse.json(
      { error: 'Failed to generate tweets. Please try again.' },
      { status: 500 }
    )
  }
}
