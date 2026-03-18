import { create } from 'zustand'
import { PipelineState, CEOProfile, AnalysisOutput, Tweet, Topic, ScriptPair } from '@/types'

interface PipelineStore extends PipelineState {
  setStep: (step: number) => void
  markDone: (step: number) => void
  setProfile: (profile: CEOProfile) => void
  setAnalysis: (analysis: AnalysisOutput) => void
  setTweets: (tweets: Tweet[]) => void
  setTopics: (topics: Topic[]) => void
  toggleTopic: (index: number) => void
  setScripts: (scripts: ScriptPair[]) => void
  setLoading: (loading: boolean, message?: string) => void
  setSessionId: (id: string) => void
  reset: () => void
}

const initialState: PipelineState = {
  currentStep: 1,
  completedSteps: [],
  profile: null,
  analysis: null,
  tweets: [],
  topics: [],
  selectedTopics: [],
  scripts: [],
  sessionId: null,
  isLoading: false,
  loadingMessage: '',
}

export const usePipelineStore = create<PipelineStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  markDone: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
    })),

  setProfile: (profile) => set({ profile }),
  setAnalysis: (analysis) => set({ analysis }),
  setTweets: (tweets) => set({ tweets }),
  setTopics: (topics) => set({ topics }),

  toggleTopic: (index) =>
    set((state) => {
      const selected = [...state.selectedTopics]
      const i = selected.indexOf(index)
      if (i === -1 && selected.length < 5) selected.push(index)
      else if (i !== -1) selected.splice(i, 1)
      return { selectedTopics: selected }
    }),

  setScripts: (scripts) => set({ scripts }),
  setLoading: (isLoading, loadingMessage = '') => set({ isLoading, loadingMessage }),
  setSessionId: (sessionId) => set({ sessionId }),
  reset: () => set(initialState),
}))
