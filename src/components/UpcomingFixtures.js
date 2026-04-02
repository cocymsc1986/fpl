import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { Loader } from "./Loader";
import {
  getTeamName,
  getTeamShortName,
  getTeamsFixturesAndDifficulties,
} from "../utils/team";

const UPCOMING_FIXTURES_QUERY = gql`
  query getAllTeamsFixtures {
    getAllTeamsFixtures {
      fixtures {
        team_a
        team_h
        team_a_difficulty
        team_h_difficulty
      }
    }
  }
`;

export const UpcomingFixtures = ({ teamData }) => {
  const { loading, error, data } = useQuery(UPCOMING_FIXTURES_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const [difficultyType, setDifficultyType] = useState("easiest");

  const getFixturesByDifficulty = (amountOfFixtures = 5, amountOfTeams = 5) => {
    const {
      getAllTeamsFixtures: { fixtures },
    } = data;
    const teamFixtureDifficulty = fixtures.map((team, i) =>
      getTeamsFixturesAndDifficulties(team, i + 1, amountOfFixtures)
    );

    const fixtureAverages = teamFixtureDifficulty.sort((a, b) => {
      const sortA = a.fixtures.reduce((previous, current) => {
        return current.difficulty + previous;
      }, 0);
      const sortB = b.fixtures.reduce((previous, current) => {
        return current.difficulty + previous;
      }, 0);

      return sortA / a.fixtures.length - sortB / a.fixtures.length;
    });

    if (difficultyType === "easiest") {
      return fixtureAverages.slice(0, amountOfTeams);
    }

    return fixtureAverages
      .slice(fixtureAverages.length - amountOfTeams, fixtureAverages.length)
      .reverse();
  };

  const updateDifficultyType = () => {
    setDifficultyType(difficultyType === "easiest" ? "hardest" : "easiest");
  };

  const teams = teamData?.teams;

  if (loading || !teams) return <Loader />;

  if (error) return `Error loading fixtures.`;

  const buttonText =
    difficultyType === "easiest" ? "Show Hardest" : "Show Easiest";
  const titleDifficulty = difficultyType === "easiest" ? "Easiest" : "Hardest";

  return (
    <StyledFixtures>
      <SectionHeader>
        <span>{titleDifficulty} Fixtures (Next 5)</span>
        <Switch type="button" onClick={() => updateDifficultyType()}>
          {buttonText}
        </Switch>
      </SectionHeader>
      <Table>
        <tbody>
          {getFixturesByDifficulty(5, 5).map((teamInfo) => {
            return (
              <tr key={`upcoming-fixtures-1-${teamInfo.team}`}>
                <Team>
                  <StyledLink to={`/team/${teamInfo.team}`}>
                    {teams && getTeamName(teams, teamInfo.team)}
                  </StyledLink>
                </Team>
                {teamInfo.fixtures.map((fixture) => {
                  return (
                    <Fixture key={`upcoming-fixtures-team-1-${fixture.team}`}>
                      <FixtureTeam>
                        {getTeamShortName(teams, fixture.team)} ({fixture.venue})
                      </FixtureTeam>
                      <FixtureDifficulty $diff={fixture.difficulty}>
                        {fixture.difficulty}
                      </FixtureDifficulty>
                    </Fixture>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <SectionHeader>
        <span>{titleDifficulty} Fixtures (Next 3)</span>
        <Switch type="button" onClick={() => updateDifficultyType()}>
          {buttonText}
        </Switch>
      </SectionHeader>
      <Table>
        <tbody>
          {getFixturesByDifficulty(3, 5).map((teamInfo) => {
            return (
              <tr key={`upcoming-fixtures-2-${teamInfo.team}`}>
                <Team>
                  <StyledLink to={`/team/${teamInfo.team}`}>
                    {teams && getTeamName(teams, teamInfo.team)}
                  </StyledLink>
                </Team>
                {teamInfo.fixtures.map((fixture) => {
                  return (
                    <Fixture key={`upcoming-fixtures-team-2-${fixture.team}`}>
                      <FixtureTeam>
                        {getTeamShortName(teams, fixture.team)} ({fixture.venue})
                      </FixtureTeam>
                      <FixtureDifficulty $diff={fixture.difficulty}>
                        {fixture.difficulty}
                      </FixtureDifficulty>
                    </Fixture>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </StyledFixtures>
  );
};

const diffColor = (d) => {
  if (d <= 2) return "#00fd84";
  if (d === 3) return "#acabaa";
  return "#ff6e85";
};

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colours.onSurface};
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.small};

  &:hover {
    color: ${({ theme }) => theme.colours.primary};
    text-decoration: none;
  }
`;

const StyledFixtures = styled.div`
  flex: 3 1 0;
  min-width: 0;
`;

const SectionHeader = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacingValue / 2}px;
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-size: ${({ theme }) => theme.font.size.lead};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurface};
  letter-spacing: 0.05em;

  &:first-child {
    margin-top: 0;
  }
`;

const Switch = styled.button`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px ${({ theme }) => theme.spacing};
  background: rgba(253, 180, 248, 0.12);
  color: ${({ theme }) => theme.colours.primary};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.font.familyDefault};
  cursor: pointer;
  border: none;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(253, 180, 248, 0.22);
  }
`;

const Table = styled.table`
  background: ${({ theme }) => theme.colours.surfaceContainerLow};
  border-spacing: 0;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing};

  tr:last-child td {
    border-bottom: none;
  }
`;

const Team = styled.td`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  padding: ${({ theme }) => theme.spacingValue / 2}px;
  background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    font-size: ${({ theme }) => theme.font.size.small};
  }
`;

const Fixture = styled.td`
  padding: ${({ theme }) => theme.spacingValue / 2}px;
  background: ${({ theme }) => theme.colours.surfaceContainer};
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
`;

const FixtureTeam = styled.p`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  color: ${({ theme }) => theme.colours.onSurface};
  margin: 0;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    font-size: ${({ theme }) => theme.font.size.small};
  }
`;

const FixtureDifficulty = styled.p`
  font-size: ${({ theme }) => theme.font.size.small};
  margin: 0;
  text-align: center;
  font-weight: 700;
  color: ${({ $diff }) => diffColor($diff)};
`;
