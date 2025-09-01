import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { envs } from '../../config/envs';

export const client = new ApolloClient({
  link: new HttpLink({ uri: envs.GRAPHQL_API_URL }), // Replace '' with your GraphQL endpoint
  cache: new InMemoryCache(),
});
