(function () {
  Polymer({
    doClick: function () {
      this.fire('grid-button-clicked', this.details);
    },
    pictureName: function (details) {
      var image = details.tileId;
      if (details.done) {
        image += '_done';
      }
      return image;
    },
    create: function () {
      this.details = {};
    }
  });
})();
