var myPlayer;
var myEnemy; //= [];
var myBullet;
var MAX_SPEED = 10;
var score = 0;

function setup() {
    createCanvas(1280, 720);
    //noCursor();
    myPlayer = new Player();
    //myEnemy = new Enemy();
    myEnemy = new Group();
    myBullet = new Group();
    q = true;
    
    for (var i = 0; i < 6; i++) {
        var newEnemy = createSprite(random(125, width-125), (height/5)*i, random(10, 100), random(10, 100));
        newEnemy.addToGroup(myEnemy);   
    }
    
}

function draw() {
    background(51);
    
    myPlayer.show();
    
    if (keyIsDown(87)) {
        myPlayer.move_y(-3);
    }
    else if (keyIsDown(65)) {
        myPlayer.move_x(-3);
    }
    else if (keyIsDown(83)) {
        myPlayer.move_y(3);
    }
    else if (keyIsDown(68)) {
        myPlayer.move_x(3);
    }
    else if (key == ' ') {
        myPlayer.move_x(0);
        myPlayer.move_y(0);
    }
    
    for (var i = 0; i < myEnemy.length; i++) {
        myEnemy[i].attractionPoint(0.5, myPlayer.x, myPlayer.y);
      
    }
    
    if (mouseIsPressed) {
        var bullet = createSprite(myPlayer.x, myPlayer.y, 10, 10);
        bullet.maxSpeed = MAX_SPEED;
        bullet.velocity.x = mouseX - myPlayer.x;
        bullet.velocity.y = mouseY - myPlayer.y;
        bullet.life = 90;
        bullet.addToGroup(myBullet);
    }
    
    myBullet.overlap(myEnemy, kill);
    
    drawSprites();
    
    fill(255);
    stroke(0);
    textSize(72);
    textAlign(CENTER, CENTER);
    if (myEnemy.length > 0) {
        text(score, width/2, height/2);
    }
    
    else {
        text("You Win!", width/2, height/2);
    }
    
 
}


class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.x_speed = 0;
        this.y_speed = 0;
    }
    
    move_x(tempSpeed) {
        this.x_speed = tempSpeed;
        this.x += this.x_speed;
    }
    
    move_y(tempSpeed) {
        this.y_speed = tempSpeed;
        this.y += this.y_speed;
    }
    
    show() {
        stroke(0,255,0);
        fill(0,255,0);
        rect(this.x, this.y, 25, 25);
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
}


class Enemy {
    constructor() {
        this.x = random(1, width);
        this.y = random(1, height);
        this.x_speed = 0;
        this.y_speed = 0;
    }
    
    move_x2(tempSpeed) {
        this.x_speed = tempSpeed;
        this.x += this.x_speed;
    }
    
    move_y2(tempSpeed) {
        this.y_speed = tempSpeed;
        this.y += this.y_speed;
    }
    
    show() {
        stroke(123,123,123);
        fill(123,123,123);
        rect(this.x, this.y, 20, 20);
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
}

function kill(bullet, myEnemy) {
  myEnemy.remove();
  score += 1;
}