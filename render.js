var PLAYER_W = 24, PLAYER_H = 24;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var W = 640, H = 480 ;
var scores = [];
var indices = []; //Puji indices such that every index corresponds to a puji (for sorting purposes)

// var george = new Sprite( 'images/george_0.png', new Vector( 44, 44 ) );
var background = new Image();
background.src = 'images/puji_room.jpg';

canvas.width = W;
canvas.height = H;

function updateScores() {
    for(var i = 0; i < PLAYER_N; ++i) {
        var el = document.getElementById("player" + i);
        el = el.getElementsByClassName("score")[0];
        el.innerHTML = scores[i];
    }
    for(var i = 0; i < PLAYER_N; ++i) {
        var el = document.getElementById("UDplayer" + i);
        el = el.getElementsByClassName("score")[0];
        el.innerHTML = scores[i];
    }
}

function popup() {
    var el = document.getElementById("popup");
    el.className = 'show';
}

function removePopup() {
    var el = document.getElementById("popup");
    el.className = '';
}

function newGame() {
    removePopup();
    wi = window.setInterval(mainLoop, FPS);
}

function endGame() {
    updateScores();
    popup();
    clearInterval(wi);
}

function compPujis(a, b) {
    if(pujis[a].location.y==pujis[b].location.y) {
        return pujis[a].location.x < pujis[b].location.x;
    }
    return pujis[a].location.y > pujis[b].location.y;
}

function drawPujis() {
    ctx.fillStyle = 'blue';
    if(indices.length == 0) {
        for(var i = MAX_PLAYERS - PLAYER_N; i<PUJI_N; ++i) {
            indices[i-MAX_PLAYERS+PLAYER_N]=i;
        }
    }
    indices.sort(compPujis);
    for(var ind = 0; ind < PUJI_N - MAX_PLAYERS + PLAYER_N; ++ind) {
        var i=indices[ind];
        spritepos=new Vector(0, 0);
        if(pujis[i].isFiring) {
            spritepos=new Vector(10, 0);
        }
        else if(pujis[i].isDying) {
            if(pujis[i].isPlayer) {
                spritepos=new Vector(17, 0);
            }
            else {
                spritepos=new Vector(14, 0);
            }
        }
        else if(pujis[i].isDead) {
            spritepos=new Vector(20, 0);
        }
        else {
            if(pujis[i].face.y==1) {
                spritepos=new Vector(0, 0);
            }
            else if(pujis[i].face.x==1) {
                spritepos=new Vector(3, 0);
            }
            else if(pujis[i].face.y==-1) {
                spritepos=new Vector(5, 0);
            }
            else if(pujis[i].face.x==-1) {
                spritepos=new Vector(8, 0);
            }
        }
        if(pujis[i].velocity.x!=0 || pujis[i].velocity.y!=0 || pujis[i].isDead || pujis[i].isFiring || pujis[i].isDying) {
            if(spritepos.x==0 || spritepos.x==5 || spritepos.x==20) {
                spritepos.x+=Math.round(t * PLAYER_SPEED * 4)%3;
            }
            else if(spritepos.x==10) {
                spritepos.x+=Math.floor(Math.min(3.9 * (t-pujis[i].fireTime) / FIRE_DURATION, 3.9))%4;
            }
            else if(spritepos.x==17 || spritepos.x==14) {
                spritepos.x+=Math.floor(Math.min(2.9 * (t-pujis[i].dyingTime) / DIE_DURATION, 2.9))%3;
            }
            else {
                spritepos.x+=Math.round(t * PLAYER_SPEED * 4)%2;
            }
        }
        pujis[i].sprite.draw(
                ctx,
                new Vector(pujis[i].location.x * W, pujis[i].location.y * H),
                spritepos
                );
    }

}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.clearRect(-PLAYER_W / 2, -PLAYER_H / 2, W + PLAYER_W / 2, H + PLAYER_H / 2);
//    ctx.drawImage(background, -PLAYER_W / 2, -PLAYER_H / 2);
}

function render() {
    clearCanvas();
    drawPujis();
}

function rect(start, size) {
    ctx.fillRect(start.x, start.y, size.x, size.y);
}
