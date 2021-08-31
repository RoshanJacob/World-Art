var drawing = [];
var currentPath = [];
// var drawer;

var clear, name, save;

var database;

var position;
var isDrawing = false;
var trackMouse;

var bgSlider;
var bgSlider2;
var bgSlider3;

var randC1;
var randC2;
var randC3;

var mark1;
var mark2;
var mark3;

var ellipseThicknessAdjustor;
var start;
var gameState = 0;

var button;
var input;

var greeting;
var title;

let refer;
let savedDrawings;

let resetName;
let resetDrawings;
function setup() {
  database = firebase.database();

  //creating a canvas and creating a method to start and end drawings without drag mistakes
  canvas = createCanvas(1000, 500);
  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(endDrawing);

  //cretaing a button to clear the drawings
  clear = createButton('Clear');
  clear.mousePressed(clearDrawing);
  clear.position(600, 590);

  //creating a save button to save the drawings to the database
  save = createButton('Save');
  save.mousePressed(saveDrawing);
  save.position(700, 590);

  //creating variables that store a random value and using them to change the color of the worldMouse
  randC1 = random(100, 255);
  randC2 = random(100, 255);
  randC3 = random(100, 255);

  /* ======== Start of 3 sliders that can be used to change the canvas' background ======= */
  bgSlider = createSlider(0, 255);
  bgSlider.position(5, 200);

  bgSlider2 = createSlider(0, 255);
  bgSlider2.position(5, 300);

  bgSlider3 = createSlider(0, 255);
  bgSlider3.position(5, 400);
  /* ======== End of  sliders that can be used to change tha canvas' background ======= */

  refer = database.ref('DrawingProfile');

  /* ======== Start of 3 html elements to label the above sliders ======= */
  mark1 = createElement('h3');
  mark2 = createElement('h3');
  mark3 = createElement('h3');
  /* ======== End of html elements to label the above sliders ======= */

  //creating the greeting element to display the 'drawer name'
  greeting = createElement('h2');

  //creating the button
  button = createButton('Enter');
  /*arrow function to display greeting when the 'enter' button is pressed and updating
    database with the drawer's name and including an error function
  */
  button.mousePressed(() => {
    if(input.val === undefined){
      alert('Hmmm... It seems as if you have entered no name. \nPlease type in a name and click again');
    }else {
      greeting.html('Hello' + ' ' + '"' + input.value() + '"' + '!');
      button.hide();
      input.hide();
    }
    // (input.value === '') ? (alert('Hmmm... It seems as if you have entered no name. \nPlease type in a name and click again')):(    greeting.html('Hello' + ' ' + '"' + input.value() + '"' + '!')
    // )
    greeting.position(550, 2);
    greeting.show();
    drawerName();
    showErr();
  });

  //creating the reset button to reset name
  reset = createButton('Reset Name');
  reset.mousePressed(restart);

  //creating the button to reset saved drawings
  resetDrawings = createButton('Delete Saved Drawings');
  resetDrawings.mousePressed(resetDraw);

  input = createInput('');

  savedDrawings = createButton('Go to your saved drawings →');
  savedDrawings.mousePressed(changePage);

  textSize(20);
  textFont('Georgia');
}
// function mouseDragged(){
//   ellipseMode(RADIUS);
//   drawer = ellipse(mouseX, mouseY, 7);
// }
// function mouseReleased(){
//   background(bgSlider.value(), bgSlider2.value(), bgSlider3.value());
// }
function changePage(){
  window.location.replace('http://127.0.0.1:8887/list.html');
}
function restart() {
  let ref = database.ref('DrawingProfile').set({
    Name: '',
  });
  greeting.hide();
  button.show();
  input.show();
}
function resetDraw() {
  let ref = database.ref('drawings').set({
    drawings: 0,
  });
}
function startDrawing() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}
function endDrawing() {
  isDrawing = false;
}

function writePosition(x, y) {
  database.ref('drawing/position').set({
    x: position.x + x,
    y: position.y + y,
  });
}

function readPosition(data) {
  position = data.val();
  drawing[i].x = position.x;
  drawing[i].y = position.y;
}
function showErr() {
  console.log('error');
}

function draw() {
  background(bgSlider.value(), bgSlider2.value(), bgSlider3.value());
  trackMouse = new WorldCircleMouse(mouseX, mouseY, 5);
  if (isDrawing !== false) {
    var point = {
      x: mouseX,
      y: mouseY,
    };
    currentPath.push(point);
  }
  stroke(255);
  strokeWeight(7);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var r = 0; r < path.length; r++) {
      vertex(path[r].x, path[r].y);
    }
    endShape();
  }
  trackMouse.display();
  mark1.html('Red');
  mark1.position(50, 150);

  // ellipseMode(RADIUS);
  // drawer = ellipse(mouseX, mouseY, 7);

  mark2.html('Green');
  mark2.position(50, 250);

  mark3.html('Blue');
  mark3.position(50, 350);

  button.position(700, 35);
  input.position(540, 35);

  // window.savedDrawings.href('http://127.0.0.1:8887/list.html');
  savedDrawings.position(930, 40);

  reset.position(930, 10);
  resetDrawings.position(1025, 10);

  for (let i = 0; i < touches.length; i++) {
    if (touches[i].length > 0) {
      startDrawing();
    }
  }
}

function clearDrawing() {
  drawing = [];
}
function drawerName() {
  var ref = database.ref('DrawingProfile').set({
    Name: input.value(),
  });
}
function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    drawing: drawing,
    drawer: input.value(),
    name: 'My Awesome Drawing',
  };
  var output = ref.push(data);
}
