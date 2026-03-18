export interface CEOProfile {
  name: string
  industry: string
  targetAudience: string
  smGoal: string
  summary: string
}

export interface AnalysisOutput {
  intro: string
  problems: string[]
  solutions: string[]
  trends: string[]
}

export interface Tweet {
  text: string
  style: string
  engagementTags: string[]
}

export interface Topic {
  title: string
  angle: string
  format: 'reel' | 'post' | 'carousel'
  why: string
}

export interface Script {
  hook: string
  body: string
  cta: string
  duration: string
}

export interface ScriptPair {
  topic: string
  bizScript: Script
  infScript: Script
}

export interface PipelineState {
  currentStep: number
  completedSteps: number[]
  profile: CEOProfile | null
  analysis: AnalysisOutput | null
  tweets: Tweet[]
  topics: Topic[]
  selectedTopics: number[]
  scripts: ScriptPair[]
  sessionId: string | null
  isLoading: boolean
  loadingMessage: string
}
