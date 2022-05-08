import styled from "styled-components";

const SErrorMessage = styled.span`
  color: crimson;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const ErrorMessage = ({ message }) => {
  return <SErrorMessage>{message}</SErrorMessage>;
};
