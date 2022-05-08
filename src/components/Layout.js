import styled from "styled-components";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Main = styled.main`
  width: 100%;
`;

const Container = styled.div`
  padding: 80px 300px;
  @media screen and (max-width: 430px) {
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
