const path = require('path');

const pathInput = path.join(__dirname, './public/input');
const pathOutput = path.join(__dirname, './public/output');
const typeImages = /(png)|(jpg)|(jpeg)/g

module.exports = {
  pathInput,
  pathOutput,
  typeImages
}