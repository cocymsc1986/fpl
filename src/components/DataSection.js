import React from "react";
import { gql, useQuery } from "@apollo/client";

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
  if (error || gwStatusError) {
    // console.log(error);
    return "Error loading teamData.";
  }

  const { allTeams } = data;
  const gw = gwStatusData.eventStatus.status[0].event;

  return (
    <>
      <MostPopularContainer teamData={allTeams} />
      <HighestRatedContainer teamData={allTeams} />
      <FixturesAndResults teamData={allTeams} gw={gw} />
    </>
  );
};
