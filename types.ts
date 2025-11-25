export interface OptimizationRequest {
  topic: string;
  currentTitle: string;
  currentDescription: string;
}

export interface AnalysisResult {
  score: number;
  critique: string;
  improvedTitles: string[];
  improvedDescriptions: string[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}