(function () {
  Polymer({
    is: 'stats-page',
    properties: {
      tiles: Object,
      settings: {
        type: Object,
        value: {}
      },
      score: Number,
      total: Number
    },
    observers: [
      'tilesChanged(tiles.*)',
      'settingsChanged(settings.*)'
    ],
    timeline: [],
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
      var inverse = true;
      this.timeline = [];
      for (var i in this.tiles) {
        if (this.settings.hasOwnProperty(i)) {
          var stat = {
            completed: this.settings[i],
            inverse: inverse,
            completedDate: new Date(this.settings[i]),
            description: this.tiles[i].description
          };
          this.push('timeline', stat);
          inverse = !inverse;
        }
      }

      this.timeline.sort(function (a, b) {
        return a.completed - b.completed;
      });
    }
  });
})();
