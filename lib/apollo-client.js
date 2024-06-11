import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let client;

/**
 * getApolloClient
 * @returns {ApolloClient} - An instance of ApolloClient
 */
export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 * @returns {ApolloClient} - A new instance of ApolloClient
 */
export function _createApolloClient() {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://musmula.nenad-kozoder.rs/graphql",
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Language: {
          keyFields: ["locale", "slug"], // Polja koja zaista postoje u vašim podacima
        },
      },
    }),
  });

  // Dodajemo interval za obnavljanje keša svakih 5000 sekundi (5 sekundi)
  setInterval(() => {
    client.resetStore();
  }, 5000);

  return client;
}
