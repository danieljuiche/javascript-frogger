// Constants which can be tweaked
var TO_NEXT_LEVEL = 2; // Determines how soon the next level is reached
var STARTING_LIVES = 3; // Starting player lives
var MAXIMUM_LIVES = 5; // Maximum lives a player can have
var MAXIMUM_ENEMIES = 5; // Maximum enemies on the screen
var MIN_BUG_SPEED = 50; // Minimum starting bug speed
var STANDARD_BUG_SPEED = 250;  // Standard bug speed variance
var SPEED_INCREASE = 30;  // Speed increase per level
var BLUE_GEM_CHANCE = 15;  // Percent chance to spawn a blue gem
var BLUE_GEM_SLOW = 50; // Percent enemy slow speed upon picking up a blue gem.
var SLOW_TIMER = 3000; // Milliseconds to slow
var IMMUNITY_TIMER = 3000; // Milliseconds to be immune
var ORANGE_GEM_CHANCE = 15; // Percent chance to spawn a orange gem
var GREEN_GEM_CHANCE = 25;  // Percent chance to spawn a green gem
var RUBY_GEM_CHANCE = 10; // Percent chance to spawn a ruby gem
var CLEAR_TIMER = 750; // Milliseconds to wait before spawning bugs again
var HEART_CHANCE = 10; // Percent chance to spawn an extra life
var KEY_CHANCE = 15; // Percent chance to collect a key
var STAR_CHANCE = 100; // Percent chance to spawn a star

// Initial settings for the game
var score = 0;
var level = 0;
var lives = STARTING_LIVES;
var levelCounter = 0;
var slowingEffectFlag = false;
var slowingEffectTimer = 0;
var slowingEffectCounter = 1;
var slowingEffectRatio = 0;
var collected = [];
var collectibleCounter = 0;
var highScore = 0;
var riverCrossingCounter = 0;
var rubyGemCounter = 0;
var blueGemCounter = 0;
var greenGemCounter = 0;
var orangeGemCounter = 0;
var collectedKeys = 0;
var collectedStars = 0;

var characterLockFlag = false;

// Developers playground options
var godMode = false;

// Container for all possible types of enemies
var enemyList = [
    {
        name: "Red Bug",
        spawn_rate: 100,
        level: 0
    },
    {
        name: "Bug Red",
        spawn_rate: 50,
        level: 7
    },
    {
        name: "Green Bug",
        spawn_rate: 50,
        level: 2
    },
    {
        name: "Bug Green",
        spawn_rate: 50,
        level: 8
    },
    {
        name: "Purple Bug",
        spawn_rate: 50,
        level: 4
    },
    {
        name: "Bug Purple",
        spawn_rate: 50,
        level: 9
    },
    {
        name: "Yellow Bug",
        spawn_rate: 50,
        level: 6
    },
    {
        name: "Bug Yellow",
        spawn_rate: 50,
        level: 10
    }
];

// Container for all possible types of obstacles
var obstacleList = [
    {
        name: "Rock",
        spawn_rate: 15,
        level: 3,
        max_count: 6
    }
];

// Container for all possible types of characters
var playerList = [
    {
        name: "Spot",
        link: "images/char-spot.png",
    },
    {
        name: "Miao",
        link: "images/char-miao.png",
    },
    {
        name: "Horn Girl",
        link: "images/char-horn-girl.png"
    },
    {
        name: "Pink",
        link: "images/char-pink.png",
    },
    {
        name: "Princess",
        link: "images/char-pink.png",
    }
];

// Container for all possible types of collectibles
var collectibleList = [
        {
            name: "Blue Gem",
            rate: BLUE_GEM_CHANCE,
            currentCount: 0
        },
        {
            name: "Green Gem",
            rate: GREEN_GEM_CHANCE,
            currentCount: 0
        },
        {
            name: "Orange Gem",
            rate: ORANGE_GEM_CHANCE,
            currentCount: 0
        },
        {
            name: "Ruby Gem",
            rate: RUBY_GEM_CHANCE,
            currentCount: 0
        },
        {
            name: "Heart",
            rate: HEART_CHANCE,
            currentCount: 0
        },
        {
            name: "Key",
            rate: KEY_CHANCE,
            currentCount: 0
        },
        {
            name: "Star",
            rate: STAR_CHANCE,
            currentCount: 0
        }
     ];

