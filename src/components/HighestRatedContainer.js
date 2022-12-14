import React from "react";
import styled from 'styled-components/macro';

import { HighestRated } from "./HighestRated";

export const HighestRatedContainer = ({ teamData }) => {
  const { teams } = teamData;

  return (
    <StyledRated>
      <Header>Top performers</Header>
      <Grid>
        <HighestRated position="goalkeeper" teams={teams} />
        <HighestRated position="defender" teams={teams} />
        <HighestRated position="midfielder" teams={teams} />
        <HighestRated position="forward" teams={teams} />
      </Grid>
    </StyledRated>
  );
};

const StyledRated = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  padding: ${({ theme }) => theme.spacing};
  margin: 0 auto;
`;

const Header = styled.h2`
  margin: 0px 0px ${({ theme }) => theme.spacing};
`;

const Grid = styled.div`
  display: flex;
  flex-flow: wrap;
`;