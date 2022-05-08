import { Link } from "react-router-dom";
import styled from "styled-components";

const SBottomWrap = styled.div`
  margin-top: 30px;
  a {
    color: ${(props) => props.theme.mainColor};
    font-weight: 700;
    text-decoration: underline;
  }
`;

export const BottomWrap = ({ text, link, linkText }) => {
  return (
    <SBottomWrap>
      <span>
        {text} <Link to={link}> {linkText}</Link>
      </span>
    </SBottomWrap>
  );
};
