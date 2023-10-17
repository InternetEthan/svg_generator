const fs = require('fs');
const inquirer = require('inquirer');
const { Square, Circle, Triangle } = require('./lib/shapes.js'); // Import the shape classes

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

    let shape;

    switch (answers.shape) {
      case 'square':
        shape = new Square(answers.text, answers.textColor, answers.shapeColor);
        break;
      case 'circle':
        shape = new Circle(answers.text, answers.textColor, answers.shapeColor);
        break;
      case 'triangle':
        shape = new Triangle(answers.text, answers.textColor, answers.shapeColor);
        break;
      default:
        throw new Error(`Invalid shape: ${answers.shape}`);
    }

    const svgContent = shape.generateSVG(); // Call the generateSVG method on the shape instance

    fs.writeFile('./output/logo.svg', svgContent, (err) => {
      if (err) throw err;
      console.log('Logo created successfully!');
    });
  })
  .catch(error => console.log(error));
