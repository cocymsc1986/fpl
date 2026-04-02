import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

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
      bps
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

const POSITION_MAP = { 1: "Goalkeeper", 2: "Defender", 3: "Midfielder", 4: "Forward" };

const normalize = (value, max) => Math.min(parseFloat(value) / max, 1) || 0;

// Pure SVG radar chart sub-component
const RadarChart = ({ axes }) => {
  const cx = 100;
  const cy = 100;
  const R = 72;
  const N = axes.length;
  const labelR = R * 1.32;

  const getPoint = (i, v) => {
    const angle = (2 * Math.PI / N) * i - Math.PI / 2;
    return [cx + R * v * Math.cos(angle), cy + R * v * Math.sin(angle)];
  };

  const getLabelPoint = (i) => {
    const angle = (2 * Math.PI / N) * i - Math.PI / 2;
    return [cx + labelR * Math.cos(angle), cy + labelR * Math.sin(angle)];
  };

  const toPolygon = (points) => points.map(([x, y]) => `${x},${y}`).join(" ");

  const gridRings = [0.25, 0.5, 0.75, 1].map((level) =>
    toPolygon(axes.map((_, i) => getPoint(i, level)))
  );

  const dataPoints = toPolygon(axes.map(({ value }, i) => getPoint(i, value)));

  return (
    <RadarWrapper>
      <RadarTitle>Performance Radar</RadarTitle>
      <svg viewBox="0 0 200 200" width="100%" style={{ maxHeight: 240, display: "block" }}>
        {/* Grid rings */}
        {gridRings.map((pts, i) => (
          <polygon
            key={`ring-${i * 0.25 + 0.25}`}
            points={pts}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}
        {/* Axis lines */}
        {axes.map(({ label }, i) => {
          const [x, y] = getPoint(i, 1);
          return (
            <line
              key={`axis-${label}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}
        {/* Data polygon */}
        <polygon
          points={dataPoints}
          fill="rgba(253,180,248,0.15)"
          stroke="#fdb4f8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Axis labels */}
        {axes.map(({ label }, i) => {
          const [x, y] = getLabelPoint(i);
          return (
            <text
              key={`label-${label}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="7"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              fill="#acabaa"
              letterSpacing="0.5"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </RadarWrapper>
  );
};

export const PlayerInfo = ({ id }) => {
  const { loading, error, data } = useQuery(PLAYER_QUERY, {
    variables: {
      id,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Loader />;
  if (error) return "Error loading player.";

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
    bps,
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

  const isGK = element_type === 1;
  const isDEF = element_type === 2;
  const position = POSITION_MAP[element_type] || "Player";

  const radarAxes = isGK || isDEF
    ? [
        { label: "INFLUENCE", value: normalize(influence, 1500) },
        { label: "CREATIVITY", value: normalize(creativity, 1200) },
        { label: "THREAT", value: normalize(threat, 1000) },
        { label: "FORM", value: normalize(form, 10) },
        { label: "SAVES", value: normalize(saves, 200) },
        { label: "CLN SHT", value: normalize(clean_sheets, 20) },
      ]
    : [
        { label: "INFLUENCE", value: normalize(influence, 1500) },
        { label: "CREATIVITY", value: normalize(creativity, 1200) },
        { label: "THREAT", value: normalize(threat, 1000) },
        { label: "FORM", value: normalize(form, 10) },
        { label: "GOALS", value: normalize(goals_scored, 25) },
        { label: "ASSISTS", value: normalize(assists, 15) },
      ];

  return (
    <>
      {/* Full-width hero */}
      <Hero>
        <HeroOverlay />
        <HeroInner>
          <HeroImage
            src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`}
            alt={web_name}
          />
          <HeroContent>
            <HeroMeta>
              <MetaLabel>
                <StyledTeamLink to={`/team/${team}`}>
                  <TeamBadgeSmall
                    src={`https://resources.premierleague.com/premierleague/badges/t${team_code}.svg`}
                    alt="team"
                  />
                </StyledTeamLink>
                {position}
              </MetaLabel>
            </HeroMeta>
            <HeroName>
              {squad_number && `${squad_number}. `}
              {first_name} {second_name}
            </HeroName>
            <BadgeRow>
              <PriceBadge>£{now_cost / 10}m</PriceBadge>
              <TSBBadge>{selected_by_percent}% TSB</TSBBadge>
              {status !== "a" && (
                <StatusBadge>{chance_of_playing_this_round || status}</StatusBadge>
              )}
            </BadgeRow>
          </HeroContent>
        </HeroInner>
      </Hero>

      {/* Stats Area */}
      <StatsArea>
        {/* Highlight card: Total Points + Form */}
        <HighlightCard>
          <div>
            <StatMeta>Total Points</StatMeta>
            <BigStat>{total_points}</BigStat>
          </div>
          <div style={{ textAlign: "right" }}>
            <StatMeta>Form</StatMeta>
            <FormStat>{form}</FormStat>
          </div>
        </HighlightCard>

        {/* Radar Chart */}
        <RadarChart axes={radarAxes} />

        {/* 2x2 bento grid */}
        <StatGrid>
          <StatCell $accent="#00fd84">
            <CellLabel>ICT Index</CellLabel>
            <CellValue>{(parseFloat(influence) + parseFloat(creativity) + parseFloat(threat)).toFixed(1)}</CellValue>
          </StatCell>
          <StatCell $accent="#fdb4f8">
            <CellLabel>Value / Form</CellLabel>
            <CellValue>{value_form}</CellValue>
          </StatCell>
          <StatCell $accent="#ff6e85">
            <CellLabel>Availability</CellLabel>
            <CellValue>{chance_of_playing_this_round ? `${chance_of_playing_this_round}%` : "Fit"}</CellValue>
          </StatCell>
          <StatCell $accent="#484848">
            <CellLabel>Pts per Game</CellLabel>
            <CellValue>{points_per_game}</CellValue>
          </StatCell>
        </StatGrid>

        {/* Fixture strip */}
        <TeamFixtures id={team} />

        {/* Full stats list */}
        <FullStatsList>
          <StatListTitle>Full Stats</StatListTitle>
          {[
            ["Points this week", event_points],
            ["Goals", goals_scored],
            ["Assists", assists],
            ["Clean sheets", clean_sheets],
            ["Goals conceded", goals_conceded],
            ["Own goals", own_goals],
            ["Saves", saves],
            ["Penalties saved", penalties_saved],
            ["Penalties missed", penalties_missed],
            ["Yellow cards", yellow_cards],
            ["Red cards", red_cards],
            ["Bonus points", bps],
            ["Influence", influence],
            ["Creativity", creativity],
            ["Threat", threat],
            ["Transfers in (week)", transfers_in_event],
            ["Transfers out (week)", transfers_out_event],
            ["Selected by", `${selected_by_percent}%`],
          ].map(([label, value]) => (
            <StatRow key={label}>
              <StatRowLabel>{label}</StatRowLabel>
              <StatRowValue>{value}</StatRowValue>
            </StatRow>
          ))}
        </FullStatsList>

        {/* News */}
        {news && (
          <NewsCard>
            <NewsTitle>Latest News</NewsTitle>
            <NewsText>{news}</NewsText>
          </NewsCard>
        )}
      </StatsArea>
    </>
  );
};

/* ─── Styled Components ─────────────────────────────────────── */

const Hero = styled.header`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.colours.surfaceContainerHigh};
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing};
  min-height: 240px;
  display: flex;
  align-items: flex-end;
`;

const HeroImage = styled.img`
  position: absolute;
  right: 0;
  bottom: -30px;
  height: 100%;
  max-height: 280px;
  width: auto;
  object-fit: contain;
  pointer-events: none;
  z-index: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    right: 25px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      transparent 40%,
      ${({ theme }) => theme.colours.surface} 100%
    ),
    linear-gradient(
      to right,
      ${({ theme }) => theme.colours.surface} 40%,
      rgba(14, 14, 14, 0.2) 100%
    );
  z-index: 1;
`;

const HeroContent = styled.div`
  max-width: 65%;
`;

const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

const MetaLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.primary};
`;

const TeamBadgeSmall = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const StyledTeamLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

const HeroName = styled.h1`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurface};
  margin: 0 0 8px;
  line-height: 1.05;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
`;

const PriceBadge = styled.span`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colours.secondaryContainer};
  color: ${({ theme }) => theme.colours.onSecondaryContainer};
`;

const TSBBadge = styled.span`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colours.surfaceContainerHighest};
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
`;

const StatusBadge = styled.span`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 20px;
  background: rgba(255, 110, 133, 0.2);
  color: ${({ theme }) => theme.colours.tertiary};
`;

const StatsArea = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacingSmall};
`;

const HighlightCard = styled.div`
  background: ${({ theme }) => theme.colours.surfaceContainer};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatMeta = styled.p`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  margin: 0 0 4px;
`;

const BigStat = styled.span`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: ${({ theme }) => theme.colours.primary};
  line-height: 1;
`;

const FormStat = styled.span`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-weight: 700;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  color: ${({ theme }) => theme.colours.secondary};
  display: block;
`;

/* Radar */
const RadarWrapper = styled.div`
  background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing};
`;

const RadarTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  margin: 0 0 8px;
`;

/* 2x2 stat grid */
const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCell = styled.div`
  background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing};
  border-left: 3px solid ${({ $accent }) => $accent};
`;

const CellLabel = styled.p`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  margin: 0 0 4px;
`;

const CellValue = styled.p`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colours.onSurface};
  margin: 0;
`;

/* Full stats list */
const FullStatsList = styled.div`
  background: ${({ theme }) => theme.colours.surfaceContainerLow};
  border-radius: 12px;
  overflow: hidden;
`;

const StatListTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-size: ${({ theme }) => theme.font.size.lead};
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurface};
  margin: 0;
  padding: ${({ theme }) => theme.spacing};
  background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  letter-spacing: 0.05em;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px ${({ theme }) => theme.spacing};
  font-size: ${({ theme }) => theme.font.size.small};

  &:nth-child(even) {
    background: ${({ theme }) => theme.colours.surfaceContainer};
  }
`;

const StatRowLabel = styled.span`
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
`;

const StatRowValue = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colours.onSurface};
`;

/* News */
const NewsCard = styled.div`
  background: ${({ theme }) => theme.colours.surfaceContainerLow};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing};
  border-left: 3px solid ${({ theme }) => theme.colours.tertiary};
`;

const NewsTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.tertiary};
  margin: 0 0 8px;
`;

const NewsText = styled.p`
  font-size: ${({ theme }) => theme.font.size.small};
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;
