// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const randomNumber = Math.floor(Math.random() * 10);
//     if (randomNumber < 0.5) {
//       resolve(randomNumber);
//     } else {
//       reject(`${randomNumber} is greater than 0.5`);
//     }
//   }, 3000);
// });

// const asynFunction = async () => {
//   try {
//     let result = await promise;
//     console.log(result);
//   } catch (error) {
//     console.log("jdjjd" + error);
//   }
// };

// asynFunction();

const fs = require("fs").promises;

// fs.readFile("./sample.txt", "utf8")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

fs.writeFile("./data.txt", "this is data", "utf8")
  .then(() => {
    console.log("data written");
  })
  .catch((e) => {
    console.log(e);
  });

fs.appendFile("./data.txt", "\nthis data is added", "utf8")
  .then(() => {
    console.log("data appended");
  })
  .catch((e) => {
    console.log(e);
  });
