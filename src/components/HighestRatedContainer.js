import React from "react";
import styled from "styled-components/macro";

import { HighestRated } from "./HighestRated";

export const HighestRatedContainer = ({ teamData }) => {
  const { teams } = teamData;

  return (
    <Section>
      <SectionLabel>Stats by Position</SectionLabel>
      <Grid>
        <HighestRated position="goalkeeper" teams={teams} />
        <HighestRated position="defender" teams={teams} />
        <HighestRated position="midfielder" teams={teams} />
        <HighestRated position="forward" teams={teams} />
      </Grid>
    </Section>
  );
};

const Section = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing} ${({ theme }) => theme.spacing};
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacingSmall};

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;