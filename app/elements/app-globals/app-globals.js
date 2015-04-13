(function () {
  Polymer({
    ready: function () {
      this.namespace = 'org.camerongreen.veganbingo';
    },
    objLength: function (obj) {
      var count = 0;
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          count++;
        }
      }
      return count;
    }
  });
})();
