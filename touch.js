window.addEventListener('load', function(e) {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.getElementById('Buttons').className = 'Visible';
        document.getElementById('scoreboard2').className = 'Visible';
}
document.getElementById('Player1Up').addEventListener('touchstart',function(e){Move(0,0);}, false);
document.getElementById('Player1Up').addEventListener('touchend',function(e){Stop(0,0);}, false);
document.getElementById('Player1Right').addEventListener('touchstart',function(e){Move(0,1);}, false);
document.getElementById('Player1Right').addEventListener('touchend',function(e){Stop(0,1);}, false);
document.getElementById('Player1Down').addEventListener('touchstart',function(e){Move(0,2);}, false);
document.getElementById('Player1Down').addEventListener('touchend',function(e){Stop(0,2);}, false);
document.getElementById('Player1Left').addEventListener('touchstart',function(e){Move(0,3);}, false);
document.getElementById('Player1Left').addEventListener('touchend',function(e){Stop(0,3);}, false);
document.getElementById('Player1Shoot').addEventListener('touchstart',function(e){Shoot(0);}, false);

document.getElementById('Player2Up').addEventListener('touchstart', function(e){Move(1,0);}, false);
document.getElementById('Player2Up').addEventListener('touchend',function(e){Stop(1,0);}, false);
document.getElementById('Player2Right').addEventListener('touchstart',function(e){Move(1,1);}, false);
document.getElementById('Player2Right').addEventListener('touchend',function(e){Stop(1,1);}, false);
document.getElementById('Player2Down').addEventListener('touchstart',function(e){Move(1,2);}, false);
document.getElementById('Player2Down').addEventListener('touchend',function(e){Stop(1,2);}, false);
document.getElementById('Player2Left').addEventListener('touchstart',function(e){Move(1,3);}, false);
document.getElementById('Player2Left').addEventListener('touchend',function(e){Stop(1,3);}, false);
document.getElementById('Player2Shoot').addEventListener('touchstart',function(e){Shoot(1);}, false);

document.getElementById('Player3Up').addEventListener('touchstart', function(e){Move(2,0);}, false);
document.getElementById('Player3Up').addEventListener('touchend',function(e){Stop(2,0);}, false);
document.getElementById('Player3Right').addEventListener('touchstart',function(e){Move(2,1);}, false);
document.getElementById('Player3Right').addEventListener('touchend',function(e){Stop(2,1);}, false);
document.getElementById('Player3Down').addEventListener('touchstart',function(e){Move(2,2);}, false);
document.getElementById('Player3Down').addEventListener('touchend',function(e){Stop(2,2);}, false);
document.getElementById('Player3Left').addEventListener('touchstart',function(e){Move(2,3);}, false);
document.getElementById('Player3Left').addEventListener('touchend',function(e){Stop(2,3);}, false);
document.getElementById('Player3Shoot').addEventListener('touchstart',function(e){Shoot(2);}, false);

document.getElementById('Player4Up').addEventListener('touchstart', function(e){Move(3,0);}, false);
document.getElementById('Player4Up').addEventListener('touchend',function(e){Stop(3,0);}, false);
document.getElementById('Player4Right').addEventListener('touchstart',function(e){Move(3,1);}, false);
document.getElementById('Player4Right').addEventListener('touchend',function(e){Stop(3,1);}, false);
document.getElementById('Player4Down').addEventListener('touchstart',function(e){Move(3,2);}, false);
document.getElementById('Player4Down').addEventListener('touchend',function(e){Stop(3,2);}, false);
document.getElementById('Player4Left').addEventListener('touchstart',function(e){Move(3,3);}, false);
document.getElementById('Player4Left').addEventListener('touchend',function(e){Stop(3,3);}, false);
document.getElementById('Player4Shoot').addEventListener('touchstart',function(e){Shoot(3);}, false);

//document.getElementById('Test').addEventListener('touchstart', function(e) { console.log("Test"); }, false);
}, false);
