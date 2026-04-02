import React from "react";
import styled from "styled-components/macro";

import { MostPopular } from "./MostPopular";

const mostPopularValues = [
  "selected_by_percent",
  "total_points",
  "transfers_in_event",
  "transfers_out_event",
  "form",
  "value_form",
];

export const MostPopularContainer = () => {
  return (
    <Section>
      <SectionHeader>
        <SectionLabel>Top Performers</SectionLabel>
      </SectionHeader>
      <BentoGrid>
        {mostPopularValues.map((value) => {
          return <MostPopular key={value} stat={value} />;
        })}
      </BentoGrid>
    </Section>
  );
};

const Section = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing} ${({ theme }) => theme.spacing};
`;

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacingSmall};
`;

const SectionLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.headerDefault};
  font-style: italic;
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.size.subheader};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.onSurface};
  margin: ${({ theme }) => theme.spacing} 0 ${({ theme }) => theme.spacingSmall};
  letter-spacing: 0.03em;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xlarge}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;
