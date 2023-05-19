// import the database
const clubDB = require("../db/db.json");

// read all clubs in the database
const readAll = () => {
  return new Promise((resolve, reject) => {
    resolve(clubDB);
  });
};

// read one club in the database
const readOne = (id) => {
  return new Promise((resolve, reject) => {
    const club = clubDB.find((item) => item.id === id);
    resolve(club);
  });
};

module.exports = {
  readAll,
  readOne,
};
