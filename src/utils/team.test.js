import { getTeamsFixturesAndDifficulties } from "./team";

describe("getTeamsFixturesAndDifficulties", () => {
  const startingData = [
    {
      team_a: 1,
      team_h: 11,
      team_a_difficulty: 3,
      team_h_difficulty: 4,
      __typename: "Fixture",
    },
    {
      team_a: 3,
      team_h: 1,
      team_a_difficulty: 4,
      team_h_difficulty: 2,
      __typename: "Fixture",
    },
    {
      team_a: 1,
      team_h: 4,
      team_a_difficulty: 3,
      team_h_difficulty: 4,
      __typename: "Fixture",
    },
  ];

  test("the output to be as expected", () => {
    expect(getTeamsFixturesAndDifficulties(startingData, 1)).toEqual({
      team: 1,
      fixtures: [
        { team: 11, difficulty: 3, venue: "a" },
        { team: 3, difficulty: 2, venue: "h" },
        { team: 4, difficulty: 3, venue: "a" },
      ],
    });
  });

  test("to not collapse in a heap if not enough games left", () => {
    expect(getTeamsFixturesAndDifficulties(startingData, 1, 4)).toEqual({
      team: 1,
      fixtures: [
        { team: 11, difficulty: 3, venue: "a" },
        { team: 3, difficulty: 2, venue: "h" },
        { team: 4, difficulty: 3, venue: "a" },
      ],
    });
  });

  test("to only provide amount requested", () => {
    expect(getTeamsFixturesAndDifficulties(startingData, 1, 2)).toEqual({
      team: 1,
      fixtures: [
        { team: 11, difficulty: 3, venue: "a" },
        { team: 3, difficulty: 2, venue: "h" },
      ],
    });
  });
});
