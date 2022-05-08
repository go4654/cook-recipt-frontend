import styled from "styled-components";

const STitle = styled.div`
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const Title = ({ title }) => {
  return <STitle>{title}</STitle>;
};
