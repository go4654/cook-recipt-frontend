import { Link } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { PageTitle } from "../components/PageTitle";
import { routes } from "../routes";

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  align-content: center;
  flex-direction: column;
  padding: 150px 20px;
`;

const moveIcon = keyframes`
  0%{
    transform: scale(0.1);
  }
  50%{
    transform: scale(1.5);
  }
  100%{
    transform: scale(1);
  }
`;

const Icon = styled.div`
  font-size: 100px;
  text-align: center;
  margin-bottom: 30px;
  animation: ${moveIcon} 0.5s 1 forwards;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  line-height: 2.8rem;
`;

const Desc = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 18px;
  a {
    color: royalblue;
    font-weight: 700;
    text-decoration: underline;
    font-style: italic;
  }
`;

export const NotFound = () => {
  return (
    <Wrap>
      <PageTitle title="Page not found" />
      <Icon>π€</Icon>
      <Title>
        νμ΄μ§λ₯Ό μ°Ύμμ μκ±°λ <br />
        λ‘κ·Έμμ λμμ΄μ..!
      </Title>
      <Desc>
        <Link to={routes.home}>νμΌλ‘</Link> λμκ°κΈ°
      </Desc>
    </Wrap>
  );
};
