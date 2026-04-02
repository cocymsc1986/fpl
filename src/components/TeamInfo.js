import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { TeamFixtures } from "./TeamFixtures";
import { Loader } from "./Loader";

const TEAM_QUERY = gql`
  query team($id: Int) {
    team(id: $id) {
      name
      code
    }
  }
`;

const PLAYERS_BY_TEAM_QUERY = gql`
  query playersByTeam($team: Int) {
    playersByTeam(team: $team) {
      players {
        id
        element_type
        first_name
        web_name
        form
        status
        points_per_game
        now_cost
        total_points
      }
    }
  }
`;

const ELEMENT_TYPE_ORDER = { 1: 0, 2: 1, 3: 2, 4: 3 };

export const TeamInfo = ({ id }) => {
  const { loading: teamLoading, error: teamError, data: teamData } = useQuery(
    TEAM_QUERY,
    {
      variables: { id },
      notifyOnNetworkStatusChange: true,
    }
  );

  const {
    loading: playersLoading,
    error: playersError,
    data: playersData,
  } = useQuery(PLAYERS_BY_TEAM_QUERY, {
    variables: { team: id },
    notifyOnNetworkStatusChange: true,
  });

  if (teamLoading || playersLoading) return <Loader />;
  if (teamError || playersError) return "Error loading team data.";

  const { team } = teamData;
  const { playersByTeam } = playersData;

  const sortedPlayers = [...playersByTeam.players].sort(
    (a, b) =>
      (ELEMENT_TYPE_ORDER[a.element_type] ?? 9) -
      (ELEMENT_TYPE_ORDER[b.element_type] ?? 9)
  );

  return (
    <>
      {/* Full-width team hero */}
      <TeamHeroBackground>
        <TeamHeroInner>
          <Badge
            src={`https://resources.premierleague.com/premierleague/badges/t${team.code}.svg`}
            alt={`${team.name} logo`}
          />
          <TeamName>{team.name}</TeamName>
        </TeamHeroInner>
      </TeamHeroBackground>

      <PageWrapper>
        {/* Fixture strip */}
        <TeamFixtures id={id} />

        {/* Player table */}
        <Data>
        <Container>
          <SectionLabel>Squad Stats</SectionLabel>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <TH>Name</TH>
                  <TH>Form</TH>
                  <TH>Status</TH>
                  <TH>PPG</TH>
                  <TH>Cost</TH>
                  <TH>Points</TH>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map((player) => (
                  <PlayerRow key={`player-row-${player.id}`}>
                    <TD>
                      <PlayerLink to={`/player/${player.id}`}>
                        {player.first_name} {player.web_name}
                      </PlayerLink>
                    </TD>
                    <TD>{player.form}</TD>
                    <TD>
                      <StatusDot $status={player.status} />
                    </TD>
                    <TD>{player.points_per_game}</TD>
                    <TD>£{player.now_cost / 10}m</TD>
                    <PointsTD>{player.total_points}</PointsTD>
                  </PlayerRow>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </Container>
      </Data>
      </PageWrapper>
    </>
  );
};

/* ─── Styled Components ─────────────────────────────────────── */

const PageWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const TeamHeroBackground = styled.header`
  width: 100%;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colours.surfaceContainerHigh} 0%,
    ${({ theme }) => theme.colours.surface} 100%
  );
`;

const TeamHeroInner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing};
  padding: ${({ theme }) => theme.spacing};
  padding-bottom: ${({ theme }) => theme.spacingValue * 2.5}px;
`;

const Badge = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 120px;
    height: 120px;
  }
`;

const TeamName = styled.h1`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurface};
  margin: 0;
  letter-spacing: 0.03em;
`;

const Data = styled.div`
  padding: ${({ theme }) => theme.spacing};
`;

const Container = styled.div``;

const SectionLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.size.subheader};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurface};
  margin: 0 0 ${({ theme }) => theme.spacingSmall};
  letter-spacing: 0.03em;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colours.surfaceContainerLow};
`;

const TH = styled.th`
  font-family: ${({ theme }) => theme.font.familyDefault};
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  text-align: center;
  padding: 10px ${({ theme }) => theme.spacingSmall};
  background: ${({ theme }) => theme.colours.surfaceContainerHighest};

  &:first-child {
    text-align: left;
    padding-left: ${({ theme }) => theme.spacing};
  }
`;

const PlayerRow = styled.tr`
  height: 44px;
  transition: background 0.1s ease;

  &:nth-child(even) {
    background: ${({ theme }) => theme.colours.surfaceContainer};
  }

  &:hover {
    background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  }
`;

const TD = styled.td`
  font-size: ${({ theme }) => theme.font.size.small};
  text-align: center;
  padding: ${({ theme }) => theme.spacingSmall};
  color: ${({ theme }) => theme.colours.onSurface};

  &:first-child {
    text-align: left;
    padding-left: ${({ theme }) => theme.spacing};
  }
`;

const PointsTD = styled(TD)`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-weight: 700;
  color: ${({ theme }) => theme.colours.primary};
`;

const PlayerLink = styled(Link)`
  color: ${({ theme }) => theme.colours.onSurface};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colours.primary};
    text-decoration: none;
  }
`;

const statusColor = ($status, theme) => {
  if ($status === "a") return theme.colours.secondary;
  if ($status === "d") return "#f5a623";
  return theme.colours.tertiary;
};

const StatusDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $status, theme }) => statusColor($status, theme)};
`;
