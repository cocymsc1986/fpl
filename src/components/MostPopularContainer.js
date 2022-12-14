import React from "react";
import styled from 'styled-components/macro';

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
    <>
      <Header>
        <H2>This week&#39;s top performers</H2>
      </Header>
      <StyledPopular>
        <Wrapper>
          {mostPopularValues.map((value, i) => {
            return <MostPopular key={value} block={i} stat={value} />;
          })}
        </Wrapper>
      </StyledPopular>
    </>
  );
};

const Header = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  padding: ${({ theme }) => theme.spacing};
  margin: 0 auto;
`;

const H2 = styled.h2`
  margin: 0;
`;

const StyledPopular = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto ${({ theme }) => theme.spacing};
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: wrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.xlarge}) {
    margin: 0 -8px;
  };
`;
