const fs = require("fs");

readFile = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(err);
        console.log(err.message);
      } else {
        resolve(data);
        console.log(data.toString());
      }
    });
  });
};

appendFile = (filepath, content) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(filepath, content, (err) => {
      if (err) {
        reject(err);
        console.log(err.message);
      } else {
        resolve();
        console.log(".....content appended......");
      }
    });
  });
};

solution = async (filepath, content) => {
  try {
    await readFile(filepath);
    await appendFile(filepath, content);
    await readFile(filepath);
  } catch (e) {
    console.log(e.message);
  }
};

// solution("./sample.txt", "\npractice content");

let array = ["\nwhat a good day", "\npractice practice practice"];

array.forEach((element) => {
  solution("./sample.txt", element);
});
