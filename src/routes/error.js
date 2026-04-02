import React from "react";
import { useRouteError } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components/macro";
import { theme } from "../styles/theme";

export default function Error() {
  const error = useRouteError();

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Heading>Oops!</Heading>
        <Message>Sorry, an unexpected error has occurred.</Message>
        <ErrorDetail>{error.statusText || error.message}</ErrorDetail>
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: #0e0e0e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
`;

const Heading = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-style: italic;
  font-weight: 700;
  font-size: 3rem;
  text-transform: uppercase;
  color: #fdb4f8;
  margin: 0 0 16px;
`;

const Message = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #acabaa;
  margin: 0 0 8px;
`;

const ErrorDetail = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #484848;
  font-style: italic;
  margin: 0;
`;
