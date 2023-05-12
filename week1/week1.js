// const { log } = require("console");
// const fs = require("fs");
// const os = require("os");
//fs.copyFileSync("ik.html", "jjhh.js");
// fs.writeFileSync("sample.txt", "yo yo yo yo yo");
//fs.renameSync("sample.txt", "sample2.txt");

////////
//let ik = fs.readFileSync("ik.html");
//////fs.writeFileSync("yy.html", ik);

//to check if file exists
//fs.existsSync("sample2.txt");

// fs module to create and delete a folder
//fs.mkdirSync("codee");
// fs.rmdirSync("codee");

//fs module to delete file
// fs.unlinkSync("");

// user = os.userInfo();

//console.log(os.cpus());

// userString = JSON.stringify(user);
// cpu = JSON.stringify(os.cpus());
//console.log(os.userInfo().username);

// const html = `<!DOCTYPE html> //console.log(os.arch());
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Document</title>
//   </head>
//   <body style="padding: 70px; background-color: brown;">
//     <h1 style=>welcome to my hompage</h1>
//     <p>the curve africa</p>
//   </body>
// </html>`;

// fs.writeFileSync(
//   "classwork.html",
//   `this browser is working on ${os.arch()}, ${os.version()}, ${userString}, ${cpu}`
// );

//fs.renameSync("classwork.html", "cw.html");

//fs.unlinkSync("cw.html");
//console.log(os.cpus());
//////////////////////
// const eventListener = require("events");
// const eventer = new eventListener();
// eventer.on("logmessage", () => {
//   console.log("i have been emitted");
// });
// /////////////////
// const fs = require("fs");
// readableStream = fs.createReadStream("ik.txt");
// readableStream.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

port = 2000;

const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(res.write("hello"), res.end());
});

server.listen(port, () => {
  console.log("working on port" + port);
});
