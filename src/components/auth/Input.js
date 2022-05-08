import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  &::placeholder {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.6;
    letter-spacing: -1px;
  }
  box-sizing: border-box;
  background-color: ${(props) => props.theme.inputBg};
  letter-spacing: 1px;
`;
