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
                  : "No results"}
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
  margin: 0 0 ${({ theme }) => theme.spacing};
`;

const SearchWrapper = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colours.greyDarkest};
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: ${`calc(100% - ${({ theme }) => theme.spacingValue * 2}px)`};
  font-size: ${({ theme }) => theme.font.size.lead};
  padding: ${({ theme }) => theme.spacing};
  border: none;

  ::placeholder {
    font-family: ${({ theme }) => theme.font.familyDefault};
    color: ${({ theme }) => theme.colours.grey};
  }

  &:focus {
    outline: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 600px;
  } ;
`;

const SearchResults = styled.ul`
  position: absolute;
  top: 32px;
  min-width: 400px;
  font-size: ${({ theme }) => theme.font.size.lead};
  padding: ${({ theme }) => theme.spacingSmall};
  background: white;
  border: 1px solid ${({ theme }) => theme.colours.green};
  cursor: pointer;
  list-style-type: none;
  z-index: 1;
  box-shadow: 0px 4px 15px -4px black;
`;

const SearchItem = styled.li`
  padding: 4px 8px 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchResult = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colours.black};
`;
