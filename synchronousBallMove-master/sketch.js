var Ball, database;
var position;

function preload(){
  bg =loadImage("cityImage.png");
  balloonImage1=loadAnimation("hotairballoon1.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}


function setup(){
 database = firebase.database()
  console.log(database);
  createCanvas(500,500);

  Ball = createSprite(250,250,10,10);
  Ball.shapeColor = "red";
  Ball.addAnimation("hotAirBalloon",balloonImage1);
  Ball.scale = 0.25
  var ballposition = database.ref("ball/position")
  ballposition.on("value", readPosition)
}

function draw(){
  background(bg);

  
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
      Ball.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
      Ball.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
      Ball.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
      Ball.addAnimation("hotAirBalloon",balloonImage2);
    }
    drawSprites();
  text(Ball.x+","+Ball.y,Ball.x,Ball.y)
}

function writePosition( x , y ){
 
 database.ref("ball/position").set({
   "x":position.x+x,
   "y":position.y+y
 })

}

function readPosition(data){
 position=data.val()
 Ball.x=position.x
 Ball.y=position.y
}

function showError(){
}
