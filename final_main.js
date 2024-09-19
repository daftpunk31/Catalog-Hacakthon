const fs = require('fs');

function decodeValue(base, value) {
  return parseInt(value, parseInt(base));
}

function lagrangeInterpolation(xValues, yValues) {
  function lagrangeBasis(x, xValues, j) {
      let result = 1;
      for (let i = 0; i < xValues.length; i++) {
          if (i !== j) {
              result *= (x - xValues[i]) / (xValues[j] - xValues[i]);
          }
      }
      return result;
  }

  function interpolate(x) {
      let result = 0;
      for (let j = 0; j < xValues.length; j++) {
          result += yValues[j] * lagrangeBasis(x, xValues, j);
      }
      return result;
  }

  return interpolate(0);
}

function solveProblem(inputJson) {
  let data = JSON.parse(inputJson);
  let n = data.keys.n;
  let k = data.keys.k;

  let xValues = [];
  let yValues = [];

  for (let key in data) {
      if (key !== "keys") {
          xValues.push(parseInt(key));
          yValues.push(decodeValue(data[key].base, data[key].value));
      }
  }

  // Select k-1 points
  xValues = xValues.slice(0, k);
  yValues = yValues.slice(0, k);

  return lagrangeInterpolation(xValues, yValues);
}

// Read the JSON file
fs.readFile('input1.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let result = solveProblem(data);
  console.log("The final answer is", result);
});

// Read the JSON file
fs.readFile('input2.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let result = solveProblem(data);
  console.log("The final answer is", result);
});