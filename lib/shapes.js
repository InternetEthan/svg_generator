class Shape {
    constructor(text, textColor, shapeColor) {
      this.text = text;
      this.textColor = textColor;
      this.shapeColor = shapeColor;
    }
  
    generateSVG() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
          ${this.getShapeElement()}
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="24" fill="${this.textColor}">${this.text}</text>
        </svg>
      `;
    }
  
    getShapeElement() {
    }
  }
  
  class Square extends Shape {
    getShapeElement() {
      return `<rect width="100%" height="100%" fill="${this.shapeColor}" />`;
    }
  }
  
  class Triangle extends Shape {
    getShapeElement() {
      return `<polygon points="150,0 250,150 50,150" fill="${this.shapeColor}" />`;
    }
  }
  
  class Circle extends Shape {
    getShapeElement() {
      return `<circle cx="50%" cy="50%" r="35%" fill="${this.shapeColor}" />`;
    }
  }
  
  module.exports = {
    Square,
    Triangle,
    Circle,
  };
  