import { CustomSocket } from '@/common/types/CustomSocket';

export enum ActionType {
  wait,
  exam,
}

export interface Student {
  id: number;
  on: ActionType;
  client: CustomSocket;
}
