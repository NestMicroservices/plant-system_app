import type { CostConfig } from './cost-config.interface';

export interface Operation {
  id: number;
  name: string;
  plantId: number;
  createdAt: Date;
  updatedAt: Date;

  costConfigs: CostConfig[];
}
