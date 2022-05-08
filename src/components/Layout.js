import styled from "styled-components";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Main = styled.main`
  width: 100%;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 80px 0px;
  margin: 0 auto;
  @media screen and (max-width: 430px) {
    width: 100%;
    padding: 50px 20px;
  }
`;

export const Layout = ({ children }) => {
  return (
    <Main>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </Main>
  );
};
