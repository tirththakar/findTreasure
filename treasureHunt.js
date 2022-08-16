const prompt = require('prompt-sync')({sigint: true});

const treasure = '$';
const hole = 'O';
const grass = '░';
const player = '*';

class Field {
  constructor(field=[[]]) {
    this.field = field;
    this.xLocation = 0;
    this.yLocation = 0;
    this.field[0][0] = player;
  }

  playGame() {
    let currentlyPlaying = true;
    while (currentlyPlaying) {
      this.print();
      this.promptDirection();
      if (!this.inBounds()) {
        console.log("You are out of bounds!!");
        currentlyPlaying = false;
        break;
      } else if (this.fellInHole()) {
        console.log("You fell into a hole!!");
        currentlyPlaying = false;
        break;
      } else if (this.foundTreasure()) {
        console.log('You found the hidden treasure!!');
        currentlyPlaying = false;
        break;
      }
      this.field[this.yLocation][this.xLocation] = player;
    }
  }

  promptDirection() {
    const input = prompt('Which direction would you like to go in? ').toUpperCase();
    switch (input) {
      case 'L':
        this.xLocation -= 1;
        break;
      case 'R':
        this.xLocation += 1;
        break;
      case 'U': 
        this.yLocation -= 1;
        break;
      case 'D':
        this.yLocation += 1;
        break;
      default:
        console.log('Please enter a valid direction (U, D, L, R)');
        this.promptDirection();
        break;
    }
  }

  inBounds() {
    if (this.xLocation >= 0 && this.yLocation >= 0 && this.xLocation < this.field.length && this.yLocation < this.field[0].length) {
      return true;
    } else {
      return false;
    }
  }

  fellInHole() {
    if (this.field[this.yLocation][this.xLocation] === hole) {
      return true;
    } else {
      return false;
    }
  }

  foundTreasure() {
    if (this.field[this.yLocation][this.xLocation] === treasure) {
      return true;
    } else {
      return false;
    }
  }

  static generateField(height, width, holesPercentage = 0.1) {
    const field = new Array(height).fill(0).map(() => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const holesOcurrence = Math.random();
        field[y][x] = holesOcurrence > holesPercentage ? grass : hole;
      }
    }
    const treasureIndex = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };

    while (treasureIndex.x === 0 && treasureIndex.y === 0) {
      treasureIndex.x = Math.floor(Math.random() * width);
      treasureIndex.y = Math.floor(Math.random() * height);
    }
    field[treasureIndex.y][treasureIndex.x] = treasure;
    return field;
  }


  print() {
    const displayField = this.field.map(row => {
      return row.join('');
    }).join('\n');
    console.log(displayField);
  }
}

const myField = new Field(Field.generateField(15,15,0.2));
myField.playGame();