import { client } from '../../services/graphql/apollo-client';
import {
  CREATE_COST_CONFIG,
  UPDATE_COST_CONFIG,
} from './graphql/mutations/cost.mutation';
import {
  UPDATE_OPERATION,
  CREATE_OPERATION,
} from './graphql/mutations/operation.mutation';

import { PLANT_BY_ID, PLANTS } from './graphql/queries/plant.query';
import type { CostConfig } from './graphql/types/cost-config.interface';
import type { Plant } from './graphql/types/plant.inteface';

export class PlantClient {
  static async fetchPlants(): Promise<Plant[]> {
    const { data } = await client.query<{ plants: Plant[] }>({ query: PLANTS });
    return data?.plants ?? [];
  }

  static async fetchPlantById(id: number): Promise<Plant | null> {
    const { data } = await client.query<{ plantById: Plant | null }>({
      query: PLANT_BY_ID(id),
    });
    return data?.plantById ?? null;
  }

  static async updateCostConfig(
    id: number,
    cost: number
  ): Promise<CostConfig | null> {
    const { data } = await client.mutate<{ updateCostConfig: CostConfig }>({
      mutation: UPDATE_COST_CONFIG,
      variables: {
        input: { id, cost },
      },
    });
    return data?.updateCostConfig ?? null;
  }

  static async updateOperation(
    id: number,
    name: string
  ): Promise<{ id: number; name: string } | null> {
    const { data } = await client.mutate<{
      updateOperation: { id: number; name: string };
    }>({
      mutation: UPDATE_OPERATION,
      variables: {
        input: { id, name },
      },
    });
    return data?.updateOperation ?? null;
  }

  static async createOperation(
    plantId: number,
    name: string
  ): Promise<{ id: number; name: string } | null> {
    const { data } = await client.mutate<{
      createOperation: { id: number; name: string };
    }>({
      mutation: CREATE_OPERATION,
      variables: {
        input: { plantId, name },
      },
    });
    return data?.createOperation ?? null;
  }

  static async createCostConfig(
    operationId: number,
    volume: number,
    cost: number
  ): Promise<CostConfig | null> {
    const { data } = await client.mutate<{ createCostConfig: CostConfig }>({
      mutation: CREATE_COST_CONFIG,
      variables: {
        input: { operationId, volume, cost },
      },
    });
    return data?.createCostConfig ?? null;
  }
}
