import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/auth/Button";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { Input } from "../components/auth/Input";
import { Title } from "../components/auth/Title";
import { Container } from "../components/Container";
import { routes } from "../routes";

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

export const CreateRecipe = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setError,
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
      navigate(routes.home);
    }
  };

  const [createRecipe, { loading }] = useMutation(CREATE_RECIPE_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    const { file, cookName, videoLink, payload, caption } = getValues();
    createRecipe({
      variables: {
        file: "",
        caption,
        cookName,
        videoLink,
        payload,
      },
    });
  };

  return (
    <Container>
      <Title title={"레시피를 등록해 보아요!"} />

      <ConWrap>
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
