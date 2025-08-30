import { gql } from '@apollo/client';

export const PLANTS = gql`
  query {
    plants {
      id
      name
    }
  }
`;
