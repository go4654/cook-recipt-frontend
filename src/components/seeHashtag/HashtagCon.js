import { Link } from "react-router-dom";
import styled from "styled-components";
import { NO_IMG_URL } from "../../constants/constants";

const Con = styled.div``;

const Bg = styled.div`
  height: 200px;
  border-radius: 20px;
`;

const Text = styled.p`
  margin-top: 10px;
  font-weight: 500;
`;

export const HashtagCon = ({ hashtag }) => {
  return (
    <Con key={hashtag.id}>
      <Link to={`/show-recipe/${hashtag.id}`}>
        <Bg
          style={{
            background: `url(${
              hashtag.recipe[0].file ? hashtag.recipe[0].file : NO_IMG_URL
            }) no-repeat center / cover`,
          }}
        />
        <Text>{hashtag?.recipe[0]?.cookName}</Text>
      </Link>
    </Con>
  );
};
