var PLAYER_W = 24, PLAYER_H = 24;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var W = 648, H = 480 ;
var scores = [];
var indices = []; //Puji indices such that every index corresponds to a puji (for sorting purposes)
var background_seed = [];
var prevt = 0;
var frames=0;

var decorations = new Image();
decorations.src = 'images/room_decorations.png';
var tiles = new Image();
tiles.src = 'images/room_tiles.png';
var moss = new Image();
moss.src = 'images/room_moss.png';

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
                spritepos.x+=Math.round(t * PLAYER_SPEED * GAME_SPEED * 4)%3;
            }
            else if(spritepos.x==10) {
                spritepos.x+=Math.floor(Math.min(3.9 * (t-pujis[i].fireTime) / FIRE_DURATION, 3.9))%4;
            }
            else if(spritepos.x==17 || spritepos.x==14) {
                spritepos.x+=Math.floor(Math.min(2.9 * (t-pujis[i].dyingTime) / DIE_DURATION, 2.9))%3;
            }
            else {
                spritepos.x+=Math.round(t * PLAYER_SPEED * GAME_SPEED * 4)%2;
            }
        }
        pujis[i].sprite.draw(
                ctx,
                new Vector(pujis[i].location.x * W, pujis[i].location.y * H),
                spritepos
                );
    }

}

