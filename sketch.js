let ballNormal;
let ballStretch;
let ballSquish;
let camX = 0
let score = 0;
let coins = [
  {x:100, y: 430, collected: false},
  {x:250, y: 330, collected: false},
  {x:300, y: 230, collected: false},
  {x:170, y: 270, collected: false},
  {x:370, y: 360, collected: false},
]
let platforms = [
  { x: 100, y: 400, w: 150, h: 20 },
  { x: 200, y: 300, w: 50, h: 20 },
  { x: 300, y: 200, w: 10, h: 20 },
  {x: 400, y: 100, w: 70, h :20},
  {x: 100, y: 260, w: 50, h :20},
  {x: 500, y: 200, w: 100, h :20},
  {x: 600, y: 350, w: 140, h :20},
  { x: 0, y: 500, w: 150, h: 20 },
  // left ground
  { x: 250, y: 500, w: 600, h: 20 },
  // right ground
];

let spikes = [
  { x: 170, y: 520, w: 30, h: 20 },
  { x: 200, y: 520, w: 30, h: 20 },
  { x: 230, y: 520, w: 30, h: 20 },
];

let onGround = false;
let stretchX = 36;
let stretchY = 36;
let ballX = 300;
let ballY = 100;
// how fast the ball is moving up or down
let speed = 0;
// the force pulling it down every frame
let gravity = 1.5;
let ground = 500;

function preload(){
  ballNormal = loadImage("ball normal.png");
  ballStretch = loadImage("ball stretch.png");
  ballSquish = loadImage("ball squish.png");
}

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(0);
  push();
  translate(-camX, 0);
  fill(255, 0, 0);
  
  if(onGround === false){
  speed = speed + gravity;
  }
  ballY = ballY + speed;
  // speed pushes ball downward
   camX = ballX - 200;

  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];

    if (
      ballY + stretchY / 2 >= p.y &&
      //   ballY + stretchY/2 is the bottom of the ball
      //   this basically means that the ball bottom is at the top of the platform or past the top of the platform
      ballY + stretchY / 2 <= p.y + 20 &&
      //       to land on the platform the ball has to be 20 pixels on the platform
      ballX >= p.x &&
      //       i think this is the balls starting point when jumping on the platform. if it is too far left, it shouldn't land, it should fall off.
      ballX <= p.x + p.w &&
      speed > 0
    ) {
      ballY = p.y - stretchY / 2;
      //     this puts the ball directly on the plaform surface
      speed = speed * -0.6;
      //     this makes te ball bounce on the platform
      if(abs(speed) < 6){
        speed = 0
      }
      onGround = false;
      //     the ball can jump since its on a surface
     // stretchX =40;
     // stretchY = 28;
    }

    
    fill(0, 128, 128);
    rect(p.x, p.y, p.w, p.h);
    //   i stored the platform in an object
    //   an object stores multiple information
    //   we use .x,.y,.w,.h because they are already stored before the setup function. usingplatformx without the'.' doesn't make sense
  }
  // if(onGround === false){
  //     stretchX = 30;
  //     stretchY = 48;
  //   }
    
    // onGround = false; 
//   resets every frame back
  if (ballY > 600) {
    ballY = 100;
    ballX = 300;
    speed = 0;
  }
//   DEATH CHECKS
  
  
  if (keyIsDown(LEFT_ARROW)) {
    ballX = ballX - 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ballX = ballX + 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    speed = 12;
  }
    if (keyIsDown(UP_ARROW)) {
    speed = -12;
      
  }
//   SPIKES
  fill("red");
  for (let i = 0; i < spikes.length; i++) {
    let s = spikes[i];
    triangle(s.x, s.y - 25, s.x - 10, s.y, s.x + 10, s.y);
    
     if(ballX >= s.x - 10 &&
//         ball is past the left edge of spike
   ballX <= s.x + 10 &&
//         ball is before the right edge of spike
   ballY + stretchY/2 >= s.y - 25){
       // ball's bottom has reached the spike tip
     ballX = 300;
     ballY = 100;
     speed = 0;
}

// function keyPressed() {
//   if (keyCode === UP_ARROW && onGround) {
//     //     && here means it is definitely on the ground, without the && onGround the ball will jump infinite times on the air
//     speed = -20;
//   }
// }
  }
  //     COINS
    for (let i = 0; i < coins.length; i++){
      let c = coins[i];
      if(c.collected === false){
     fill("gold");
     ellipse(c.x,c.y,10)
  }
      if(dist(ballX, ballY, c.x,c.y) < 20){
      c.collected = true;
      score = score + 10;
    }
    }
    
  fill("red");
  //   this is the orange ball
  
  if(speed > 2){
      image(ballStretch, ballX-18, ballY-18, stretchX, stretchY);
  }
  // If falling fast stretch
  else if(speed === 0 && onGround){
      image(ballSquish, ballX-18, ballY-18, stretchX, stretchY);
  }
  // If sitting still on ground squish
  else{
      image(ballNormal, ballX-18, ballY-18, stretchX, stretchY);
  }
  // or else normal

  //  this is the platform the ball will jump on
  pop();
  fill("white");
  textSize(20);
  text("Score: " + score, 10, 20)

}
