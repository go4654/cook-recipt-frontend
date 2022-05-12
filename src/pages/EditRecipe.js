import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/auth/Button";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { Input } from "../components/auth/Input";
import { Title } from "../components/auth/Title";
import { Container } from "../components/Container";
import { NO_IMG_URL } from "../constants/constants";
import { routes } from "../routes";

const SEE_COOK_QUERY = gql`
  query seeCook($id: Int!) {
    seeCook(id: $id) {
      id
      cookName
      payload
      caption
      videoLink
      file
      createdAt
    }
  }
`;

const Edit_RECIPE_MUTATION = gql`
  mutation editRecipe(
    $id: Int!
    $cookName: String
    $payload: String
    $caption: String
    $file: Upload
    $videoLink: String
  ) {
    editRecipe(
      id: $id
      cookName: $cookName
      payload: $payload
      caption: $caption
      file: $file
      videoLink: $videoLink
    ) {
      ok
      error
    }
  }
`;

const ConWrap = styled.div``;

const Form = styled.form``;

const InputFile = styled.input``;

const TextArea = styled.textarea`
  all: unset;
  width: 100%;
  height: 300px;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputBg};
  border-radius: 10px;
  &::placeholder {
    font-size: 13px;
    font-weight: 500;
    opacity: 0.6;
    letter-spacing: -1px;
  }
`;

const Img = styled.div`
  height: 300px;
`;

export const EditRecipe = () => {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
    setError,
  } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      editRecipe: { ok, error },
    } = data;

    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      navigate(routes.home);
    }
  };

  const { data } = useQuery(SEE_COOK_QUERY, {
    variables: {
      id: +recipeId,
    },
  });

  const [editRecipe, { loading }] = useMutation(Edit_RECIPE_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: SEE_COOK_QUERY,
        variables: {
          id: +recipeId,
        },
      },
    ],
  });

  const onSubmit = () => {
    const { file, cookName, videoLink, payload, caption } = getValues();
    editRecipe({
      variables: {
        id: +recipeId,
        file: "",
        caption,
        cookName,
        videoLink,
        payload,
      },
    });
  };

  useEffect(() => {
    setValue("cookName", data?.seeCook?.cookName);
    setValue("caption", data?.seeCook?.caption);
    setValue("videoLink", data?.seeCook?.videoLink);
    setValue("payload", data?.seeCook?.payload);
  }, [data, setValue]);

  return (
    <Container>
      <Title title={"레시피를 수정해볼까요?"} />

      <ConWrap>
        <Img
          style={{
            background: `url(${
              data?.seeCook?.file ? data?.seeCook?.file : NO_IMG_URL
            }) no-repeat center / cover`,
          }}
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputFile
            {...register("file", {
              required: false,
            })}
            type="file"
          />
          {errors?.file?.message ? (
            <ErrorMessage message={errors?.file?.message} />
          ) : null}

          <Input
            {...register("cookName", {
              required: "요리 이름은 필수에요...",
              minLength: {
                value: 1,
                message: "요리이름은 1자리 이상 작성 해 줘야돼요..",
              },
            })}
            type="text"
            placeholder="요리 이름을 입력해 주세요"
          />
          {errors?.cookName?.message ? (
            <ErrorMessage message={errors?.cookName?.message} />
          ) : null}

          <Input
            {...register("caption", {
              required: false,
            })}
            type="text"
            placeholder="해시태그를 작성해 주세요"
          />
          {errors?.caption?.message ? (
            <ErrorMessage message={errors?.caption?.message} />
          ) : null}

          <Input
            {...register("videoLink", {
              required: false,
            })}
            type="text"
            placeholder="유튜브 링크를 올려주세요"
          />
          {errors?.videoLink?.message ? (
            <ErrorMessage message={errors?.videoLink?.message} />
          ) : null}

          <TextArea
            {...register("payload", {
              required: "레시피 내용은 필수에요...",
            })}
            type="text"
            placeholder="레시피를 적어주세요"
          />
          {errors?.payload?.message ? (
            <ErrorMessage message={errors?.payload?.message} />
          ) : null}

          <Button
            opacity={isValid ? "1" : "0.5"}
            text={loading ? "loading.." : "등록하기"}
            cursor={isValid ? "pointer" : ""}
          />
          {errors?.result?.message ? (
            <ErrorMessage message={errors?.result?.message} />
          ) : null}
        </Form>
      </ConWrap>
    </Container>
  );
};
