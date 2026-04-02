import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/macro";

import { Loader } from "./Loader";

import {
  getTeamShortName,
  getTeamsFixturesAndDifficulties,
} from "../utils/team";

const GET_TEAMS_FIXTURES_QUERY = gql`
  query getTeamsFixtures($id: Int, $amount: Int) {
    getTeamsFixtures(id: $id, amount: $amount) {
      fixtures {
        team_a
        team_h
        team_h_difficulty
        team_a_difficulty
      }
    }
  }
`;

const ALL_TEAMS_QUERY = gql`
  query allTeams {
    allTeams {
      teams {
        id
        code
        name
        short_name
      }
    }
  }
`;

const difficultyColor = (d) => {
  const map = { 1: "#00fd84", 2: "#7bc67e", 3: "#acabaa", 4: "#ff6e85", 5: "#ff0033" };
  return map[d] || "#acabaa";
};

export const TeamFixtures = ({ id }) => {
  const {
    loading: fixturesLoading,
    error: fixturesError,
    data: fixturesData,
  } = useQuery(GET_TEAMS_FIXTURES_QUERY, {
    variables: {
      id,
      amount: 5,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: teamsLoading,
    error: teamsError,
    data: teamsData,
  } = useQuery(ALL_TEAMS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  if (teamsLoading || fixturesLoading) return <Loader />;
  if (teamsError || fixturesError) return "Error loading team fixtures.";

  const {
    getTeamsFixtures: { fixtures },
  } = fixturesData;
  const {
    allTeams: { teams },
  } = teamsData;

  const processedFixtures = getTeamsFixturesAndDifficulties(fixtures, id).fixtures;

  return (
    <FixtureWrapper>
      <FixtureStrip>
        {processedFixtures.map((fixture) => (
          <FixtureChip key={`chip-${fixture.team}`}>
            <OpponentLabel>{getTeamShortName(teams, fixture.team)}</OpponentLabel>
            <VenueLabel>{fixture.venue}</VenueLabel>
            <DifficultyBar $color={difficultyColor(fixture.difficulty)} />
          </FixtureChip>
        ))}
      </FixtureStrip>
    </FixtureWrapper>
  );
};

const FixtureWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing};
`;

const FixtureStrip = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacingSmall};
  padding: ${({ theme }) => theme.spacingSmall} 0;
  background: ${({ theme }) => theme.colours.surfaceContainerLow};
  border-radius: 8px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FixtureChip = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  border-radius: 6px;
  min-width: 56px;
`;

const OpponentLabel = styled.span`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-size: ${({ theme }) => theme.font.size.small};
  font-weight: 700;
  color: ${({ theme }) => theme.colours.onSurface};
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const VenueLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
`;

const DifficultyBar = styled.div`
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
`;
