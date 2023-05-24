const {
  readAll,
  getOneTeam,
  newClub,
  updateClub,
  deleteClub,
} = require("../model/model");

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

const createNewClub = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const { teamName, stadium, coach, teamColor, ucl } = JSON.parse(body);

      const newData = {
        teamName,
        stadium,
        coach,
        teamColor,
        ucl,
      };

      const oneNewClub = await newClub(newData);
      if (!oneNewClub) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end("Error trying to new club.");
      } else {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(oneNewClub));
      }
    });
  } catch (e) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(e.message);
  }
};

// update a club
const updateAnExistingClub = async (req, res, id) => {
  try {
    const club = await getOneTeam(id);
    console.log(club);
    if (!club) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(`Club with id: ${id} does not exist.`);
    } else {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const { teamName, stadium, coach, teamColor, ucl } = JSON.parse(body);

        const newData = {
          teamName: teamName || club.teamName,
          stadium: stadium || club.stadium,
          coach: coach || club.coach,
          teamColor: teamColor || club.teamColor,
          ucl: ucl || club.ucl,
        };

        const updatedClub = await updateClub(id, newData);
        if (!updatedClub) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end("Error trying to update club.");
        } else {
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(updatedClub));
        }
      });
    }
  } catch (e) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(e.message);
  }
};

const deleteAnExistingClub = async (req, res, id) => {
  try {
    const club = await getOneTeam(id);
    console.log(club);
    if (!club) {
      res.writeHead(404, { "Content-Type": "application/json" });
      console.log(`${id}`);
      res.end(`Club with id: ${id} does not exist.`);
    } else {
      await deleteClub(club);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end("deleted");
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(e.message);
  }
};

module.exports = {
  getAllTeams,
  getOne,
  createNewClub,
  updateAnExistingClub,
  deleteAnExistingClub,
};
