import { NextRequest, NextResponse } from 'next/server'
import { chatCompletion } from '@/lib/groq'
import { SCRIPTS_PROMPT } from '@/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const { ceoName, industry, targetAudience, smGoal, topics, problems, solutions } = await req.json()

    const prompt = SCRIPTS_PROMPT(ceoName, industry, targetAudience, smGoal, topics, problems, solutions)
    const text = await chatCompletion(prompt, 4096)

    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Scripts error:', error)
    return NextResponse.json(
      { error: 'Failed to generate scripts. Please try again.' },
      { status: 500 }
    )
  }
}
