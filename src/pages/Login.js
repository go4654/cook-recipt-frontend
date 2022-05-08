import { BottomWrap } from "../components/auth/BottomWrap";
import { Button } from "../components/auth/Button";
import { Form } from "../components/auth/Form";
import { Input } from "../components/auth/Input";
import { LoginWrap } from "../components/auth/LoginWrap";
import { Title } from "../components/auth/Title";
import { Wrap } from "../components/auth/Wrap";
import { PageTitle } from "../components/PageTitle";
import { routes } from "../routes";

export const Login = () => {
  return (
    <Wrap>
      <PageTitle title="로그인" />
      <LoginWrap>
        <Title title="로그인" />
        <Form>
          <Input type="text" placeholder="아이디를 입력해주세요" />
          <Input type="password" placeholder="비밀번호를 입력해주세요" />
          <Button text="로그인" />
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
