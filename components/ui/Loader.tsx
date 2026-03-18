'use client'

export default function Loader({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-[#c8f135]/20 border-t-[#c8f135] animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-b-[#00e5ff]/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      {message && (
        <p className="text-sm text-zinc-400 animate-pulse max-w-xs text-center">
          {message}
        </p>
      )}
    </div>
  )
}
