'use client'

import { useState } from 'react'
import { usePipelineStore } from '@/store/pipeline'
import Loader from '@/components/ui/Loader'

export default function SummaryInput() {
  const { setProfile, setAnalysis, setStep, markDone, isLoading, setLoading } = usePipelineStore()
  const [form, setForm] = useState({
    name: '',
    industry: '',
    targetAudience: '',
    smGoal: '',
    summary: '',
  })

  const handleSubmit = async () => {
    if (!form.summary.trim() || !form.name.trim() || !form.industry.trim()) return

    setLoading(true, 'Searching the internet for industry insights...')

    try {
      // Step 1: Search the web for context
      const searchRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `${form.industry} trends challenges ${form.targetAudience} 2024 2025`,
        }),
      })
      const { context } = await searchRes.json()

      setLoading(true, 'AI is analyzing your summary and generating insights...')

      // Step 2: Analyze with Groq
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: form.summary,
          ceoName: form.name,
          industry: form.industry,
          targetAudience: form.targetAudience,
          smGoal: form.smGoal,
          researchContext: context,
        }),
      })

      if (!analyzeRes.ok) throw new Error('Analysis failed')

      const analysis = await analyzeRes.json()

      setProfile({
        name: form.name,
        industry: form.industry,
        targetAudience: form.targetAudience,
        smGoal: form.smGoal,
        summary: form.summary,
      })
      setAnalysis(analysis)
      markDone(1)
      markDone(2)
      setStep(3)
    } catch (error) {
      console.error('Pipeline error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return <Loader message={usePipelineStore.getState().loadingMessage} />
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">
          Start Your <span className="text-[#c8f135]">Content Pipeline</span>
        </h2>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">
          Paste your meeting summary and business details. Our AI will research, analyze, and generate viral content for you.
        </p>
      </div>

      {/* Input fields grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">CEO / Business Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., John Doe / Acme Corp"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#c8f135]/50 focus:shadow-[0_0_15px_rgba(200,241,53,0.1)] transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Industry</label>
          <input
            type="text"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            placeholder="e.g., Real Estate, SaaS, Healthcare"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#c8f135]/50 focus:shadow-[0_0_15px_rgba(200,241,53,0.1)] transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Target Audience</label>
          <input
            type="text"
            value={form.targetAudience}
            onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
            placeholder="e.g., Small business owners, tech professionals"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#c8f135]/50 focus:shadow-[0_0_15px_rgba(200,241,53,0.1)] transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Social Media Goal</label>
          <input
            type="text"
            value={form.smGoal}
            onChange={(e) => setForm({ ...form, smGoal: e.target.value })}
            placeholder="e.g., Brand awareness, lead generation"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#c8f135]/50 focus:shadow-[0_0_15px_rgba(200,241,53,0.1)] transition-all"
          />
        </div>
      </div>

      {/* Summary textarea */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Meeting + Research Summary
        </label>
        <textarea
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          placeholder="Paste your full meeting summary here... Include discussion topics, pain points, business context, industry observations, and any research notes."
          rows={8}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#c8f135]/50 focus:shadow-[0_0_15px_rgba(200,241,53,0.1)] transition-all resize-none"
        />
        <p className="text-xs text-zinc-600">
          {form.summary.length} characters · Tip: The more detail you provide, the better the content quality.
        </p>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!form.summary.trim() || !form.name.trim() || !form.industry.trim()}
        className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-[#c8f135] to-[#a8d12a] text-[#05050a] hover:shadow-[0_0_30px_rgba(200,241,53,0.4)] hover:scale-[1.01] active:scale-[0.99]"
      >
        Analyze & Research →
      </button>
    </div>
  )
}
