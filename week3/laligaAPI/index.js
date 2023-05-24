const http = require("http");
const teams = require("./database/footballTeam.json");
const {
  getAllTeams,
  getOne,
  createNewClub,
  updateAnExistingClub,
  deleteAnExistingClub,
} = require("./controller/controller");

const port = 4400;

const app = http.createServer((req, res) => {
  if (req.url === "/showTeams" && req.method === "GET") {
    getAllTeams(req, res);
  } else if (req.url.match(/\/clubs\/([0-9]+)/) && req.method == "GET") {
    const id = req.url.split("/")[2];
    getOne(req, res, id);
  } else if (req.url === "/api/club" && req.method === "POST") {
    res.writeHead(201, { "Content-Type": "application/json" });
    createNewClub(req, res);
  } else if (req.url.match(/\/clubs\/([0-9]+)/) && req.method === "PUT") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const id = req.url.split("/")[2];
    updateAnExistingClub(req, res, id);
  } else if (req.url.match(/\/clubs\/([0-9]+)/) && req.method === "DELETE") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const id = req.url.split("/")[2];
    deleteAnExistingClub(req, res, id);
  }
});
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
