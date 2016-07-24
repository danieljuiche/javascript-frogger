// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    if (score === undefined) {
        score = 0;
    }

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-red.png';
    this.x = -101;
    this.y = 61 + Math.floor(Math.random()*3)*83;
    this.speed = (Math.random() * 350) + (30 * score);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 606) {
        allEnemies.splice(allEnemies.indexOf(this),1);;
        var addBug = new Enemy;
        allEnemies.push(addBug);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.resetPosition();
};

Player.prototype.update = function (){

};

Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowedKeys) {
    switch (allowedKeys) {
        case ("left"):
            if (this.x > 0) {            
                this.x -= 101;
            }
            break;
        case ("down"):
            if (this.y < 404) {
                this.y += 83;  
            }
            break;
        case ("right"):
            if (this.x < 404) {            
                this.x += 101;
            }
            break;
        case ("up"):
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        default:
    }

    if (this.y === -11) {

        this.resetPosition();
        score += 1;
        bugGenerator(score);
        console.log("CURRENT SCORE = " + score);
    }
}

Player.prototype.resetPosition = function() {
    this.x = 202;
    this.y = 404;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy);
var player = new Player;
var score = 0;

var bugGenerator = function (score) {
    console.log(score);
    if (score % 3 === 0) {
        var test = new Enemy;
        allEnemies.push(test);
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var checkCollisions = function () {
    forEach(allEnemies, function (bug) {
        if (bug.y + 11 === player.y && bug.x + 83 > player.x && bug.x < player.x + 83) {
            player.resetPosition();
            score = 0;
            allEnemies = [];
            allEnemies.push(new Enemy);
        }
    });
};

var forEach = function (collection,callback) {
    for (var i = 0; i < collection.length; i++) {
        callback(collection[i]);
    }
};