(function () {
  /**
   * Calculates the minimum square grid which will take
   * the passed in number of elements.  I'm not sure that explanation helped explain this...
   */
  function calculateRowSize(size) {
    for (var i = 0; i < size; i++) {
      if ((i * i) >= size) {
        return i;
      }
    }

    return size;
  }

  /**
   * The number of tile styles should equal the number of tiles in each row
   * and be named 'style1', 'style2' etc
   *
   * @param tiles
   * @param numInRow
   */
  function makeGrid(tiles, numInRow) {
    var returnVal = [];
    var currRow = [];

    for (var tile in tiles) {
      if (tiles.hasOwnProperty(tile)) {
        var styleNum = (returnVal.length + currRow.length) % numInRow;
        var style = 'style' + (styleNum + 1);

        var newElement = Object.create(tiles[tile]);

        newElement.tileId = tile;
        newElement.tileClass = style;

        currRow.push(newElement);

        if (currRow.length === numInRow) {
          returnVal.push(currRow.slice(0));
          currRow = [];
        }
      }
    }

    if (currRow.length > 0) {
      returnVal.push(currRow);
    }

    return returnVal;
  }

  Polymer({
    is: 'bingo-grid',
    properties: {
      tiles: Object,
      score: Number,
      settings: {
        type: Object,
        notify: true
      },
      total: Number
    },
    observers: [
      'tilesChanged(tiles.*)'
    ],
    /**
     * Set a tile to
     *
     * @param elId
     * @returns {number|boolean}
     */
    toggleDone: function (elId) {
      this.set('tiles.' + elId + '.done', this.tiles[elId].done ? false : Date.now());
      this.tilesChanged();
      return this.tiles[elId].done;
    },
    persist: function () {
      var newSettings = {};
      for (var tile in this.tiles) {
        if (this.tiles.hasOwnProperty(tile) && (this.tiles[tile].done !== false)) {
          newSettings[tile] = this.tiles[tile].done;
        }
      }
      this.settings = newSettings;
    },
    restart: function () {
      for (var tile in this.tiles) {
        if (this.tiles.hasOwnProperty(tile)) {
          this.set('tiles.' + elId + '.done', false);
        }
      }
      this.tilesChanged();
    },
    classes: function (classes) {
      return classes;
    },
    count: function (countAll) {
      var count = 0;
      for (var tile in this.tiles) {
        if (this.tiles.hasOwnProperty(tile)) {
          if (countAll || (this.tiles[tile].done !== false)) {
            count++;
          }
        }
      }
      return count;
    },
    tilesChanged: function () {
      if (this.$.globals.objLength(this.tiles)) {
        this.gridTiles = makeGrid(this.tiles, calculateRowSize(this.$.globals.objLength(this.tiles)));
        this.total = this.count(true);
        this.score = this.count();
        this.persist();
      }
    }
  });
})();
