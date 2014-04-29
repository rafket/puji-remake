window.addEventListener('load', function(e) {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.getElementById('Buttons').className = 'Visible';
}
document.getElementById('Player1Up').addEventListener('mousedown',function(e){Move(0,0);}, false);
document.getElementById('Player1Up').addEventListener('mouseup',function(e){Stop(0,0);}, false);
document.getElementById('Player1Right').addEventListener('mousedown',function(e){Move(0,1);}, false);
document.getElementById('Player1Right').addEventListener('mouseup',function(e){Stop(0,1);}, false);
document.getElementById('Player1Down').addEventListener('mousedown',function(e){Move(0,2);}, false);
document.getElementById('Player1Down').addEventListener('mouseup',function(e){Stop(0,2);}, false);
document.getElementById('Player1Left').addEventListener('mousedown',function(e){Move(0,3);}, false);
document.getElementById('Player1Left').addEventListener('mouseup',function(e){Stop(0,3);}, false);
document.getElementById('Player1Shoot').addEventListener('mousedown',function(e){Shoot(0);}, false);

document.getElementById('Player2Up').addEventListener('mousedown', function(e){Move(1,0);}, false);
document.getElementById('Player2Up').addEventListener('mouseup',function(e){Stop(1,0);}, false);
document.getElementById('Player2Right').addEventListener('mousedown',function(e){Move(1,1);}, false);
document.getElementById('Player2Right').addEventListener('mouseup',function(e){Stop(1,1);}, false);
document.getElementById('Player2Down').addEventListener('mousedown',function(e){Move(1,2);}, false);
document.getElementById('Player2Down').addEventListener('mouseup',function(e){Stop(1,2);}, false);
document.getElementById('Player2Left').addEventListener('mousedown',function(e){Move(1,3);}, false);
document.getElementById('Player2Left').addEventListener('mouseup',function(e){Stop(1,3);}, false);
document.getElementById('Player2Shoot').addEventListener('mousedown',function(e){Shoot(1);}, false);

document.getElementById('Player3Up').addEventListener('mousedown', function(e){Move(2,0);}, false);
document.getElementById('Player3Up').addEventListener('mouseup',function(e){Stop(2,0);}, false);
document.getElementById('Player3Right').addEventListener('mousedown',function(e){Move(2,1);}, false);
document.getElementById('Player3Right').addEventListener('mouseup',function(e){Stop(2,1);}, false);
document.getElementById('Player3Down').addEventListener('mousedown',function(e){Move(2,2);}, false);
document.getElementById('Player3Down').addEventListener('mouseup',function(e){Stop(2,2);}, false);
document.getElementById('Player3Left').addEventListener('mousedown',function(e){Move(2,3);}, false);
document.getElementById('Player3Left').addEventListener('mouseup',function(e){Stop(2,3);}, false);
document.getElementById('Player3Shoot').addEventListener('mousedown',function(e){Shoot(2);}, false);

document.getElementById('Player4Up').addEventListener('mousedown', function(e){Move(3,0);}, false);
document.getElementById('Player4Up').addEventListener('mouseup',function(e){Stop(3,0);}, false);
document.getElementById('Player4Right').addEventListener('mousedown',function(e){Move(3,1);}, false);
document.getElementById('Player4Right').addEventListener('mouseup',function(e){Stop(3,1);}, false);
document.getElementById('Player4Down').addEventListener('mousedown',function(e){Move(3,2);}, false);
document.getElementById('Player4Down').addEventListener('mouseup',function(e){Stop(3,2);}, false);
document.getElementById('Player4Left').addEventListener('mousedown',function(e){Move(3,3);}, false);
document.getElementById('Player4Left').addEventListener('mouseup',function(e){Stop(3,3);}, false);
document.getElementById('Player4Shoot').addEventListener('mousedown',function(e){Shoot(3);}, false);

//document.getElementById('Test').addEventListener('mousedown', function(e) { console.log("Test"); }, false);
}, false);
