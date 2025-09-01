import { client } from '../../services/graphql/apollo-client';
import { PLANT_BY_ID, PLANTS } from './graphql/queries/plant.query';
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
}
