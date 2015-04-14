(function () {
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
    ready: function () {
      var that = this;
      this.$.ajax.addEventListener('core-response', function (res) {
        that.tiles = res.detail.response;
      });
    },
    toggleDone: function (elId) {
      var done = this.tiles[elId].done;
      if (done) {
        this.tiles[elId].done = false;
      } else {
        this.tiles[elId].done = Date.now();
      }
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
          this.tiles[tile].done = false;
        }
      }
      this.tilesChanged();
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
