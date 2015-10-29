(function () {
  Polymer({
    is: 'home-button',
    properties: {
      text: String
    },
    goHome: function () {
      page('/home');
    }
  });
})();
