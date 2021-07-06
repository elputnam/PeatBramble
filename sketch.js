var tileCount;
let actRandomSeed = 0;
var col1;
var col2;
var col3;
var col4;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  col1 = color(70, 50, 100, 40);
  col2 = color(0, 50, 100, 40);
  col3 = color(200, 50, 100, 60);
  col4 = color(300, 100, 100, 60);
  
  tileCount = random(10);
  strokeCap(PROJECT);
  
}

function draw() {
  background(10, 1);
  grid();

  //array of sqaures
  particles.push(new Element(createVector(mouseX, mouseY)));

  for(let i = particles.length - 1; i >= 0; i--){
    let p = particles[i];
    p.run();
    if (p.ghost()){
      particles.splice(i, 1);
    }
  }
  
}

function grid(){
  randomSeed(actRandomSeed);
  
  //grid layout
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;
//select one of two options for grid
     var toggle = int(random(0, 3));
    
     let interA = lerpColor(col1, col2, random(1));
     let inter2 = lerpColor(col3, col4, random(1));
    
     //triangle shapes
    if (toggle == 0){
      fill(interA);
        beginShape();
        vertex(posX +random(-5,5), posY+random(-5,5));
        vertex(posX + width + random(-5,5) / tileCount, posY + random(-3,3) / tileCount);
        vertex(posX + width / tileCount, posY + (height + random(-3,3)) / tileCount);
        vertex(posX + random(-3,3), posY + height/tileCount);
        endShape();
     }
      //circles
      if (toggle == 1){
        noFill();
        stroke(inter2, 100, 100)
        for (let i = 0; i < 10; i++){
          circle(posX, posY, random(5,10)*i);
        }
      }
    }
    }
  //change grid pattern every 20 frames
  if (frameCount%20 == 0){
    //clear()
    actRandomSeed = random(100000);
    tileCount = random(2, 10);
  }
}

class Element {
  constructor(loc) {
    this.accel = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.vel = createVector(random(-1,1), random(-1,1));
    this.loc = loc.copy();
    this.lifespan = 255.0;
    this.H1 = 100;
  }

  run(){
    this.update();
    this.display();
  }

  //movements of squares
  update(){
    this.vel.add(this.accel);
    this.loc.add(this.vel);
    this.lifespan -= random(2,5);
    this.H1 += 1;
  }

  //show squares
  display(){
    noStroke();
    rectMode(CENTER)
    fill(this.H1, random(100), random(100), this.lifespan);
    square(this.loc.x, this.loc.y, random(10,40));
// update color hue
    if (this.H1 >= 200){
      this.H1 = 150;
    }
  }

  //make the squares disappear when faded out
  ghost(){
    if (this.lifespan < 0.0){
      return true;
    } else {
      return false;
    }
  }
}