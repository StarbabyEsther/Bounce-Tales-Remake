let ballNormal;
let ballStretch;
let ballSquish;
let ballBreak;
let ballBroken = false;
let breakTimer = 0;
let camX = 0;
let score = 0;
let coins = [
  { x: 100, y: 430, collected: false },
  { x: 250, y: 330, collected: false },
  { x: 300, y: 230, collected: false },
  { x: 170, y: 270, collected: false },
  { x: 370, y: 360, collected: false },
  { x: 390, y: 100, collected: false },
  { x: 400, y: 200, collected: false },
  { x: 450, y: 250, collected: false },
  { x: 470, y: 220, collected: false },
  { x: 500, y: 470, collected: false },
  { x: 600, y: 230, collected: false },
  { x: 650, y: 230, collected: false },
  { x: 700, y: 210, collected: false },
  { x: 720, y: 470, collected: false },
  { x: 800, y: 360, collected: false },
  { x: 810, y: 320, collected: false },
  { x: 900, y: 300, collected: false },
  { x: 950, y: 360, collected: false },
  { x: 920, y: 100, collected: false },
  { x: 990, y: 220, collected: false },
  { x: 1000, y: 420, collected: false },
  { x: 1200, y: 160, collected: false },
  { x: 1250, y: 470, collected: false },
  { x: 1310, y: 300, collected: false },
  { x: 1312, y: 250, collected: false },
  { x: 1370, y: 200, collected: false },
  { x: 1400, y: 100, collected: false },
  { x: 1470, y: 190, collected: false },
];
let platforms = [
  { x: 100, y: 400, w: 150, h: 20 },
  { x: 200, y: 320, w: 30, h: 20 },
  { x: 310, y: 220, w: 10, h: 20 },
  { x: 350, y: 390, w: 10, h: 20 },
  { x: 400, y: 300, w: 20, h: 20 },
  { x: 400, y: 100, w: 70, h: 20 },
  { x: 100, y: 260, w: 50, h: 20 },
  { x: 700, y: 300, w: 100, h: 20 },
  { x: 750, y: 100, w: 70, h: 20 },
  { x: 860, y: 200, w: 40, h: 20 },
  { x: 890, y: 330, w: 100, h: 20 },
  { x: 930, y: 80, w: 50, h: 20 },
  { x: 970, y: 150, w: 100, h: 20 },
  { x: 1000, y: 200, w: 90, h: 20 },
  { x: 1100, y: 310, w: 100, h: 20 },
  { x: 1200, y: 200, w: 70, h: 20 },
  { x: 1300, y: 330, w: 50, h: 20 },
  { x: 1300, y: 70, w: 60, h: 20 },
  { x: 1350, y: 210, w: 100, h: 20 },
  { x: 1500, y: 270, w: 80, h: 20 },
  { x: 500, y: 230, w: 10, h: 20 },
  { x: 600, y: 370, w: 140, h: 20 },
  { x: 0, y: 500, w: 150, h: 20 },
  // left ground
  { x: 250, y: 500, w: 100, h: 20 },
  // right ground
  { x: 450, y: 500, w: 300, h: 20 },
  { x: 910, y: 500, w: 300, h: 20 },
  { x: 1310, y: 500, w: 300, h: 20 },
];

let spikes = [
  { x: 170, y: 520, w: 30, h: 20 },
  { x: 200, y: 520, w: 30, h: 20 },
  { x: 230, y: 520, w: 30, h: 20 },
  { x: 370, y: 520, w: 30, h: 20 },
  { x: 400, y: 520, w: 30, h: 20 },
  { x: 430, y: 520, w: 30, h: 20 },
  { x: 770, y: 520, w: 30, h: 20 },
  { x: 800, y: 520, w: 30, h: 20 },
  { x: 830, y: 520, w: 30, h: 20 },
  { x: 860, y: 520, w: 30, h: 20 },
  { x: 890, y: 520, w: 30, h: 20 },
  { x: 1230, y: 520, w: 30, h: 20 },
  { x: 1260, y: 520, w: 30, h: 20 },
  { x: 1290, y: 520, w: 30, h: 20 },
];

let onGround = false;
let stretchX = 64;
let stretchY = 64;
let ballX = 300;
let ballY = 100;
// how fast the ball is moving up or down
let speed = 0;
// the force pulling it down every frame
let gravity = 1.5;
let ground = 500;

function preload() {
  ballNormal = loadImage("ball normal.png");
  ballStretch = loadImage("ball stretch.png");
  ballSquish = loadImage("ball squish.png");
  ballBreak = loadImage("ball break.png");
}

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(0);
  push();
  translate(-camX, 0);
  fill(255, 0, 0);

  if (onGround === false && ballBroken === false) {
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
      if (abs(speed) < 6) {
        speed = 0;
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

  if (ballY > 600) {
    ballY = 100;
    ballX = 300;
    speed = 0;
    score = 0;
    for (let i = 0; i < coins.length; i++) {
      coins[i].collected = false;
    }
    // let i = 0(start at 0)
    // i < coins.length( keep going while i is less than coin.length)
    // i++(increase by 1 coin each time)
  }
  //   DEATH CHECKS

  if(ballBroken === false){
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
  }
  //   SPIKES
  fill("red");
  for (let i = 0; i < spikes.length; i++) {
    let s = spikes[i];
    triangle(s.x, s.y - 25, s.x - 10, s.y, s.x + 10, s.y);

    if (
      ballX >= s.x - 10 &&
      //         ball is past the left edge of spike
      ballX <= s.x + 10 &&
      //         ball is before the right edge of spike
      ballY + stretchY / 2 >= s.y - 25 && ballBroken === false
    ) {
      // ball's bottom has reached the spike tip
      ballBroken = true; 
      // The ball is now in broken state
      breakTimer = 60;
      // since draw runs on 60 times per second, it gives the ballbreak animation one second to show before it resets
      speed = 0;
      // Stop the ball from moving up or down
      score = 0;
      onGround = false;
      for (let i = 0; i < coins.length; i++) {
        coins[i].collected = false;
      }
    }

  }
  //     COINS
  for (let i = 0; i < coins.length; i++) {
    let c = coins[i];
    if (c.collected === false) {
      fill("gold");
      ellipse(c.x, c.y, 10);
    }
    if (dist(ballX, ballY, c.x, c.y) < 20 && c.collected === false) {
      c.collected = true;
      score = score + 10;
    }
  }

  fill("red");
  //   this is the orange ball
  
  if(ballBroken == true){
    breakTimer = breakTimer -1
    // because draw count 60 times persecond, this counts from 60 down to 0 in exactly 1 second
    if(breakTimer <=0){
      // Has the timer finished counting down?
      ballBroken = false;
      // ball is no longer broken yayyyyyyy
      ballX = 300;
      ballY = 100;
      // now send the ball back to it's starting position
      onGround = false;
      // ball is not on the ground, its in the air
      speed = 0
    }
  }

  if(ballBroken == true){
    image(ballBreak, ballX - 18, ballY - 18, stretchX, stretchY);
  }
    
  else if(speed > 2) {
    image(ballStretch, ballX - 18, ballY - 18, stretchX, stretchY);
  }
  // If falling fast stretch
  else if (speed === 0 && onGround) {
    image(ballSquish, ballX - 18, ballY - 18, stretchX, stretchY);
  }
  // If sitting still on ground squish
  else {
    image(ballNormal, ballX - 18, ballY - 18, stretchX, stretchY);
  }
  // or else normal

  //  this is the platform the ball will jump on
  pop();
  fill("white");
  textSize(20);
  text("Score: " + score, 10, 20);
}
