(function () {
  Polymer({
    is: 'bingo-settings',
    properties: {
      settings: {
        type: Object,
        value: {},
        notify: true
      }
    },
    ready: function () {
      this.name = this.$.globals.namespace + '.values';
      this.load();
    },
    load: function () {
      this.settings = localStorage.hasOwnProperty(this.name) ? JSON.parse(localStorage[this.name]) : {};
    },
    settingsChanged: function () {
      localStorage[this.name] = JSON.stringify(this.settings);
    }
  });
})();
