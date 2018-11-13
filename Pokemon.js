module.exports = function Pokemon(data) {
    this.id = data.id;
    this.name = data.name;
    this.height = data.height;
    this.weight = data.weight;
    this.types = data.types.map(type => {
        return {
            slot: type.slot,
            name: type.type.name,
            url: type.type.url
        }
    });
    this.species = data.species.url;
    this.stats = data.stats.map(stat => {
        return {
            base_stat: stat.base_stat,
            name: stat.stat.name,
            url: stat.stat.url
        }
    });
    this.moves = data.moves.map(move => move.move);
    this.defaultSprite = data.sprites.front_default;

    return this;
};