(function () {
  Polymer({
    created: function () {
      this.score = 0;
      this.total = 0;
      this.scoreLabel = "Score";
    },
    scoreChanged: function () {
      if ((this.score === this.total) && (this.total > 0)) {
        this.transition = 'core-transition-center';
        this.$.scoreAchieved.toggle();
      }
    }
  });
})();
