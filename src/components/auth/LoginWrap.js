import styled from "styled-components";

export const LoginWrap = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 50px 20px;
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;
