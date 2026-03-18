import { NextRequest, NextResponse } from 'next/server'
import { chatCompletion } from '@/lib/groq'
import { ANALYZE_PROMPT } from '@/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const { summary, ceoName, industry, targetAudience, smGoal, researchContext } = await req.json()

    const prompt = ANALYZE_PROMPT(summary, ceoName, industry, targetAudience, smGoal, researchContext)
    const text = await chatCompletion(prompt, 1024)

    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Analyze error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze summary. Please try again.' },
      { status: 500 }
    )
  }
}
