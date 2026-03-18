export const ANALYZE_PROMPT = (
  summary: string,
  ceoName: string,
  industry: string,
  targetAudience: string,
  smGoal: string,
  researchContext: string
) => `
You are an expert social media strategist and business analyst.

Analyze this CEO meeting summary for ${ceoName} in the ${industry} industry.

MEETING SUMMARY:
${summary}

LIVE RESEARCH CONTEXT (from internet):
${researchContext}

TARGET AUDIENCE: ${targetAudience}
SOCIAL MEDIA GOAL: ${smGoal}

Extract and generate:
1. A compelling 2-line intro/hook about this business story
2. Exactly 4 specific problems this business faces (clear, relatable, industry-specific)
3. Exactly 4 matching solutions or opportunities (actionable, backed by research)
4. 3 relevant industry trends worth creating content about

RULES:
- Use the live research context to make content current and relevant
- Be specific to ${industry}, not generic
- Problems must be real pain points a business owner relates to
- Solutions must be practical and content-worthy

Respond ONLY with this exact JSON structure, no other text:
{
  "intro": "two line compelling hook about this business",
  "problems": ["problem 1", "problem 2", "problem 3", "problem 4"],
  "solutions": ["solution 1", "solution 2", "solution 3", "solution 4"],
  "trends": ["trend 1", "trend 2", "trend 3"]
}
`

export const TWEETS_PROMPT = (
  ceoName: string,
  industry: string,
  targetAudience: string,
  intro: string,
  problems: string[],
  solutions: string[],
  trends: string[]
) => `
You are a world-class social media copywriter specializing in viral business content.

Write 6 high-engagement tweets for ${ceoName} in ${industry}.

BUSINESS CONTEXT:
Intro: ${intro}
Problems: ${problems.join(', ')}
Solutions: ${solutions.join(', ')}
Trends: ${trends.join(', ')}
Target audience: ${targetAudience}

Write exactly 6 tweets in these formats:
1. Contrarian Take — challenge a common belief in ${industry}
2. Hard Truth — something most people avoid saying
3. Question Hook — starts with a question that stops the scroll
4. Story Hook — starts with "I" or a personal moment
5. Insight Thread Starter — starts a thread with "Thread:"
6. Value Tip — a specific actionable tip with numbers

RULES:
- Max 280 characters each
- No generic advice — be industry-specific
- Use line breaks for readability
- Include 1–2 relevant hashtags per tweet
- Make each one feel human, not AI-generated

Respond ONLY with this exact JSON, no other text:
{
  "tweets": [
    {
      "text": "tweet text here",
      "style": "Contrarian Take",
      "engagementTags": ["hook", "bold"]
    }
  ]
}
`

export const TOPICS_PROMPT = (
  ceoName: string,
  industry: string,
  targetAudience: string,
  tweets: string[],
  problems: string[],
  solutions: string[]
) => `
You are a viral content strategist for social media agencies.

Based on the business insights and tweet themes below, suggest 8 high-engagement content topics for ${ceoName} in ${industry}.

TWEETS GENERATED:
${tweets.join('\\n')}

BUSINESS PROBLEMS: ${problems.join(', ')}
SOLUTIONS: ${solutions.join(', ')}
TARGET AUDIENCE: ${targetAudience}

Generate 8 specific, actionable topics that would perform well as reels, posts, or carousels.

RULES:
- Each topic must have a clear, scroll-stopping title
- Mix formats: some reels, some carousels, some posts
- Topics should be based on real pain points or aspirations of ${targetAudience}
- Avoid generic topics — make them specific to ${industry}
- Each "why" should explain the engagement potential clearly

Respond ONLY with this exact JSON, no other text:
{
  "topics": [
    {
      "title": "specific topic title",
      "angle": "the hook or angle to take",
      "format": "reel",
      "why": "why this will engage the audience"
    }
  ]
}
`

export const SCRIPTS_PROMPT = (
  ceoName: string,
  industry: string,
  targetAudience: string,
  smGoal: string,
  topics: { title: string; angle: string }[],
  problems: string[],
  solutions: string[]
) => `
You are a world-class video script writer for social media content.

Write TWO complete scripts for EACH of the following ${topics.length} topic(s) for ${ceoName} in ${industry}.

TOPICS:
${topics.map((t, i) => `${i + 1}. "${t.title}" — Angle: ${t.angle}`).join('\\n')}

BUSINESS CONTEXT:
Problems: ${problems.join(', ')}
Solutions: ${solutions.join(', ')}
Target audience: ${targetAudience}
Goal: ${smGoal}

FOR EACH TOPIC WRITE:

SCRIPT 1 — Businessman/CEO Style:
- Tone: Professional, authoritative, experience-driven
- Shares real business insight and hard-won knowledge
- Credible, direct, no fluff
- Speaks as the CEO/founder

SCRIPT 2 — Influencer Style:
- Tone: Energetic, story-driven, relatable, trending language
- Emotional hooks, personal story angle
- Fast-paced, highly shareable
- Speaks as a content creator

EACH SCRIPT MUST HAVE:
- hook: The first 3 seconds — must stop the scroll immediately
- body: Full script content (60–90 seconds when spoken)
- cta: Strong call to action at the end
- duration: Estimated video duration

RULES:
- Scripts must feel completely different from each other in tone
- Use line breaks in body for readability
- Hooks must be punchy — under 15 words
- CTAs must be specific, not generic ("Follow for more" is NOT acceptable)
- Write as if a real person will read this aloud

Respond ONLY with this exact JSON, no other text:
{
  "scripts": [
    {
      "topic": "topic title",
      "bizScript": {
        "hook": "first 3 seconds hook",
        "body": "full script body with line breaks",
        "cta": "specific call to action",
        "duration": "60–75 seconds"
      },
      "infScript": {
        "hook": "first 3 seconds hook",
        "body": "full script body with line breaks",
        "cta": "specific call to action",
        "duration": "60–75 seconds"
      }
    }
  ]
}
`
