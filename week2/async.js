const fs = require("fs");

//synchronous way of reading file
// const myFile = fs.readFileSync("./sample.text", "utf8");

//asynchronous way of reading file
// fs.readFile("./sample.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
//
const data1 = "new document";
const data2 = " new data added";

//writing to file asynchronously
fs.writeFile("sample.txt", data1, "utf8", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("written file");
  }
});

// adding to file asynchronously
fs.appendFile("sample.txt", data2, "utf8", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("added to file");
  }
});
