export const ANALYZE_PROMPT = (
  summary: string,
  ceoName: string,
  industry: string,
  targetAudience: string,
  smGoal: string,
  researchContext: string
) => `
You are an elite social media strategist and business analyst. Your content will be used for a brand with ~15M followers—it must be sharp, original, and worthy of a top‑tier audience.

Analyze this CEO meeting summary for ${ceoName} in the ${industry} industry.

MEETING SUMMARY:
${summary}

LIVE RESEARCH CONTEXT (from internet):
${researchContext}

TARGET AUDIENCE: ${targetAudience}
SOCIAL MEDIA GOAL: ${smGoal}

Extract and generate:
1. A compelling 2‑line intro/hook about this business story—avoid clichés; make it provocative or unexpected.
2. Exactly 4 specific problems this business faces. These must be real, nuanced pain points a sophisticated business owner would instantly recognise. No generic “lack of time” or “budget constraints”. Dig into industry‑specific friction.
3. Exactly 4 matching solutions or opportunities. Back each with a concrete data point, research finding, or emerging trend from the live research context. Make them actionable and non‑obvious.
4. 3 relevant industry trends worth creating content about. Choose trends that are either:
   - Undiscovered (just gaining traction) OR
   - Counter‑intuitive (defying common wisdom)
   Provide a one‑sentence explanation for each trend.

RULES:
- Use the live research context to inject current, specific data (statistics, studies, news hooks) wherever possible.
- Be hyper‑specific to ${industry}—avoid generic business statements.
- Problems must be original, not the same three problems everyone talks about.
- Solutions must include a “why this works now” angle, referencing research.

Respond ONLY with this exact JSON structure, no other text:
{
  "intro": "two line compelling hook about this business",
  "problems": ["problem 1", "problem 2", "problem 3", "problem 4"],
  "solutions": ["solution 1", "solution 2", "solution 3", "solution 4"],
  "trends": ["trend 1", "trend 2", "trend 3"]
}
`;

export const TWEETS_PROMPT = (
  ceoName: string,
  industry: string,
  targetAudience: string,
  intro: string,
  problems: string[],
  solutions: string[],
  trends: string[]
) => `
You are a world‑class social media copywriter for accounts with 10M+ followers. Your tweets must feel original, provocative, and worthy of a premium brand.

Write 6 high‑engagement tweets for ${ceoName} in ${industry}.

BUSINESS CONTEXT:
Intro: ${intro}
Problems: ${problems.join(', ')}
Solutions: ${solutions.join(', ')}
Trends: ${trends.join(', ')}
Target audience: ${targetAudience}

Write exactly 6 tweets in these formats:

1. Contrarian Take — Challenge a widely accepted belief in ${industry} with a fresh, data‑backed perspective.
2. Hard Truth — An uncomfortable truth about ${industry} that most people avoid saying. Must be specific, not generic.
3. Question Hook — Starts with a question that stops the scroll. The question should imply a hidden insight or a counter‑intuitive angle.
4. Story Hook — Starts with “I” or a personal moment, but the story must reveal a business lesson that is not obvious.
5. Insight Thread Starter — Starts with “Thread:” and promises a mini‑analysis of a niche topic. Include a specific claim or data point.
6. Value Tip — A specific, actionable tip with numbers (e.g., “3 steps to…”) but make the tip unique to ${industry} and the research context.

RULES:
- Max 280 characters each.
- No generic advice—every tweet must tie to the problems, solutions, or trends above.
- Use line breaks for readability.
- Include 1–2 relevant hashtags, but avoid overused ones (e.g., #marketing). Prefer niche or branded tags.
- Each tweet must feel human and original—avoid AI‑fluff like “unlock your potential”.
- For the Contrarian Take and Hard Truth, include a subtle nod to a recent study or statistic if possible.

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
`;

