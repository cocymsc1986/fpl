import React from "react";
import styled from "styled-components/macro";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "HOME", icon: "home", to: "/", activeOn: (p) => p === "/" },
  { label: "PLAYERS", icon: "groups", to: "/", activeOn: (p) => p.startsWith("/player") },
  { label: "TEAM", icon: "shield", to: "/", activeOn: (p) => p.startsWith("/team") },
  { label: "STATS", icon: "leaderboard", to: "/", activeOn: () => false },
];

export const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <NavBar>
      {navItems.map(({ label, icon, to, activeOn }) => {
        const isActive = activeOn(pathname);
        return (
          <NavItem key={label} to={to} $active={isActive}>
            <span className="material-symbols-outlined">{icon}</span>
            <NavLabel>{label}</NavLabel>
          </NavItem>
        );
      })}
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

const NavItem = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
  padding: 8px 4px;

  background: ${({ $active }) => ($active ? "rgba(253, 180, 248, 0.1)" : "transparent")};
  color: ${({ $active, theme }) =>
    $active ? theme.colours.primary : theme.colours.onSurfaceVariant};
  box-shadow: ${({ $active }) =>
    $active ? "0 -2px 12px rgba(253, 180, 248, 0.2)" : "none"};

  .material-symbols-outlined {
    font-size: 22px;
  }

  &:hover {
    background: rgba(253, 180, 248, 0.07);
    color: ${({ theme }) => theme.colours.primary};
    text-decoration: none;
  }
`;

const NavLabel = styled.span`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;
