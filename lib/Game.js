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

Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    };
    //DISPLAY PLAYER's STATS//
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    //DISPLAY ENEMY DESCRIPTION //
    console.log(this.currentEnemy.getDescription());
    this.battle();
};


Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if (action === 'Use potion') {
                    if (!this.player.getInventory) {
                        console.log("You have no don't have any potions!")
                        return this.checkEndOfBattle();
                    } else {
                        inquirer
                            .prompt({
                                type: 'list',
                                message: 'Which potion would you like to use?',
                                name: 'action',
                                choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                            })
                            .then(({ action }) => {
                                const potionDetails = action.split(': ');

                                this.player.usePotion(potionDetails[0] - 1);
                                console.log(`You used a ${potionDetails[1]} potion.`);
                                this.checkEndOfBattle();
                            });
                    }
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);
                    console.log(`You attacked the ${this.currentEnemy.name} for ${damage} damage`);
                    console.log(this.currentEnemy.getHealth());
                    this.checkEndOfBattle();
                }
            });
    } else {
        //ENEMY MOVE//
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name} for ${damage} damage!`);
        console.log(this.player.getHealth());
        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function () {
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You have defeated ${this.currentEnemy.name}!`);
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log("You win!");
        }
    } else {
        console.log(`${this.player.name} has been defeated!`);
    }
};










module.exports = Game;