const Potion = require('../lib/Potion');

//OBJECT PROPERTIES//
function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];
};

//GET STATS FUNCTION //
Player.prototype.getStats = function () {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

//GET INVENTORY FUNCTION //
Player.prototype.getInventory = function () {
    if (this.inventory.length) {
        return this.inventory;
    } else {
        return false;
    }
};

//GET HEALTH FUNCTION //
Player.prototype.getHealth = function () {
    return `${this.name}'s health is now ${this.health}!`;
};

//IS ALIVE OR NOT FUNCTION //
Player.prototype.isAlive = function () {
    if (this.health === 0) {
        return false;
    } else {
        return true;
    }
};

Player.prototype.reduceHealth = function (health) {
    this.health -= health;
    if (this.health < 0) {
        this.health = 0;
    }
};






module.exports = Player;