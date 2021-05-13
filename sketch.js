var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bird;
var backGround;

var score=0;

var obstaclestopGroup;

var obstaclesbottomGroup;

var gameOver;

var tunnel,tunnel1;

var topcoin,bottemcoin;

var space;

var die;




function preload(){
  birdImg = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png","bird9.png","bird10.png","bird11.png","bird12.png","bird13.png","bird14.png");
  tunneltopImg = loadImage("tunneltop.png");
  tunnelbottemImg = loadImage("tunnelbottem.png");
  backGroundImg = loadImage("bg.png");
  gameOverImg = loadImage("gameOver.png");
  spaceImg = loadImage("Space.png");
  die = loadSound("die.mp3");
  coinImg = loadAnimation("c1.png","c2.png","c3.png","c4.png","c5.png","c6.png","c7.png","c8.png","c9.png","c10.png");
  birddeadImg = loadImage("bird1.png");
  coindeadImg = loadImage("c1.png");
  
}


function setup(){
  createCanvas(800,800);

  
  backGround1 = createSprite(400,20,1600,1000);
  backGround1.addImage("background",backGroundImg);
  backGround1.scale = 10;
 
  bird = createSprite(100,200,20,30);
  bird.addAnimation("bird",birdImg);
  bird.scale = 1.2;
  bird.setCollider("circle",0,0,20);
  
   gameOver = createSprite(400,400,20,20);
   gameOver.addImage("gameover",gameOverImg);
   gameOver.visible = false;

   space = createSprite(400,300,10,10);
   space.addImage("sp",spaceImg);
   space.scale = 0.3;
   space.visible = false;
   

  obstaclestopGroup = new Group();
  obstaclesbottomGroup = new Group();
  topcoinGroup = new Group();
  bottemcoinGroup = new Group();

}

function draw(){
  background(255);
  
  if(gameState===PLAY){
    
    
    bird.velocityY = bird.velocityY + 0.25;
    
    if(keyDown("UP_ARROW")){
      bird.velocityY = -4.5;
    }

    if(backGround1.x < 0){
      backGround1.x = backGround1.width/2;

    
    }
  }
  if(keyDown("UP_ARROW")){
    bird.velocityY = -4.5;
  } 
    
    backGround1.velocityX = -10
  
    spawntopObstacles();
    spawnbottomObstacles();
    spawntopcoin();
    spawnbottemcoin();
    

    if(obstaclestopGroup.isTouching(bird)){
      gameState = END;
      
    }
    if(obstaclesbottomGroup.isTouching(bird)){
      gameState = END;
      
    }
    if(topcoinGroup.isTouching(bird)){
      score = score + 1;
      
    }
    if(bottemcoinGroup.isTouching(bird)){
    score = score + 1;

    }
    if(gameState === END){
    
      bird.addImage("dead",birddeadImg);
     
     

      backGround1.velocityX = 0
      obstaclestopGroup.setVelocityXEach(0);
      obstaclestopGroup.setLifetimeEach(-1);
      obstaclestopGroup.destroyEach(0);

      obstaclesbottomGroup.setVelocityXEach(0);
      obstaclesbottomGroup.setLifetimeEach(-1);
      obstaclesbottomGroup.destroyEach(0);

      bottemcoinGroup.setLifetimeEach(-1);
      bottemcoinGroup.setVelocityXEach(0);
      bottemcoinGroup.destroyEach(0);

      topcoinGroup.setVelocityXEach(0);
      topcoinGroup.setLifetimeEach(-1);
      topcoinGroup.destroyEach(0);

      bird.velocityY = 0;
      gameOver.visible = true;
      space.visible = true;

      if(keyDown("SPACE")){
        reset();
      } 
    }
  
    drawSprites();
    textSize(25);
    fill("red");
    stroke("blue");
    strokeWeight(3)
   text("Score:"+ score,650,50);
}




function spawntopObstacles(){

  if(frameCount % 180 ===0){
    tunnel = createSprite(800,100,20,20);
  tunnel.addImage(tunneltopImg);
  tunnel.velocityX = -10.
  tunnel.lifetime = 300;
  tunnel.scale = 5;
  tunnel.setCollider("rectangle",0,0,40,40);
  
  obstaclestopGroup.add(tunnel);
  }
}

function spawnbottomObstacles(){

  if(frameCount % 120 ===0){
    tunnel1 = createSprite(800,700,20,20);
    tunnel1.addImage(tunnelbottemImg);
    tunnel1.velocityX = -10;
    tunnel1.lifetime = 300;
    tunnel1.scale = 5;
    tunnel1.setCollider("rectangle",0,0,40,40);

    obstaclesbottomGroup.add(tunnel1);
  }
}


function spawnbottemcoin(){
if(frameCount % 140 ===0){
  bottemcoin = createSprite(800,600,20,20);
  bottemcoin.addAnimation("coin",coinImg);
  bottemcoin.velocityX = -10;
  bottemcoin.lifetime = 300;
  bottemcoin.scale = 0.5;

  bottemcoinGroup.add(bottemcoin);
}
}

function spawntopcoin(){
if(frameCount % 200 ===0){
  topcoin = createSprite(800,150,20,20);
  topcoin.addAnimation("coins",coinImg);
  topcoin.velocityX = -10;
  topcoin.lifetime = 300;
  topcoin.scale = 0.5;

  bottemcoinGroup.add(topcoin);
}

}



function reset(){
gameState = PLAY;
gameOver.visible = false;

space.visible = false;

bird.x = 100;
bird.y = 200;

obstaclesbottomGroup.destroyEach();
obstaclestopGroup.destroyEach();
bottemcoinGroup.destroyEach();
topcoinGroup.destroyEach();
score = 0;

}



