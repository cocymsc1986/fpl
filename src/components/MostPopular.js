import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled, { css } from "styled-components/macro";
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

export const MostPopular = ({ stat }) => {
  const { loading, error, data } = useQuery(PLAYER_WITH_HIGHEST_PROP_QUERY, {
    variables: {
      prop: stat,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <Block>
        <BlockContent loading>&nbsp;</BlockContent>
      </Block>
    );
  }

  if (error) {
    return "Error loading most popular players.";
  }

  const { playerWithHighestProp } = data;

  const statMap = {
    selected_by_percent: "Most Selected",
    total_points: "Total Points",
    transfers_in_event: "Most In This Week",
    transfers_out_event: "Most Out This Week",
    form: "Form",
    value_form: "Best Value",
  };

  const { player } = playerWithHighestProp;

  return (
    <Block>
      <BlockContent>
        <H3>{statMap[stat]}</H3>
        <H2>
          <StyledLink to={`/player/${player.id}`}>{player.web_name}</StyledLink>
        </H2>
        <Value>
          {player[stat]}
          {stat === "selected_by_percent" && "%"}
        </Value>
        <ImageContainer>
          <img
            src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.code}.png`}
            alt={player.web_name}
            width="157"
            height="200"
          />
        </ImageContainer>
      </BlockContent>
    </Block>
  );
};

const StyledLink = styled(Link)`
  color: white;
`;

const Block = styled.div`
  width: 100%;
  padding: 1px;
  box-sizing: border-box;
  flex-grow: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    width: 50%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 25%;
  }
`;

const BlockContent = styled.div`
  ${({ theme }) => theme.skeletonLoadingAnimation}

  position: relative;
  padding: ${({ theme }) => theme.spacing};
  background: ${({ theme }) => theme.colours.black};
  color: white;
  overflow: hidden;
  min-height: 6.1rem;
  ${(props) =>
    props.loading
      ? "animation: skeleton-loading 1s linear infinite alternate"
      : ""};
`;

const HeaderStyles = css`
  margin: 0 0 ${({ theme }) => theme.spacingSmall};
`;

const H2 = styled.h2`
  ${HeaderStyles};
  font-family: ${({ theme }) => theme.font.familyDefault};
  font-size: ${({ theme }) => theme.font.size.header};
  font-weight: 100;
`;

const H3 = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.font.headerDefault};
  letter-spacing: 1px;
  font-weight: 100;
`;

const Value = styled.h3`
  color: ${({ theme }) => theme.colours.green};
  margin: 0;
`;

const ImageContainer = styled.div`
  position: absolute;
  bottom: -90px;
  right: 0;
  pointer-events: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xlarge}) {
    display: block;
  }
`;
