var diver;
var score, islandImg, island;
var bg, scene;
var diverImg, bioImg;
var facts1, facts2, facts3, facts4;
var trash;
var trash2;
var obstacleGroup;
var fish1, fish2;
var fishGroup;

function preload(){
  scene = loadImage("pictures/Background3.png");
  diverImg = loadImage("pictures/Scuba Diver2.png");
  facts1 = loadImage("pictures/Fact1.png");
  bioImg = loadImage("pictures/Biologist.png");
  facts2 = loadImage("pictures/Fact2.png");
  facts3 = loadImage("pictures/Fact3.png");
  facts4 = loadImage("pictures/Fact4.png");
  trash = loadImage("pictures/Fishing.png");
  trash2 = loadImage("pictures/Trash.png");
  fish1 = loadImage("pictures/Fish1.png");
  fish2 = loadImage("pictures/Fish2.png");
  islandImg = loadImage("pictures/Trash Island 2.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  //createSprite(400, 200, 50, 50);

  score = 0;

  bg = createSprite(width/2-50,height/2,400,400);
  bg.addImage(scene);
  bg.scale = 1.5;

  bg.x = bg.width/2;
  bg.velocityX = -2;

  diver = createSprite(75, height-300, 40, 20);
  diver.addImage(diverImg);
  diver.scale = 0.2;

  island = createSprite(790, 200, 100, 75);
  island.addImage(islandImg);
  island.visible = false;

  obstacleGroup = new Group;
  fishGroup = new Group;

  textSize(30);
}

function draw() {
  background(255,255,255);

  console.log(frameCount);

  drawSprites();
  
  text("Score: "+ score, 650, 150);
  
  //making background scroll
  if(bg.x < 0){
    bg.x = bg.width/2;
  }

  //making the scuba diver move up
  if(keyDown(UP_ARROW) && diver.y > height-300){
    diver.y = diver.y-20
  }

  //making the scuba diver move down
  if(keyDown(DOWN_ARROW) && diver.y < height-100){
    diver.y = diver.y+20
  }

  //changing points if diver is touching the obstacles(trash)
  if(obstacleGroup.isTouching(diver)){
    score = score+20
    obstacleGroup.destroyEach();
  }

  //chegning points if the diver is touching the fish(saving the fish)
  if(fishGroup.isTouching(diver)){
    fill("red");
    text("You saved a fish!", 300, 50);
    score = score+20
    fishGroup.destroyEach();
    textSize(20);
  }

  //ending of the game 

  if(score === 300){
    fishGroup.velocityXEach(0);
    obstacleGroup.velocityXEach(0);
    diver.velocityX = 0;
    diver.velocityY = 0;

    island.visible = true;
    island.velocityX = -4;

    text("14 billions pounds of trash is dumped into the ocean each year.", 400, 100);
    text("Ocean Pollution is one of the biggest problems we have.", 400, 150);
    text("Ocean Pollution does not just affect fish, but also humans.", 400, 210);
    text("Help in any way you can!", 400, 270);
    text("One person alone cannot stop this problem,", 400, 330);
    text("but together we can put an end to pollution!", 400, 380);
  }

  //running functions
  obstacle();
  facts();
  fish();
}

//function for spawing the obstackes(trash)
function obstacle(){
  if(frameCount % 200 === 0){
    var obstacles = createSprite(width, height-200, 30, 30);
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: obstacles.addImage(trash);
      break;
      
      case 2: obstacles.addImage(trash2);
              obstacles.scale = 0.05;
      break;
      
      default: break;
    }
    obstacles.y = random(height-425, height-100);
    obstacles.velocityX = -4;
    obstacles.lifetime = 200;

    obstacleGroup.add(obstacles);
  }
}

//function for spawning the fish
function fish(){
  if(frameCount % 175 === 0){
    var fish = createSprite(width, 450, 30, 30);
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: fish.addImage(fish1);
              fish.scale = 0.5;
      break;

      case 2: fish.addImage(fish2);
              fish.scale = 0.4;
      break;

      default: break;
    }
    fish.y = random(height-425, height-100);
    fish.velocityX = -4;
    fish.lifetime = 200;

    fishGroup.add(fish);
  }
}

function facts(){
  
  if(frameCount % 250 === 0){

    var biologist = createSprite(width-175, height-150, 60, 60);
    biologist.visible = false;

    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: biologist.addImage("fact1",facts1);
              biologist.scale = 0.5;
              biologist.visible = true;
      break;
   
      case 2: biologist.addImage("fact2",facts2);
              biologist.scale = .5;
              biologist.visible = true;
      break;
   
      case 3: biologist.addImage("fact3", facts3);
              biologist.scale = .5;
              biologist.visible = true;
      break;
   
      case 4: biologist.addImage("fact4", facts4);
              biologist.scale = .5;
              biologist.visible = true;
      break;
   
      default: break;
    }
    if(frameCount % 54 === 0){
      biologist.visible = false;
    }
  }  
}