import { useReactiveVar } from "@apollo/client";
import {
  faHome,
  faLightbulb,
  faMoon,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { darkModeVar, offDarkMode, onDarkMode } from "../apollo";
import { routes } from "../routes";

const SHeader = styled.header`
  width: 100%;
  height: 80px;
  position: ${(props) => props.pos};
  top: 0;
  left: 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  background-color: ${(props) => props.theme.bgColor};
  z-index: 10;
  /* box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px; */
  @media screen and (max-width: 430px) {
    height: 60px;
    padding: 0 20px;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.mainColor};
  @media screen and (max-width: 430px) {
    font-size: 16px;
  }
`;

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  margin-left: 30px;
`;

export const Header = () => {
  const darkMode = useReactiveVar(darkModeVar);
  const [fix, setFix] = useState("static");

  const handleScroll = () => {
    const sct = window.pageYOffset;
    if (sct >= 300) {
      setFix("fixed");
    } else {
      setFix("static");
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <SHeader pos={fix}>
      <Logo>
        <Link to={routes.home}>COOK RECIPE</Link>
      </Logo>
      <MenuWrap>
        <Menu>
          <Link to={routes.home}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </Menu>
        <Menu>
          <Link to={routes.search}>
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </Menu>
        <Menu>
          <button
            style={{ cursor: "pointer" }}
            onClick={darkMode ? offDarkMode : onDarkMode}
          >
            {darkMode ? (
              <FontAwesomeIcon icon={faLightbulb} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </button>
        </Menu>
        <Menu>
          <Link to={routes.editProfile}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </Menu>
      </MenuWrap>
    </SHeader>
  );
};
