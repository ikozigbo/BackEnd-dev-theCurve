const fs = require("fs");

// const readFiles = async () => {
//   try {
//     await fs.readFile("./sample.txt", "utf-8", (e, d) => {
//       console.log(d);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

///////read file (2)
const readFile2 = async () => {
  try {
    const data = await fs.readFileSync("./sample.txt");
    console.log(data.toString());
  } catch (e) {
    console.log(e);
  }
};

readFile2();

// writting to file

// const writeFiles = async () => {
//   try {
//     await fs.writeFile("./sample.txt", "this was just written", () => {
//       console.log("written");
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// writeFiles();

// const appendedFiles = async () => {
//   try {
//     await fs.appendFile("./sample.txt", "\nthis was just added", () => {
//       console.log("added");
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// appendedFiles();

// const deleteFiles = async () => {
//   try {
//     await fs.unlink("./deleteThis.js", () => {
//       console.log("deleted");
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// deleteFiles();
