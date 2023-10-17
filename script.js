const fs = require('fs');
const inquirer = require('inquirer');

function generateSVG(text, textColor, shape, shapeColor) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="100%" height="100%" fill="${shapeColor}" />
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="24" fill="${textColor}">${text}</text>
    </svg>
  `;
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
    type: 'input',
    name: 'shape',
    message: 'Enter logo shape (example: circle, square):'
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter shape color (example: #00FF00):'
  }
])
  .then(answers => {
    const svgContent = generateSVG(answers.text, answers.textColor, answers.shape, answers.shapeColor);
    fs.writeFile('logo.svg', svgContent, (err) => {
      if (err) throw err;
      console.log('Logo created successfully!');
    });
  })
  .catch(error => console.log(error));
