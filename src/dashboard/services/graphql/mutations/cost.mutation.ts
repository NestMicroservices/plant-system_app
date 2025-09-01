
export const CREATE_COST_CONFIG = gql`
  mutation CreateCostConfig($input: CreateCostConfigInput!) {
    createCostConfig(createCostConfigInput: $input) {
      id
      volume
      cost
    }
  }
`;
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
