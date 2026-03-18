import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        search_depth: 'basic',
        max_results: 5,
        include_answer: true,
      }),
    })

    const data = await response.json()

    const context = data.results
      ?.map((r: { title: string; content: string }) => `${r.title}: ${r.content}`)
      .join('\n\n')
      .slice(0, 2000)

    return NextResponse.json({ context: context || '' })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ context: '' })
  }
}
