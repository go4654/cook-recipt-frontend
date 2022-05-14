import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../apollo";
import { BottomWrap } from "../components/auth/BottomWrap";
import { Button } from "../components/auth/Button";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { Form } from "../components/auth/Form";
import { Input } from "../components/auth/Input";
import { LoginWrap } from "../components/auth/LoginWrap";
import { Logo } from "../components/auth/Logo";
import { Title } from "../components/auth/Title";
import { WelcomeMessage } from "../components/auth/WelcomeMessage";
import { Wrap } from "../components/auth/Wrap";
import { PageTitle } from "../components/PageTitle";
import { LOGO_URL } from "../constants/constants";
import { routes } from "../routes";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export const Login = () => {
  const location = useLocation();
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
      login: { ok, error, token },
    } = data;

    if (!ok) {
      setError("result", {
        message: error,
      });
    }

    if (token) {
      loginUser(token);
      navigate(routes.home, { replace: true });
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <Wrap>
      <Logo>
        <img src={LOGO_URL} />
      </Logo>
      <PageTitle title="로그인" />
      <LoginWrap>
        {location?.state?.message ? (
          <WelcomeMessage message={location?.state?.message} />
        ) : (
          ""
        )}
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

          <Button
            opacity={isValid ? "1" : "0.5"}
            text={loading ? "loading.." : "로그인"}
            cursor={isValid ? "pointer" : ""}
          />
          {errors?.result?.message ? (
            <ErrorMessage message={errors?.result?.message} />
          ) : null}
        </Form>

        <BottomWrap
          text="아이디가 없으신가요?"
          link={routes.signup}
          linkText="회원가입"
        />
      </LoginWrap>
    </Wrap>
  );
};
