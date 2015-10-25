(function () {
  Polymer({
    is: 'grid-button',
    properties: {
      details: Object
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
