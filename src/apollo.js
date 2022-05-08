import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "authorization";
const DARK_MODE = "darkMode";

export const loggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const loginUser = (token) => {
  localStorage.setItem(TOKEN, token);
  loggedInVar(true);
};
export const logoutUser = () => {
  localStorage.removeItem(TOKEN);
  loggedInVar(false);
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

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
