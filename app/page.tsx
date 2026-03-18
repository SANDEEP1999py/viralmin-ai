'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#05050a] grid-bg flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[#c8f135]/5 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-[#00e5ff]/5 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#8b5cf6]/3 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8 animate-slideUp">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c8f135] to-[#a8d12a] flex items-center justify-center shadow-[0_0_40px_rgba(200,241,53,0.3)] animate-glow">
            <span className="text-[#05050a] font-black text-2xl">V</span>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            From Meeting Room
            <br />
            to <span className="gradient-text">Viral Content.</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
            Transform business conversations into tweets, topics, and production-ready scripts — automatically.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-[#c8f135]" />
            6-Step Pipeline
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
            Dual Scripts
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
            AI-Powered
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4 pt-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#c8f135] to-[#a8d12a] text-[#05050a] hover:shadow-[0_0_40px_rgba(200,241,53,0.5)] hover:scale-[1.03] active:scale-[0.98]"
          >
            Launch Pipeline →
          </button>
          <p className="text-zinc-600 text-xs">
            No account needed · Free to use · Powered by Groq AI
          </p>
        </div>

        {/* Tech badges */}
        <div className="flex items-center justify-center gap-3 pt-8">
          {['Groq', 'Tavily', 'Next.js', 'Firebase'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] text-zinc-600 text-[10px] font-medium uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05050a] to-transparent" />
    </div>
  )
}
