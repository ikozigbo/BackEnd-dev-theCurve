const http = require("http");
const teams = require("./database/footballTeam.json");
const { getAllTeams, getOne } = require("./controller/controller");

const port = 4400;

const app = http.createServer((req, res) => {
  if (req.url === "/showTeams" && req.method === "GET") {
    getAllTeams(req, res);
  } else if (req.url === "/getone") {
    getOne(req, res, "1");
  } else {
    res.end("something went wrong");
  }
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
