export const getTeamName = (teams, id) => {
  return teams[id - 1].name;
};

export const getTeamShortName = (teams, id) => {
  return teams[id - 1].short_name;
};

export const getTeamsFixturesAndDifficulties = (
  teamFixtures,
  teamId,
  amountOfFixtures = 5
) => {
  const fixtures = teamFixtures.slice(0, amountOfFixtures).map((fixture) => {
    const homeTeam = fixture.team_h === parseInt(teamId, 10);
    const venueLabel = homeTeam ? "h" : "a";

    return {
      team: fixture[`team_${homeTeam ? "a" : "h"}`],
      difficulty: fixture[`team_${venueLabel}_difficulty`],
      venue: venueLabel,
    };
  });

  return { team: teamId, fixtures };
};
