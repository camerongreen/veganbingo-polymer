(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.getElementById('app');
  app.appName = 'Vegan Bingo!';

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function () {
    var vb = new VeganBingo(this);
    vb.start();
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function () {
    document.getElementById('mainContainer').scrollTop = 0;
  };

  // I'm sure this could be done with a wildcard, but having thorough
  // user friendly documentation isn't the Google way
  app.precache = [
    'images/aspirational_done.png',
    'images/aspirational.png',
    'images/bacon_done.png',
    'images/bacon.png',
    'images/cant_done.png',
    'images/cant.png',
    'images/cheese_done.png',
    'images/cheese.png',
    'images/cow_done.png',
    'images/cow.png',
    'images/eat_done.png',
    'images/eat.png',
    'images/food_done.png',
    'images/food.png',
    'images/hitler_done.png',
    'images/hitler.png',
    'images/humane_done.png',
    'images/humane.png',
    'images/ic_launcher.png',
    'images/natural_done.png',
    'images/natural.png',
    'images/notmuch_done.png',
    'images/notmuch.png',
    'images/plants_done.png',
    'images/plants.png',
    'images/preachy_done.png',
    'images/preachy.png',
    'images/protein_done.png',
    'images/protein.png',
    'images/teeth_done.png',
    'images/teeth.png',
    'images/veganbingo-icon.png',
    'images/veganbingo.png',
    'images/what_done.png',
    'images/what.png'
  ];

  app.displayInstalledToast = function () {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  app.itemClick = function (evt) {
    var el = evt.target;
    el.classList.add('iron-selected');
    var path = el.getAttribute('data-route');
    page('/' + path);
  };

  /**
   * Class for the main Vegan Bingo tasks
   *
   * @param template
   * @constructor
   */
  var VeganBingo = function (template) {
    this.PAGES = {
      home: 0,
      grid: 5
    };

    this.template = template;
    this.template.pageSelected = this.PAGES.home;
  };

  VeganBingo.prototype.start = function () {
    this.listenForRestartButtonClicks();
    this.listenForCompletionClick();
  };

  /**
   * Listen for a click on any of the bingo tasks
   * if so, set the page up.
   */
  VeganBingo.prototype.listenForCompletionClick = function () {
    document.addEventListener('bingo-button-clicked', function (e) {
      var bingoGrid = document.querySelector('bingo-grid');
      bingoGrid.toggleDone(e.detail);
    });
  };

  VeganBingo.prototype.listenForRestartButtonClicks = function () {
    document.querySelector('#settings #restart').addEventListener('click', function () {
      var dataGrid = document.querySelector('bingo-grid');
      dataGrid.restart();
    });
  };

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
