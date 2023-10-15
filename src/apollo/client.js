import { ApolloLink, HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { errorLink } from "./links/errorLink";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
  credentials: "include",
});

// Assemble the Apollo Client instance
export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
