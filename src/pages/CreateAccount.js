import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BottomWrap } from "../components/auth/BottomWrap";
import { Button } from "../components/auth/Button";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { Form } from "../components/auth/Form";
import { Input } from "../components/auth/Input";
import { LoginWrap } from "../components/auth/LoginWrap";
import { Title } from "../components/auth/Title";
import { Wrap } from "../components/auth/Wrap";
import { PageTitle } from "../components/PageTitle";
import { routes } from "../routes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $nickName: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      nickName: $nickName
      password: $password
    ) {
      ok
      error
    }
  }
`;

export const Signup = () => {
  const navigate = useNavigate();

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

  const password = useRef({});
  password.current = watch("password", "");

  const onCompleted = (data) => {
    const { username } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      navigate(routes.home, {
        state: {
          message: `${username}님 회원가입이 되었어요! 로그인 해주세요`,
        },
      });
    }
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const { username, nickName, password } = getValues();
    createAccount({
      variables: {
        username,
        nickName,
        password,
      },
    });
  };

  return (
    <Wrap>
      <PageTitle title="회원가입" />
      <LoginWrap>
        <Title title="회원가입" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", {
              required: "아이디는 필수에요...",
              minLength: {
                value: 3,
                message: "아이디는 3자리 이상 작성 해 줘야돼요..",
              },
            })}
            type="text"
            placeholder="아이디를 입력해주세요"
          />
          {errors?.username?.message ? (
            <ErrorMessage message={errors?.username?.message} />
          ) : null}

          <Input
            {...register("nickName", {
              required: "닉네임은 필수에요...",
              minLength: {
                value: 2,
                message: "닉네임은 2자리 이상 작성해 줘야돼요...",
              },
            })}
            type="nickName"
            placeholder="닉네임을 입력해주세요"
          />
          {errors?.nickName?.message ? (
            <ErrorMessage message={errors?.nickName?.message} />
          ) : null}

          <Input
            {...register("password", {
              required: "비밀번호는 필수에요...",
              minLength: {
                value: 8,
                message: "비밀번호는 8자리 이상 작성 해 줘야돼요..",
              },
            })}
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          {errors?.password?.message ? (
            <ErrorMessage message={errors?.password?.message} />
          ) : null}

          <Input
            {...register("re_password", {
              required: "비밀번호는 필수에요...",
              minLength: {
                value: 8,
                message: "비밀번호는 8자리 이상 작성 해 줘야돼요..",
              },
              validate: (value) =>
                value === password.current || "비밀번호가 같지 않아요...",
            })}
            type="password"
            placeholder="비밀번호를 확인해주세요"
          />
          {errors?.re_password?.message ? (
            <ErrorMessage message={errors?.re_password?.message} />
          ) : null}

          <Button
            text="회원가입"
            opacity={isValid ? "1" : "0.5"}
            cursor={isValid ? "pointer" : ""}
          />
          {errors?.result?.message ? (
            <ErrorMessage message={errors?.result?.message} />
          ) : null}
        </Form>

        <BottomWrap
          text="아이디가 있으신가요?"
          link={routes.home}
          linkText="로그인"
        />
      </LoginWrap>
    </Wrap>
  );
};
