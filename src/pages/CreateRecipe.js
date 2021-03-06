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
import { PageTitle } from "../components/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

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

const InputFile = styled.input`
  display: none;
`;

const TextArea = styled.textarea`
  all: unset;
  width: 100%;
  height: 300px;
  line-height: 1.5rem;
  padding: 15px;
  font-size: 18px;
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

const Label = styled.label`
  height: 200px;
  border: 5px dashed ${(props) => props.theme.mainColor};
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  svg {
    font-size: 50px;
    color: ${(props) => props.theme.mainColor};
    margin-bottom: 15px;
  }
  span {
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme.mainColor};
  }
  margin-bottom: 40px;
`;

const Btn = styled.label`
  width: 140px;
  text-align: center;
  font-size: 14px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  display: block;
  margin: 25px 0;
  padding: 10px;
  background-color: ${(props) => props.theme.mainColor};
`;

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState("");
  const [recipeImg, setRecipeImg] = useState();

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
      <PageTitle title="????????? ??????" />
      <Title title={"???????????? ????????? ?????????!"} />
      {recipeImg ? (
        <>
          <ReviewImg src={filePreview} />
          <Btn htmlFor="previewImg">?????? ????????????????</Btn>
        </>
      ) : (
        <Label htmlFor="previewImg">
          <FontAwesomeIcon icon={faImage} />
          <span>????????? ?????? ????????????!</span>
        </Label>
      )}
      <ConWrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputFile
            id="previewImg"
            {...register("file")}
            type="file"
            accept="image/*"
          />
          {errors?.file?.message ? (
            <ErrorMessage message={errors?.file?.message} />
          ) : null}

          <Input
            {...register("cookName", {
              required: "?????? ????????? ????????????...",
              minLength: {
                value: 1,
                message: "??????????????? 1?????? ?????? ?????? ??? ????????????..",
              },
            })}
            type="text"
            placeholder="?????? ????????? ????????? ?????????"
          />
          {errors?.cookName?.message ? (
            <ErrorMessage message={errors?.cookName?.message} />
          ) : null}

          <Input
            {...register("caption", {
              required: false,
            })}
            type="text"
            placeholder="??????????????? ????????? ?????????"
          />
          {errors?.caption?.message ? (
            <ErrorMessage message={errors?.caption?.message} />
          ) : null}

          <Input
            {...register("videoLink", {
              required: false,
            })}
            type="text"
            placeholder="????????? ????????? ???????????????"
          />
          {errors?.videoLink?.message ? (
            <ErrorMessage message={errors?.videoLink?.message} />
          ) : null}

          <TextArea
            {...register("payload", {
              required: "????????? ????????? ????????????...",
            })}
            type="text"
            placeholder="???????????? ???????????????"
          />
          {errors?.payload?.message ? (
            <ErrorMessage message={errors?.payload?.message} />
          ) : null}

          <Button
            opacity={isValid ? "1" : "0.5"}
            text={loading ? "loading.." : "????????????"}
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
