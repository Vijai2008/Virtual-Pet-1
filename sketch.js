var dog, happyDog, dogImg, dogHappyImg;
var database;
var foods, foodStock;

function preload() {
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogHappyImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale=0.15;
  var foodStock = database.ref("food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappyImg)
  }

  drawSprites();
  //add styles here
  fill("black")
  text("Note: Press *UP ARROW* Key to Feed Drago Milk",50,50);
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if(x<0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}


