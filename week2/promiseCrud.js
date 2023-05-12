const { rejects } = require("assert");
const fs = require("fs");

// function readPromise() {
//   throw new Promise((resolve, reject) => {
//     fs.readFile("./sample.txt", (error, data) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(data);
//         console.log(data.toString());
//       }
//     });
//   });
// }

// readPromise();

// function append(filename, content) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {})

// append("./sample.txt", "\nclasswork added");

// function append(filepath, content) {
//   return new Promise((resolve, reject) => {
//     fs.appendFile(filename, content, (error) => {
//       if (error) {
//         reject(error);
//       } else {
//         fs.readFile(filepath, (error, data) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(data);
//             console.log(
//               `${content} was added to ${filepath} the new data is ` +
//                 data.toString()
//             );
//           }
//         });
//       }
//     });
//   });
// }

// append("./sample.txt", "\nthis is class work data667");

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.toString);
        console.log(data.toString());
      }
    });
  });
}

function appendFile(filename, content) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filename, content, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

solution = async (filename, content) => {
  try {
    await readFile(filename, "utf8");
    await appendFile(filename, content);
    await readFile(filename, "utf8");
  } catch (e) {
    console.log(e.message);
  }
};

solution("./sample.txt", "\nha ha ha ha ha");