export const TOPICS_PROMPT = (
  ceoName: string,
  industry: string,
  targetAudience: string,
  tweets: string[],
  problems: string[],
  solutions: string[]
) => `
You are a viral content strategist for top‑tier social media agencies. The content you plan will be viewed by millions—it must be innovative, format‑savvy, and deeply resonant.

Based on the business insights and tweet themes below, suggest 8 high‑engagement content topics for ${ceoName} in ${industry}.

TWEETS GENERATED:
${tweets.join('\n')}

BUSINESS PROBLEMS: ${problems.join(', ')}
SOLUTIONS: ${solutions.join(', ')}
TARGET AUDIENCE: ${targetAudience}

Generate 8 specific, actionable topics that would perform exceptionally well as reels, posts, or carousels.

RULES:
- Each topic must have a clear, scroll‑stopping title that teases a unique angle.
- Mix formats: some reels (fast‑paced, visual), some carousels (in‑depth, educational), some single posts (bold statement).
- Topics should be based on real pain points or aspirations of ${targetAudience}—but framed in an unexpected way.
- Avoid generic topics. Instead, use the specific problems and solutions to create topics like “Why [common solution] is actually hurting your [industry metric]” or “The $X million mistake most [target] make”.
- Each “why” must explain the engagement potential in terms of emotional resonance, shareability, or controversy.

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
`;

export const SCRIPTS_PROMPT = (
  ceoName: string,
  industry: string,
  targetAudience: string,
  smGoal: string,
  topics: { title: string; angle: string }[],
  problems: string[],
  solutions: string[]
) => `
You are a world‑class video script writer for top‑tier social media content (accounts with 15M+ followers). Your scripts must be cinematic, original, and tailored to two distinct high‑performance personas.

Write TWO complete scripts for EACH of the following ${topics.length} topic(s) for ${ceoName} in ${industry}.

TOPICS:
${topics.map((t, i) => `${i + 1}. "${t.title}" — Angle: ${t.angle}`).join('\n')}

BUSINESS CONTEXT:
Problems: ${problems.join(', ')}
Solutions: ${solutions.join(', ')}
Target audience: ${targetAudience}
Goal: ${smGoal}

FOR EACH TOPIC WRITE:

SCRIPT 1 — Businessman/CEO Style:
- Tone: Authoritative, experience‑driven, but not corporate. Speaks with the gravitas of a founder who has seen it all.
- Content: Shares a counter‑intuitive lesson, a hard‑earned insight, or a “I used to think X, but now I know Y” structure.
- Delivery: Calm, confident, no hype. Uses specific examples, numbers, or personal anecdotes.
- Speaks as the CEO/founder—every word should sound like it comes from a person who has built something substantial.

SCRIPT 2 — Influencer Style:
- Tone: Energetic, story‑driven, uses trending language but with substance. Avoids empty hype—each sentence adds value.
- Content: Emotional hooks, fast‑paced narrative, reveals a behind‑the‑scenes moment or a transformation.
- Delivery: High energy, but still credible. Uses dynamic edits, quick cuts, and relatable metaphors.
- Speaks as a content creator who understands both the business and the audience’s psychology.

EACH SCRIPT MUST HAVE:
- hook: The first 3 seconds—must stop the scroll with an unexpected statement, a visual surprise, or a provocative question.
- body: Full script content (60–90 seconds when spoken). Use line breaks for pacing. Incorporate at least one specific data point, case study, or research finding from the business context.
- cta: Strong, specific call to action. Not “follow for more”—instead, something like “Comment with your biggest [industry] challenge and I’ll break it down,” or “Save this to revisit the 3 steps later.”
- duration: Estimated video duration.

RULES:
- Scripts must feel completely different from each other in tone, pacing, and structure.
- Hooks must be under 15 words and should immediately create curiosity or emotional tension.
- Body must include concrete examples, numbers, or references to the live research context (if available).
- No generic filler sentences like “in today’s video we’re going to talk about…”.
- Write as if a real person will read this aloud—natural, with rhythm and pauses.

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
`;