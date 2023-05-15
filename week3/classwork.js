randomPercent = () => {
  let randomnum = Math.random();
  let percentage = Math.floor(randomnum * 100);
  return percentage;
};

average = async (firstname, secondname) => {
  try {
    let firstPercentage = await randomPercent();
    let secondPercentage = await randomPercent();
    let averagePercentage = (firstPercentage + secondPercentage) / 2;
    console.log(
      `${firstname}:${firstPercentage}% ${secondname}:${secondPercentage}% Average:${averagePercentage}%`
    );
    return averagePercentage;
  } catch (error) {
    console.log(error.message);
  }
};

loveCalculator = async (firstname, secondname) => {
  try {
    let lovePercentage = await average(firstname, secondname);
    if (lovePercentage >= 80) {
      console.log("very compatible");
    } else if (lovePercentage < 80 && lovePercentage >= 60) {
      console.log(" compatible");
    } else if (lovePercentage < 60 && lovePercentage >= 40) {
      console.log("sligthly compatible");
    } else {
      console.log("don't marry");
    }
  } catch (error) {
    console.log(error.message);
  }
};

loveCalculator("eze", "faith");
