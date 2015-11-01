(function () {
  Polymer({
    is: 'bingo-data',
    properties: {
      tiles: {
        type: Object,
        notify: true
      },
      settings: Object
    },
    loadTiles: function (event) {
      var tiles = event.detail.response;
      for (var tile in tiles) {
        tiles[tile].done = this.settings.hasOwnProperty(tile) ? this.settings[tile] : false;
      }
      this.tiles = tiles;
    },
    getTiles: function () {
      return this.tiles;
    }
  });
})();
