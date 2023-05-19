// import the model
// const clubModel = require( "../clubModel/clubModel" );
const { readAll, readOne } = require("../model/model");

// business logic to get all clubs
const getAllClub = async (req, res) => {
  try {
    // const clubs = await clubModel.readAll();
    const clubs = await readAll();
    if (clubs.length === 0) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end("There is no registered club.");
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        `List of EPL clubs: \n ${JSON.stringify(
          clubs
        )} \n Total number of clubs: ${clubs.length}`
      );
    }
  } catch (e) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(e.message);
  }
};

// getting a club
const getOneClub = async (req, res, id) => {
  try {
    // const club = await clubModel.readOne(id)
    const club = await readOne(id);
    console.log(club);
    if (!club) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(`Club with id: ${id} does not exist.`);
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(club));
    }
  } catch (e) {
    res.end(e.message);
  }
};

module.exports = {
  getAllClub,
  getOneClub,
};
