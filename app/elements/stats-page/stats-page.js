(function () {
  Polymer({
    tiles: {},
    settings: {},
    created: function () {
      this.stats = [];
    },
    settingsChanged: function () {
      if (this.$.globals.objLength(this.tiles)) {
        this.updateStats();
      }
    },
    tilesChanged: function () {
      if (this.$.globals.objLength(this.tiles)) {
        this.updateStats();
      }
    },
    updateStats: function () {
      this.stats = [];
      var inverse = true;
      for (var i in this.tiles) {
        if (this.settings.hasOwnProperty(i)) {
          var stat = {
            completed: this.settings[i],
            inverse: inverse,
            completedDate: new Date(this.settings[i]),
            description: this.tiles[i].description
          };
          this.stats.push(stat);
          inverse = !inverse;
        }
      }

      this.stats.sort(function (a, b) {
        return a.completed - b.completed;
      });
    }
  });
})();
