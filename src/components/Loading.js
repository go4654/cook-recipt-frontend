import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = () => {
  return (
    <Wrap>
      <ThreeDots color="orange" />
    </Wrap>
  );
};
