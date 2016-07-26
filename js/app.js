// Constants which can be tweaked
var bugsOnNextLevel = 3;
var startingLives = 3;
var maximumLives = 5;
var minBugSpeed = 50;
var standardBugSpeed = 300;
var speedIncrease = 30;

// Initial settings for the game
var score = 0;
var level = 1;
var lives = startingLives;
var levelCounter = 0;

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug-red.png';

    // This randomly generates the starting row of the bug sets the initial position
    this.x = -101;
    this.y = 61 + Math.floor(Math.random()*3)*83;

    // Speed at which bug moves is a formula based on the sum of variables.
    // A minimum bug speed, a random number, and the current level.
    this.speed = minBugSpeed + Math.floor((Math.random() * standardBugSpeed)) + (30 * level);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Removes the bug once it has crossed the screen and generates a new bug
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
// This class requires an render() and
// a handleInput() method.

var Player = function() {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';

    // Sets the starting position of the player
    this.resetPosition();
};

Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowedKeys) {
    // Checkes which key was pressed and moves the player in that direction
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

    // Resets the player once he/she reaches the water and updates the score,
    // scoreboard and generates a new level if required.
    if (this.y === -11) {
        this.resetPosition();
        score += 100;
        levelCounter += 1;
        // Checks if the next level has been reached. If it has, calls the levelGenerator function.
        if (levelCounter === bugsOnNextLevel) {
            levelGenerator();
            levelCounter = 0;
        }
        // Update the scoreboard.
        updateScoreboard(score,lives,level);
    }
}

// Function which resets the player to the starting position
Player.prototype.resetPosition = function() {
    this.x = 202;
    this.y = 404;
}

// Instantiates our enemy and player objects
var allEnemies = [];
allEnemies.push(new Enemy);
var player = new Player;

// This function is called by main (our game loop).
// It checks to see if any part of the player sprite overlaps with a enemy bug
var checkCollisions = function () {
    forEach(allEnemies, function (bug) {
        if (bug.y + 11 === player.y && bug.x + 83 > player.x && bug.x < player.x + 83) {
            // Resets player position, applies appropriate penalties and updates the scoreboard
            player.resetPosition();
            lives -= 1;
            updateScoreboard(score,lives,level);

            // Restarts the game if player has no lives left
            if (lives === 0) {
                alert("Game Over!");
                resetGame();
            }

            // Reinstantiates the number of enemies based on the current level
            allEnemies = [];
            for (var i = 0; i < level; i++) {
                allEnemies.push(new Enemy);
            }
        }
    });
};

// Generates a bug when the player reaches the water enough times
var levelGenerator = function () {
    // Create a new instance of an enemy
    var addBug = new Enemy;
    allEnemies.push(addBug);

    // Increases the level
    level += 1;
}

// Higher order helper functions
var forEach = function (collection,callback) {
    for (var i = 0; i < collection.length; i++) {
        callback(collection[i]);
    }
};

// Function which updates the player scoreboard
var updateScoreboard = function (score, lives, level) {
    var currentScore = document.getElementById("score");
    var currentLives = document.getElementById("lives");
    var currentLevel = document.getElementById("level");
    currentLives.innerHTML = "Lives: " + lives;
    currentScore.innerHTML = "Score: " + score;
    currentLevel.innerHTML = "Level: " + level;
};

// Resets the game and updates the scoreboard
var resetGame = function() {
    score = 0;
    level = 1;
    levelCounter = 0;
    lives = 3;
    updateScoreboard(score,lives,level);
}

// This listens for key presses and sends the keys to the Player.handleInput() method.
// This continues to run even after an 'event' has occurred
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});