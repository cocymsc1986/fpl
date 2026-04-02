import React, { useState } from "react";
import styled, { keyframes } from "styled-components/macro";
import { Link } from "react-router-dom";

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const focusSearch = () => {
    const el = document.getElementById("player-search");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  };

  return (
    <>
      <StyledHeader>
        <LeftSection>
          <IconButton aria-label="Menu" onClick={() => setDrawerOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </IconButton>
          <BrandLink to="/">
            <BrandText>Stadium Pulse</BrandText>
          </BrandLink>
        </LeftSection>
        <IconButton aria-label="Search" onClick={focusSearch}>
          <span className="material-symbols-outlined">search</span>
        </IconButton>
      </StyledHeader>

      {drawerOpen && <Overlay onClick={() => setDrawerOpen(false)} />}
      <Drawer $open={drawerOpen}>
        <DrawerHeader>
          <DrawerTitle>Stadium Pulse</DrawerTitle>
          <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </IconButton>
        </DrawerHeader>
        <DrawerNav>
          <DrawerLink to="/" onClick={() => setDrawerOpen(false)}>
            <span className="material-symbols-outlined">home</span>
            Home
          </DrawerLink>
          <DrawerLink
            to="/"
            onClick={() => {
              setDrawerOpen(false);
              setTimeout(() => {
                const el = document.getElementById("player-search");
                if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.focus(); }
              }, 200);
            }}
          >
            <span className="material-symbols-outlined">groups</span>
            Player Search
          </DrawerLink>
        </DrawerNav>
      </Drawer>
    </>
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const Drawer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 201;
  width: 280px;
  background: ${({ theme }) => theme.colours.surfaceContainerLow};
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${({ $open }) => ($open ? slideIn : "none")} 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 64px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const DrawerTitle = styled.span`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colours.primary};
  text-transform: uppercase;
`;

const DrawerNav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;

const DrawerLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;

  .material-symbols-outlined {
    font-size: 20px;
    color: ${({ theme }) => theme.colours.onSurfaceVariant};
    transition: color 0.15s ease;
  }

  &:hover {
    background: rgba(253, 180, 248, 0.08);
    color: ${({ theme }) => theme.colours.primary};

    .material-symbols-outlined {
      color: ${({ theme }) => theme.colours.primary};
    }
  }
`;
