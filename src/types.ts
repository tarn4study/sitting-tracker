/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TaskType = 'work' | 'read' | 'game' | 'relax';
export type SittingStatus = 'sitting' | 'standing';

export interface Session {
  id: string;
  task: TaskType;
  duration: number; // in seconds
  timestamp: number;
  status: SittingStatus;
}
