var balloon;
var database;
var position;
var bg, balloonAnimation1,balloonImg;

function preload() {
    bg = loadImage("cityImage.png");
    balloonAnimation1 = loadAnimation("HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-03.png")
    balloonImg = loadAnimation("HotAirBallon-01.png");
}

function setup() {
    createCanvas(displayWidth,displayHeight );
    balloon = createSprite(width/2, height-100, 20, 20);
    balloon.addAnimation("balloon2",balloonImg);
    database = firebase.database();
    var balloonPositionRef = database.ref("ball/position")
    balloonPositionRef.on("value", readPosition, showError)
}

function draw() {
    background(bg);

    if (position){

    

    if (keyDown(LEFT_ARROW)) {
        writePosition(-1, 0);
        balloon.addAnimation("Balloon1",balloonAnimation1);
    }
    else if (keyDown(RIGHT_ARROW)) {
        writePosition(1, 0);
        balloon.addAnimation("Balloon1",balloonAnimation1);

    }
    else if (keyDown(UP_ARROW)) {
        writePosition(0, -1);
        balloon.addAnimation("Balloon1",balloonAnimation1);
        balloon.scale-=0.005;

    }
    else if (keyDown(DOWN_ARROW)) {
        writePosition(0, +1);
        balloon.addAnimation("Balloon1",balloonAnimation1);
        balloon.scale+=0.005;
    }
    drawSprites();
}
}


function showError() {
    console.log("There is a problem in database")
}

function readPosition(data) {
    position = data.val()
    console.log(position)
    balloon.x = position.x
    balloon.y = position.y
}

function writePosition(x, y) {
    database.ref("ball/position").set({
        x: position.x + x,
        y: position.y + y
    })

}