export enum UniverseStage {
  INTRO = 'INTRO',
  FATE = 'FATE',
  CHAOS = 'CHAOS',
  HOPE = 'HOPE',
  REAL = 'REAL'
}

export interface Memory {
  id: number;
  text: string;
  x: number;
  y: number;
}

export interface UserState {
  name: string;
  destinyBelief: boolean | null;
}