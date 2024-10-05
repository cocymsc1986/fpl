import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import styled, { css } from "styled-components/macro";

export const Loader = ({ fullScreen = false, size = 40, invert = false }) => (
  <div>
    <StyledLoader data-testid="loader" fullScreen={fullScreen}>
      <FadeLoader loading size={size} color={invert ? "#FFFFFF" : "black"} />
    </StyledLoader>
  </div>
);

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 1rem;

  ${(props) =>
    props.fullScreen &&
    css`
      height: 100vh;
      padding-top: 3rem;
    `};
`;
