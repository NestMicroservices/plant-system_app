export const CREATE_OPERATION = gql`
  mutation CreateOperation($input: CreateOperationInput!) {
    createOperation(createOperationInput: $input) {
      id
      name
    }
  }
`;
import { gql } from '@apollo/client';

export const UPDATE_OPERATION = gql`
  mutation UpdateOperation($input: UpdateOperationInput!) {
    updateOperation(updateOperationInput: $input) {
      id
      name
    }
  }
`;
