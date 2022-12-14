export const withFixturesMock = {
  request: {
    query: {},
    variables: { id: 1 },
  },
  result: {
    data: {
      fixtures: {
        fixtures: [
          {
            started: false,
            kickoff_time: "2020-09-19T11:30:00Z",
            team_a: 18,
            team_h: 7,
            team_a_score: null,
            team_h_score: null,
          },
          {
            started: false,
            kickoff_time: "2020-09-19T14:00:00Z",
            team_a: 8,
            team_h: 10,
            team_a_score: null,
            team_h_score: null,
          },
        ],
      },
    },
  },
};
