(function () {
  Polymer({
    ready: function () {
      this.name = this.$.globals.namespace + '.values';
      // load the values but ignore return
      this.get();
    },
    get: function () {
      return localStorage.hasOwnProperty(this.name) ? JSON.parse(localStorage[this.name]) : {};
    },
    persist: function (values) {
      localStorage[this.name] = JSON.stringify(values);
    }
  });
})();
