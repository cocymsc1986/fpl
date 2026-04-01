import React from "react";
import styled from "styled-components/macro";

export const Header = () => {
  return (
    <StyledHeader>
      <LeftSection>
        <IconButton aria-label="Menu">
          <span className="material-symbols-outlined">menu</span>
        </IconButton>
        <BrandText>Stadium Pulse</BrandText>
      </LeftSection>
      <IconButton aria-label="Search">
        <span className="material-symbols-outlined">search</span>
      </IconButton>
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
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing};
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(253, 180, 248, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colours.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.15s ease;

  .material-symbols-outlined {
    font-size: 24px;
  }

  &:hover {
    background: rgba(253, 180, 248, 0.1);
  }
`;
