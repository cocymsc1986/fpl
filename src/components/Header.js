import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <StyledHeader>
      <BrandLink to="/">
        <BrandText>Fantasy Prem</BrandText>
      </BrandLink>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing};
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(253, 180, 248, 0.1);
`;

const BrandLink = styled(Link)`
  text-decoration: none;
`;

const BrandText = styled.span`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colours.primary};
  text-transform: uppercase;
`;
