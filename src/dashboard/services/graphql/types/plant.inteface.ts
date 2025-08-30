import type { Operation } from './operation.interface';

export interface Plant {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  operations: Operation[];
}
