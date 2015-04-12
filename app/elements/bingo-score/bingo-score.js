(function () {
  Polymer({
    ready: function () {
      this.score = 0;
      this.total = 0;
    },
    scoreChanged: function () {
      if ((this.score === this.total) && (this.total > 0)) {
        this.transition = 'core-transition-center';
        this.$.scoreAchieved.toggle();
      }
    }
  });
})();
