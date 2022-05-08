import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  &::placeholder {
    font-size: 13px;
    font-weight: 600;
  }
  box-sizing: border-box;
  background-color: ${(props) => props.theme.inputBg};
`;
