import styled from "styled-components";

const SFooter = styled.footer`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

export const Footer = () => {
  return (
    <SFooter>
      <span>&copy; PNcoding {new Date().getFullYear()}</span>
    </SFooter>
  );
};
