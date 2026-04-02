import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const PLAYERS_BY_PROP_AND_POSITION_QUERY = gql`
  query playersByPropAndPos($prop: String, $position: String, $amount: Int) {
    playersByPropAndPos(prop: $prop, position: $position, amount: $amount) {
      players {
        id
        web_name
        team
        now_cost
        total_points
      }
    }
  }
`;

export const HighestRated = ({ position, teams }) => {
  const { loading, error, data } = useQuery(
    PLAYERS_BY_PROP_AND_POSITION_QUERY,
    {
      variables: {
        prop: "total_points",
        position,
        amount: 10,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading)
    return (
      <GridItem>
        <Skeleton $loading />
      </GridItem>
    );
  if (error) return `Error loading highest rated ${position}s.`;

  const getTeamName = (id) => {
    return teams.find((team) => team.id === id)?.short_name || "?";
  };

  if (!data) return null;

  const {
    playersByPropAndPos: { players },
  } = data;

  return (
    <GridItem>
      <PositionTitle>{position}s</PositionTitle>
      <List>
        {players &&
          players.map((player) => {
            return (
              <ListItem key={player.id}>
                <NameCol>
                  <PlayerLink to={`/player/${player.id}`}>
                    {player.web_name}
                  </PlayerLink>
                  <TeamChip>
                    <TeamLink to={`/team/${player.team}`}>
                      {getTeamName(player.team)}
                    </TeamLink>
                  </TeamChip>
                </NameCol>
                <Cost>£{player.now_cost / 10}m</Cost>
                <Points>{player.total_points}</Points>
              </ListItem>
            );
          })}
      </List>
    </GridItem>
  );
};

const Skeleton = styled.div`
  ${({ theme }) => theme.skeletonLoadingAnimation}
  ${({ $loading }) =>
    $loading ? "animation: skeleton-loading 1s linear infinite alternate;" : ""}
  background: ${({ theme }) => theme.colours.surfaceContainer};
  border-radius: 4px;
  min-height: 25rem;
`;

const GridItem = styled.div`
  background: ${({ theme }) => theme.colours.surfaceContainer};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing};
  box-sizing: border-box;
`;

const PositionTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.size.lead};
  text-transform: capitalize;
  color: ${({ theme }) => theme.colours.primary};
  margin: 0 0 ${({ theme }) => theme.spacingSmall};
  letter-spacing: 0.03em;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 6px 4px;
  border-radius: 4px;

  &:nth-child(even) {
    background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  }
`;

const NameCol = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PlayerLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colours.onSurface};
  font-size: ${({ theme }) => theme.font.size.small};
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colours.primary};
    text-decoration: none;
  }
`;

const TeamChip = styled.span`
  display: inline-block;
`;

const TeamLink = styled(Link)`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  text-decoration: none;
  background: ${({ theme }) => theme.colours.surfaceBright};
  padding: 1px 5px;
  border-radius: 3px;

  &:hover {
    color: ${({ theme }) => theme.colours.primary};
    text-decoration: none;
  }
`;

const Cost = styled.span`
  width: 20%;
  font-size: ${({ theme }) => theme.font.size.xsmall};
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  text-align: right;
`;

const Points = styled.span`
  width: 20%;
  font-size: ${({ theme }) => theme.font.size.small};
  font-weight: 700;
  color: ${({ theme }) => theme.colours.secondary};
  text-align: right;
`;
