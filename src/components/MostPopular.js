import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const PLAYER_WITH_HIGHEST_PROP_QUERY = gql`
  query playerWithHighestProp($prop: String) {
    playerWithHighestProp(prop: $prop) {
      player {
        id
        code
        web_name
        selected_by_percent
        total_points
        transfers_in_event
        transfers_out_event
        form
        value_form
      }
    }
  }
`;

const statMap = {
  selected_by_percent: "Most Selected",
  total_points: "Total Points",
  transfers_in_event: "Most In This Week",
  transfers_out_event: "Most Out This Week",
  form: "Form",
  value_form: "Best Value",
};

export const MostPopular = ({ stat }) => {
  const { loading, error, data } = useQuery(PLAYER_WITH_HIGHEST_PROP_QUERY, {
    variables: {
      prop: stat,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <CardOuter>
        <CardContent $loading />
      </CardOuter>
    );
  }

  if (error) {
    return "Error loading most popular players.";
  }

  const { playerWithHighestProp } = data;
  const { player } = playerWithHighestProp;

  return (
    <CardOuter>
      <CardContent>
        <StatLabel>{statMap[stat]}</StatLabel>
        <PlayerName>
          <StyledLink to={`/player/${player.id}`}>{player.web_name}</StyledLink>
        </PlayerName>
        <StatValue>
          {player[stat]}
          {stat === "selected_by_percent" && "%"}
        </StatValue>
        <ImageContainer>
          <img
            src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.code}.png`}
            alt={player.web_name}
            width="110"
            height="140"
          />
        </ImageContainer>
      </CardContent>
    </CardOuter>
  );
};

const CardOuter = styled.div`
  padding: 2px;
`;

const CardContent = styled.div`
  ${({ theme }) => theme.skeletonLoadingAnimation}

  position: relative;
  padding: ${({ theme }) => theme.spacing};
  background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  color: ${({ theme }) => theme.colours.onSurface};
  overflow: hidden;
  min-height: 7rem;
  border-radius: 4px;
  transition: background 0.2s ease;

  ${({ $loading }) =>
    $loading ? "animation: skeleton-loading 1s linear infinite alternate;" : ""}

  &:hover {
    background: ${({ theme }) => theme.colours.surfaceContainerHighest};
  }
`;

const StatLabel = styled.h3`
  margin: 0 0 4px;
  font-family: ${({ theme }) => theme.font.familyDefault};
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
`;

const PlayerName = styled.h2`
  margin: 0 0 4px;
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colours.onSurface};
  line-height: 1.1;
`;

const StatValue = styled.p`
  color: ${({ theme }) => theme.colours.secondary};
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colours.onSurface};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colours.primary};
    text-decoration: none;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  bottom: -50px;
  right: -8px;
  pointer-events: none;
  opacity: 0.35;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xlarge}) {
    display: block;
  }
`;
