import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/macro";

import { HighestRatedContainer } from "./HighestRatedContainer";
import { MostPopularContainer } from "./MostPopularContainer";
import { FixturesAndResults } from "./FixturesAndResults";
import { Loader } from "./Loader";

const ALL_TEAMS_QUERY = gql`
  query allTeams {
    allTeams {
      teams {
        id
        code
        name
        short_name
      }
    }
  }
`;

const EVENT_STATUS_QUERY = gql`
  query eventStatus {
    eventStatus {
      status {
        event
      }
    }
  }
`;

export const DataSection = () => {
  const { loading, error, data } = useQuery(ALL_TEAMS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: gwStatusLoading,
    error: gwStatusError,
    data: gwStatusData,
  } = useQuery(EVENT_STATUS_QUERY);

  if (loading || gwStatusLoading) return <Loader />;
  if (error || gwStatusError) return "Error loading teamData.";

  const { allTeams } = data;
  const gw = gwStatusData?.eventStatus?.status[0]?.event;

  return (
    <>
      {gw && (
        <GWBanner>
          <GWLabel>Current Gameweek</GWLabel>
          <GWNumber>GW{gw}</GWNumber>
        </GWBanner>
      )}
      <MostPopularContainer teamData={allTeams} />
      <HighestRatedContainer teamData={allTeams} />
      <FixturesAndResults teamData={allTeams} gw={gw} />
    </>
  );
};

const GWBanner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: ${({ theme }) => theme.spacingSmall} auto;
  padding: 14px ${({ theme }) => theme.spacing};
  background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  border-left: 4px solid ${({ theme }) => theme.colours.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GWLabel = styled.span`
  font-family: ${({ theme }) => theme.font.familyDefault};
  font-size: ${({ theme }) => theme.font.size.xsmall};
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
`;

const GWNumber = styled.span`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.size.header};
  color: ${({ theme }) => theme.colours.primary};
  line-height: 1;
`;
