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
    observers: [
      'settingsChanged(settings.*)'
    ],
    ready: function () {
      this.name = this.$.globals.namespace + '.values';
      this.load();
    },
    load: function () {
      this.settings = localStorage.hasOwnProperty(this.name) ? JSON.parse(localStorage[this.name]) : {};
    },
    settingsChanged: function () {
      if (this.name) {
        localStorage[this.name] = JSON.stringify(this.settings);
      }
    }
  });
})();
