(function () {
  Polymer({
    created: function () {
      this.tiles = {};
      this.settings = {};
    },
    ready: function () {
      this.addEventListener('core-response', function (event) {
        this.tiles = event.detail.response;
        for (var tile in this.tiles) {
          this.tiles[tile].done = this.settings.hasOwnProperty(tile) ? this.settings[tile] : false;
        }
      });
    },
    getTiles: function () {
      return this.tiles;
    }
  });
})();
