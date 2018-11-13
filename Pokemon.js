module.exports = function Pokemon(data) {
    this.id = data.id;
    this.name = data.name;
    this.height = data.height;
    this.weight = data.weight;
    this.types = data.types;
    this.species = data.species;
    this.stats = data.stats;
    this.moves = data.moves;
    this.defaultSprite = data.sprites.front_default;

    return this;
};