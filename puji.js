var PLAYER_SIZE_W = PLAYER_W / W,
    PLAYER_SIZE_H = PLAYER_H / H,
    PLAYER_SPEED = 0.003,
    FPS = 20,
    GAME_SPEED = 1,
    MAX_PLAYERS = 4,
    PLAYER_N,
    PUJI_N = 32,
//    t = new Date() | 0,
    t= Date.now();
//    t_begin = new Date() | 0,
    t_begin = Date.now();
    FIRE_DISTANCE = 0.06
    countDead=0;

var pujis = [];

var NextDeathTime=-1;

function SuddenDeath()
{
    var killme = 1;
    if(NextDeathTime<t)
    {
        if(NextDeathTime!=-1)
        {
            killme = MAX_PLAYERS + Math.round(Math.random() * (PUJI_N+countDead));
            pujis[killme].die();
            pujis[killme].noResurrect=1;
        }

        NextDeathTime = t + Math.random() * 5000 + 3000;
    }
}

function CheckForSuddenDeath()
{
    if(t>t_begin+60000)
        SuddenDeath();
}

function startGame(players) {
    PLAYER_N = players;
    PUJI_N += MAX_PLAYERS - PLAYER_N;
    for(var i = 0; i < MAX_PLAYERS - PLAYER_N; ++i) { // create dead and invisible players to fill pujis array
        var position = new Vector(0, 0),
            face = new Vector(0, 0);
        pujis.push(
            new Player(
                position,
                new Vector(0, 0),
                face,
                true,
                false,
                0,
                new Sprite('images/blank.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
    for(var i = MAX_PLAYERS - PLAYER_N; i < MAX_PLAYERS; ++i) {
        scores.push(0);
        updateScores();
        var position = new Vector(Math.random(), Math.random()),
            face = new Vector(0, 0); // TODO: randomize face
        pujis.push(
            new Player(
                position,
                new Vector(0, 0),
                face,
                false,
                true,
                i,
                new Sprite('images/puji.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
//    console.log(pujis);
    for(var i = MAX_PLAYERS; i < PUJI_N; ++i) {
        pujis.push(
            new Player(
                new Vector(Math.random(), Math.random()),
                new Vector(0, 0), // TODO: randomize starting velocity
                new Vector(0, 0),
                false,
                false,
                -1,
                new Sprite('images/puji.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
}

function addPoint(i) {
    ++scores[i];
    updateScores();
}

function restart() {
    newGame();
    startGame(PLAYER_N);
}

startGame(4);

function integratePujis(dt) {
    countDead = 0;
    for(var i = MAX_PLAYERS - PLAYER_N; i < PUJI_N; ++i) {
        if(pujis[i].isDead && pujis[i].isPlayer) ++countDead;
        pujis[i].integrate(dt);
    }
    if(countDead == PLAYER_N - 1) endGame();
}

function AIBots() {
    for(var i = MAX_PLAYERS; i < PUJI_N; ++i) {
        if(pujis[i].isDead && !pujis[i].noResurrect) {
            if(!pujis[i].isPlayer && pujis[i].resurrectTime < 0) {
                pujis[i].resurrectTime = t + Math.random() * 5000 + 3000;
                console.log(i + " resurrect time set to: " + pujis[i].resurrectTime);
            } else if(t > pujis[i].resurrectTime) {
                console.log(i + " resurrected");
                pujis[i].resurrect();
            }
            continue;
        }
        if(pujis[i].stopTime < t) {
            pujis[i].stopTime = t + Math.random() * 3000 + 1000;
            pujis[i].velocity = new Vector(Math.round(1 - 2 * Math.random()), Math.round(1 - 2 * Math.random()));
            if(pujis[i].velocity.x * pujis[i].velocity.y != 0) { // disallow diagonal movements
                pujis[i].velocity = new Vector(0, 0);
            }
        }
    }
}

function tick(dt) {
    AIBots();
    integratePujis(dt);
    CheckForSuddenDeath();
    render();
}


function mainLoop() {
//    var dt = (new Date() | 0) - t;
    var dt = Date.now()-t;
    tick(GAME_SPEED * dt / FPS);
//    t = new Date() | 0;
    t= Date.now();
}

var wi = window.setInterval(mainLoop, FPS);
