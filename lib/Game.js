const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

//Game properties //
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy
    this.player;
};


// INITIALIZE GAME METHOD //
Game.prototype.initializegame = function () {
    // ADD ENEMIES TO THIS.ENEMIES ARRAY //
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    //SET CURRENT ENEMY //
    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: "What is your Player's name?"
        })
        //DESTRUCTURE NAME FROM PROMPT OBJECT //
        .then(({ name }) => {
            this.player = new Player(name);

            //TEST THE OBJECT CREATION //
            this.startNewBattle();
        });
};


module.exports = Game;