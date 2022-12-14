import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from 'styled-components/macro';

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

  return (
    <StyledFixtures>
      <tbody>
        <Row>
          <Item>Fixtures</Item>
          {getTeamsFixturesAndDifficulties(fixtures, id).fixtures.map(
            fixture => (
              <Item key={`team-name-${fixture.team}`}>
                {getTeamShortName(teams, fixture.team)} ({fixture.venue})
              </Item>
            )
          )}
        </Row>
        <Row>
          <Item>Difficulty</Item>
          {getTeamsFixturesAndDifficulties(fixtures, id).fixtures.map(
            fixture => (
              <Item key={`team-difficulty-${fixture.team}`}>
                {fixture.difficulty}
              </Item>
            )
          )}
        </Row>
      </tbody>
    </StyledFixtures>
  );
};

const StyledFixtures = styled.table`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  background: ${({ theme }) => theme.colours.green};
  border-spacing: 0;
  margin: 0 auto;
`;

const Row = styled.tr`
  &:last-child td {
    border-bottom: none;
  };
`;

const Item = styled.td`
  border-bottom: 2px solid ${({ theme }) => theme.colours.greyDarkest};
  padding-top: ${({ theme }) => theme.spacingValue}px;
  padding-bottom: ${({ theme }) => theme.spacingValue}px;
  padding-left: ${({ theme }) => theme.spacingValue / 2}px;
  padding-right: ${({ theme }) => theme.spacingValue / 2}px;
  text-align: center;

  &:first-child {
    border-right: 2px solid ${({ theme }) => theme.colours.greyDarkest};
    text-align: left;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding-top: ${({ theme }) => theme.spacing};
    padding-bottom: ${({ theme }) => theme.spacing};
    padding-left: ${({ theme }) => theme.spacing};
    padding-right: ${({ theme }) => theme.spacing};
  }
`;

