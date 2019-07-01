//https://youtu.be/nl0KXCa5pJk?t=1462

const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

context.fillStyle = "black";
context.fillRect(100,200,50,75);

context.fillStyle = "red";
context.beginPath();
context.arc(300,350,100,0,Math.PI*2, false); //(X position, Y position, radius, start angle, end angle, diretcion);
context.closePath();
context.fill();

let rectX = 0;

const user1 = {
    x :0,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "white",
    score : 0
}

// const user2 = {
//     x: canvas.width - 10,
//     y: canvas.height/2 - 100/2,
//     width: 10,
//     height: 100,
//     color: "white",
//     score: 0
// }

const com = {
    x : canvas.width - 10,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "white",
    score : 0
}

const net = {
    x : canvas.width/2 - 2/2,
    y : 0,
    width : 2,
    height : 10,
    color : "white",
}

const ball = {
    x : canvas.width/2
    y : canvas.height/2,
    radius : 10,
    speed : 5,
    velX : 5,
    velY : 5,
    color : "white"
}

function update(){
    ball.x += velX;
    ball.y += velY;
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        velY*=-1;
    }

    let player = (ball.x < canvas.width/2) ? user1 : com;
    if(collision(ball, player)){

    }
}

function collision(b, p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top;
}

function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color){
    context.fillStyle = color;
    context.font = "75px fantasy";
    context.fillText(text,x,y);
}


function render(){
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    drawText(user1.score, canvas.width/4, canvas.height/5, "white");
    drawText(com.score, 3*com.width/4, canvas.height/5, "white");
    drawNet();
    drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawCircle(ball.x, ball.y, ball.r, ball.color);
}

setInterval(render, 1000);

function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);        
    }
}

function game(){
    render();
}

const framePerSecond = 50;
setInterval(game, 1000/framesPerSecond);