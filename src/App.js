import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, loggedInVar } from "./apollo";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Signup } from "./pages/Signup";
import { routes } from "./routes";
import { darkTheme, GlobalStyled, lightTheme } from "./styles/style";
import { client } from "./apollo";
import { Layout } from "./components/Layout";
import { Search } from "./pages/Search";
import { EditProfile } from "./pages/EditProfile";
import { SeeCook } from "./pages/SeeCook";
import { Hashtag } from "./pages/Hashtag";

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
                element={
                  loggedIn ? (
                    <Layout>
                      <Home />
                    </Layout>
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path={routes.signup}
                element={
                  loggedIn ? (
                    <Layout>
                      <Home />
                    </Layout>
                  ) : (
                    <Signup />
                  )
                }
              />

              {loggedIn ? (
                <>
                  <Route
                    path={routes.search}
                    element={
                      <Layout>
                        <Search />
                      </Layout>
                    }
                  />
                  <Route
                    path={routes.editProfile}
                    element={
                      <Layout>
                        <EditProfile />
                      </Layout>
                    }
                  />
                  <Route
                    path={routes.detail}
                    element={
                      <Layout>
                        <SeeCook />
                      </Layout>
                    }
                  />
                  <Route
                    path={routes.hashtag}
                    element={
                      <Layout>
                        <Hashtag />
                      </Layout>
                    }
                  />
                </>
              ) : (
                <Route path={routes.home} element={<Login />} />
              )}

              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
