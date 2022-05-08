import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Loading } from "../components/Loading";
import { SeeRecipes } from "../components/seeRecipes/SeeRecipes";
import { HASHTAG_FRAGMENT, USER_FRAGMENT } from "../fragment";

const SEE_RECIPES_MUTATION = gql`
  query seeRecipes($lastId: Int) {
    seeRecipes(lastId: $lastId) {
      id
      user {
        ...UserFragment
      }
      cookName
      payload
      videoLink
      file
      hashtags {
        ...HashtagFragment
      }
    }
  }
  ${USER_FRAGMENT}
  ${HASHTAG_FRAGMENT}
`;

const Conatiner = styled.div``;

const Title = styled.h3`
  font-size: 30px;
  font-weight: 700;
`;

const ConWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 50px;
  @media screen and (max-width: 430px) {
    display: block;
  }
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
