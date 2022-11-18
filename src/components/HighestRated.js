import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Loader } from "./Loader";

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

  if (loading) return <Loader />;
  if (error) {
    // console.log(error);
    return `Error loading highest rated ${position}s.`;
  }

  const getTeamName = (id) => {
    return teams.find((team) => team.id === id).short_name;
  };

  if (!data) return null; // fix eslint/consistent-returns

  const {
    playersByPropAndPos: { players },
  } = data;

  return (
    <GridItem>
      <Title>{position}s</Title>
      <List>
        {players &&
          players.map(player => {
            return (
              <ListItem key={player.id}>
                <Name>
                  <PlayerLink to={`/player/${player.id}`}>
                    {player.web_name}
                  </PlayerLink>
                  <TeamLink to={`/team/${player.team}`}>
                    {getTeamName(player.team)}
                  </TeamLink>
                </Name>
                <Cost>
                  {player.now_cost / 10}
                </Cost>
                <Points>
                  {player.total_points}
                </Points>
              </ListItem>
            );
          })}
      </List>
    </GridItem>
  );
};

const GridItem = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacingSmall} 0;
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    width: 50%;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 25%;
  };
`;

const Title = styled.h3`
  text-transform: capitalize;
  margin-top: 0;
  `;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  display: flex;
  margin-bottom: 4px;
`;

const Name = styled.div`
  font-weight: bold;
  width: 60%;
  cursor: pointer;
`;

const PlayerLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colours.black};

  :hover {
    text-decoration: underline;
  };
`;

const TeamLink = styled(Link)`
  font-weight: normal;
  font-size: ${({ theme }) => theme.font.size.small};
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

const Cost = styled.span`
  width: 20%;
`;

const Points = styled.span`
  width: 20%;
`;