import React, { useState } from "react";
import { gql, ApolloConsumer } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const PLAYERS_SEARCH_QUERY = gql`
  query playersSearch($term: String) {
    playersSearch(term: $term) {
      players {
        id
        first_name
        second_name
        web_name
      }
    }
  }
`;

export const Search = () => {
  const [term, setTerm] = useState("");
  const [searchableData, setSearchableData] = useState(null);

  const executeSearch = async (client, termArg) => {
    setTerm(termArg);
    if (!termArg) {
      setSearchableData(null);
      return;
    }

    const MAX_NUM_OF_RESULTS = 10;
    const {
      data: {
        playersSearch: { players },
      },
    } = await client.query({
      query: PLAYERS_SEARCH_QUERY,
      variables: { term, MAX_NUM_OF_RESULTS },
    });
    setSearchableData(players);
  };

  return (
    <ApolloConsumer>
      {(client) => (
        <StyledSearch>
          <SearchWrapper>
            <SearchIcon className="material-symbols-outlined">search</SearchIcon>
            <SearchInput
              placeholder="Search for a player..."
              onChange={(e) => executeSearch(client, e.target.value)}
              value={term}
            />
            {searchableData && (
              <SearchResults>
                {searchableData.length
                  ? searchableData.map((player) => {
                      return (
                        <SearchItem key={`search-${player.id}`}>
                          <SearchResult to={`player/${player.id}`}>
                            {player.first_name} {player.second_name}
                          </SearchResult>
                        </SearchItem>
                      );
                    })
                  : <NoResults>No results</NoResults>}
              </SearchResults>
            )}
          </SearchWrapper>
        </StyledSearch>
      )}
    </ApolloConsumer>
  );
};

const StyledSearch = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacingSmall} ${({ theme }) => theme.spacing};
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 14px;
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  font-size: 20px;
  pointer-events: none;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: ${({ theme }) => theme.font.size.lead};
  font-family: ${({ theme }) => theme.font.familyDefault};
  padding: 14px 16px 14px 46px;
  background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  color: ${({ theme }) => theme.colours.onSurface};
  border: 2px solid transparent;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colours.onSurfaceVariant};
    font-family: ${({ theme }) => theme.font.familyDefault};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colours.primary};
    box-shadow: 0 0 0 3px rgba(253, 180, 248, 0.15);
  }
`;

const SearchResults = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colours.surfaceContainerHighest};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacingSmall} 0;
  list-style: none;
  margin: 0;
  z-index: 200;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;

const SearchItem = styled.li`
  padding: 0;

  &:hover {
    background: ${({ theme }) => theme.colours.surfaceContainerHigh};
  }
`;

const SearchResult = styled(Link)`
  display: block;
  padding: 10px ${({ theme }) => theme.spacing};
  font-size: ${({ theme }) => theme.font.size.lead};
  color: ${({ theme }) => theme.colours.onSurface};
  font-family: ${({ theme }) => theme.font.familyDefault};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colours.primary};
    text-decoration: none;
  }
`;

const NoResults = styled.li`
  padding: 10px ${({ theme }) => theme.spacing};
  color: ${({ theme }) => theme.colours.onSurfaceVariant};
  font-size: ${({ theme }) => theme.font.size.body};
  list-style: none;
`;
