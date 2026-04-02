import React from "react";
import styled from "styled-components/macro";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const BottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const focusSearch = () => {
    const el = document.getElementById("player-search");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  };

  const handlePlayersClick = (e) => {
    e.preventDefault();
    if (pathname !== "/") {
      navigate("/");
      setTimeout(focusSearch, 200);
    } else {
      focusSearch();
    }
  };

  return (
    <NavBar>
      <NavItem to="/" $active={pathname === "/"}>
        <span className="material-symbols-outlined">home</span>
        <NavLabel>Home</NavLabel>
      </NavItem>

      <NavButton
        onClick={handlePlayersClick}
        $active={pathname.startsWith("/player")}
      >
        <span className="material-symbols-outlined">groups</span>
        <NavLabel>Players</NavLabel>
      </NavButton>

      <NavItem
        to="/"
        $active={pathname.startsWith("/team")}
      >
        <span className="material-symbols-outlined">shield</span>
        <NavLabel>Teams</NavLabel>
      </NavItem>

      <NavItem
        to="/"
        $active={false}
      >
        <span className="material-symbols-outlined">leaderboard</span>
        <NavLabel>Stats</NavLabel>
      </NavItem>
    </NavBar>
  );
};

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  display: flex;
  align-items: stretch;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const navItemStyles = ({ $active, theme }) => `
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
  padding: 8px 4px;
  background: ${$active ? "rgba(253, 180, 248, 0.1)" : "transparent"};
  color: ${$active ? theme.colours.primary : theme.colours.onSurfaceVariant};
  box-shadow: ${$active ? "0 -2px 12px rgba(253, 180, 248, 0.2)" : "none"};

  .material-symbols-outlined {
    font-size: 22px;
  }

  &:hover {
    background: rgba(253, 180, 248, 0.07);
    color: ${theme.colours.primary};
    text-decoration: none;
  }
`;

const NavItem = styled(Link)`
  ${(props) => navItemStyles(props)}
`;

const NavButton = styled.button`
  ${(props) => navItemStyles(props)}
  border: none;
  cursor: pointer;
  font-family: inherit;
`;

const NavLabel = styled.span`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;
