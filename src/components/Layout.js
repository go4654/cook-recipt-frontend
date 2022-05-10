import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CreateBtn } from "./CreateBtn";
import { EditBtn } from "./EditBtn";
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
  const { pathname } = useLocation();
  const urlName = pathname.split("/")[1];

  return (
    <Main>
      <Header />
      <Container>{children}</Container>
      {urlName === "show-recipe" ? <EditBtn /> : <CreateBtn />}
      <Footer />
    </Main>
  );
};
