// Constants which can be tweaked
var TO_NEXT_LEVEL = 3; // Determines how soon the next level is reached
var STARTING_LIVES = 3; // Starting player lives
var MAXIMUM_LIVES = 5; // Maximum lives a player can have
var MAXIMUM_ENEMIES = 5; // Maximum enemies on the screen
var MIN_BUG_SPEED = 50; // Minimum starting bug speed
var MAX_BUG_SPEED = 500; // Maximum bug speed
var STANDARD_BUG_SPEED = 300;  // Standard bug speed variance
var SPEED_INCREASE = 30;  // Speed increase per level
var BLUE_GEM_CHANCE = 100;  // Percent chance to spawn a blue gem
var BLUE_GEM_SLOW = 50; // Percent enemy slow speed upon picking up a blue gem.
var SLOW_TIMER = 3000; // Milliseconds to slow
var ORANGE_GEM_CHANCE = 10; // Percent chance to spawn a orange gem
var GREEN_GEM_CHANCE = 10;  // Percent chance to spawn a green gem
var RUBY_GEM_CHANCE = 100; // Percent chance to spawn a ruby gem
var CLEAR_TIMER = 750; // Milliseconds to wait before spawning bugs again
var HEART_CHANCE = 10; // Percent chance to spawn an extra life

// Initial settings for the game
var score = 0;
var level = 0;
var lives = STARTING_LIVES;
var levelCounter = 0;
var slowingEffectFlag = false;
var slowingEffectTimer = 0;
var collected = [];

// Developers playground options
var GOD_MODE = false;

// Container for all possible types of enemies
var enemyList = [
    {
        name: "Red Bug",
        spawn_rate: 100,
        level: 0,
    },
    {
        name: "Green Bug",
        spawn_rate: 50,
        level: 3,
    }
];

