import { gql } from '@apollo/client';

export const PLANTS = gql`
  query {
    plants {
      id
      name
    }
  }
`;

export const PLANT_BY_ID = (id: number) => gql`
  query {
    plantById(id: ${id}) {
      id
      name
      volumes
      operations {
        id
        name
        costConfigs {
          id
          volume
          cost
        }
      }
    }
  }
`;
