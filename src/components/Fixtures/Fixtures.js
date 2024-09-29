import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { Loader } from "../Loader";
import { getTeamName } from "../../utils/team";

const FIXTURES_QUERY = gql`
  query fixtures($id: Int) {
    fixtures(id: $id) {
      fixtures {
        started
        kickoff_time
        team_a
        team_h
        team_a_score
        team_h_score
      }
      id
    }
  }
`;

export const Fixtures = ({ teamData, gw }) => {
  const { loading, error, data, fetchMore } = useQuery(FIXTURES_QUERY, {
    variables: {
      id: gw,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadNewFixtures = (id) => {
    fetchMore({
      variables: {
        id,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.fixtures) {
          return previousResult;
        }

        return { fixtures: fetchMoreResult.fixtures };
      },
    });
  };

  if (loading) return <Loader />;
  if (error) return `Error loading fixtures.`;

  const getKOTime = (date) => {
    const convertedDate = new Date(date);
    const day = convertedDate.getDate();
    const month = convertedDate.getMonth() + 1;
    const hours = convertedDate.getHours();
    const minutes = convertedDate.getMinutes();

    return (
      <div>
        <div>
          {day}/{month}
        </div>
        <KOTime>
          {hours}:{minutes < 10 && "0"}
          {minutes}
        </KOTime>
      </div>
    );
  };

  const {
    fixtures: { fixtures, id },
  } = data;
  const { teams } = teamData;

  return (
    <StyledFixtures>
      <Wrapper>
        <List>
          <Header>
            <tr>
              <th colSpan="3">
                <H4>Gameweek {id}</H4>
              </th>
            </tr>
          </Header>
          <tbody>
            {fixtures &&
              fixtures.map((fixture) => {
                const {
                  team_h,
                  team_a,
                  team_h_score,
                  team_a_score,
                  started,
                  kickoff_time,
                } = fixture;
                return (
                  <ListItem key={`${team_h}-${team_h_score}`}>
                    <Home>
                      <StyledLink to={`/team/${team_h}`}>
                        {getTeamName(teams, team_h)}
                      </StyledLink>
                    </Home>
                    <GameStatus>
                      {started ? (
                        <Score>
                          {team_h_score} : {team_a_score}
                        </Score>
                      ) : (
                        getKOTime(kickoff_time)
                      )}
                    </GameStatus>
                    <Away>
                      <StyledLink to={`/team/${team_a}`}>
                        {getTeamName(teams, team_a)}
                      </StyledLink>
                    </Away>
                  </ListItem>
                );
              })}
          </tbody>
        </List>
        <Button type="button" onClick={() => loadNewFixtures(id - 1)}>
          Previous Week
        </Button>
        <Button type="button" onClick={() => loadNewFixtures(id + 1)}>
          Next Week
        </Button>
      </Wrapper>
    </StyledFixtures>
  );
};

const KOTime = styled.div`
  font-size: ${({ theme }) => theme.font.size.xsmall};
`;

const StyledFixtures = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 40%;
  } ;
`;

const Wrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    margin-right: ${({ theme }) => theme.spacing};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    margin-right: ${({ theme }) => theme.spacingValue * 2}px;
  } ;
`;

const List = styled.table`
  background: ${({ theme }) => theme.colours.greyDarkest};
  /* Specific width for height calc */
  padding-bottom: ${({ theme }) => theme.spacing};
  margin: 0;
  list-style-type: none;
  width: 100%;
`;

const Header = styled.thead`
  text-align: center;
  color: white;
  margin-top: 0;
`;

const H4 = styled.h4`
  margin: 1rem 0;
`;

const ListItem = styled.tr`
  height: 42px;
`;

const Home = styled.td`
  padding: 4px;
  text-align: right;
  margin-right: ${({ theme }) => theme.spacingSmall};
`;

const StyledLink = styled(Link)`
  color: white;
`;

const GameStatus = styled.td`
  padding: 0 4px 4px;
  background: ${({ theme }) => theme.colours.greyDarkest};
  color: white;
  text-align: center;
`;

const Score = styled.span`
  font-size: 20px;
`;

const Away = styled.td`
  margin-left: ${({ theme }) => theme.spacingSmall};
  padding: 4px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colours.green};
  color: ${({ theme }) => theme.colours.greyDarkest};
  padding: ${({ theme }) => theme.spacing};
  font-size: ${({ theme }) => theme.font.size.body};
  width: 50%;
  border: none;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colours.greyDarkest};
    color: white;
  }
`;
