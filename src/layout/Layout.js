import { ThemeProvider, createGlobalStyle } from "styled-components/macro";
import styled from "styled-components/macro";

import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { theme as themeProperties } from "../styles/theme";

export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={themeProperties}>
      <GlobalStyle />
      <Header />
      <Main>{children}</Main>
      <BottomNav />
    </ThemeProvider>
  );
};

const Main = styled.main`
  padding-top: 64px;
  padding-bottom: 80px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colours.surface};
`;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colours.surface};
    font-family: ${({ theme }) => theme.font.familyDefault};
    font-size: ${({ theme }) => theme.font.size.body};
    color: ${({ theme }) => theme.colours.onSurface};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: none;
    }
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
    user-select: none;
    line-height: 1;
  }
`;
