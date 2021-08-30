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

// REDUCE HEALTH FUNCTION //

Player.prototype.reduceHealth = function (health) {
    this.health -= health;
    if (this.health < 0) {
        this.health = 0;
    }
};

//GET ATTACK VALUE FUNCTION //
Player.prototype.getAttackValue = function () {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};

//ADD POTION TO PLAYER INVENTORY //
Player.prototype.addPotion = function (potion) {
    this.inventory.push(potion);
};

//PLAYER USES A POTION //
Player.prototype.usePotion = function (index) {
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
    };
};












module.exports = Player;