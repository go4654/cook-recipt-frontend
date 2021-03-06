import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/auth/Button";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { Input } from "../components/auth/Input";
import { Title } from "../components/auth/Title";
import { Container } from "../components/Container";
import { PageTitle } from "../components/PageTitle";
import { NO_IMG_URL } from "../constants/constants";
import { routes } from "../routes";
import imageCompression from "browser-image-compression";

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

const InputFile = styled.input`
  display: none;
`;

const ReviewImg = styled.img``;

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
  width: 100%;
  height: 200px;
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

export const EditRecipe = () => {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState("");
  const [recipeImg, setRecipeImg] = useState();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
    setError,
    watch,
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

  const onSubmit = async () => {
    const { file, cookName, videoLink, payload, caption } = getValues();

    if (file && file.length > 0) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
      };

      const compressedFile = await imageCompression(recipeImg, options);
      editRecipe({
        variables: {
          id: +recipeId,
          file: compressedFile,
          caption,
          cookName,
          videoLink,
          payload,
        },
      });
    } else {
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
    }
  };

  const cookImg = watch("file");
  useEffect(() => {
    if (cookImg && cookImg.length > 0) {
      const file = cookImg[0];
      setRecipeImg(file);
      setFilePreview(URL.createObjectURL(file));
    }
    setValue("cookName", data?.seeCook?.cookName);
    setValue("caption", data?.seeCook?.caption);
    setValue("videoLink", data?.seeCook?.videoLink);
    setValue("payload", data?.seeCook?.payload);
  }, [data, setValue, cookImg]);
  return (
    <Container>
      <PageTitle title="????????? ??????" />
      <Title title={"???????????? ???????????????????"} />
      {recipeImg ? (
        <>
          <ReviewImg src={filePreview} />
          <Btn htmlFor="previewImg">?????? ????????????????</Btn>
        </>
      ) : (
        <>
          <Img
            style={{
              background: `url(${
                data?.seeCook?.file ? data?.seeCook?.file : NO_IMG_URL
              }) no-repeat center / cover`,
            }}
          />
          <Btn htmlFor="previewImg">????????? ?????? ??????????</Btn>
        </>
      )}

      <ConWrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputFile
            {...register("file", {
              required: false,
            })}
            type="file"
            id="previewImg"
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
