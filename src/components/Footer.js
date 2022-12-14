import React from "react";
import styled from "styled-components/macro";

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <Info>Fantasy Prem Fan Site</Info>
        <Info>MSC Software Development Ltd</Info>
      </FooterContainer>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  padding: ${({ theme }) => theme.spacingValue * 2}px ${({ theme }) => theme.spacing};
  background: ${({ theme }) => theme.colours.greyDarkest};
  color: white;
  margin-top: ${({ theme }) => theme.spacingValue * 2}px;
`;

const FooterContainer = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const Info = styled.div`
  flex-grow: 1;
`;