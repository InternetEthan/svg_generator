const fs = require('fs');
const inquirer = require('inquirer');

function generateSVG(text, textColor, shape, shapeColor) {
    let shapeElement;

  switch (shape) {
    case 'circle':
      shapeElement = `
      <circle cx="50%" cy="50%" r="35%" fill="${shapeColor}" />
      `;
      break;
    case 'triangle':
      shapeElement = `
        <polygon points="150,0 250,150 50,150" fill="${shapeColor}" />
      `;
      break;
    case 'square':
    default:
      shapeElement = `
      <rect width="100%" height="100%" fill="${shapeColor}" />
      `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${shapeElement}
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

  function createOutputFolder() {
    const folderName = 'output';
  
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
      console.log(`Created ${folderName} folder.`);
    }
  }