const teams = require("../database/footballTeam.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

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

const newClub = (newlyCreatedClub) => {
  return new Promise((resolve, reject) => {
    // create a new club with a auto_generated id
    const newClub = { id: uuidv4(), ...newlyCreatedClub };
    // save the newly created club in the database
    teams.push(newClub);
    // write to the existing file (clubDb.json)
    fs.writeFileSync(
      "./clubDB/clubDB.json",
      JSON.stringify(teams),
      "utf8",
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Club created successfully.");
        }
      }
    );
    // fs.writeFileSync( '../clubDB/clubDB.json', JSON.stringify( clubDB ), 'utf8' );
    resolve(newClub);
  });
};

// update an existing club model
const updateClub = (id, updatedExistingClub) => {
  return new Promise((resolve, reject) => {
    const clubIndex = teams.find((item) => item.id === id);
    teams[clubIndex] = { id, ...updatedExistingClub };
    teams.push(teams[clubIndex]);
    fs.writeFileSync(
      "./clubDB/clubDB.json",
      JSON.stringify(clubDB),
      "utf8",
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Club updated successfully.");
        }
      }
    );
    resolve(teams[clubIndex]);
  });
};

// model to delete a club
const deleteClub = (id) => {
  return new Promise((resolve, reject) => {
    filteredClub = teams.filter((item) => item.id !== id);
    fs.unlinkSync("./clubDB/clubDB.json");
    fs.writeFileSync(
      "./clubDB/clubDB.json",
      JSON.stringify(filteredClub),
      "utf8",
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Club updated successfully.");
        }
      }
    );

    resolve();
  });
};

module.exports = { readAll, getOneTeam, newClub, updateClub, deleteClub };
