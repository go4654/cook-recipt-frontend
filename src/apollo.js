import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const loggedInVar = makeVar(false);

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
