const teams = require("../database/footballTeam.json");

const readAll = () => {
  return new Promise((resolve, reject) => {
    resolve(teams);
  });
};

const getOneTeam = (id) => {
  return new Promise((resolve, reject) => {
    const team = teams.find((item) => item.id === id);
    resolve(team);
  });
};

module.exports = { readAll, getOneTeam };
