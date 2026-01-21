
export interface TechLanguage {
  name: string;
  description: string;
  role: string;
  color: string;
}

export enum FlowStep {
  IDLE = 'IDLE',
  REQUESTING = 'REQUESTING',
  PROCESSING = 'PROCESSING',
  RETRIEVING = 'RETRIEVING',
  COMPLETING = 'COMPLETING'
}

export interface GameScenario {
  id: number;
  task: string;
  correct: 'frontend' | 'backend';
  explanation: string;
}
