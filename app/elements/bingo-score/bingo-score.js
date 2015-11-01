(function () {
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
        var dialog = document.querySelector('paper-dialog');
        if (dialog) {
          var pdp = document.querySelector('paper-drawer-panel');
          pdp.parentNode.insertBefore(dialog._backdrop, pdp);
          pdp.parentNode.insertBefore(dialog, pdp);
          dialog.open();
        }
      }
    }
  });
})();
