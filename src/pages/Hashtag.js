import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../components/auth/Title";
import { Container } from "../components/Container";
import { Loading } from "../components/Loading";
import { PageTitle } from "../components/PageTitle";
import { HashtagCon } from "../components/seeHashtag/HashtagCon";
import { NO_IMG_URL } from "../constants/constants";

const SEE_HASHTAG_QUERY = gql`
  query seeHashtags($hashtag: String!, $page: Int) {
    seeHashtags(hashtag: $hashtag, page: $page) {
      id
      recipe {
        id
        payload
        caption
        cookName
        file
        user {
          username
          nickName
        }
      }
    }
  }
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 40px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

const TitleBg = styled.div`
  width: 200px;
  height: 200px;
  background-color: lightgray;
  border-radius: 50%;
  margin-right: 50px;
  @media screen and (max-width: 450px) {
    margin-right: 0px;
    margin-bottom: 20px;
  }
`;

const ConWrap = styled.div`
  margin-top: 50px;
  padding-bottom: 50px;
`;

const Con = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  row-gap: 40px;
  overflow-y: hidden;
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    row-gap: 40px;
  }
`;

export const Hashtag = () => {
  const { hashtag } = useParams();

  const { data, fetchMore, refetch, loading } = useQuery(SEE_HASHTAG_QUERY, {
    variables: {
      hashtag: `#${hashtag}`,
    },
  });

  useEffect(() => {
    refetch();
  }, [hashtag, refetch]);

  const bgUrl = data?.seeHashtags[0]?.recipe[0]?.file;

  return (
    <>
      <PageTitle title="해시태그" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <TitleWrap>
              <TitleBg
                style={{
                  background: `url(${
                    bgUrl ? bgUrl : NO_IMG_URL
                  }) no-repeat center / cover`,
                }}
              />
              <Title title={`#${hashtag}`} />
            </TitleWrap>
            <ConWrap>
              <InfiniteScroll
                pageStart={0}
                dataLength={data?.seeHashtags?.length}
                next={() =>
                  fetchMore({
                    variables: {
                      page: data?.seeHashtags?.length,
                    },
                  })
                }
                hasMore={true}
                loader={loading ? <Loading /> : null}
              >
                <Con>
                  {data?.seeHashtags?.map((hashtag) => (
                    <HashtagCon key={hashtag.id} hashtag={hashtag} />
                  ))}
                </Con>
              </InfiniteScroll>
            </ConWrap>
          </Container>
        </>
      )}
    </>
  );
};
