'use client'

import { usePipelineStore } from '@/store/pipeline'
import Loader from '@/components/ui/Loader'
import CopyButton from '@/components/ui/CopyButton'

export default function ProblemSolution() {
  const { analysis, profile, setStep, markDone, setTweets, isLoading, setLoading } = usePipelineStore()

  if (!analysis || !profile) return null

  const handleGenerateTweets = async () => {
    setLoading(true, 'Crafting viral tweets from your business insights...')

    try {
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ceoName: profile.name,
          industry: profile.industry,
          targetAudience: profile.targetAudience,
          intro: analysis.intro,
          problems: analysis.problems,
          solutions: analysis.solutions,
          trends: analysis.trends,
        }),
      })

      if (!res.ok) throw new Error('Tweet generation failed')

      const data = await res.json()
      setTweets(data.tweets)
      markDone(3)
      setStep(4)
    } catch (error) {
      console.error('Tweet error:', error)
      alert('Failed to generate tweets. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return <Loader message={usePipelineStore.getState().loadingMessage} />
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro highlight */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-r from-[#c8f135]/10 to-[#00e5ff]/10 border border-[#c8f135]/20">
        <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-[#c8f135] text-[#05050a] text-[10px] font-bold uppercase tracking-wider">
          Business Intro
        </div>
        <p className="text-white text-lg leading-relaxed mt-1">{analysis.intro}</p>
        <div className="mt-3">
          <CopyButton text={analysis.intro} label="Copy Intro" />
        </div>
      </div>

      {/* Problems & Solutions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problems */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            Problems Identified
          </h3>
          {analysis.problems.map((problem, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/[0.03] border-l-3 border-red-500/60 border border-white/5 hover:bg-white/[0.05] transition-all"
              style={{ borderLeftWidth: '3px' }}
            >
              <p className="text-zinc-300 text-sm leading-relaxed">{problem}</p>
            </div>
          ))}
        </div>

        {/* Solutions */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Solutions & Opportunities
          </h3>
          {analysis.solutions.map((solution, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/[0.03] border-l-3 border-emerald-500/60 border border-white/5 hover:bg-white/[0.05] transition-all"
              style={{ borderLeftWidth: '3px' }}
            >
              <p className="text-zinc-300 text-sm leading-relaxed">{solution}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trends */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
          Industry Trends
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.trends.map((trend, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-sm"
            >
              📈 {trend}
            </span>
          ))}
        </div>
      </div>

      {/* Generate Tweets CTA */}
      <button
        onClick={handleGenerateTweets}
        className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#c8f135] to-[#a8d12a] text-[#05050a] hover:shadow-[0_0_30px_rgba(200,241,53,0.4)] hover:scale-[1.01] active:scale-[0.99]"
      >
        Generate Viral Tweets →
      </button>
    </div>
  )
}
