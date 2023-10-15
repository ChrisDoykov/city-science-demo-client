import { onError } from "apollo-link-error";

// Link for improved Error Logging
export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    let errors = [];

    errors = graphQLErrors.filter(
      (err) => !errors.some((error) => error.message === err.message)
    );

    errors.forEach((error) => {
      const {
        message,
        locations,
        path,
        extensions: { code },
      } = error;

      const formattedMessage = `[GraphQL error]: [Code: ${code}]\nMessage: ${message}\nLocation: ${locations}\nPath: ${path}`;

      console.error(formattedMessage);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});
