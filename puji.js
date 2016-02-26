var GAME_SPEED = 3,
    PLAYER_SIZE_W = PLAYER_W / W,
    PLAYER_SIZE_H = PLAYER_H / H,
    PLAYER_SPEED = 0.0045/GAME_SPEED,
    FPS = 60,
    MAX_PLAYERS = 4,
    PLAYER_N = 4,
    PUJI_N = 32,
    t= Date.now(),
    t_begin = Date.now(),
    FIRE_DISTANCE = 0.06,
    FIRE_DURATION = 200,
    DIE_DURATION = 300,
    StartedSD = 0, // Whether sudden death has started or not
    SUDDEN_DEATH_TIME = 60000,
    countDead = 0,
    onTouch = 0;

var pujis = [];

var NextDeathTime=-1;

function showElement(element) {
    element.style.display = '';
}

function hideElement(element) {
    element.style.display = 'none';
}

hideElement(settings);

function SuddenDeath()
{
    var killme = 1;
    if(!StartedSD)
    {
        StartedSD = 1;
        document.getElementById('Sudden').className = 'Visible';
    }

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
    if(t>t_begin+SUDDEN_DEATH_TIME)
        SuddenDeath();
}

function startGame(players) {
    PLAYER_N = players;
    PUJI_N += MAX_PLAYERS - PLAYER_N;
    pujis = [];
    for(var i = 0; i < MAX_PLAYERS - PLAYER_N; ++i) { // create dead and invisible players to fill pujis array
        var position = new Vector(0, 0),
            face = new Vector(Math.round(Math.random()*3)-2, Math.round(Math.random()*3)-2);
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
        if(scores.length<=i-MAX_PLAYERS+PLAYER_N) {
            scores.push(0);
        }
        updateScores();
        var position = new Vector(Math.random(), Math.random()),
            face = new Vector(Math.round(Math.random()*3)-2, Math.round(Math.random()*3)-2);
        pujis.push(
            new Player(
                position,
                new Vector(0, 0),
                face,
                false,
                true,
                i-MAX_PLAYERS+PLAYER_N,
                new Sprite('images/pujis.png', new Vector(PLAYER_W, PLAYER_H))
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
                new Sprite('images/pujis.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
}

function addPoint(i) {
    ++scores[i];
    updateScores();
}

function restart() {
    indices = [];
    t_begin = Date.now();
    StartedSD = 0;
    newGame();
    startGame(PLAYER_N);
}

function start(players) {
    scores = [];
    indices = [];
    t_begin = Date.now();
    StartedSD = 0;
    PLAYER_N = players;
    newGame();
    startGame(PLAYER_N);
    showElement(player0);
    showElement(player1);
    showElement(player2);
    showElement(player3);
    if(onTouch) {
        showElement(UDplayer0);
        showElement(UDplayer1);
        showElement(UDplayer2);
        showElement(UDplayer3);
    }
    if(players==2) {
        hideElement(player2);
        hideElement(UDplayer2);
    }
    if(players<=3) {
        hideElement(player3);
        hideElement(UDplayer3);
    }
}

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
            pujis[i].following = -1;
            if(Math.random()*10<1) { // Decide if this puji will follow another puji
                if(Math.random()*5<1) { // Decide if it is going to be a player controlled puji
                    pujis[i].following = MAX_PLAYERS - (Math.round(Math.random()*(PLAYER_N-1))+1);
                }
                else {
                    pujis[i].following = MAX_PLAYERS + (Math.round(Math.random()*(PUJI_N-MAX_PLAYERS-1)));
                }
                pujis[i].stopTime = t + Math.random() * 6000 + 2000; // Follow for a longer period of time
            }
            else {
                pujis[i].stopTime = t + Math.random() * 3000 + 1000;
                pujis[i].velocity = new Vector(Math.round(1 - 2 * Math.random()), Math.round(1 - 2 * Math.random()));
                if(pujis[i].velocity.x * pujis[i].velocity.y != 0) { // disallow diagonal movements
                    pujis[i].velocity = new Vector(0, 0);
                }
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
    wi = requestAnimationFrame(mainLoop);
    var dt = (Date.now()-t);
    tick(GAME_SPEED * 16 / FPS);
    t= Date.now();
}

//var wi = window.setInterval(mainLoop, FPS);
//var wi = window.requestAnimationFrame(mainLoop);
