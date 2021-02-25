function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
let grid;
let cols;
let rows;
let w = 30;

let yourSick;
let bgImage;

let totalCovid = 65;

function preload() {
  bgImage = loadImage("./unnamed.jpg");
  yourSick = loadSound("./Small-Double-Cough-3-www.fesliyanstudios.com.mp3");
}

function setup() {
  createCanvas(901, 701);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new cell(i, j, w);
    }
  }

  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (let n = 0; n < totalCovid; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];
    options.splice(index, 1);
    grid[i][j].covid = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countCovid();
    }
  }
}

function gameOver() {
  yourSick.play();
  window.alert("Oh no! You got Covid :(");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();

        if (grid[i][j].covid) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  clear();
  background(bgImage);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

var sec = 0;
function pad(val) {
  return val > 9 ? val : "0" + val;
}
setInterval(function () {
  document.getElementById("seconds").innerHTML = pad(++sec % 60);
  document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
}, 1000);
