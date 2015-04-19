(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.getElementById('app');
  app.appName = 'Vegan Bingo!';

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function () {
    var vb = new VeganBingo(this);
    vb.start();
  });

  /**
   * Class for the main Vegan Bingo tasks
   *
   * @param template
   * @constructor
   */
  var VeganBingo = function (template) {
    this.PAGES = {
      home: 0,
      grid: 4
    };

    this.template = template;
    this.template.pageSelected = this.PAGES.home;
  };

  VeganBingo.prototype.start = function () {
    var page = document.getElementById('bingo-page');
    var btn = page.shadowRoot.querySelector('#completionButton');

    this.listenForHomeButtonClicks();
    this.listenForRestartButtonClicks();
    this.listenForCompletionClick(page, btn);
    this.listenForGridPageClicks(page, btn);
  };

  /**
   * Listen for a click on any of the bingo tasks
   * if so, set the page up.
   *
   * @param page
   * @param btn
   */
  VeganBingo.prototype.listenForCompletionClick = function (page, btn) {
    var bingoGrid = document.querySelector('bingo-grid');
    var that = this;
    btn.addEventListener('click', function () {
      var elId = btn.getAttribute('bingo-page');
      var done = bingoGrid.toggleDone(elId);
      that.setButtonStatus(btn, done);
      that.setImageStatus(page, elId, done);
    });
  };

  VeganBingo.prototype.listenForHomeButtonClicks = function () {
    var that = this;
    document.addEventListener('home-button-clicked', function () {
      that.template.pageSelected = that.PAGES.home;
    });
  };

  VeganBingo.prototype.setButtonStatus = function (btn, done) {
    if (done) {
      btn.innerHTML = 'You got a bingo!';
    } else {
      btn.innerHTML = 'Click here if someone said this';
    }
  };

  VeganBingo.prototype.setImageStatus = function (page, elId, done) {
    page.shadowRoot.getElementById('header-image').setAttribute('src', 'images/' + elId + (done ? '_done' : '') + '.png');
  };

  VeganBingo.prototype.listenForGridPageClicks = function (page, btn) {
    var that = this;
    document.addEventListener('grid-button-clicked', function (event) {
      that.template.pageSelected = that.PAGES.grid;

      // populate page with appropriate stuff
      page.shadowRoot.getElementById('description').innerHTML = event.detail.description;
      page.shadowRoot.querySelector('#rules p').innerHTML = event.detail.rules;
      page.shadowRoot.getElementById('main').innerHTML = '<p>' + event.detail.main.join('</p>\n<p>') + '</p>';
      btn.setAttribute('bingo-page', event.detail.tileId);
      that.setButtonStatus(btn, event.detail.done);
      that.setImageStatus(page, event.detail.tileId, event.detail.done);
    });
  };

  VeganBingo.prototype.listenForRestartButtonClicks = function () {
    document.querySelector('#settings::shadow #restart').addEventListener('click', function () {
      var dataGrid = document.querySelector('bingo-grid');
      dataGrid.restart();
    });
  };

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