// Enemies our player must avoid
var Enemy = function() {
    var maxBugSpeed = 500; // Maximum bug speed

    this.sprite = 'images/enemy-bug-red.png';

    // This randomly generates the starting row of the bug sets the initial position
    this.x = -101;
    this.y = 61 + Math.floor(Math.random()*3)*83;
    this.direction = "right";

    // Speed at which bug moves is a formula based on the sum of variables.
    // A minimum bug speed, a random number, and the current level.    
    this.speed = MIN_BUG_SPEED + Math.floor((Math.random() * STANDARD_BUG_SPEED)) + (SPEED_INCREASE * level);
    if (this.speed >= maxBugSpeed) {
        this.speed = maxBugSpeed;
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

// Subclass of RedBug
var BugRed = function () {
    RedBug.call(this);
    this.sprite = 'images/enemy-bug-red-reversed.png';
    this.x = 707;
    this.direction = "left";
}
BugRed.prototype = Object.create(RedBug.prototype);
BugRed.prototype.constructor = RedBug;

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

// Subclass of GreenBug
var BugGreen = function () {
    GreenBug.call(this);
    this.sprite = 'images/enemy-bug-green-reversed.png';
    this.x = 707;
    this.direction = "left";
}
BugGreen.prototype = Object.create(GreenBug.prototype);
BugGreen.prototype.constructor = GreenBug;

// Subclass of Enemy
var PurpleBug = function () {
    var maxBugSpeed = 400;
    Enemy.call(this);
    this.sprite = 'images/enemy-bug-purple.png';
};
PurpleBug.prototype = Object.create(Enemy.prototype);
PurpleBug.prototype.constructor = Enemy;
PurpleBug.prototype.update = function (dt) {
    horizontalMovement.call(this,dt);
    vanishingBug.call(this);
    // Removes the bug once it has crossed the screen and generates a new bug
    enemyRefresh.call(this);
};

var vanishingBug = function () {
    if ((this.x <= 101) && (this.direction === "right")) {
        this.sprite = 'images/enemy-bug-purple.png';
    }
    else if ((this.x >= 606) && (this.direction === "left")) {
        this.sprite = 'images/enemy-bug-purple-reversed.png';
    }
    else if (!vanishingFlag && (this.direction === "left")) {
        this.sprite = 'images/enemy-bug-purple-reversed.png';
    }
    else if (!vanishingFlag && (this.direction === "right")) {
        this.sprite = 'images/enemy-bug-purple.png';
    }    
    else {
        this.sprite = 'images/enemy-bug-vanish.png';
    }
};
var vanishingCounter = 0;
var vanishingFlag = false;
setInterval(function () {
    vanishingCounter += 1;
    if (vanishingCounter === 4) {
        vanishingFlag = true;
        vanishingCounter = 0;
    }
    else {
        vanishingFlag = false;
    }
}, 500);

var BugPurple = function () {
    PurpleBug.call(this);
    this.sprite = 'images/enemy-bug-purple-reversed.png';
    this.x = 707;
    this.direction = "left";
};

BugPurple.prototype = Object.create(PurpleBug.prototype);
BugPurple.prototype.constructor = PurpleBug;

var YellowBug = function () {
    Enemy.call(this);
    this.sprite = 'images/enemy-bug-yellow.png';
    this.speed = 105;
    setTimeout(function () {
        this.speed = 0;
        setTimeout(function () {
            this.sprite = 'images/enemy-bug-yellow-transition.png';
            setTimeout(function () {
                this.sprite = 'images/enemy-bug-yellow-speed.png';
                this.speed = 1000;
            }.bind(this), 500);
        }.bind(this), 500);
    }.bind(this), 1000);
};
YellowBug.prototype = Object.create(Enemy.prototype);
YellowBug.prototype.constructor = Enemy;
YellowBug.prototype.update = function (dt) {
    horizontalMovement.call(this,dt);
    enemyRefresh.call(this);  
}

var BugYellow = function () {
    YellowBug.call(this);
    this.sprite = 'images/enemy-bug-yellow-reversed.png';
    this.direction = "left";
    this.x = 707;
    setTimeout(function () {
        this.speed = 0;
        setTimeout(function () {
            this.sprite = 'images/enemy-bug-yellow-transition-reversed.png';
            setTimeout(function () {
                this.sprite = 'images/enemy-bug-yellow-speed-reversed.png';
                this.speed = 1000;
            }.bind(this), 500);
        }.bind(this), 500);
    }.bind(this), 1000);
}
BugYellow.prototype = Object.create(YellowBug.prototype);
BugYellow.prototype.constructor = YellowBug;

// Player constructor
var Player = function() {
    // The image/sprite for our player
    this.sprite = 'images/char-spot.png';

    this.skillOnCooldown = false;

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
            if (!this.skillOnCooldown && player.sprite === 'images/char-spot.png') {
                allEnemies.splice(Math.floor(Math.random()*allEnemies.length),1);
                setTimeout(function () {
                    if (allEnemies.length < level) {
                        spawnEnemy(randomEnemyGenerator());
                    }
                }.bind(this), 1000);                
                messageUpdater("info-message","BUG SPLAT!","Green");
                this.skillOnCooldown = true;
                setTimeout(function () {
                    this.skillOnCooldown = false;
                }.bind(this), 15000);
            }
            else if (player.sprite === 'images/char-pink.png') {
                forEachObjectInArray(collectibleList, "name", "Ruby Gem", function (object) {
                    if (object["currentCount"] >= 3) {
                        characterLockFlag = true;
                        godMode = true;
                        object["currentCount"] -= 3;
                        rubyGemCounter -= 3;
                        updateCollectibleDisplay(rubyGemCounter,blueGemCounter,greenGemCounter,orangeGemCounter,collectedKeys);
                        player.sprite = 'images/char-pink-immunity.png';
                        messageUpdater("info-message","Adrenaline! I'm not afraid of anything!","Pink");

                        setTimeout(function () {
                            messageUpdater("info-message","The effects of adrenaline have worn off...","Grey");
                            player.sprite = 'images/char-pink.png';
                            godMode = false;
                            characterLockFlag = false;
                        },3000);
                    }
                })
            }
            break;
        default:
    }

    // Resets the player once he/she reaches the water and updates the score,
    // scoreboard and generates a new level if required.
    if (this.y === -22) {
        this.resetPosition();
        respawnObstacles();
        score += 100;
        messageUpdater("info-message", "Ahhh, that's refreshing! +100 Score!","Navy"); 
        updateHighscore(score);
        levelCounter += 1;
        riverCrossingCounter += 1;
        if (riverCrossingCounter === 10) {
            messageUpdater("info-message", "You've unlocked a new character!","Pink"); 
            showCharacters("pink");
        }

        // Checks if the next level has been reached. If it has, calls the levelGenerator function.
        if (levelCounter === TO_NEXT_LEVEL) {
            levelGenerator();
            levelCounter = 0;
        }
        else {
            allCollectibles = [];
            collectibleSpawn();
        }
        // Update the scoreboard.
        updateScoreDisplay(score,lives,level,highScore);
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
    this.name = "Blue Gem";
}

BlueGem.prototype = Object.create(Collectible.prototype);
BlueGem.prototype.constructor = Collectible;
BlueGem.prototype.effect = function () {
    if (slowingEffectTimer === 0) {
        slowingEffectFlag = true;  
    }
    document.body.style.background = "rgba(130,195,255,1)";
    slowingEffectCounter = 1;
    slowingEffectTimer += SLOW_TIMER;
    slowingEffectRatio = 1 / (slowingEffectTimer / 1000);
    messageUpdater("info-message", "A cool breeze blows by...","#6F8FF7"); 
};

// Subclass of collectible
var GreenGem = function () {
    Collectible.call(this);
    this.sprite = 'images/gem-green.png';
    this.name = "Green Gem";
}

GreenGem.prototype = Object.create(Collectible.prototype);
GreenGem.prototype.constructor = Collectible;
GreenGem.prototype.effect = function () {
    messageUpdater("info-message", "+250 Score!","#34FA6C");  
    score += 250;
};

// Subclass of collectible
var OrangeGem = function () {
    Collectible.call(this);
    this.sprite = 'images/gem-orange.png';
    this.name = "Orange Gem";
}

OrangeGem.prototype = Object.create(Collectible.prototype);
OrangeGem.prototype.constructor = Collectible;
OrangeGem.prototype.effect = function () {
    messageUpdater("info-message", "+500 Score!","#FDD360");
    score += 500;
};

// Subclass of collectible
var RubyGem = function () {
    Collectible.call(this);
    this.sprite = 'images/gem-ruby.png';
    this.name = "Ruby Gem";
}

RubyGem.prototype = Object.create(Collectible.prototype);
RubyGem.prototype.constructor = Collectible;
RubyGem.prototype.effect = function () {
    messageUpdater("info-message", "+1000 Score!","#EE316B");
    score += 1000;
}

// Subclass of collectible
var Heart = function () {
    Collectible.call(this);
    this.sprite = 'images/red-heart.png';
    this.name = "Heart";
}

// Subclass of collectible
Heart.prototype = Object.create(Collectible.prototype);
Heart.prototype.constructor = Collectible;
Heart.prototype.effect = function () {
    if (lives < MAXIMUM_LIVES) {
        lives += 1;
        messageUpdater("info-message", "This should come in handy. +1 Life!","#D9534F"); 
    }
    else {
        messageUpdater("info-message", "Don't be too greedy now. Afterall, you're just a mere mortal. +100 Score.","#D9534F");        
    }
};

// Subclass of collectible
var Key = function () {
    Collectible.call(this);
    this.sprite = 'images/yellow-key.png';
    this.name = "Key";
}

Key.prototype = Object.create(Collectible.prototype);
Key.prototype.constructor = Collectible;
Key.prototype.effect = function () {
    collectedKeys += 1;
    if (collectedKeys < 5) {
        messageUpdater("info-message", "A key! I wonder what this does...","#D0CC57");
    }
    if (collectedKeys === 5) {
        showCharacters("horn-girl");
        messageUpdater("info-message", "You've unlocked a new Character!","#D0CC57");
    }
    if (collectedKeys > 5) {
        messageUpdater("info-message", "+500 Score","#D0CC57");
        score += 500;
    }
}

// Subclass of collectible
var Star = function () {
    Collectible.call(this);
    this.sprite = 'images/yellow-star.png';
};

Star.prototype = Object.create(Collectible.prototype);
Star.prototype.constructor = Collectible;
Star.prototype.effect = function () {
    collectedStars += 1;

    forEachObjectInArray(collectibleList, "name", "Star", function (object) {
        object["currentCount"] += 1;
    });
    messageUpdater("info-message", "A star containing powerful energy!","#F2DF11");
}

// Obstacle constructor
var Obstacle = function () {
    this.sprite = 'images/Rock.png';
    this.x = Math.floor(Math.random()*7) * 101;
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
    if (!godMode) {
        forEach(allEnemies, function (bug) {
            if (player.y < bug.y + 63 && player.y > bug.y - 77 && player.x < bug.x + 70 && player.x > bug.x - 70) {
                // Resets player position, applies appropriate penalties and updates the scoreboard
                player.resetPosition();
                respawnObstacles();
                lives -= 1;
                updateScoreDisplay(score,lives,level,highScore);
                allCollectibles = [];
                collectibleSpawn();
                messageUpdater("info-message", "Ouch!","red");

                // Restarts the game if player has no lives left
                if (lives === 0) {
                    alert("Game Over!");
                    updateHighscore();
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
            collectibleCounter += 1;

            forEachObjectInArray(collectibleList, "name", collectibles["name"], function (object) {
               object["currentCount"] += 1;
            });

            if (collectibleCounter === 10) {
                messageUpdater("info-message", "You've unlocked a new character!", "Black"); 
                showCharacters("miao");
            }
            collectibles.effect();
            updateScoreDisplay(score,lives,level,highScore);
            allCollectibles.splice(allCollectibles.indexOf(collectibles),1);
            updateHighscore();
            exists(collectibles);
            updateCollectibleDisplay(rubyGemCounter,blueGemCounter,greenGemCounter,orangeGemCounter,collectedKeys,collectedStars);
        }
    });
};

// Helper function which accepts an array of objects, the property of the object to search for, the value to match the property of the object, and the callback function to be applied to the object 
var forEachObjectInArray = function (collection, property, value, callback) {
    forEach(collection, function (object) {
        if (object[property] === value) {
            callback(object);
        }
    });
};

var exists = function (collectible) {
    if (collectible.name === "Ruby Gem") {
        rubyGemCounter += 1;
    }
    else if (collectible.name === "Blue Gem") {
        blueGemCounter += 1;
    }
    else if (collectible.name === "Green Gem") {
        greenGemCounter += 1;
    }
    else if (collectible.name === "Orange Gem") {
        orangeGemCounter += 1;
    }
    else if (collectible.name === "Blue Gem") {
        collectedKeys += 1;
    }
    else {

    }
};

// Delares a variable to store status effect timer
var slowTimer;

// This function is called by main and determines if a global slowing effect is being applied
var checkSlowingEffects = function () {
    if (slowingEffectFlag) {
        slowingEffectFlag = false;
        slowTimer = setInterval( function() {
            slowingEffectTimer -= 1000;
            slowingEffectCounter -= slowingEffectRatio;
            document.body.style.background = "rgba(130,195,255,"+ slowingEffectCounter +")";
        }, 1000);
    }

    if (slowingEffectTimer === 0) {
        document.body.style.background = "rgba(130,195,255,0)";
        clearInterval(slowTimer);
    }
};

// Generates a bug when the player reaches the water enough times
var levelGenerator = function () {
    // Increases the level
    level += 1;

    // Create a new instance of an enemy
    if (allEnemies.length < MAXIMUM_ENEMIES) {
        spawnEnemy(randomEnemyGenerator()); 
    }

    // Spawns collectibles
    allCollectibles = [];
    collectibleSpawn();

    if (obstacleList[0]["spawn_rate"] < 80) {
        obstacleList[0]["spawn_rate"] += 5;
    }
};

var respawnObstacles = function () {
    // Respawns obstacles
    if (level >= obstacleList[0]["level"]) {
        allObstacles = [];
        spawnObstacle(randomObstacleGenerator(), obstacleList[0]["max_count"]);
    }  
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
var spawnObstacle = function (spawn, count) {
    if (!(spawn === undefined)) {
        var obstacleFlag = false;
        var collectibleFlag = false;
        switch(spawn["name"]) {
                    case "Rock":
                        var addItem = new Obstacle;
                        allObstacles.forEach(function (obstacle) {
                            if (obstacle.x === addItem.x && obstacle.y === addItem.y) {
                                obstacleFlag = true;
                            }
                        });
                        allCollectibles.forEach(function (collectible) {
                            if (collectible.x === addItem.x && collectible.y === addItem.y) {
                                collectibleFlag = true;
                            }
                        });
                        break;
                    default:
                }
        if (!obstacleFlag && !collectibleFlag) {
            allObstacles.push(addItem);        
        }
    }
    if (count > 1) {
        count -= 1;
        spawnObstacle(randomObstacleGenerator(), count);
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
                    var addBug = new RedBug;
                    break;
                case "Green Bug":
                    var addBug = new GreenBug;
                    break;
                case "Bug Red":
                    var addBug = new BugRed;
                    break;
                case "Bug Green":
                    var addBug = new BugGreen;
                    break;
                case "Purple Bug":
                    var addBug = new PurpleBug;
                    break;
                case "Bug Purple":
                    var addBug = new BugPurple;
                    break;
                case "Yellow Bug":
                    var addBug = new YellowBug;
                    break;
                case "Bug Yellow":
                    var addBug = new BugYellow;
                    break;
                default:
            }
    if (level === 0 || allEnemies.length < level) {
        allEnemies.push(addBug);
    }
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
    // Checks to see if a collectible will spawn
    forEach(collectibleList, function (collectible) {
        var collectibleSpawn = Math.floor(Math.random()*100);
        if (collectibleSpawn < collectible.rate) {
            switch(collectible.name) {
                case "Blue Gem":
                    var addItem = new BlueGem;
                    break;
                case "Green Gem":
                    var addItem = new GreenGem;
                    break;
                case "Orange Gem":
                    var addItem = new OrangeGem;
                    break;
                case "Ruby Gem":
                    var addItem = new RubyGem;
                    break;
                case "Heart":
                    var addItem = new Heart;
                    break;
                case "Key":
                    var addItem = new Key;
                    break;
                case "Star":
                    var addItem = new Star;
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

// Function which updates the player scoreboard
var updateScoreDisplay = function (score, lives, level, highscore) {
    var currentScore = document.getElementById("score");
    var currentLives = document.getElementById("lives");
    var currentLevel = document.getElementById("level");
    var curretHighScore = document.getElementById("highscore");
    currentLives.innerHTML = "Lives: " + lives;
    currentScore.innerHTML = "Score: " + score;
    currentLevel.innerHTML = "Level: " + level;
    curretHighScore.innerHTML = "High Score: " + highscore;
};

// Function which updates the collectibles board
var updateCollectibleDisplay = function (ruby, blue, green, orange, keys, stars) {
    var currentRubyGemCounter = document.getElementById("ruby-gem-counter");
    var currentBlueGemCounter = document.getElementById("blue-gem-counter");
    var currentGreenGemCounter = document.getElementById("green-gem-counter");
    /*var currentOrangeGemCounter = document.getElementById("orange-gem-counter");*/
    var currentKeyCounter = document.getElementById("keys-counter");
    var currentStarCounter = document.getElementById("yellow-star-counter");
    currentRubyGemCounter.innerHTML = "Ruby Gem: " + ruby;
    currentBlueGemCounter.innerHTML = "Blue Gem: " + blue;
    currentGreenGemCounter.innerHTML = "Green Gem: " + green;
    /*currentOrangeGemCounter.innerHTML = "Orange Gem: " + orange;*/
    currentKeyCounter.innerHTML = "Keys: " + keys;
    currentStarCounter.innerHTML = "Power Ups: " + stars;
};

// Function which updates player highscore
var updateHighscore = function (score) {
    if (score > highScore) {
        highScore = score;
    }
    if (highScore > 6000) {
        showCharacters("princess");
    }
};

// Resets the game and updates the scoreboard
var resetGame = function() {
    score = 0;
    level = 0;
    levelCounter = 0;
    lives = 3;
    allEnemies = [];
    allObstacles = [];
    allCollectibles = [];
    collected = [];
    rubyGemCounter = 0;
    blueGemCounter = 0;
    greenGemCounter = 0;
    orangeGemCounter = 0;
    collectedKeys = 0;
    slowingEffectTimer = 0;
    forEach(collectibleList, function (collectible) {
        collectible.currentCount = 0;
    });
    levelGenerator();
    updateScoreDisplay(score,lives,level,highScore);
    updateCollectibleDisplay(rubyGemCounter,blueGemCounter,greenGemCounter,orangeGemCounter,collectedKeys,collectedStars);
};

// Function to remove the bug once it has crossed the screen and generates a new bug
var enemyRefresh = function () {
    if ((this.x < -101 && this.direction === "left") || (this.x > 808 && this.direction === "right")) {
        allEnemies.splice(allEnemies.indexOf(this),1);
        spawnEnemy(randomEnemyGenerator());
    }
};

// Updates the horizontal movement of enemies if required. 
var horizontalMovement = function (dt) {
    var directionFlag = 1;
    if (this.direction === "left") {
        directionFlag = -1;
    }
    if (slowingEffectTimer > 0) {
        this.x += (this.speed * dt * (100 - BLUE_GEM_SLOW) / 100) * directionFlag;
    }
    else {
        this.x += (this.speed * dt) * directionFlag;
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

// Accepts character name and changes current player sprite
var changeCharacter = function (characterName) {
    if (player.sprite === 'images/char-miao.png') {
        collectibleRateAdjust("decrease", 15);
    }

    switch (characterName) {
        case ("Spot"):
            player.sprite = 'images/char-spot.png';
            messageUpdater("effect-message", "None. You are just a little boy","black");
            break;
        case ("Miao"):
            player.sprite = 'images/char-miao.png';
            collectibleRateAdjust("increase", 15);
            messageUpdater("effect-message", "+15% Powerup Spawn Rate. Nice!","red");
            break;
        case ("Pink"):
            if (riverCrossingCounter >= 0) {
                player.sprite = 'images/char-pink.png';
                messageUpdater("effect-message", "None. To be determined!","black");
            }
            break;
        case ("Horn Girl"):
            if (collectedKeys >= 0) {
                player.sprite = 'images/char-horn-girl.png';
                messageUpdater("effect-message", "None. To be determined!","black");            
            }
            break;
        case ("Princess"):
            if (highScore >= 6000) {
                player.sprite = 'images/char-princess.png';
                messageUpdater("effect-message", "None. To be determined!","black");
            }
            break;
        default:
    }
};

var collectibleRateAdjust = function (type, amount) {
    var flag;
    if (type === "increase") {
        flag = 1;
    }
    if (type === "decrease") {
        flag = -1;
    }

    forEach(collectibleList, function (collectible) {
        collectible.rate += (amount*flag);
    });
}

// Helper function to show characters once they've been unlocked
var showCharacters = function (name) {
    var element = document.getElementById(name);
    element.style.visibility = "visible";
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

// Default character
showCharacters("spot");

// Helper function helps update the current effect messages. Accepts HTML ID, the message, and the color as parameters
var messageUpdater = function (id, newMessage, colorChange) {
    var message = document.getElementById(id);
    message.innerHTML = newMessage;
    message.style.color = colorChange;
};