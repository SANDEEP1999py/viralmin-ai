'use client'

import { usePipelineStore } from '@/store/pipeline'
import Loader from '@/components/ui/Loader'

const formatColors: Record<string, string> = {
  reel: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  post: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  carousel: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
}

const formatIcons: Record<string, string> = {
  reel: '🎬',
  post: '📝',
  carousel: '🎠',
}

export default function TopicSelector() {
  const {
    topics,
    selectedTopics,
    toggleTopic,
    profile,
    analysis,
    setScripts,
    setStep,
    markDone,
    isLoading,
    setLoading,
  } = usePipelineStore()

  if (!topics.length || !profile || !analysis) return null

  const handleGenerateScripts = async () => {
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic.')
      return
    }

    setLoading(true, 'Writing production-ready scripts for CEO & Influencer...')

    try {
      const selectedTopicData = selectedTopics.map((i) => ({
        title: topics[i].title,
        angle: topics[i].angle,
      }))

      const res = await fetch('/api/scripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ceoName: profile.name,
          industry: profile.industry,
          targetAudience: profile.targetAudience,
          smGoal: profile.smGoal,
          topics: selectedTopicData,
          problems: analysis.problems,
          solutions: analysis.solutions,
        }),
      })

      if (!res.ok) throw new Error('Script generation failed')

      const data = await res.json()
      setScripts(data.scripts)
      markDone(5)
      markDone(6)
      setStep(6)
    } catch (error) {
      console.error('Scripts error:', error)
      alert('Failed to generate scripts. Please try again.')
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
          Select <span className="text-[#c8f135]">Content Topics</span>
        </h2>
        <p className="text-zinc-500 text-sm">
          Pick up to 5 topics for script generation ·{' '}
          <span className="text-[#c8f135] font-medium">{selectedTopics.length} of 5</span> selected
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic, i) => {
          const isSelected = selectedTopics.includes(i)

          return (
            <button
              key={i}
              onClick={() => toggleTopic(i)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#c8f135]/10 border-[#c8f135]/40 shadow-[0_0_20px_rgba(200,241,53,0.15)]'
                  : 'bg-white/[0.03] border-white/[0.07] hover:border-white/15 hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        formatColors[topic.format] || 'bg-zinc-500/20 text-zinc-400'
                      }`}
                    >
                      {formatIcons[topic.format]} {topic.format}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold text-sm">{topic.title}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">{topic.angle}</p>
                  <p className="text-zinc-600 text-[11px]">💡 {topic.why}</p>
                </div>

                {/* Selection indicator */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                    isSelected
                      ? 'bg-[#c8f135] text-[#05050a]'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Generate Scripts CTA */}
      <button
        onClick={handleGenerateScripts}
        disabled={selectedTopics.length === 0}
        className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-[#c8f135] to-[#a8d12a] text-[#05050a] hover:shadow-[0_0_30px_rgba(200,241,53,0.4)] hover:scale-[1.01] active:scale-[0.99]"
      >
        Generate Scripts for {selectedTopics.length} Topic{selectedTopics.length !== 1 ? 's' : ''} →
      </button>
    </div>
  )
}
