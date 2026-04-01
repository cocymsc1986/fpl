import React from "react";
import styled from "styled-components/macro";

import { Fixtures } from "./Fixtures/Fixtures";
import { UpcomingFixtures } from "./UpcomingFixtures";

export const FixturesAndResults = ({ teamData, gw }) => {
  return (
    <StyledResults>
      <SectionLabel>Fixtures &amp; Results</SectionLabel>
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

const SectionLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.size.subheader};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurface};
  margin: 0 0 ${({ theme }) => theme.spacingSmall};
  letter-spacing: 0.03em;
`;

const Body = styled.section`
  display: flex;
  flex-flow: wrap;
  gap: ${({ theme }) => theme.spacing};
`;
