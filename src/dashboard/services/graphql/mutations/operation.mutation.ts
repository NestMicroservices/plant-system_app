import { gql } from '@apollo/client';

export const UPDATE_OPERATION = gql`
  mutation UpdateOperation($input: UpdateOperationInput!) {
    updateOperation(updateOperationInput: $input) {
      id
      name
    }
  }
`;
