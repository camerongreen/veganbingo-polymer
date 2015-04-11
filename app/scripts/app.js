(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.appName = 'Vegan Bingo!';

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function () {
    var page = document.querySelector('#bingo-page');
    var btn = page.querySelector('#completionButton');

    listenForMenuClicks();
    listenForHomeButtonClicks();
    listenForRestartButtonClicks();
    listenForCompletionClick(page, btn);
    listenForGridPageClicks(page, btn);
  });

  function listenForCompletionClick(page, btn) {
    var bingoGrid = document.querySelector("bingo-grid");
    btn.addEventListener('click', function () {
      var elId = btn.getAttribute("bingo-page");
      var done = bingoGrid.toggleDone(elId);
      setButtonStatus(btn, done);
      setImageStatus(page, elId, done);
    });
  }

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

  function listenForGridPageClicks(page, btn) {
    document.addEventListener('grid-button-clicked', function (event) {
      // set menu to nothing
      changePage(-1, 4);

      // populate page with appropriate stuff
      page.querySelector('#description').innerHTML = event.detail.description;
      page.querySelector('#rules p').innerHTML = event.detail.rules;
      page.querySelector('#main').innerHTML = "<p>" + event.detail.main.join("</p>\n<p>") + "</p>";
      btn.setAttribute('bingo-page', event.detail.tileId);
      setButtonStatus(btn, event.detail.done);
      setImageStatus(page, event.detail.tileId, event.detail.done);
    });
  }

  function listenForMenuClicks() {
    var els = document.querySelectorAll('core-item');

    for (var i = 0, l = els.length; i < l; i++) {
      (function (index) {
        els[i].addEventListener('click', function () {
          changePage(index);
        });
      })(i);
    }
  }

  function listenForRestartButtonClicks() {
    document.querySelector("#restart").addEventListener('click', function (evt) {
      var dataGrid = document.querySelector("bingo-grid");
      dataGrid.restart();
    });
  }

  function listenForHomeButtonClicks() {
    document.addEventListener('home-button-clicked', function (evt) {
      changePage(0);
    });
  }

  function changePage(menu, page) {
    if (typeof page === 'undefined') {
      page = menu;
    }
    document.querySelector('core-menu').setAttribute('selected', menu);
    document.querySelector('core-animated-pages').setAttribute("selected", page);
  }

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
