import { gql, useQuery } from "@apollo/client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { Title } from "../components/auth/Title";
import { Container } from "../components/Container";
import { Loading } from "../components/Loading";
import { ConWrap } from "../components/serchRecipe/ConWrap";

export const SEARCH_RECIPE_QUERY = gql`
  query SearchRecipe($keyword: String!, $page: Int!) {
    searchRecipe(keyword: $keyword, page: $page) {
      ok
      error
      recipes {
        id
        user {
          username
          nickName
        }
        cookName
        payload
        videoLink
        file
      }
    }
  }
`;

const Form = styled.form`
  width: 100%;
  position: relative;
  span {
    position: absolute;
    top: 15px;
    left: 15px;
    svg {
      opacity: 0.6;
    }
  }
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputBg};
  &::placeholder {
    font-size: 13px;
    font-weight: 500;
    opacity: 0.6;
    letter-spacing: -1px;
  }
  border-radius: 15px;
`;

const ResultWrap = styled.div`
  margin-top: 50px;
`;

const SearchResult = styled.h3`
  font-size: 30px;
  opacity: 0.5;
`;

export const Search = () => {
  const [term, setTerm] = useState();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { data, loading } = useQuery(SEARCH_RECIPE_QUERY, {
    variables: {
      keyword: term,
      page: 1,
    },
  });

  const onSubmit = () => {
    const { search } = getValues();
    setTerm(search);
    // data?.searchRecipe === "" ? "레시피가 없어요.." : "";
  };

  return (
    <Container>
      <Title title="레시피를 검색해 보아요" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <span>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <Input
          {...register("search", {
            required: "내용을 적어줘야 돼요...",
          })}
          type="text"
          placeholder="레시피 검색"
        />
      </Form>
      {errors?.search?.message ? (
        <ErrorMessage message={errors?.search?.message} />
      ) : null}

      <ResultWrap>
        {loading ? (
          <Loading />
        ) : (
          <>
            {!data?.searchRecipe?.ok ? (
              <SearchResult>{data?.searchRecipe?.error}</SearchResult>
            ) : (
              <ConWrap recipeData={data?.searchRecipe?.recipes} />
            )}
          </>
        )}
      </ResultWrap>
    </Container>
  );
};
