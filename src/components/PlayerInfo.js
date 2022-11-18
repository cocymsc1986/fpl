import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { TeamFixtures } from "./TeamFixtures";
import { Loader } from "./Loader";

const PLAYER_QUERY = gql`
  query player($id: Int) {
    player(id: $id) {
      first_name
      second_name
      web_name
      squad_number
      selected_by_percent
      total_points
      goals_scored
      assists
      bonus
      transfers_in_event
      transfers_out_event
      form
      value_form
      code
      team_code
      assists
      clean_sheets
      goals_conceded
      own_goals
      penalties_saved
      penalties_missed
      yellow_cards
      red_cards
      saves
      influence
      creativity
      threat
      event_points
      now_cost
      in_dreamteam
      selected_by_percent
      news
      element_type
      status
      chance_of_playing_this_round
      points_per_game
      team
    }
  }
`;

export const PlayerInfo = ({ id }) => {
  const { loading, error, data } = useQuery(PLAYER_QUERY, {
    variables: {
      id,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Loader />;
  if (error) {
    // console.log(error);
    return "Error loading player.";
  }

  const { player } = data;

  const {
    first_name,
    second_name,
    web_name,
    squad_number,
    selected_by_percent,
    total_points,
    goals_scored,
    assists,
    bonus,
    transfers_in_event,
    transfers_out_event,
    form,
    value_form,
    code,
    team_code,
    clean_sheets,
    goals_conceded,
    own_goals,
    penalties_saved,
    penalties_missed,
    yellow_cards,
    red_cards,
    saves,
    influence,
    creativity,
    threat,
    event_points,
    now_cost,
    news,
    element_type,
    status,
    chance_of_playing_this_round,
    points_per_game,
    team,
  } = player;

  const keeper = element_type === 1;
  const defence = element_type === 2;

  return (
    <section>
      <Header>
        <HeaderContainer>
          <img
            src={`https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p${code}.png`}
            alt={web_name}
            width="220"
            height="280"
          />
          <HeaderInfo>
            <h2>
              {squad_number && `${squad_number}. `}
              {first_name} {second_name}
            </h2>
            <p>
              Points:{" "}
              <HeaderValues>{total_points}</HeaderValues>
            </p>
            {(keeper || defence) && (
              <p>
                Clean sheets:{" "}
                <HeaderValues>{clean_sheets}</HeaderValues>
              </p>
            )}
            {keeper && (
              <p>
                Penalties saved:{" "}
                <HeaderValues>
                  {penalties_saved}
                </HeaderValues>
              </p>
            )}
            {!keeper && (
              <>
                <p>
                  Goals:{" "}
                  <HeaderValues>
                    {goals_scored}
                  </HeaderValues>
                </p>
                <p>
                  Assists:{" "}
                  <HeaderValues>{assists}</HeaderValues>
                </p>
              </>
            )}
            <StyledLink to={`/team/${team}`}>
              <img
                src={`https://resources.premierleague.com/premierleague/badges/t${team_code}.svg`}
                alt="team logo"
              />
            </StyledLink>
          </HeaderInfo>
        </HeaderContainer>
      </Header>
      <TeamFixtures id={team} />
      <Body>
        <BodyHeader>Player stats</BodyHeader>
        <BodyList>
          <ListItem>
            Total points: <Span>{total_points}</Span>
          </ListItem>
          <ListItem>
            Points this week: <Span>{event_points}</Span>
          </ListItem>
          <ListItem>
            Points per game: <Span>{points_per_game}</Span>
          </ListItem>
          <ListItem>
            Cost: <Span>{now_cost / 10}</Span>
          </ListItem>
          <ListItem>
            Status: <Span>{status}</Span>
          </ListItem>
          <ListItem>
            Value/Form: <Span>{value_form}</Span>
          </ListItem>
          <ListItem>
            Form: <Span>{form}</Span>
          </ListItem>
          <ListItem>
            Selected by: <Span>{selected_by_percent}%</Span>
          </ListItem>
          <ListItem>
            Transferred in this week: <Span>{transfers_in_event}</Span>
          </ListItem>
          <ListItem>
            Transferred out this week: <Span>{transfers_out_event}</Span>
          </ListItem>
          <ListItem>
            Position: <Span>{element_type}</Span>
          </ListItem>
          <ListItem>
            Chance of playing:{" "}
            <Span>{chance_of_playing_this_round || "Fit"}</Span>
          </ListItem>
          <ListItem>
            Goals: <Span>{goals_scored}</Span>
          </ListItem>
          <ListItem>
            Assists: <Span>{assists}</Span>
          </ListItem>
          <ListItem>
            Clean sheets: <Span>{clean_sheets}</Span>
          </ListItem>
          <ListItem>
            Goals conceded: <Span>{goals_conceded}</Span>
          </ListItem>
          <ListItem>
            Own goals: <Span>{own_goals}</Span>
          </ListItem>
          <ListItem>
            Penalties saved: <Span>{penalties_saved}</Span>
          </ListItem>
          <ListItem>
            Penalties missed: <Span>{penalties_missed}</Span>
          </ListItem>
          <ListItem>
            Yellow cards: <Span>{yellow_cards}</Span>
          </ListItem>
          <ListItem>
            Red cards: <Span>{red_cards}</Span>
          </ListItem>
          <ListItem>
            Saves: <Span>{saves}</Span>
          </ListItem>
          <ListItem>
            Bonus: <Span>{bonus}</Span>
          </ListItem>
          <ListItem>
            Influence: <Span>{influence}</Span>
          </ListItem>
          <ListItem>
            Creativity: <Span>{creativity}</Span>
          </ListItem>
          <ListItem>
            Threat: <Span>{threat}</Span>
          </ListItem>
          <ListItem>
            News: <Span>{news || "None"}</Span>
          </ListItem>
        </BodyList>
      </Body>
    </section>
  );
};

const Header = styled.header`
  position: relative;
  border-bottom: 5px solid ${({ theme }) => theme.colours.greyDarkest};
  margin: ${({ theme }) => theme.spacingValue}px 0 0;
`;

const HeaderContainer = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  display: flex;
`;

const HeaderInfo = styled.div`
  margin-left: ${({ theme }) => theme.spacingValue * 2}px;

  p {
    margin: 0;
  };
`;

const HeaderValues = styled.span`
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  display: block;
  position: relative;
  margin-top: ${({ theme }) => theme.spacing};
  margin-bottom: 4px;
  height: 80px;
  width: 80px;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: 100px;
    width: 100px;
  };
`;

const Body = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const BodyHeader = styled.h2`
  margin-left: ${({ theme }) => theme.spacing};
`;

const BodyList = styled.ul`
  list-style-type: none;
  margin-left: ${({ theme }) => theme.spacing};
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 4px;
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: bold;
`;