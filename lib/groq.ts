import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function chatCompletion(prompt: string, maxTokens: number = 2048): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    // model: 'openai/gpt-oss-safeguard-20b',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
    response_format: { type: 'json_object' },
  })

  return completion.choices[0]?.message?.content || ''
}

export default groq
