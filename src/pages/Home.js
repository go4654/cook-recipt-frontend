import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Loading } from "../components/Loading";
import { SeeRecipes } from "../components/seeRecipes/SeeRecipes";

const SEE_RECIPES_MUTATION = gql`
  query seeRecipes($lastId: Int) {
    seeRecipes(lastId: $lastId) {
      id
      user {
        id
        username
        nickName
      }
      cookName
      payload
      videoLink
      file
      hashtags {
        id
        hashtag
      }
    }
  }
`;

const Conatiner = styled.div``;

const Title = styled.h3`
  font-size: 30px;
  font-weight: 700;
`;

const ConWrap = styled.div`
  margin-top: 20px;
`;

export const Home = () => {
  const { data, loading } = useQuery(SEE_RECIPES_MUTATION, {
    // variables: {
    //   lastId: 4,
    // },
  });
  console.log(data);

  return (
    <Conatiner>
      <Title>레시피를 확인해 보아요!</Title>
      <ConWrap>
        {loading ? <Loading /> : <SeeRecipes recipe={data?.seeRecipes} />}
      </ConWrap>
    </Conatiner>
  );
};
