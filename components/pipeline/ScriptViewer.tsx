'use client'

import { usePipelineStore } from '@/store/pipeline'
import CopyButton from '@/components/ui/CopyButton'

export default function ScriptViewer() {
  const { scripts } = usePipelineStore()

  if (!scripts.length) return null

  const allScriptsText = scripts
    .map(
      (s) =>
        `=== ${s.topic} ===\n\n[CEO Script]\nHook: ${s.bizScript.hook}\n${s.bizScript.body}\nCTA: ${s.bizScript.cta}\nDuration: ${s.bizScript.duration}\n\n[Influencer Script]\nHook: ${s.infScript.hook}\n${s.infScript.body}\nCTA: ${s.infScript.cta}\nDuration: ${s.infScript.duration}`
    )
    .join('\n\n---\n\n')

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">
          Production-Ready <span className="text-[#c8f135]">Scripts</span>
        </h2>
        <p className="text-zinc-500 text-sm">
          {scripts.length} topic{scripts.length !== 1 ? 's' : ''} · 2 scripts each · Ready to film
        </p>
      </div>

      {scripts.map((scriptPair, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
        >
          {/* Topic header */}
          <div className="px-6 py-4 bg-gradient-to-r from-[#c8f135]/10 to-transparent border-b border-white/[0.07]">
            <h3 className="text-white font-bold">{scriptPair.topic}</h3>
          </div>

          {/* Side-by-side scripts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.07]">
            {/* CEO Script */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                    CEO / Businessman
                  </h4>
                </div>
                <CopyButton
                  text={`Hook: ${scriptPair.bizScript.hook}\n\n${scriptPair.bizScript.body}\n\nCTA: ${scriptPair.bizScript.cta}`}
                />
              </div>

              {/* Hook */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                  🎬 Hook (First 3 seconds)
                </p>
                <p className="text-white font-semibold text-sm">{scriptPair.bizScript.hook}</p>
              </div>

              {/* Body */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Script Body</p>
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                  {scriptPair.bizScript.body}
                </p>
              </div>

              {/* CTA */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  📣 Call to Action
                </p>
                <p className="text-[#c8f135] text-sm font-medium">{scriptPair.bizScript.cta}</p>
              </div>

              <p className="text-zinc-600 text-xs">⏱ {scriptPair.bizScript.duration}</p>
            </div>

            {/* Influencer Script */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#00e5ff]">
                    Influencer / Creator
                  </h4>
                </div>
                <CopyButton
                  text={`Hook: ${scriptPair.infScript.hook}\n\n${scriptPair.infScript.body}\n\nCTA: ${scriptPair.infScript.cta}`}
                />
              </div>

              {/* Hook */}
              <div className="p-3 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#00e5ff] mb-1">
                  🎬 Hook (First 3 seconds)
                </p>
                <p className="text-white font-semibold text-sm">{scriptPair.infScript.hook}</p>
              </div>

              {/* Body */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Script Body</p>
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                  {scriptPair.infScript.body}
                </p>
              </div>

              {/* CTA */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  📣 Call to Action
                </p>
                <p className="text-[#00e5ff] text-sm font-medium">{scriptPair.infScript.cta}</p>
              </div>

              <p className="text-zinc-600 text-xs">⏱ {scriptPair.infScript.duration}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Copy all scripts */}
      <div className="flex justify-center pb-8">
        <CopyButton text={allScriptsText} label="Copy All Scripts" />
      </div>

      {/* Start Over button */}
      <div className="flex justify-center pb-12">
        <button
          onClick={() => usePipelineStore.getState().reset()}
          className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
        >
          ↻ Start New Pipeline
        </button>
      </div>
    </div>
  )
}
