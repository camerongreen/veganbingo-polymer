(function () {
  Polymer({
    tiles: {},
    settings: {},
    created: function () {
      this.stats = [];
    },
    tilesChanged: function () {
      if (this.$.globals.objLength(this.tiles)) {
        this.updateStats();
      }
    },
    updateStats: function () {
      this.stats = [];
      for (var i in this.tiles) {
        if (this.settings.hasOwnProperty(i)) {
          var stat = {
            completed: this.settings[i],
            completedDate: new Date(this.settings[i]),
            description: this.tiles[i].description
          };
          this.stats.push(stat);
        }
      }

      this.stats.sort(function (a, b) {
        return a.completed - b.completed;
      });
    }
  });
})();
