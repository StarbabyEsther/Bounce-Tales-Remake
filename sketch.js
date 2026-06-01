let platforms = [
  { x: 100, y: 400, w: 150, h: 20 },
  { x: 200, y: 300, w: 50, h: 20 },
  { x: 300, y: 200, w: 10, h: 20 },
 { x: 0, y: 500, w: 150, h: 20 },   // "ground" left
 { x: 250, y: 500, w: 150, h: 20 },  // "ground" right
];

let spikes = [
  {x : 170, y: 520, w: 30, h: 20},
  {x : 200, y: 520, w: 30, h: 20},
  {x : 230, y: 520, w: 30, h: 20},
]

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

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(0);
  fill(255, 0, 0);
  
  if(onGround === false){
  speed = speed + gravity;
  }
  ballY = ballY + speed;
  // speed pushes ball downward

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
  fill("red");
  //   this is the orange ball
  ellipse(ballX, ballY, stretchX, stretchY);
  //  this is the platform the ball will jump on
  

}
