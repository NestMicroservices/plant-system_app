import { gql } from '@apollo/client';

export const UPDATE_COST_CONFIG = gql`
  mutation UpdateCostConfig($input: UpdateCostConfigInput!) {
    updateCostConfig(updateCostConfigInput: $input) {
      id
      volume
      cost
    }
  }
`;
