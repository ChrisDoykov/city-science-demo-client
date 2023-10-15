import { ApolloLink, HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { errorLink } from "./links/errorLink";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
  credentials: "include",
});

// Assemble the Apollo Client instance
export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
