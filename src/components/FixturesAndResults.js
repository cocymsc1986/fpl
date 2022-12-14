import React from "react";
import styled from 'styled-components/macro';

import { Fixtures } from "./Fixtures/Fixtures";
import { UpcomingFixtures } from "./UpcomingFixtures";

export const FixturesAndResults = ({ teamData, gw }) => {
  return (
    <StyledResults>
      <Header>Fixtures & Results</Header>
      <Body>
        <Fixtures teamData={teamData} gw={gw} />
        <UpcomingFixtures teamData={teamData} />
      </Body>
    </StyledResults>
  );
};

const StyledResults = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing};
`;

const Header = styled.h2`
  margin-top: 0;
`;

const Body = styled.section`
  display: flex;
  flex-flow: wrap;
`;
