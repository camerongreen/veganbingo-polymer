(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.appName = 'Vegan Bingo!';

  var PAGES = {
    home: 0,
    grid: 4
  }

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function () {
    // Use URL hash for initial route. Otherwise, use the first page.
    this.pageSelected = PAGES.home;

    var page = document.querySelector('#bingo-page');
    var btn = page.querySelector('#completionButton');

    listenForHomeButtonClicks(this);
    listenForRestartButtonClicks();
    listenForCompletionClick(page, btn);
    listenForGridPageClicks(this, page, btn);

    function listenForCompletionClick(page, btn) {
      var bingoGrid = document.querySelector("bingo-grid");
      btn.addEventListener('click', function () {
        var elId = btn.getAttribute("bingo-page");
        var done = bingoGrid.toggleDone(elId);
        setButtonStatus(btn, done);
        setImageStatus(page, elId, done);
      });
    }

    function listenForHomeButtonClicks(parent) {
      document.addEventListener('home-button-clicked', function () {
        parent.pageSelected = PAGES.home;
      });
    };

    function setButtonStatus(btn, done) {
      if (done) {
        btn.innerHTML = "You got a bingo!";
      } else {
        btn.innerHTML = "Click here if someone said this";
      }
    }

    function setImageStatus(page, elId, done) {
      page.querySelector('#header-image').setAttribute('src', 'images/' + elId + (done ? '_done' : '') + '.png');
    }

    function listenForGridPageClicks(parent, page, btn) {
      document.addEventListener('grid-button-clicked', function (event) {
        parent.pageSelected = PAGES.grid;

        // populate page with appropriate stuff
        page.querySelector('#description').innerHTML = event.detail.description;
        page.querySelector('#rules p').innerHTML = event.detail.rules;
        page.querySelector('#main').innerHTML = "<p>" + event.detail.main.join("</p>\n<p>") + "</p>";
        btn.setAttribute('bingo-page', event.detail.tileId);
        setButtonStatus(btn, event.detail.done);
        setImageStatus(page, event.detail.tileId, event.detail.done);
      });
    }

    function listenForRestartButtonClicks() {
      document.querySelector("#restart").addEventListener('click', function (evt) {
        var dataGrid = document.querySelector("bingo-grid");
        dataGrid.restart();
      });
    }
  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
