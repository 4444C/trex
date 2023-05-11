var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var cloud, cloudsGroup, cloudImage;
var obstacles_group;
var Restart
var GAME_OVER
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var gameOverImage;
var RstartImage;
var checkpoint;
var die;
var jump;


function preload(){

  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  gameOverImage = loadImage('gameOver.png');
  RstartImage = loadImage('restart.png');
  cloudImage = loadImage("cloud.png");
  obstacle1=loadImage('obstacle1.png');
  obstacle2=loadImage('obstacle2.png');
  obstacle3=loadImage('obstacle3.png');
  obstacle4=loadImage('obstacle4.png');
  obstacle5=loadImage('obstacle5.png');
  obstacle6=loadImage('obstacle6.png');
  checkpoint=loadSound("checkpoint.mp3");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");

}

function setup() {
  createCanvas(600, 200);

  GAME_OVER=createSprite(300,30,30,30);
  Restart=createSprite(300,100,30,30);
  GAME_OVER.addImage(gameOverImage)
  Restart.addImage(RstartImage)
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  trex.debug=false;
  trex.setCollider('circle',0,0,40);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup=new Group();
  obstacles_group=new Group();
  
}

function draw() {
  background('white');
  text('pontuação: '+score,500,50);

  if(gameState===PLAY){

    Restart.visible = false;
    GAME_OVER.visible = false;
    ground.velocityX = -8;
    score=score+Math.round(getFrameRate()/60);
    if(score>0 && score %100===0){
      checkpoint.play();
    }
    if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -12;
      jump.play();
    }
    trex.velocityY = trex.velocityY + 0.8;
    if(obstacles_group.isTouching(trex)){
      gameState=END;
      die.play();
    }
    if (ground.x < 0){
      ground.x = ground.width/2;  
    }
    spawnClouds();
    spawnobstacles();
  }
  else if (gameState===END){
  
    GAME_OVER.visible = true;
    Restart.visible = true;
    ground.velocityX = 0;
    obstacles_group.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.velocityY=0;
    trex.changeAnimation("collided",trex_collided);
    obstacles_group.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(Restart)){
      Reset()
    }
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnobstacles(){
  if (frameCount % 60 === 0) {
  var obstacle = createSprite(600,165,10,40); 
  obstacle.velocityX = -(6+score/100);
  var rand=Math.round(random(1,6));
     switch (rand) {
     case 1:obstacle.addImage(obstacle1)    
      break;
      case 2:obstacle.addImage(obstacle2)    
      break;
      case 3:obstacle.addImage(obstacle3)    
      break;
      case 4:obstacle.addImage(obstacle4)    
      break;
      case 5:obstacle.addImage(obstacle5)    
      break;
      case 6:obstacle.addImage(obstacle6)    
      break;
    default:
      break;

  }
obstacle.scale=0.5
obstacle.lifetime=300
obstacles_group.add(obstacle);
}
}
function spawnClouds() {
  // nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10,60));
    cloud.scale = 0.4;
    cloud.velocityX = -(3+score/100);
    cloudsGroup.add(cloud);
    
    //tempo de vida à variável
    cloud.lifetime = 210
    
    //profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    }
}
function Reset(){
    gameState=PLAY;
    score=0;
    obstacles_group.destroyEach()
    cloudsGroup.destroyEach()
    trex.changeAnimation("running", trex_running);
}
