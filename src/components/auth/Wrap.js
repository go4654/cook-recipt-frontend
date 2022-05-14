import styled from "styled-components";

const SWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Wrap = ({ children }) => {
  return <SWrap>{children}</SWrap>;
};
