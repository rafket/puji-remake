function Move(puji,direction)
{
    console.log("Move was called"+ puji + direction);
    if(direction==0)
        pujis[puji].velocity = new Vector(0, -1);
    else if(direction==1)
        pujis[puji].velocity = new Vector(1, 0);
    else if(direction==2)
        pujis[puji].velocity = new Vector(0, 1);
    else if(direction==3)
        pujis[puji].velocity = new Vector(-1, 0);
}

function Shoot(puji)
{
    console.log("Shoot was called" + puji);
    pujis[puji].fire();
}

function Stop(puji, direction)
{
    console.log("Stop was called"+ puji + direction);
    if(direction==0 || direction==2)
        pujis[puji].velocity.y=0;
    else if(direction==1 || direction==3)
        pujis[puji].velocity.x=0;
}

document.body.onkeydown = function(e) {
    switch (e.keyCode) {
    //Player #1
        case 79: // fire
            pujis[0].fire();
            break;
        case 73: // up
            if(pujis[0].isFiring) {
                break;
            }
            pujis[0].velocity = new Vector(0, -1);
            break;
        case 75: // down
            if(pujis[0].isFiring) {
                break;
            }
            pujis[0].velocity = new Vector(0, 1);
            break;
        case 74: // left
            if(pujis[0].isFiring) {
                break;
            }
            pujis[0].velocity = new Vector(-1, 0);
            break;
        case 76: // right
            if(pujis[0].isFiring) {
                break;
            }
            pujis[0].velocity = new Vector(1, 0);
            break;
    //Player #4
        case 103:
            pujis[1].fire();
            break;
        case 104:
            if(pujis[1].isFiring) {
                break;
            }
            pujis[1].velocity = new Vector(0, -1);
            break;
        case 101:
            if(pujis[1].isFiring) {
                break;
            }
            pujis[1].velocity = new Vector(0, 1);
            break;
        case 100:
            if(pujis[1].isFiring) {
                break;
            }
            pujis[1].velocity = new Vector(-1, 0);
            break;
        case 102:
            if(pujis[1].isFiring) {
                break;
            }
            pujis[1].velocity = new Vector(1, 0);
            break;
    //Player #3
        case 69:
            pujis[2].fire();
            break;
        case 87:
            if(pujis[2].isFiring) {
                break;
            }
            pujis[2].velocity = new Vector(0, -1);
            break;
        case 83:
            if(pujis[2].isFiring) {
                break;
            }
            pujis[2].velocity = new Vector(0, 1);
            break;
        case 65:
            if(pujis[2].isFiring) {
                break;
            }
            pujis[2].velocity = new Vector(-1, 0);
            break;
        case 68:
            if(pujis[2].isFiring) {
                break;
            }
            pujis[2].velocity = new Vector(1, 0);
            break;
    //Player #4
        case 16:
            pujis[3].fire();
            break;
        case 38:
            if(pujis[3].isFiring) {
                break;
            }
            pujis[3].velocity = new Vector(0, -1);
            break;
        case 40:
            if(pujis[3].isFiring) {
                break;
            }
            pujis[3].velocity = new Vector(0, 1);
            break;
        case 37:
            if(pujis[3].isFiring) {
                break;
            }
            pujis[3].velocity = new Vector(-1, 0);
            break;
        case 39:
            if(pujis[3].isFiring) {
                break;
            }
            pujis[3].velocity = new Vector(1, 0);
            break;
    }
};

document.body.onkeyup = function(e) {
    switch (e.keyCode) {
    //Player #1
        case 73:
            pujis[0].velocity.y = 0;
            break;
        case 75:
            pujis[0].velocity.y = 0;
            break;
        case 74:
            pujis[0].velocity.x = 0;
            break;
        case 76:
            pujis[0].velocity.x = 0;
            break;
    //Player #2
        case 104:
            pujis[1].velocity.y = 0;
            break;
        case 101:
            pujis[1].velocity.y = 0;
            break;
        case 100:
            pujis[1].velocity.x = 0;
            break;
        case 102:
            pujis[1].velocity.x = 0;
            break;
    //Player #3
        case 87:
            pujis[2].velocity.y = 0;
            break;
        case 83:
            pujis[2].velocity.y = 0;
            break;
        case 65:
            pujis[2].velocity.x = 0;
            break;
        case 68:
            pujis[2].velocity.x = 0;
            break;
    //Player #4
        case 38:
            pujis[3].velocity.y = 0;
            break;
        case 40:
            pujis[3].velocity.y = 0;
            break;
        case 37:
            pujis[3].velocity.x = 0;
            break;
        case 39:
            pujis[3].velocity.x = 0;
            break;
    }
};
