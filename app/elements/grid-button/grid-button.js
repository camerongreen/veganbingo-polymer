(function () {
  Polymer({
    is: 'grid-button',
    properties: {
      details: Object
    },
    doClick: function () {
      this.fire('grid-button-clicked', this.details);
    },
    pictureName: function (details) {
      // lame check but good enough
      if (details && (typeof details === 'object')) {

        var image = details.tileId;
        if (details.done) {
          image += '_done';
        }
        return image + '.png';
      }
    }
  });
})();
