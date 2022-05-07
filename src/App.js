import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, loggedInVar } from "./apollo";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Signup } from "./pages/SIgnup";
import { routes } from "./routes";
import { darkTheme, GlobalStyled, lightTheme } from "./styles/style";
import { client } from "./apollo";

function App() {
  const loggedIn = useReactiveVar(loggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyled />
        <HelmetProvider>
          <Router>
            <Routes>
              <Route
                path={routes.home}
                element={loggedIn ? <Home /> : <Login />}
              />
              <Route
                path={routes.signup}
                element={loggedIn ? <Home /> : <Signup />}
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
