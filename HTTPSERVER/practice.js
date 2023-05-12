const http = require("http");
const fs = require("fs");

const port = 3008;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "html",
  });
  fs.readFile("../../festac/localhost.html", (err, data) => {
    res.write(data);
    res.end();
  });
});

server.listen(port, () => {
  console.log("connection successful");
});
