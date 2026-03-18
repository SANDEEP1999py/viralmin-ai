'use client'

const steps = [
  { num: 1, label: 'Summary Input' },
  { num: 2, label: 'Analysis' },
  { num: 3, label: 'Tweets' },
  { num: 4, label: 'Topics' },
  { num: 5, label: 'CEO Script' },
  { num: 6, label: 'Influencer Script' },
]

export default function StepIndicator({
  currentStep,
  completedSteps,
}: {
  currentStep: number
  completedSteps: number[]
}) {
  return (
    <div className="w-full px-2 py-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.num)
          const isActive = currentStep === step.num
          const isPast = step.num < currentStep

          return (
            <div key={step.num} className="flex items-center flex-1 last:flex-none">
              {/* Step circle */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    isCompleted
                      ? 'bg-[#c8f135] text-[#05050a] shadow-[0_0_20px_rgba(200,241,53,0.4)]'
                      : isActive
                      ? 'bg-[#c8f135]/20 text-[#c8f135] border-2 border-[#c8f135] shadow-[0_0_25px_rgba(200,241,53,0.3)]'
                      : 'bg-white/5 text-zinc-500 border border-white/10'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.num
                  )}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-[#c8f135]/40 animate-ping" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium tracking-wide uppercase whitespace-nowrap ${
                    isActive
                      ? 'text-[#c8f135]'
                      : isCompleted || isPast
                      ? 'text-zinc-400'
                      : 'text-zinc-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-[2px] rounded-full overflow-hidden bg-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isPast || isCompleted
                        ? 'w-full bg-gradient-to-r from-[#c8f135] to-[#c8f135]/50'
                        : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
