//tells the browser we want to animate
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

//setup canvas and player vars
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1000,
    height = 400,
    player = {
        x: width/2,
        y: height - 5,
        width: 5,
        height: 5,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false
    },
    keys = [],
    friction = 0.9,
    gravity = 0.1;

canvas.width = width;
canvas.height = height;

//call on every animation frame
function update(){
    //check for controls pressed
    if(keys[38] || keys[32]){
        //up arrow
        if(!player.jumping){
            player.jumping = true;
            player.velY = -player.speed*2;
        }
    }
    if(keys[39]){
        //right arrow
        if(player.velX < player.speed){
            player.velX++;
        }
    }
    if(keys[37]){
        //left arrow
        if(player.velX > -player.speed){
            player.velX--;
        }
    }

    player.velX *= friction;
    player.velY += gravity;

    //move player
    player.x += player.velX;
    player.y += player.velY;

    //set player canvas boundary
    if(player.x >= width-player.width){
        player.x = width-player.width;
    }else if(player.x <= 0){
        player.x = 0;
    }

    if(player.y >= height-player.height){
        player.y = height - player.height;
        player.jumping = false;
    }

    //temporary box which becomes the player
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
}

    //temporary character
    var base_image = new Image();
    base_image.src = '../img/pukeinatorCharacter.svg';
    base_image.onload = function(){
    ctx.drawImage(base_image, 0, 0);
    //console.log('should be placing image');
  }

//listen for keydown
document.body.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
});

//listen for keyup
document.body.addEventListener('keyup', function(e) {
    keys[e.keyCode] = false;
});

//kick start the game
window.addEventListener('load', function(){
    update();
});