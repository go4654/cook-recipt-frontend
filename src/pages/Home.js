import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Loading } from "../components/Loading";
import { SeeRecipes } from "../components/seeRecipes/SeeRecipes";
import { USER_FRAGMENT } from "../fragment";
import { Container } from "../components/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollTop } from "../components/ScrollTop";
import { routes } from "../routes";
import { useEffect } from "react";
import { PageTitle } from "../components/PageTitle";

const SEE_RECIPES_QUERY = gql`
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
    }
  }
  ${USER_FRAGMENT}
`;

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
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data, fetchMore, refetch, loading } = useQuery(SEE_RECIPES_QUERY);
  useEffect(() => {
    if (state?.message) {
      scrollTop();
      navigate(routes.home, { replace: true });
    }
    refetch();
  }, [state, navigate, refetch]);

  return (
    <Container>
      <>
        <PageTitle title={"Home"} />
        {loading ? (
          <Loading />
        ) : (
          <>
            <Title>레시피를 확인해 보아요!</Title>
            {data?.seeRecipes ? (
              <InfiniteScroll
                pageStart={0}
                dataLength={data?.seeRecipes?.length}
                next={() =>
                  fetchMore({
                    variables: {
                      lastId: data?.seeRecipes?.length,
                    },
                  })
                }
                hasMore={true}
                loader={loading ? <Loading /> : null}
              >
                <ConWrap>
                  <SeeRecipes recipe={data?.seeRecipes} />
                </ConWrap>
              </InfiniteScroll>
            ) : null}
          </>
        )}
      </>
    </Container>
  );
};
