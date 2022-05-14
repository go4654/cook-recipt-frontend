import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/auth/Button";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { Input } from "../components/auth/Input";
import { Title } from "../components/auth/Title";
import { Container } from "../components/Container";
import { USER_FRAGMENT } from "../fragment";
import { routes } from "../routes";
import imageCompression from "browser-image-compression";
import { scrollTop } from "../components/ScrollTop";
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

const CREATE_RECIPE_MUTATION = gql`
  mutation createRecipe(
    $cookName: String!
    $payload: String!
    $caption: String!
    $file: Upload
    $videoLink: String
  ) {
    createRecipe(
      cookName: $cookName
      payload: $payload
      caption: $caption
      file: $file
      videoLink: $videoLink
    ) {
      ok
      error
      recipe {
        id
      }
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

const ReviewImg = styled.img``;

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState("");
  const [recipeImg, setRecipeImg] = useState();

  scrollTop();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      createRecipe: { ok, error },
    } = data;

    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      navigate(routes.home, {
        state: {
          message: "create",
        },
      });
    }
  };

  const [createRecipe, { loading }] = useMutation(CREATE_RECIPE_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: SEE_RECIPES_QUERY,
      },
    ],
  });

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    const { file, cookName, videoLink, payload, caption } = getValues();

    if (file && file.length > 0) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
      };

      const compressedFile = await imageCompression(recipeImg, options);
      createRecipe({
        variables: {
          file: compressedFile,
          caption,
          cookName,
          videoLink,
          payload,
        },
      });
    } else {
      createRecipe({
        variables: {
          caption,
          cookName,
          videoLink,
          payload,
        },
      });
    }
  };

  const cookImg = watch("file");
  useEffect(() => {
    if (cookImg && cookImg.length > 0) {
      const file = cookImg[0];
      setRecipeImg(file);
      setFilePreview(URL.createObjectURL(file));
    }
  }, [cookImg]);

  return (
    <Container>
      <PageTitle title="레시피 추가" />
      <Title title={"레시피를 등록해 보아요!"} />
      <ReviewImg src={filePreview} />
      <ConWrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputFile {...register("file")} type="file" accept="image/*" />
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
