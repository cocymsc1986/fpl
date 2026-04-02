import React from "react";
import styled, { keyframes, css } from "styled-components/macro";

export const Loader = ({ fullScreen = false }) => (
  <StyledLoader data-testid="loader" $fullScreen={fullScreen}>
    <SpinnerWrap>
      <Ring />
      <Dot />
    </SpinnerWrap>
  </StyledLoader>
);

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 1; }
`;

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;

  ${({ $fullScreen }) =>
    $fullScreen &&
    css`
      height: 100vh;
      padding: 0;
    `}
`;

const SpinnerWrap = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ring = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(253, 180, 248, 0.12);
  border-top-color: #fdb4f8;
  animation: ${spin} 0.75s linear infinite;
  box-shadow: 0 0 20px rgba(253, 180, 248, 0.25);
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fdb4f8;
  animation: ${pulse} 1.5s ease-in-out infinite;
  box-shadow: 0 0 12px rgba(253, 180, 248, 0.6);
`;
