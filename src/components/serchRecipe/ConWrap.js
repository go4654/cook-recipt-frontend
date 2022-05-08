import styled from "styled-components";
import { Link } from "react-router-dom";
import { NO_IMG_URL } from "../../constants/constants";

const SConWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  row-gap: 40px;
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
    row-gap: 40px;
  }
`;

const Con = styled.div``;

const Bg = styled.div`
  height: 200px;
  border-radius: 20px;
`;

const CookTitle = styled.h3`
  margin-top: 15px;
  font-weight: 500;
`;

export const ConWrap = ({ recipeData }) => {
  console.log(recipeData);
  return (
    <SConWrap>
      {recipeData?.map((result) => (
        <Con key={result.id}>
          <Link to={`/show-recipe/${result.id}`}>
            <Bg
              style={{
                background: `url(${
                  result?.file ? result.file : NO_IMG_URL
                }) no-repeat center / cover`,
              }}
            />
            <CookTitle>{result.cookName}</CookTitle>
          </Link>
        </Con>
      ))}
    </SConWrap>
  );
};
