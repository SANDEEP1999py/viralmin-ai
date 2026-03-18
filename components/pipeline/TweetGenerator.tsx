'use client'

import { usePipelineStore } from '@/store/pipeline'
import CopyButton from '@/components/ui/CopyButton'
import Loader from '@/components/ui/Loader'

const styleColors: Record<string, string> = {
  'Contrarian Take': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Hard Truth': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Question Hook': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Story Hook': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Insight Thread Starter': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Value Tip': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
}

export default function TweetGenerator() {
  const { tweets, profile, analysis, setTopics, setStep, markDone, isLoading, setLoading } = usePipelineStore()

  if (!tweets.length || !profile || !analysis) return null

  const handleGenerateTopics = async () => {
    setLoading(true, 'Generating high-engagement content topics...')

    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ceoName: profile.name,
          industry: profile.industry,
          targetAudience: profile.targetAudience,
          tweets: tweets.map((t) => t.text),
          problems: analysis.problems,
          solutions: analysis.solutions,
        }),
      })

      if (!res.ok) throw new Error('Topic generation failed')

      const data = await res.json()
      setTopics(data.topics)
      markDone(4)
      setStep(5)
    } catch (error) {
      console.error('Topics error:', error)
      alert('Failed to generate topics. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return <Loader message={usePipelineStore.getState().loadingMessage} />
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">
          Your <span className="text-[#c8f135]">Viral Tweets</span>
        </h2>
        <p className="text-zinc-500 text-sm">6 engagement-optimized tweets ready to post</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tweets.map((tweet, i) => (
          <div
            key={i}
            className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/15 transition-all duration-300 hover:bg-white/[0.05] space-y-3"
          >
            {/* Style badge */}
            <div className="flex items-center justify-between">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  styleColors[tweet.style] || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
                }`}
              >
                {tweet.style}
              </span>
              <CopyButton text={tweet.text} />
            </div>

            {/* Tweet text */}
            <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-line">{tweet.text}</p>

            {/* Engagement tags */}
            <div className="flex flex-wrap gap-1.5">
              {tweet.engagementTags.map((tag, j) => (
                <span
                  key={j}
                  className="px-2 py-0.5 rounded-md bg-[#c8f135]/10 text-[#c8f135] text-[10px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Copy all */}
      <div className="flex justify-center">
        <CopyButton
          text={tweets.map((t) => `[${t.style}]\n${t.text}\n`).join('\n')}
          label="Copy All Tweets"
        />
      </div>

      {/* Generate Topics CTA */}
      <button
        onClick={handleGenerateTopics}
        className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#c8f135] to-[#a8d12a] text-[#05050a] hover:shadow-[0_0_30px_rgba(200,241,53,0.4)] hover:scale-[1.01] active:scale-[0.99]"
      >
        Suggest Content Topics →
      </button>
    </div>
  )
}
