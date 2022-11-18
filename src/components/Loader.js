import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled, { css } from 'styled-components/macro';

export const Loader = ({ fullScreen = false, size = 100, invert = false }) => (
  <div>
    <StyledLoader
      data-testid="loader"
      fullScreen={fullScreen}
    >
      <ClipLoader
        loading
        size={size}
        color={invert ? "#FFFFFF" : ""}
      />
    </StyledLoader>
  </div>
);

const StyledLoader = styled.div`
  text-align: center;
  padding: 1rem;

  ${props => props.fullScreen && css`
    height: 100vh;
    padding-top: 3rem;
  `};
`;
