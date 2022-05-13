import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/public/createUploadLink";
import { DARK_MODE, TOKEN } from "./constants/constants";

export const loggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const loginUser = (token) => {
  localStorage.setItem(TOKEN, token);
  loggedInVar(true);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN);
  loggedInVar(false);
  window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const onDarkMode = () => {
  localStorage.setItem(DARK_MODE, "on");
  darkModeVar(true);
};

export const offDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

// const httpLink = createHttpLink({
//   uri: "http://192.168.0.10:4000/graphql",
// });

const uploadLink = createUploadLink({
  uri: "http://192.168.0.10:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem(TOKEN)
        ? localStorage.getItem(TOKEN)
        : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeRecipes: {
            keyArgs: false,
            merge(existing = [], incoming = []) {
              return [...existing, ...incoming];
            },
          },
          seeHashtags: {
            keyArgs: false,
            merge(existing = [], incoming = []) {
              return [...existing, ...incoming];
            },
          },
        },
        // seeUser: {
        //   keyArgs: false,
        //   merge(existing = [], incoming = []) {
        //     return [...existing, ...incoming];
        //   },
        // },
      },
    },
  }),
});
