import styled from "styled-components";

const SButton = styled.button`
  margin-top: 10px;
  width: 100%;
  background-color: ${(props) => props.theme.mainColor};
  padding: 15px 0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(255, 165, 0, 0.2) 0px 20px 25px -5px,
    rgba(255, 165, 0, 0.04) 0px 10px 10px -5px;
  color: white;
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => props.cursor};
  margin-bottom: 20px;
`;

export const Button = ({ cursor, opacity, text }) => {
  return (
    <SButton cursor={cursor} opacity={opacity}>
      {text}
    </SButton>
  );
};
