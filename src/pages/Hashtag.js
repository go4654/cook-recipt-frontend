import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../components/auth/Title";
import { Container } from "../components/Container";
import { Loading } from "../components/Loading";
import { NO_IMG_URL } from "../constants/constants";

const SEE_HASHTAG_QUERY = gql`
  query seeHashtags($hashtag: String!, $page: Int) {
    seeHashtags(hashtag: $hashtag, page: $page) {
      id
      recipe {
        id
        payload
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
`;

const TitleBg = styled.div`
  width: 200px;
  height: 200px;
  background-color: lightgray;
  border-radius: 50%;
  margin-right: 50px;
`;

const ConWrap = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  row-gap: 40px;
`;

const Con = styled.div``;

const Bg = styled.div`
  height: 200px;
  border-radius: 20px;
`;

const Text = styled.p`
  margin-top: 10px;
`;

export const Hashtag = () => {
  const { hashtag } = useParams();

  const { data, loading } = useQuery(SEE_HASHTAG_QUERY, {
    variables: {
      hashtag: `#${hashtag}`,
      page: 1,
    },
  });

  console.log(data);

  const bgUrl = data?.seeHashtags[0]?.recipe[0]?.file;

  return (
    <>
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
              {data?.seeHashtags?.map((hashtag) => (
                <Con key={hashtag.id}>
                  <Link to={`/show-recipe/${hashtag.id}`}>
                    <Bg
                      style={{
                        background: `url(${
                          hashtag.recipe[0].file
                            ? hashtag.recipe[0].file
                            : NO_IMG_URL
                        }) no-repeat center / cover`,
                      }}
                    />
                    <Text>{hashtag?.recipe[0]?.cookName}</Text>
                  </Link>
                </Con>
              ))}
            </ConWrap>
          </Container>
        </>
      )}
    </>
  );
};
