import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled, { css } from 'styled-components/macro';

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

export const TeamInfo = ({ id }) => {
  const { loading: teamLoading, error: teamError, data: teamData } = useQuery(
    TEAM_QUERY,
    {
      variables: {
        id,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const {
    loading: playersLoading,
    error: playersError,
    data: playersData,
  } = useQuery(PLAYERS_BY_TEAM_QUERY, {
    variables: {
      team: id,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (teamLoading || playersLoading) return <Loader />;
  if (teamError || playersError) {
    // console.log(error);
    return "Error loading team data.";
  }

  const { team } = teamData;
  const { playersByTeam } = playersData;

  return (
    <StyledTeam>
      <Header>
        <HeaderContainer>
          <Badge
            src={`https://resources.premierleague.com/premierleague/badges/t${team.code}.svg`}
            alt={`${team.name} logo`}
          />
          <Name>{team.name}</Name>
        </HeaderContainer>
      </Header>
      <TeamFixtures id={id} />
      <Data>
        <Container>
          <ContainerHeader>Player stats</ContainerHeader>
          <Table>
            <thead>
              <PlayerInfo>
                <TH>Name</TH>
                <TH>Form</TH>
                <TH>Status</TH>
                <TH>PPG</TH>
                <TH>Cost</TH>
                <TH>Points</TH>
              </PlayerInfo>
            </thead>
            <tbody>
              {playersByTeam &&
                playersByTeam.players.map((player) => {
                  return (
                    <PlayerInfo key={`player-info-${player.id}`}>
                      <TD>
                        <StyledLink to={`/player/${player.id}`}>
                          {player.first_name} {player.web_name}
                        </StyledLink>
                      </TD>
                      <TD>{player.form}</TD>
                      <TD>{player.status}</TD>
                      <TD>{player.points_per_game}</TD>
                      <TD>{player.now_cost / 10}</TD>
                      <TD>{player.total_points}</TD>
                    </PlayerInfo>
                  );
                })}
            </tbody>
          </Table>
        </Container>
      </Data>
    </StyledTeam>
  );
};

const StyledTeam = styled.div`

`;

const Header = styled.div`
  padding: ${({ theme }) => theme.spacing};
  border-bottom: 5px solid ${({ theme }) => theme.colours.greyDarkest};
`;

const HeaderContainer = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Badge = styled.img`
  width: 30%;
  max-width: 200px;
`;

const Name = styled.h1`
  padding: ${({ theme }) => theme.spacing} ${({ theme }) => theme.spacingValue * 2}px;
`;

const Data = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: ${({ theme }) => theme.spacing};
  };
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const tableStyles = css`
  font-size: ${({ theme }) => theme.font.size.small};
  text-align: center;

  &:first-child {
    text-align: left;
    padding: ${({ theme }) => theme.spacing};
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    min-width: 50px;
    font-size: ${({ theme }) => theme.font.size.body};
  };
`;

const TD = styled.td`
  ${tableStyles};
`;

const TH = styled.th`
  ${tableStyles};
`;

const ContainerHeader = styled.h2`
  margin-left: ${({ theme }) => theme.spacing};

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    margin-left: 0;
  };
`;

const PlayerInfo = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colours.greyDark};
  height: ${({ theme }) => theme.spacingValue * 3}px;
`;

const StyledLink = styled(Link)`
  color: inherit;
`;
