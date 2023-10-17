module.exports = function generateSVG(text, textColor, shape, shapeColor) {
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
  };
  