import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";

import { Loader } from "./Loader";

export const ChatPage = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const queryChat = async (input) => {
    setLoading(true);
    try {
      const res = await axios.post(
        // "https://testing-fpl-chat-api.loca.lt/question",
        "http://localhost:8000/question",
        {
          question: input,
        }
      );

      setResult(res);
    } catch (e) {
      setError(`Error calling api ${e.message}`);
    }
    setLoading(false);
  };

  if (error) {
    return error;
  }

  return (
    <StyledTeam>
      <Header>
        <HeaderContainer>
          <Name>FPL Chat</Name>
        </HeaderContainer>
      </Header>
      <SearchContainer>
        <SearchInput
          placeholder="Ask me something..."
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button type="button" onClick={() => queryChat(question)}>
          Submit
        </Button>
      </SearchContainer>
      {loading ? (
        <Loader />
      ) : (
        <span>
          {result && (
            <Data>
              <Container>
                <ContainerHeader>Player stats</ContainerHeader>

                <Table>
                  <thead>
                    <PlayerInfo>
                      <TH>Name</TH>
                      <TH>Form</TH>
                      <TH>Status</TH>
                      <TH>PPG</TH>
                      <TH>Cost</TH>
                      <TH>Points</TH>
                    </PlayerInfo>
                  </thead>
                  <tbody>
                    {result.data.answer.items.map((player) => {
                      return (
                        <PlayerInfo key={`player-info-${player.id}`}>
                          <TD>
                            <StyledLink to={`/player/${player.id}`}>
                              {player.first_name} {player.second_name}
                            </StyledLink>
                          </TD>
                          <TD>{player.form}</TD>
                          <TD>{player.status}</TD>
                          <TD>{player.points_per_game}</TD>
                          <TD>{player.now_cost / 10}</TD>
                          <TD>{player.total_points}</TD>
                        </PlayerInfo>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
            </Data>
          )}
        </span>
      )}
    </StyledTeam>
  );
};

const SearchContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colours.greyDarkest};
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colours.green};
  color: ${({ theme }) => theme.colours.greyDarkest};
  padding: ${({ theme }) => theme.spacing};
  font-size: ${({ theme }) => theme.font.size.body};
  border: none;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colours.greyDarkest};
    color: white;
  }
`;

const SearchInput = styled.input`
  font-size: ${({ theme }) => theme.font.size.body};
  padding: ${({ theme }) => theme.spacing};
  border: none;
  flex-grow: 1;

  ::placeholder {
    font-family: ${({ theme }) => theme.font.familyDefault};
    color: ${({ theme }) => theme.colours.grey};
  }

  &:focus {
    outline: none;
  }
`;

const StyledTeam = styled.div``;

const Header = styled.div`
  padding: ${({ theme }) => theme.spacing};
  border-bottom: 5px solid ${({ theme }) => theme.colours.greyDarkest};
`;

const HeaderContainer = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Name = styled.h1`
  padding: ${({ theme }) => theme.spacing}
    ${({ theme }) => theme.spacingValue * 2}px;
`;

const Data = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: ${({ theme }) => theme.spacing};
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const tableStyles = css`
  font-size: ${({ theme }) => theme.font.size.small};
  text-align: center;

  &:first-child {
    text-align: left;
    padding: ${({ theme }) => theme.spacing};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    min-width: 50px;
    font-size: ${({ theme }) => theme.font.size.body};
  }
`;

const TD = styled.td`
  ${tableStyles};
`;

const TH = styled.th`
  ${tableStyles};
`;

const ContainerHeader = styled.h2`
  margin-left: ${({ theme }) => theme.spacing};

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    margin-left: 0;
  }
`;

const PlayerInfo = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colours.greyDark};
  height: ${({ theme }) => theme.spacingValue * 3}px;
`;

const StyledLink = styled(Link)`
  color: inherit;
`;
