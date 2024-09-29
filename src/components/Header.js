import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <H1>Fantasy Premier League Stats</H1>
      </StyledLink>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colours.greyDarkest};
  padding: ${({ theme }) => theme.spacing};
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.font.headerDefault};
  letter-spacing: 2px;
  font-size: ${({ theme }) => theme.font.size.header};
  margin: 0;
  color: white;
`;
