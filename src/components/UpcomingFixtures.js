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

  const { teams } = teamData;

  if (loading || !teams) return <Loader />;

  if (error) return `Error loading fixtures.`;

  const buttonText =
    difficultyType === "easiest" ? "Show Hardest" : "Show Easiest";
  const titleDifficulty = difficultyType === "easiest" ? "Easiest" : "Hardest";

  return (
    <StyledFixtures>
      <Header>
        <span>{titleDifficulty} Upcoming Fixtures (Next 5)</span>
        <Switch type="button" onClick={() => updateDifficultyType()}>
          {buttonText}
        </Switch>
      </Header>
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
                        {getTeamShortName(teams, fixture.team)} ({fixture.venue}
                        )
                      </FixtureTeam>
                      <FixtureDifficulty>
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

      <Header>
        <span>{titleDifficulty} Upcoming Fixtures (Next 3)</span>
        <Switch type="button" onClick={() => updateDifficultyType()}>
          {buttonText}
        </Switch>
      </Header>
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
                        {getTeamShortName(teams, fixture.team)} ({fixture.venue}
                        )
                      </FixtureTeam>
                      <FixtureDifficulty>
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

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colours.greyDarkest};
`;

const StyledFixtures = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing};

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 60%;
    margin-top: 0;
  } ;
`;

const Header = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacingValue / 2}px;
  font-family: ${({ theme }) => theme.font.headerDefault};
  letter-spacing: 1px;

  :first-child {
    margin-top: 0;
  }
`;

const Switch = styled.button`
  font-size: ${({ theme }) => theme.font.size.body};
  display: inline-block;
  padding: ${({ theme }) => theme.spacingValue / 2}px
    ${({ theme }) => theme.spacingValue}px;
  background: ${({ theme }) => theme.colours.blueDark};
  color: white;
  border-radius: 3px;
  font-family: ${({ theme }) => theme.font.familyDefault};
  cursor: pointer;
  border: none;
`;

const Table = styled.table`
  background: ${({ theme }) => theme.colours.green};
  border-spacing: 0;
  width: 100%;

  tr:last-child td {
    border-bottom: none;
  }
`;

const Team = styled.td`
  border-right: 2px solid ${({ theme }) => theme.colours.greyDarkest};
  font-size: ${({ theme }) => theme.font.size.small};
  border-bottom: 2px solid ${({ theme }) => theme.colours.greyDarkest};
  padding: ${({ theme }) => theme.spacingValue / 2}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    font-size: 16px;
  } ;
`;

const Fixture = styled.td`
  border-bottom: 2px solid ${({ theme }) => theme.colours.greyDarkest};
  padding: ${({ theme }) => theme.spacingValue / 2}px;
`;

const FixtureTeam = styled.p`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  margin: 0;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    font-size: ${({ theme }) => theme.font.size.small};
  } ;
`;

const FixtureDifficulty = styled.p`
  font-size: ${({ theme }) => theme.font.size.small};
  margin: 0;
  text-align: center;
  font-weight: bold;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    font-size: ${({ theme }) => theme.font.size.small};
  } ;
`;
