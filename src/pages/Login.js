import { Link } from "react-router-dom";
import styled from "styled-components";
import { PageTitle } from "../components/PageTitle";
import { routes } from "../routes";

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWrap = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 50px 20px;
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const Title = styled.div`
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  &::placeholder {
    font-size: 13px;
    font-weight: 600;
  }
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  background-color: ${(props) => props.theme.mainColor};
  padding: 15px 0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(255, 165, 0, 0.2) 0px 20px 25px -5px,
    rgba(255, 165, 0, 0.04) 0px 10px 10px -5px;
`;

const BottomWrap = styled.div`
  margin-top: 30px;
  a {
    color: ${(props) => props.theme.mainColor};
    font-weight: 700;
    text-decoration: underline;
  }
`;

export const Login = () => {
  return (
    <Wrap>
      <PageTitle title="로그인" />
      <LoginWrap>
        <Title>로그인</Title>
        <Form>
          <Input type="text" placeholder="아이디를 입력해주세요" />
          <Input type="password" placeholder="비밀번호를 입력해주세요" />
          <Button>로그인</Button>
        </Form>
        <BottomWrap>
          <span>
            아이디가 없으신가요? <Link to={routes.signup}> 회원가입</Link>
          </span>
        </BottomWrap>
      </LoginWrap>
    </Wrap>
  );
};
