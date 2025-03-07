import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://graphql.anilist.co', // Reemplaza con tu endpoint de GraphQL
    cache: new InMemoryCache(),
});

export default client;