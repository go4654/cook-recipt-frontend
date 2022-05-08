import { Link } from "react-router-dom";
import styled from "styled-components";
import { NO_IMG_URL } from "../../constants/constants";
import { routes } from "../../routes";

const Con = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 30px;
  padding-bottom: 20px;
`;

const Bg = styled.div`
  height: 400px;
  @media screen and (max-width: 430px) {
    height: 200px;
  }
`;

const CookName = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin: 15px 0 8px 0;
`;

const Username = styled.div`
  font-weight: 300;
  opacity: 0.7;
`;

export const SeeRecipes = ({ recipe }) => {
  return (
    <>
      {recipe.map((recipe) => (
        <Con key={recipe.id}>
          <Link to={`/show-recipe/${recipe.id}`}>
            <Bg
              style={{
                background: `url(${
                  recipe?.file ? recipe?.file : NO_IMG_URL
                }) no-repeat center / cover`,
              }}
            />
            <CookName>{recipe.cookName}</CookName>
            <Username>{recipe.user.nickName}</Username>
          </Link>
        </Con>
      ))}
    </>
  );
};
