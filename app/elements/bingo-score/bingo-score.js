(function () {
  'use strict';

  Polymer({
    is: 'bingo-score',
    scoreLabel: 'Score',
    properties: {
      score: {
        type: Number,
        value: 0,
        observer: 'scoreChanged'
      },
      total: {
        type: Number,
        value: 0
      }
    },
    scoreChanged: function () {
      if ((this.score === this.total) && (this.total > 0)) {
        this.transition = 'core-transition-center';
        this.$.scoreAchieved.toggle();
      }
    }
  });
})();
