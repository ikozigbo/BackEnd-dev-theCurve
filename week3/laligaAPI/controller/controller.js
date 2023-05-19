const { readAll, getOneTeam } = require("../model/model");

const getAllTeams = async (req, res) => {
  try {
    const teams = await readAll();
    if (!teams[0]) {
      res.end("No team has been registered");
    } else {
      res.end(JSON.stringify(teams));
    }
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req, res, id) => {
  try {
    const team = await getOneTeam(id);
    if (!team) {
      res.end("No team found");
    } else {
      res.end(JSON.stringify(team));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllTeams, getOne };
