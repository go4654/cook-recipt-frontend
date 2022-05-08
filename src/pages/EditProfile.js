import { gql, useMutation } from "@apollo/client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../apollo";
import { Button } from "../components/auth/Button";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { Input } from "../components/auth/Input";
import { Title } from "../components/auth/Title";
import { Container } from "../components/Container";
import { useUser } from "../components/hooks/useUser";
import { routes } from "../routes";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($nickName: String, $password: String) {
    editProfile(nickName: $nickName, password: $password) {
      ok
      error
    }
  }
`;

const ConWrap = styled.div``;

const TitleWrap = styled.div`
  display: flex;
  div {
    line-height: 2.5rem;
  }
  @media screen and (max-width: 450px) {
    flex-direction: column;
    margin-bottom: 30px;
  }
`;

const Btn = styled.button`
  margin-left: 50px;
  width: 100px;
  height: 30px;
  background-color: ${(props) => props.theme.mainColor};
  margin-top: 3px;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-color: tomato;
  }
  @media screen and (max-width: 450px) {
    margin-left: 0px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const EditProfile = () => {
  const { data: userData } = useUser();
  const navigate = useNavigate();

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

  const password = useRef({});
  password.current = watch("password", "");

  const handleClick = () => {
    navigate(routes.home);
    logoutUser();
  };

  const editUpdate = (cache, result) => {
    const {
      data: {
        editProfile: { ok, error },
      },
    } = result;

    if (error) {
      return setError("result", {
        message: error,
      });
    }

    if (ok) {
      cache.modify({
        id: `User:${userData?.me?.id}`,
        fields: {
          nickName(prev) {
            return;
          },
        },
      });
    }
  };

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    update: editUpdate,
  });

  const onSubmit = () => {
    const { nickName, password } = getValues();
    editProfile({
      variables: {
        nickName,
        password,
      },
    });
  };

  useEffect(() => {
    setValue("nickName", userData?.me?.nickName);
  }, [userData, setValue]);

  return (
    <Container>
      <ConWrap>
        <TitleWrap>
          <Title title={`${userData?.me?.nickName}님 프로필을 수정할래요?`} />
          <Btn onClick={handleClick}>logout</Btn>
        </TitleWrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("nickName", {
              minLength: {
                value: 2,
                message: "닉네임은 2자리 이상 작성해 줘야돼요...",
              },
            })}
            type="text"
            placeholder="닉네임"
          />
          {errors?.nickName?.message ? (
            <ErrorMessage message={errors?.nickName?.message} />
          ) : null}

          <Input
            {...register("password", {
              minLength: {
                value: 8,
                message: "비밀번호는 8자리 이상 작성 해 줘야돼요..",
              },
            })}
            type="password"
            placeholder="비밀번호"
          />
          {errors?.password?.message ? (
            <ErrorMessage message={errors?.password?.message} />
          ) : null}

          <Input
            {...register("re_password", {
              minLength: {
                value: 8,
                message: "비밀번호는 8자리 이상 작성 해 줘야돼요..",
              },
              validate: (value) =>
                value === password.current || "비밀번호가 같지 않아요...",
            })}
            type="password"
            placeholder="비밀번호 확인"
          />
          {errors?.re_password?.message ? (
            <ErrorMessage message={errors?.re_password?.message} />
          ) : null}

          <Button
            opacity={isValid ? "1" : "0.5"}
            text={loading ? "loading.." : "수정하기"}
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
