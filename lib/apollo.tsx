import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

const createClient = (ctx: NextPageContext) =>
    new ApolloClient({
        uri: 'http://localhost:3001/graphql',
        cache: new InMemoryCache(),
    });

export const withApollo = createWithApollo(createClient);