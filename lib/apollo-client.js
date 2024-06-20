import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://wpres.studiomusmula.rs/graphql",
    }),
    cache: new InMemoryCache(),
  });
}

const cache = new InMemoryCache({
  typePolicies: {
    Language: {
      keyFields: ["SR", "EN"],
    },
  },
});

// const refreshInterval = 0.5 * 60 * 1000;

// // Definisanje funkcije za osvežavanje keša
// export function refreshCache() {
//   console.log("cache refresh");
//   client.resetStore();
// }

// // Postavljanje intervala za osvežavanje keša
// setInterval(refreshCache, refreshInterval);
