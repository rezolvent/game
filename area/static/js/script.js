

// inner variables
var canvas, ctx;

// images

var OnGUI;

var backgroundImage;
var oRocketImage;
var oExplosionImage;
var introImage;
var oEnemyImage;

var iBgShiftY = 9300; //10000 (level length) - 700 (canvas height)
var bPause = true; // game pause 
var plane = null; // plane object
var rockets = []; // array of rockets
var enemies = []; // array of enemies
var explosions = []; // array of explosions
var planeW = 200; // plane width
var planeH = 110; // plane height
var iSprPos = 2; // initial sprite frame for plane
var iMoveDir = 0; // move direction
var iEnemyW = 80; // enemy width
var iEnemyH = 100; // enemy height
var iRocketSpeed = 15; // initial rocket speed
var iEnemySpeed = 5; // initial enemy speed
var pressedKeys = []; // array of pressed keys
var iScore = 0; // total score
var iLife = 100; // total life of plane
var iDamage = 10; // damage per enemy plane
var enTimer = null; // random timer for a new enemy
var main = document.getElementById('main');
// -------------------------------------------------------------

// objects :
function Plane(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.bDrag = false;
}
function Rocket(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
function Enemy(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
function Explosion(x, y, w, h, sprite, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
}
// -------------------------------------------------------------

// get random number between X and Y
function getRand(x, y) {
    return Math.floor(Math.random()*y)+x;
}

// Display Intro function
function displayIntro() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(introImage, 0, 0,700, 700);
}

// Draw Main scene function
function drawScene() {

    if (! bPause) {
        iBgShiftY -= 2; // move main ground
        if (iBgShiftY < 5) { // Finish position
            bPause = true;

            // draw score
            ctx.font = '40px Verdana';
            ctx.fillStyle = '#fff';
            ctx.fillText('Конец. Ваш выигрыш: ' + iScore * 10 + ' очков', 50, 200);
            return;
        }

        // process pressed keys (movement of plane)
        processPressedKeys();

		
		
        // clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // draw background
        ctx.drawImage(backgroundImage, 0, 0 + iBgShiftY, 700, 700, 0, 0, 700, 700);

        // draw plane
        ctx.drawImage(plane.image, iSprPos*plane.w, 0, plane.w, plane.h, plane.x - plane.w/2, plane.y - plane.h/2, plane.w, plane.h);

        // отрисовка ракет
        if (rockets.length > 0) {
            for (var key in rockets) {
                if (rockets[key] != undefined) {
                    ctx.drawImage(rockets[key].image, rockets[key].x, rockets[key].y);
                    rockets[key].y -= rockets[key].speed;

                    // if a rocket is out of screen - remove it
                    if (rockets[key].y < 0) {
                        delete rockets[key];
                    }
                }
            }
        }

        // отрисовка взрыва
        if (explosions.length > 0) {
            for (var key in explosions) {
                if (explosions[key] != undefined) {
                    // показать спрайт взрыва
                    ctx.drawImage(explosions[key].image, explosions[key].sprite*explosions[key].w, 0, explosions[key].w, explosions[key].h, explosions[key].x - explosions[key].w/2, explosions[key].y - explosions[key].h/2, explosions[key].w, explosions[key].h);
                    explosions[key].sprite++;

                    // remove an explosion object when it expires
                    if (explosions[key].sprite > 10) {
                        delete explosions[key];
                    }
                }
            }
        }

        // draw enemies
        if (enemies.length > 0) {
            for (var ekey in enemies) {
                if (enemies[ekey] != undefined) {
                    ctx.drawImage(enemies[ekey].image, enemies[ekey].x, enemies[ekey].y);
                    enemies[ekey].y -= enemies[ekey].speed;

                    // remove an enemy object if it is out of screen
                    if (enemies[ekey].y > canvas.height) {
                        delete enemies[ekey];
                    }
                }
            }
        }

        if (enemies.length > 0) {
            for (var ekey in enemies) {
                if (enemies[ekey] != undefined) {
                    // collisions with rockets
                    if (rockets.length > 0) {
                        for (var key in rockets) {
                            if (rockets[key] != undefined) {
                                if (rockets[key].y < enemies[ekey].y + enemies[ekey].h/2 && rockets[key].x > enemies[ekey].x && rockets[key].x + rockets[key].w < enemies[ekey].x + enemies[ekey].w) {
                                    explosions.push(new Explosion(enemies[ekey].x + enemies[ekey].w / 2, enemies[ekey].y + enemies[ekey].h / 2, 120, 120, 0, oExplosionImage));

                                    // delete enemy, rocket, and add +1 to score
                                    delete enemies[ekey];
                                    delete rockets[key];
                                    iScore++;
                                }
                            }
                        }
                    }

                    // collisions with plane
                    if (enemies[ekey] != undefined) {
                        if (plane.y - plane.h/2 < enemies[ekey].y + enemies[ekey].h/2 && plane.x - plane.w/2 < enemies[ekey].x + enemies[ekey].w && plane.x + plane.w/2 > enemies[ekey].x) {
                            explosions.push(new Explosion(enemies[ekey].x + enemies[ekey].w / 2, enemies[ekey].y + enemies[ekey].h / 2, 120, 120, 0, oExplosionImage));

                            // delete enemy and make damage
                            delete enemies[ekey];
                            iLife -= iDamage;

                            if (iLife <= 0) { // Game over
                                bPause = true;

                                // draw score
                                ctx.font = '38px Verdana';
                                ctx.fillStyle = '#fff';
                                ctx.fillText('Game over, your score: ' + iScore * 10 + ' points', 25, 200);
                                return;
                            }
                        }
                    }
                }
            }
        }

        // display life and score
        ctx.font = '14px Verdana';
        ctx.fillStyle = '#fff';
        ctx.fillText('Жизни: ' + iLife + ' / 100', 50, 660);
        ctx.fillText('Очки: ' + iScore * 10, 50, 680);
    }
}

// Process Pressed Keys function
function processPressedKeys() {
    if (pressedKeys[37] != undefined) { // 'Left' key
        if (iSprPos > 0) {
            iSprPos--;
            iMoveDir = -7;
        }
        if (plane.x - plane.w / 2 > 10) {
            plane.x += iMoveDir;
        }
    }
    else if (pressedKeys[39] != undefined) { // 'Right' key
        if (iSprPos < 4) {
            iSprPos++;
            iMoveDir = 7;
        }
        if (plane.x + plane.w / 2 < canvas.width - 10) {
            plane.x += iMoveDir;
        }
    }
}

// Add Enemy function (adds a new enemy randomly)
function addEnemy() {
    clearInterval(enTimer);

    var randX = getRand(0, canvas.height - iEnemyH);
    enemies.push(new Enemy(randX, 0, iEnemyW, iEnemyH, - iEnemySpeed, oEnemyImage));

    var interval = getRand(1000, 4000);
    enTimer = setInterval(addEnemy, interval); // loop
}

// Main Initialization
$
(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    // load background image
   backgroundImage = new Image();
    backgroundImage.src = '/static/images/levelmap.jpg';
    backgroundImage.onload = function() {
   }
    backgroundImage.onerror = function() {
        console.log('Ошибка при загрузке фонового изображения.');
    }

    introImage = new Image();
    introImage.src = '/static/images/intro.jpg';

    // initialization of empty rocket
    oRocketImage = new Image();
    oRocketImage.src = '/static/images/rocket.png';
    oRocketImage.onload = function() { }

    // initialization of explosion image
    oExplosionImage = new Image();
    oExplosionImage.src = '/static/images/explosion.png';
    oExplosionImage.onload = function() { }

    // initialization of empty enemy
    oEnemyImage = new Image();
    oEnemyImage.src = '/static/images/enemy.png';
    oEnemyImage.onload = function() { }

    // initialization of plane
    var oPlaneImage = new Image();
    oPlaneImage.src = '/static/images/plane.png';
    oPlaneImage.onload = function() {
        plane = new Plane(canvas.width / 2, canvas.height - 100, planeW, planeH, oPlaneImage);
    }

    $(window).keydown(function (evt){ // onkeydown event handle
        var pk = pressedKeys[evt.keyCode];
        if (! pk) {
            pressedKeys[evt.keyCode] = 1; // add all pressed keys into array
        }

        if (bPause && evt.keyCode == 13) { // in case of Enter button
            bPause = false;

            // start main animation
            setInterval(drawScene, 30); // loop drawScene

            // and add first enemy
            addEnemy();
        }
    });

    $(window).keyup(function (evt) { // onkeyup event handle
        var pk = pressedKeys[evt.keyCode];
        if (pk) {
            delete pressedKeys[evt.keyCode]; // remove pressed key from array
        }
        if (evt.keyCode == 65) { // 'A' button - add a rocket
            rockets.push(new Rocket(plane.x - 16, plane.y - plane.h, 32, 32, iRocketSpeed, oRocketImage));
        }
        if (evt.keyCode == 37 || evt.keyCode == 39) {
            // revert plane sprite to default position
            if (iSprPos > 2) {
                for (var i = iSprPos; i >= 2; i--) {
                    iSprPos = i;
                    iMoveDir = 0;
                }
            } else {
                for (var i = iSprPos; i <= 2; i++) {
                    iSprPos = i;
                    iMoveDir = 0;
                }
            }
        }
    });

    // when intro is ready - display it
    introImage.onload = function() {
        displayIntro(); // Display intro once
    }
});