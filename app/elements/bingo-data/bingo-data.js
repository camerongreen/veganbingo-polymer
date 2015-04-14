(function () {
  Polymer({
    created: function () {
      this.tiles = {};
      this.settings = {};
    },
    tilesLoaded: function () {
      this.tiles = Object.create(this.$.ajax.response);
      for (var tile in this.tiles) {
        this.tiles[tile].done = this.settings.hasOwnProperty(tile) ? this.settings[tile] : false;
      }
    },
    getTiles: function () {
      return this.tiles;
    }
  });
})();
