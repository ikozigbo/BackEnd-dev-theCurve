const http = require("http");
const fs = require("fs");
//const express = require("express");

const port = 3009;

//http server
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "html",
  });
  fs.readFile("../../../festac/localhost.html", (err, data) => {
    res.write(data);
    res.end();
  });
});

server.listen(port, () => {
  console.log("connection successful");
});
