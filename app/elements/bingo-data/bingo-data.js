(function () {
  Polymer({
    created: function () {
      this.tiles = {};
    },
    tilesLoaded: function () {
      var settings = this.$.settings.get();
      this.tiles = Object.create(this.$.ajax.response);
      for (var tile in this.tiles) {
        this.tiles[tile].done = settings.hasOwnProperty(tile) ? settings[tile] : false;
      }
    },
    getTiles: function () {
      return this.tiles;
    }
  });
})();
