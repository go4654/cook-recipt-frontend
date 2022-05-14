import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import { LOGO_URL } from "../constants/constants";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Loader = styled.div`
  max-width: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 20px;
  }
  @media screen and (max-width: 500px) {
    max-width: 50%;
    width: 100%;
  }
`;

export const Loading = () => {
  return (
    <Wrap>
      <Loader>
        <img src={LOGO_URL} alt="logo" />
        <ThreeDots color="orange" />
      </Loader>
    </Wrap>
  );
};
