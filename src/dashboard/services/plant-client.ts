import { client } from '../../services/graphql/apollo-client';
import { PLANTS } from './graphql/queries/plant.query';
import type { Plant } from './graphql/types/plant.inteface';

export class PlantClient {
  static async fetchPlants(): Promise<Plant[]> {
    const { data } = await client.query<{ plants: Plant[] }>({ query: PLANTS });
    return data?.plants ?? [];
  }
}
