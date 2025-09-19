import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_URL = "https://graphql-pokemon2.vercel.app";

const client = new ApolloClient({
    link: new HttpLink({ uri: GRAPHQL_URL, fetch }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    pokemon: {
                        keyArgs: ["name"],
                    },
                },
            },
        },
    }),
});

export default client;