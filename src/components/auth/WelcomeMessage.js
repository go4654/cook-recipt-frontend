import styled from "styled-components";

const SWelcomeMessage = styled.span`
  color: ${(props) => props.theme.mainColor};
  font-size: 14px;
  font-weight: 600;
  margin: 0px 0 30px 0;
`;

export const WelcomeMessage = ({ message }) => {
  return <SWelcomeMessage>{message}</SWelcomeMessage>;
};