function drawBackground() {
    if(background_seed.length==0) {
        for(var i=1; i<W/PLAYER_W-1; ++i) {
            background_seed[i]= new Array(H/PLAYER_H-1);
            for(var j=1; j<H/PLAYER_H-1; ++j) {
                background_seed[i][j]= Math.random();
            }
        }
    }
    //Draw tiles and moss

    for(var i=1; i<W/PLAYER_W-1; ++i) {
        for(var j=1; j<H/PLAYER_H-1; ++j) {
            ctx.drawImage(tiles, PLAYER_W*(Math.round(background_seed[i][j]*5)%5), 0, PLAYER_W, PLAYER_H, i*PLAYER_W, j*PLAYER_H, PLAYER_W, PLAYER_H);
            if(background_seed[i][j]*10<1) {
                ctx.drawImage(moss, PLAYER_W*(Math.round(background_seed[i][j]*200)%5), 0, PLAYER_W, PLAYER_H, i*PLAYER_W, j*PLAYER_H, PLAYER_W, PLAYER_H);
            }
        }
    }

    //Draw walls
    ctx.drawImage(decorations, 14*PLAYER_W, 0, PLAYER_W, PLAYER_H, 0, 0, PLAYER_W, PLAYER_H);
    for(var i=1; i<W/PLAYER_W; ++i) {
        ctx.drawImage(decorations, 18*PLAYER_W, 0, PLAYER_W, PLAYER_H, i*PLAYER_W, 0, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 19*PLAYER_W, 0, PLAYER_W, PLAYER_H, i*PLAYER_W, H-PLAYER_H, PLAYER_W, PLAYER_H);
    }
    ctx.drawImage(decorations, 15*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-PLAYER_W, 0, PLAYER_W, PLAYER_H);
    for(var i=1; i<H/PLAYER_H; ++i) {
        ctx.drawImage(decorations, 21*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-PLAYER_W, i*PLAYER_H, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 20*PLAYER_W, 0, PLAYER_W, PLAYER_H, 0, i*PLAYER_H, PLAYER_W, PLAYER_H);
    }
    ctx.drawImage(decorations, 16*PLAYER_W, 0, PLAYER_W, PLAYER_H, 0, H-PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 17*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-PLAYER_W, H-PLAYER_H, PLAYER_W, PLAYER_H);

    //Draw decorations

    ctx.drawImage(decorations, 1*PLAYER_W, 0, PLAYER_W, PLAYER_H, 2*PLAYER_W, 2*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 2*PLAYER_W, 0, PLAYER_W, PLAYER_H, 3*PLAYER_W, 2*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 3*PLAYER_W, 0, PLAYER_W, PLAYER_H, 2*PLAYER_W, 3*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 4*PLAYER_W, 0, PLAYER_W, PLAYER_H, 3*PLAYER_W, 3*PLAYER_H, PLAYER_W, PLAYER_H);

    ctx.drawImage(decorations, 1*PLAYER_W, 0, PLAYER_W, PLAYER_H, 5*PLAYER_W, 2*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 7*PLAYER_W, 0, PLAYER_W, PLAYER_H, 5*PLAYER_W, 3*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 7*PLAYER_W, 0, PLAYER_W, PLAYER_H, 5*PLAYER_W, 4*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 1*PLAYER_W, 0, PLAYER_W, PLAYER_H, 2*PLAYER_W, 5*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 6*PLAYER_W, 0, PLAYER_W, PLAYER_H, 3*PLAYER_W, 5*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 6*PLAYER_W, 0, PLAYER_W, PLAYER_H, 4*PLAYER_W, 5*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 12*PLAYER_W, 0, PLAYER_W, PLAYER_H, 5*PLAYER_W, 5*PLAYER_H, PLAYER_W, PLAYER_H);

    ctx.drawImage(decorations, 9*PLAYER_W, 0, PLAYER_W, PLAYER_H, 7*PLAYER_W, 6*PLAYER_H, PLAYER_W, PLAYER_H);


    ctx.drawImage(decorations, 1*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-4*PLAYER_W, 2*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 2*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-3*PLAYER_W, 2*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 3*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-4*PLAYER_W, 3*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 4*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-3*PLAYER_W, 3*PLAYER_H, PLAYER_W, PLAYER_H);

    ctx.drawImage(decorations, 2*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-6*PLAYER_W, 2*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 8*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-6*PLAYER_W, 3*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 8*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-6*PLAYER_W, 4*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 2*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-3*PLAYER_W, 5*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 6*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-4*PLAYER_W, 5*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 6*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-5*PLAYER_W, 5*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 11*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-6*PLAYER_W, 5*PLAYER_H, PLAYER_W, PLAYER_H);

    ctx.drawImage(decorations, 10*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-8*PLAYER_W, 6*PLAYER_H, PLAYER_W, PLAYER_H);


    ctx.drawImage(decorations, 1*PLAYER_W, 0, PLAYER_W, PLAYER_H, 2*PLAYER_W, H-4*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 2*PLAYER_W, 0, PLAYER_W, PLAYER_H, 3*PLAYER_W, H-4*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 3*PLAYER_W, 0, PLAYER_W, PLAYER_H, 2*PLAYER_W, H-3*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 4*PLAYER_W, 0, PLAYER_W, PLAYER_H, 3*PLAYER_W, H-3*PLAYER_H, PLAYER_W, PLAYER_H);

    ctx.drawImage(decorations, 3*PLAYER_W, 0, PLAYER_W, PLAYER_H, 2*PLAYER_W, H-6*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 5*PLAYER_W, 0, PLAYER_W, PLAYER_H, 3*PLAYER_W, H-6*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 5*PLAYER_W, 0, PLAYER_W, PLAYER_H, 4*PLAYER_W, H-6*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 3*PLAYER_W, 0, PLAYER_W, PLAYER_H, 5*PLAYER_W, H-3*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 7*PLAYER_W, 0, PLAYER_W, PLAYER_H, 5*PLAYER_W, H-4*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 7*PLAYER_W, 0, PLAYER_W, PLAYER_H, 5*PLAYER_W, H-5*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 10*PLAYER_W, 0, PLAYER_W, PLAYER_H, 5*PLAYER_W, H-6*PLAYER_H, PLAYER_W, PLAYER_H);

    ctx.drawImage(decorations, 11*PLAYER_W, 0, PLAYER_W, PLAYER_H, 7*PLAYER_W, H-7*PLAYER_H, PLAYER_W, PLAYER_H);


    ctx.drawImage(decorations, 1*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-4*PLAYER_W, H-4*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 2*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-3*PLAYER_W, H-4*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 3*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-4*PLAYER_W, H-3*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 4*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-3*PLAYER_W, H-3*PLAYER_H, PLAYER_W, PLAYER_H);

    ctx.drawImage(decorations, 4*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-6*PLAYER_W, H-3*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 8*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-6*PLAYER_W, H-4*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 8*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-6*PLAYER_W, H-5*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 4*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-3*PLAYER_W, H-6*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 5*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-4*PLAYER_W, H-6*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 5*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-5*PLAYER_W, H-6*PLAYER_H, PLAYER_W, PLAYER_H);
    ctx.drawImage(decorations, 9*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-6*PLAYER_W, H-6*PLAYER_H, PLAYER_W, PLAYER_H);

    ctx.drawImage(decorations, 12*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-8*PLAYER_W, H-7*PLAYER_H, PLAYER_W, PLAYER_H);


    for(var i=6*PLAYER_W; i<W-6*PLAYER_W; i+=PLAYER_W) {
        ctx.drawImage(decorations, 5*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, H-3*PLAYER_H, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, H-4*PLAYER_H, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, H-5*PLAYER_H, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, H-6*PLAYER_H, PLAYER_W, PLAYER_H);

        ctx.drawImage(decorations, 6*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, 2*PLAYER_H, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, 3*PLAYER_H, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, 4*PLAYER_H, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, 5*PLAYER_H, PLAYER_W, PLAYER_H);
    }

    for(var i=6*PLAYER_H; i<H-6*PLAYER_H; i+=PLAYER_H) {
        ctx.drawImage(decorations, 7*PLAYER_W, 0, PLAYER_W, PLAYER_H, 2*PLAYER_W, i, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, 3*PLAYER_W, i, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, 4*PLAYER_W, i, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, 5*PLAYER_W, i, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, 6*PLAYER_W, i, PLAYER_W, PLAYER_H);

        ctx.drawImage(decorations, 8*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-3*PLAYER_W, i, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-4*PLAYER_W, i, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-5*PLAYER_W, i, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-6*PLAYER_W, i, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 13*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-7*PLAYER_W, i, PLAYER_W, PLAYER_H);
    }

    for(var i=8*PLAYER_W; i<W-8*PLAYER_W; i+=PLAYER_W) {
        ctx.drawImage(decorations, 5*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, 6*PLAYER_H, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 6*PLAYER_W, 0, PLAYER_W, PLAYER_H, i, H-7*PLAYER_H, PLAYER_W, PLAYER_H);
    }

    for(var i=7*PLAYER_H; i<H-7*PLAYER_H; i+=PLAYER_H) {
        ctx.drawImage(decorations, 8*PLAYER_W, 0, PLAYER_W, PLAYER_H, 7*PLAYER_W, i, PLAYER_W, PLAYER_H);
        ctx.drawImage(decorations, 7*PLAYER_W, 0, PLAYER_W, PLAYER_H, W-8*PLAYER_W, i, PLAYER_W, PLAYER_H);
    }
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.clearRect(-PLAYER_W / 2, -PLAYER_H / 2, W + PLAYER_W / 2, H + PLAYER_H / 2);
    if(t-prevt>1000){
        console.log(frames);
        prevt=t;
        frames=0;
    }
    ++frames;
}

function render() {
    clearCanvas();
    drawBackground();
    drawPujis();
}

function rect(start, size) {
    ctx.fillRect(start.x, start.y, size.x, size.y);
}
