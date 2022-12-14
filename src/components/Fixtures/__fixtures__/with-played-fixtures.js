export const withPlayedFixturesMock = {
  request: {
    query: {},
    variables: { id: 1 },
  },
  result: {
    data: {
      fixtures: {
        fixtures: [
          {
            started: true,
            kickoff_time: "2020-09-12T11:30:00Z",
            team_a: 1,
            team_h: 8,
            team_a_score: 3,
            team_h_score: 0,
          },
          {
            started: true,
            kickoff_time: "2020-09-12T14:00:00Z",
            team_a: 16,
            team_h: 6,
            team_a_score: 0,
            team_h_score: 1,
          },
        ],
      },
    },
  },
};
