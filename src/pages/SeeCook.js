import { gql, useQuery } from "@apollo/client";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";
import { Loading } from "../components/Loading";
import { NO_IMG_URL } from "../constants/constants";
import { HASHTAG_FRAGMENT, USER_FRAGMENT } from "../fragment";

const SEE_COOK_QUERY = gql`
  query seeCook($id: Int!) {
    seeCook(id: $id) {
      id
      user {
        ...UserFragment
      }
      cookName
      payload
      caption
      videoLink
      file
      hashtags {
        ...HashtagFragment
      }
      createdAt
    }
  }
  ${USER_FRAGMENT}
  ${HASHTAG_FRAGMENT}
`;

const Title = styled.h3`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
`;

const Bg = styled.img``;

const ConWrap = styled.div`
  margin-top: 50px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px 0;
`;

const RecipeTitle = styled.h4`
  font-size: 24px;
  font-weight: 500;
`;

const Catpion = styled.div`
  margin-top: 20px;
  font-size: 18px;
  line-height: 1.6rem;
  a {
    color: royalblue;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Payload = styled.pre`
  margin-top: 20px;
  font-size: 18px;
  line-height: 1.6rem;
`;

const YoutubeLink = styled.div`
  margin-top: 50px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px 0;
  font-style: italic;
  a {
    color: royalblue;
    text-decoration: underline;
  }
`;

export const SeeCook = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(SEE_COOK_QUERY, {
    variables: {
      id: +id,
    },
  });

  // console.log(data);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        data?.seeCook && (
          <Container>
            <Title>{data?.seeCook?.cookName}</Title>
            <Bg src={data?.seeCook?.file ? data?.seeCook?.file : NO_IMG_URL} />

            <ConWrap>
              <RecipeTitle>{data?.seeCook?.cookName}</RecipeTitle>
              <Catpion>
                {data?.seeCook?.caption?.split(" ").map((word, index) =>
                  /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
                    <Fragment key={index}>
                      <Link to={`/hashtag/${word.slice(1)}`}>{word}</Link>{" "}
                    </Fragment>
                  ) : (
                    <Fragment key={index}>{word} </Fragment>
                  )
                )}
              </Catpion>
              <Payload>{data?.seeCook?.payload}</Payload>
              <YoutubeLink>
                <span>유튜브 링크: </span>
                <a href={data?.seeCook?.videoLink}>
                  {" "}
                  {data?.seeCook?.videoLink}
                </a>
              </YoutubeLink>
            </ConWrap>
          </Container>
        )
      )}
    </div>
  );
};
