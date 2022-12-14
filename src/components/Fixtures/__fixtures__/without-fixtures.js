export const withoutFixturesMock = {
  request: {
    query: {},
    variables: { id: 1 },
  },
  result: {
    data: {
      fixtures: {
        fixtures: [],
      },
    },
  },
};
