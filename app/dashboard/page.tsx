'use client'

import { usePipelineStore } from '@/store/pipeline'
import StepIndicator from '@/components/pipeline/StepIndicator'
import SummaryInput from '@/components/pipeline/SummaryInput'
import ProblemSolution from '@/components/pipeline/ProblemSolution'
import TweetGenerator from '@/components/pipeline/TweetGenerator'
import TopicSelector from '@/components/pipeline/TopicSelector'
import ScriptViewer from '@/components/pipeline/ScriptViewer'

export default function Dashboard() {
  const { currentStep, completedSteps, profile } = usePipelineStore()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SummaryInput />
      case 2:
        return <SummaryInput />
      case 3:
        return <ProblemSolution />
      case 4:
        return <TweetGenerator />
      case 5:
        return <TopicSelector />
      case 6:
        return <ScriptViewer />
      default:
        return <SummaryInput />
    }
  }

  return (
    <div className="min-h-screen bg-[#05050a] grid-bg">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#05050a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8f135] to-[#a8d12a] flex items-center justify-center">
              <span className="text-[#05050a] font-black text-sm">V</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">ViralMind AI</h1>
              <p className="text-[10px] text-zinc-500">Content Pipeline</p>
            </div>
          </div>

          {profile && (
            <div className="hidden md:flex items-center gap-3 text-xs text-zinc-500">
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                👤 {profile.name}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                🏢 {profile.industry}
              </span>
            </div>
          )}

          <button
            onClick={() => usePipelineStore.getState().reset()}
            className="text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            ↻ Reset
          </button>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="max-w-5xl mx-auto px-4">
        <StepIndicator currentStep={currentStep} completedSteps={completedSteps} />
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="glass rounded-2xl p-6 md:p-8">
          {renderStep()}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-zinc-700 text-xs">
          ViralMind AI · Powered by Groq + Tavily · From Meeting Room to Viral Content
        </p>
      </footer>
    </div>
  )
}
