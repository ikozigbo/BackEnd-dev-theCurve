const http = require("http");

const totalTeams = require("./controller/footballController");

const port = 3300;

const server = http.createServer(async (req, res) => {
  laliga = await totalTeams();
  if (req.url === "/") {
    res.write("hello");
    res.end();
  } else if (req.url === "/laliga") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(laliga));
  }
});

server.listen(port, () => {
  console.log("running on port " + port);
});
