import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../routes";

const BtnWrap = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.mainColor};
  position: fixed;
  bottom: 60px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
  }
  &:hover a {
    transform: rotateZ(180deg) scale(2);
  }
`;

export const CreateBtn = () => {
  return (
    <BtnWrap>
      <Link to={routes.createRecipe}>
        <FontAwesomeIcon icon={faPlus} />
      </Link>
    </BtnWrap>
  );
};