// Container for all possible types of obstacles
var obstacleList = [
    {
        name: "Rock",
        spawn_rate: 100,
        level: 0,
        max_counts: 5
    }
];

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug-red.png';

    // This randomly generates the starting row of the bug sets the initial position
    this.x = -101;
    this.y = 61 + Math.floor(Math.random()*3)*83;

    // Speed at which bug moves is a formula based on the sum of variables.
    // A minimum bug speed, a random number, and the current level.    
    this.speed = MIN_BUG_SPEED + Math.floor((Math.random() * STANDARD_BUG_SPEED)) + (SPEED_INCREASE * level);
    if (this.speed >= MAX_BUG_SPEED) {
        this.speed = MAX_BUG_SPEED;
    }
    this.resetSpeed = this.speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Moves the bug
    horizontalMovement.call(this,dt);
    // Removes the bug once it has crossed the screen and generates a new bug
    enemyRefresh.call(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Subclass of Enemy
var RedBug = function () {
    Enemy.call(this);
    this.sprite = 'images/enemy-bug-red.png';
};
RedBug.prototype = Object.create(Enemy.prototype);
RedBug.prototype.constructor = Enemy;
RedBug.prototype.update = function (dt) {
    // Moves the bug
    horizontalMovement.call(this,dt);
    // Removes the bug once it has crossed the screen and generates a new bug
    enemyRefresh.call(this);
};

// Subclass of Enemy
var GreenBug = function () {
    Enemy.call(this);
    this.sprite = 'images/enemy-bug-green.png';
    this.verticalFlag = 1;
};
GreenBug.prototype = Object.create(Enemy.prototype);
GreenBug.prototype.constructor = Enemy;
GreenBug.prototype.update = function (dt) {
    horizontalMovement.call(this,dt);

    verticalMovement.call(this,dt)

    // Removes the bug once it has crossed the screen and generates a new bug
    enemyRefresh.call(this);
};

// Player constructor
var Player = function() {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';

    // Sets the starting position of the player
    this.resetPosition();
};

// Player render method
Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checks to see if the player is moving onto any obstacles
Player.prototype.allowableSpace = function (direction) {
    var obstacleFlagLeft = false;
    var obstacleFlagRight = false;
    var obstacleFlagUp = false;
    var obstacleFlagDown = false;

    allObstacles.forEach( function (location) {
        if ((location.y === player.y) && (location.x === (player.x - 101))) {
            obstacleFlagLeft = true;
        };
        if ((location.y === player.y) && (location.x === (player.x + 101))) {
            obstacleFlagRight = true;
        };
        if ((location.y === player.y - 83) && (location.x === player.x)) {
            obstacleFlagUp = true;
        }
        if ((location.y === player.y + 83) && (location.x === player.x)) {
            obstacleFlagDown = true;
        }
    });

    switch(direction) {
        case ("left"):
            if (obstacleFlagLeft) {
                return false;
            }
            else {
                return true;
            }
            break;
        case ("right"):
            if (obstacleFlagRight) {
                return false;
            }
            else {
                return true;
            }
            break;
        case ("up"):
            if (obstacleFlagUp) {
                return false;
            }
            else {
                return true;
            }
            break;
        case ("down"):
            if (obstacleFlagDown) {
                return false;
            }
            else {
                return true;
            }
            break;    
        default:
            return true;
    }
};

// Method to move the player
Player.prototype.handleInput = function (allowedKeys) {
    // Checks which key was pressed and performs action
    switch (allowedKeys) {
        case ("left"):
            if (this.x > 0 && this.allowableSpace(allowedKeys)) {
                this.x -= 101;
            }
            break;
        case ("down"):
            if (this.y < 393 && this.allowableSpace(allowedKeys)) {
                this.y += 83;
            }
            break;
        case ("right"):
            if (this.x < 606 && this.allowableSpace(allowedKeys)) {            
                this.x += 101;
            }
            break;
        case ("up"):
            if (this.y > 0 && this.allowableSpace(allowedKeys)) {
                this.y -= 83;
            }
            break;
        case ("space"):
            if (collected.includes("rubygem")) {
                respawnEnemies(true);
                collected.splice(collected.indexOf("rubygem"),1);
            }
            break;
        default:
    }

    // Resets the player once he/she reaches the water and updates the score,
    // scoreboard and generates a new level if required.
    if (this.y === -22) {
        this.resetPosition();
        score += 100;
        levelCounter += 1;
        // Checks if the next level has been reached. If it has, calls the levelGenerator function.
        if (levelCounter === TO_NEXT_LEVEL) {
            levelGenerator();
            levelCounter = 0;
        }
        else {
            collectibleSpawn();
        }
        // Update the scoreboard.
        updateScoreboard(score,lives,level);
    }
}

// Function which resets the player to the starting position
Player.prototype.resetPosition = function() {
    this.x = 303;
    this.y = 393;
}

// Collectible constructor
var Collectible = function () {
    this.x = columnGenerator();
    this.y = rowGenerator();
};

// Method to draw items
Collectible.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Subclass of collectible
var BlueGem = function () {
    Collectible.call(this);
    this.sprite = 'images/gem-blue.png';
    this.name = 'bluegem';
}

BlueGem.prototype = Object.create(Collectible.prototype);
BlueGem.prototype.constructor = Collectible;
BlueGem.prototype.effect = function () {
    if (slowingEffectTimer === 0) {
        slowingEffectFlag = true;  
    }
    slowingEffectTimer += SLOW_TIMER;
};

// Subclass of collectible
var GreenGem = function () {
    Collectible.call(this);
    this.sprite = 'images/gem-green.png';
    this.name = 'greengem';
}

GreenGem.prototype = Object.create(Collectible.prototype);
GreenGem.prototype.constructor = Collectible;
GreenGem.prototype.effect = function () {
    score += 250;
};

// Subclass of collectible
var OrangeGem = function () {
    Collectible.call(this);
    this.sprite = 'images/gem-orange.png';
    this.name = 'orangegem';
}

OrangeGem.prototype = Object.create(Collectible.prototype);
OrangeGem.prototype.constructor = Collectible;
OrangeGem.prototype.effect = function () {
    score += 500;
};

// Subclass of collectible
var RubyGem = function () {
    Collectible.call(this);
    this.sprite = 'images/gem-ruby.png';
    this.name = 'rubygem';
}

RubyGem.prototype = Object.create(Collectible.prototype);
RubyGem.prototype.constructor = Collectible;
RubyGem.prototype.effect = function () {
    if (countArray(collected,this["name"]) < 3) {
        collected.push(this["name"]); 
    }    
}

// Subclass of collectible
var Heart = function () {
    Collectible.call(this);
    this.sprite = 'images/red-heart.png';
    this.name = 'heart';
}

// Subclass of collectible
Heart.prototype = Object.create(Collectible.prototype);
Heart.prototype.constructor = Collectible;
Heart.prototype.effect = function () {
    if (lives < MAXIMUM_LIVES) {
        lives += 1;    
    }
};

// Obstacle constructor
var Obstacle = function () {
    this.sprite = 'images/Rock.png';
    this.x = Math.floor(Math.random()*5) * 101;
    this.y = 61 + Math.floor(Math.random()*3)*83; 
}

Obstacle.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var obstacle = new Obstacle;

// Declare array containers to store instances of enemies and powerups
var allEnemies = [];
var allCollectibles = [];
var allObstacles = [];

// This function is called by main
// It checks to see if any part of the player sprite overlaps with a enemy bug or powerup
var checkCollisions = function () {
    if (!GOD_MODE) {
        forEach(allEnemies, function (bug) {
            //(player.y <= bug.y && player.y >= bug.y - 66 && bug.x + 83 > player.x && bug.x < player.x + 83) 
            if (player.y < bug.y + 63 && player.y > bug.y - 77 && player.x < bug.x + 70 && player.x > bug.x - 70) {
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
                respawnEnemies(false);
            }
        });
    }

    // Checks to see if player has touched a collectible
    // Activates any collectible effedts, and updates the scoreboard if required
    forEach(allCollectibles, function (collectibles) {
        if (player.y < collectibles.y + 63 && player.y > collectibles.y - 77 && player.x < collectibles.x + 70 && player.x > collectibles.x - 70) {
            collectibles.effect();
            updateScoreboard(score,lives,level);
            allCollectibles.splice(allCollectibles.indexOf(collectibles),1);
        }
    });
};

// Delares a variable to store status effect timer
var slowTimer;

// This function is called by main and determines if a global slowing effect is being applied
var checkStatusEffects = function () {
    if (slowingEffectFlag) {
        slowingEffectFlag = false;
        slowTimer = setInterval( function() {
            slowingEffectTimer -= 1000;
        }, 1000);
    }

    if (slowingEffectTimer === 0) {
        clearInterval(slowTimer);
    }
};

// Generates a bug when the player reaches the water enough times
var levelGenerator = function () {
    // Create a new instance of an enemy
    if (allEnemies.length < MAXIMUM_ENEMIES) {
        spawnEnemy(randomEnemyGenerator()); 
    }

    // Spawns collectibles
    collectibleSpawn();
    spawnObstacle(randomObstacleGenerator());

    // Increases the level
    level += 1;
};

// Helper function that returns an obstacle object
var randomObstacleGenerator = function () {
    var number = Math.floor(Math.random() * 100);
    var generatedList = obstacleList.filter( function (obstacle) {
        return ((number < obstacle["spawn_rate"]) && (level >= obstacle["level"]));
    });
    number = Math.floor(Math.random() * generatedList.length);
    return generatedList[number];
};

// Helper function that spawns an obstacle
var spawnObstacle = function (spawn) {
    var obstacleFlag = false;
    var collectibleFlag = false;
    switch(spawn["name"]) {
                case "Rock":
                    var addItem = new Obstacle;
                    allObstacles.forEach(function (obstacle) {
                        if (obstacle.x === addItem.x && obstacle.y === addItem.y) {
                            console.log("OVERLAPPING OBSTACLES");
                            obstacleFlag = true;
                        }
                    });
                    allCollectibles.forEach(function (collectible) {
                        if (collectible.x === addItem.x && collectible.y === addItem.y) {
                            console.log("OVERLAPPING COLLECTIBLES");
                            collectibleFlag = true;
                        }
                    });
                    break;
                default:
            }
    if (!obstacleFlag && !collectibleFlag) {
        allObstacles.push(addItem);        
    }
};

// Helper function that returns an enemy object
var randomEnemyGenerator = function () {
    var number = Math.floor(Math.random() * 100);
    var generatedList = enemyList.filter( function (enemy) {
        return ((number < enemy["spawn_rate"]) && (level >= enemy["level"]));
    });
    number = Math.floor(Math.random() * generatedList.length);
    return generatedList[number];
};

// Helper function which an enemy object as the argument and adds it to the game
var spawnEnemy = function (spawn) {
    switch(spawn["name"]) {
                case "Red Bug":
                    var addItem = new RedBug;
                    break;
                case "Green Bug":
                    var addItem = new GreenBug;
                    break;
                default:
            }
    allEnemies.push(addItem);
};

// Function to respawn enemies, accepts boolean for argument. True for instant respawn of bugs.
var respawnEnemies = function (instant) {
    allEnemies = [];
    var spawnTimer = 0;
    if (instant) {
        spawnTimer = CLEAR_TIMER;
    }

    setTimeout(function () {
        for (var i = 0; i < level; i++) {
            if (allEnemies.length < MAXIMUM_ENEMIES) {
                spawnEnemy(randomEnemyGenerator());
            }
        }
    }, spawnTimer);
};

// Spawns a collectible
var collectibleSpawn = function () {
    // Array container for possible powerups
    var collectibleSpawnCollection = [
            {
                "Name": "BlueGem",
                "Rate": BLUE_GEM_CHANCE
            },
            {
                "Name": "GreenGem",
                "Rate": GREEN_GEM_CHANCE
            },
            {
                "Name": "OrangeGem",
                "Rate": ORANGE_GEM_CHANCE
            },
            {
                "Name": "RubyGem",
                "Rate": RUBY_GEM_CHANCE
            },
            {
                "Name": "Heart",
                "Rate": HEART_CHANCE
            }
         ];

    // Checks to see if a collectible will spawn
    forEach(collectibleSpawnCollection, function (collectible) {
        var collectibleSpawn = Math.floor(Math.random()*100);
        if (collectibleSpawn < collectible["Rate"]) {
            switch(collectible["Name"]) {
                case "BlueGem":
                    var addItem = new BlueGem;
                    break;
                case "GreenGem":
                    var addItem = new GreenGem;
                    break;
                case "OrangeGem":
                    var addItem = new OrangeGem;
                    break;
                case "RubyGem":
                    var addItem = new RubyGem;
                    break;
                case "Heart":
                    var addItem = new Heart;
                    break;
                default:
            }

            var addItemFlag = true;

            // Prevents additional hearts from spawning if player already has the maximum allowed lives
            if (collectible["Name"] === "Heart" && lives === MAXIMUM_LIVES) {
                addItemFlag = false;
            }

            // Sets item flag to false if a collectible already exists or if spawn location is occupied already
            forEach(allCollectibles, function (powerup) {
                if (powerup.name === addItem.name || addItem.x === powerup.x && addItem.y === powerup.y) {
                    addItemFlag = false;
                }
            });

            // Adds the instance of the collectible
            if (addItemFlag) {
                allCollectibles.push(addItem);
            }
        }
    });
};

// Helper functions
var forEach = function (collection,callback) {
    for (var i = 0; i < collection.length; i++) {
        callback(collection[i]);
    }
};

var countArray = function (array, exists) {
    var counter = 0;
    forEach(array, function (element) {
        if (element === exists) {
            counter += 1;
        }
    });
    return counter;
}

// Function which updates the player scoreboard
var updateScoreboard = function (score, lives, level) {
    var currentScore = document.getElementById("score");
    var currentLives = document.getElementById("lives");
    var currentLevel = document.getElementById("level");
    var curretBugSplat = document.getElementById("bugsplat");
    currentLives.innerHTML = "Lives: " + lives;
    currentScore.innerHTML = "Score: " + score;
    currentLevel.innerHTML = "Level: " + level;
    curretBugSplat.innerHTML = "Bug Splat: " + countArray (collected, "rubygem");
};

// Resets the game and updates the scoreboard
var resetGame = function() {
    score = 0;
    level = 1;
    levelCounter = 0;
    lives = 3;
    updateScoreboard(score,lives,level);
};

// Function to remove the bug once it has crossed the screen and generates a new bug
var enemyRefresh = function () {
    if (this.x > 808) {
        allEnemies.splice(allEnemies.indexOf(this),1);
        spawnEnemy(randomEnemyGenerator());
    }
};

// Updates the horizontal movement of enemies if required
var horizontalMovement = function (dt) {
    if (slowingEffectTimer > 0) {
        this.x += this.speed * dt * (100 - BLUE_GEM_SLOW) / 100;
    }
    else {
        this.x += this.speed * dt;
    }
};

// Updates vertical movement of enemies if required
var verticalMovement = function (dt) {
    if (this.y < 61 || this.y > 227) {
        this.verticalFlag = this.verticalFlag * -1;
    }
    this.y += 50 * 0.017 * this.verticalFlag;
};

// Helper function to help randomly place objects on different rows
var rowGenerator = function() {
    return 61 + Math.floor(Math.random()*3)*83;
};

// Helper function to help randomly place objects on different columns
var columnGenerator = function() {
    return Math.floor(Math.random()*5)*101;
};

// This listens for key presses and sends the keys to the Player.handleInput() method.
// This continues to run even after an 'event' has occurred
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Prevents window from scrolling if user resolution is too small
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Loads up the first level
levelGenerator();

// Instantiates our player
var player = new Player;