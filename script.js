const fs = require('fs');
const inquirer = require('inquirer');
const generateSVG = require('./lib/shapes.js'); // Import the function

function createOutputFolder() {
  const folderName = 'output';

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Created ${folderName} folder.`);
  }
}

inquirer.prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter logo text:'
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter text color (example: #FF0000):'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Enter logo shape (example: circle, square):',
    choices: ['square', 'circle', 'triangle'],
    default: 'square'
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter shape color (example: #00FF00):'
  }
])
  .then(answers => {
    createOutputFolder();  
    const svgContent = generateSVG(answers.text, answers.textColor, answers.shape, answers.shapeColor);
    fs.writeFile('./output/logo.svg', svgContent, (err) => {
      if (err) throw err;
      console.log('Logo created successfully!');
    });
  })
  .catch(error => console.log(error));
