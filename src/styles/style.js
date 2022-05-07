import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  bgColor: "aliceblue",
  fontColor: "#1d1d1d",
  borderColor: "#dbdbdb",
  mainColor: "orange",
};

export const darkTheme = {
  bgColor: "#333",
  fontColor: "#fff",
  borderColor: "#808080",
  mainColor: "orange",
};

export const GlobalStyled = createGlobalStyle`
    ${reset}

    *{
        box-sizing: border-box;
    }

    body{
        font-family: 'Noto Sans KR', sans-serif;
        background-color: ${(props) => props.theme.bgColor};
        color:${(props) => props.theme.fontColor};
        letter-spacing: -1px;
    }

    input,button {
        all:unset;
    }

    a{
        text-decoration: none;
        color:inherit;
    }

    li{
        list-style: none;
    }
`;
