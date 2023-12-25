// This program displays the current and max microphone volume through the lens of Formula 1 Racing by visualizing a car moving across a track
// and displaying its curren and peak speeds in kilometers per hour.

// Constant assignment
let mic;
let vol;
let startXPos = 5;
let minSpeed = 0;


function setup() {
  createCanvas(600, 400);
  
  // audio input setup
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  // sound level from 0 to 1
  let micLevel = mic.getLevel();
  
  // micLevel value converted to KPH using F1 speed record
  let speed = round(micLevel * 372.5, 1)
  
  // function calling
  drawBackground();
  drawCar(startXPos, 180);
  
  // changing the car's x-position on micLevel output
  startXPos = startXPos + micLevel * 30;
  
  // logic statement dependent on if speed exceeds minSpeed
  // displays max speed of car
  if(speed > minSpeed) {
    fill('orange');
    text('MAX SPEED: ' + speed + ' KPH', 80, 320);
    minSpeed = speed;
  }
  else {
    fill('orange');
    text('MAX SPEED: ' + minSpeed + ' KPH', 80, 320);
  }
  
  // displays current speed of car
  fill('orange');
  text('CURR. SPEED: ' + speed + ' KPH', 80, 345);
  
  // resets car's x-position once it exceeds the canvas width
  if(startXPos > 600) {
    startXPos = 0;
  }
}

function drawBackground() {
  // draws green grass background
  background(126,200,80);
  
  // draws asphalt track
  fill('grey');
  rect(0, 150, 600, 100);
  
  // draws racing lines and DRS (drag reduction system) line
  fill('white')
  rect(20, 150, 10, 100);
  rect(0, 150, 600, 10);
  rect(0, 240, 600, 10);
  
  // draws DRS aesthetic sign
  rect(400, 50, 80, 40);
  fill('black');
  rect(400, 90, 10, 20);
  rect(470, 90, 10, 20);
  text('DRS ZONE', 410, 75);
  
  // draws speed board
  fill('black');
  rect(60, 300, 180, 60);
}

function drawCar(x, y) {
  // draws tires and chassis of race car
  push();
  fill('black');
  text('ferrari', x+10, y+10);
  circle(x+20, y+30, 20);
  circle(x+60, y+30, 20);
  fill('red');
  noStroke()
  triangle(x, y-10, x, y+20, x+30, y+20);
  triangle(x+60, y, x+60, y+30, x+100, y+30);
  rect(x, y, 60, 30);
  fill('black');
  text('ferrari', x+18, y+18);
}
