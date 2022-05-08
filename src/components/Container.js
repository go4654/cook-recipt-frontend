import styled from "styled-components";

const SContainer = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

export const Container = ({ children }) => {
  return <SContainer>{children}</SContainer>;
};
