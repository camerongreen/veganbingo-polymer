(function () {
  Polymer({
    is: 'bingo-page',
    properties: {
      params: {
        type: Object,
        observer: 'showPage'
      },
      tiles: {
        type: Object,
        observer: 'showPage'
      }
    },
    showPage: function () {
      if (this.tiles) {
        this.page = this.tiles[this.params.name];
        this.image = 'images/' + this.params.name + (this.page.done ? '_done' : '') + '.png';
        this.btnText = this.page.done ? 'You got a bingo!' : 'Click here if someone said this';
      }
    },
    doClick: function () {
      this.fire('bingo-button-clicked', this.params.name);
    }

  });
})();
