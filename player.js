function Player(location, velocity, face, isDead, isPlayer, playerIndex, sprite) {
    this.location = location;
    this.velocity = velocity;
    this.face = face;
    this.isPlayer = isPlayer;
    this.playerIndex = playerIndex;
    this.stopTime = -1;
    this.isDead = isDead;
    this.resurrectTime = -1;
    this.sprite = sprite;
    this.noResurrect = 0;
    this.isFiring = 0;
    this.fireTime = -1;
    this.isDying = 0;
    this.dyingTime = -1;
}

Player.prototype = {
    constructor: 'Player',
    integrate: function(dt) {
        if(this.dyingTime+DIE_DURATION < t && this.isDying) {
            this.isDying = false;
            this.dyingTime = -1;
        }
        if(this.isDead) return;
        this.location.x += this.velocity.x * PLAYER_SPEED * dt;
        this.location.y += this.velocity.y * PLAYER_SPEED * dt;
        if(this.fireTime+FIRE_DURATION < t && this.isFiring) {
            this.isFiring = 0;
            this.fireTime = -1;
        }
        if(this.isFiring) {
            this.velocity = new Vector(0, 0);
        }
        if(this.velocity.x==1 || this.velocity.y==1 || this.velocity.x==-1 || this.velocity.y==-1) {
            this.face.x = this.velocity.x;
            this.face.y = this.velocity.y;
        }
        if(this.location.x < 0) {
            this.location.x = 0;
        }
        if(this.location.x > 1 - PLAYER_SIZE_W) {
            this.location.x = 1 - PLAYER_SIZE_W;
        }
        if(this.location.y < 0) {
            this.location.y = 0;
        }
        if(this.location.y > 1 - PLAYER_SIZE_H) {
            this.location.y = 1 - PLAYER_SIZE_H;
        }
    },
    fire: function() {
        if(this.isDead) return;
        if(this.isFiring) return;
        for(var i = MAX_PLAYERS - PLAYER_N; i < PUJI_N; ++i) {
            if(pujis[i].isDead || (pujis[i].isPlayer && this.playerIndex == pujis[i].playerIndex)) continue;
            if(this.location.distance(pujis[i].location) < FIRE_DISTANCE) {
                if(pujis[i].isPlayer) addPoint(this.playerIndex);
                pujis[i].die();
            }
        }
        this.fireTime = t;
        this.isFiring = 1;
        this.velocity = new Vector(0, 0);
    },
    die: function() {
        this.isDying = true;
        this.dyingTime = t;
        this.isDead = true;
        this.deadTime = 0;
    },
    resurrect: function() {
        this.isDead = false;
        this.deadTime = -1;
        this.resurrectTime = -1;
    }
};
