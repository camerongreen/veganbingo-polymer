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
    tilesLoaded: false,
    loadTiles: function () {
      this.tiles = event.detail.response;
      for (var tile in this.tiles) {
        this.tiles[tile].done = this.settings.hasOwnProperty(tile) ? this.settings[tile] : false;
      }
      this.tilesLoaded = true;
    },
    getTiles: function () {
      return this.tiles;
    }
  });
})();
