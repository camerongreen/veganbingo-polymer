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
    listenForMenuClicks();
    listenForHomeButtonClicks();
    listenForRestartButtonClicks();

    var page = document.querySelector('#bingo-page');
    var btn = page.querySelector('button');

    listenForCompletionClick(btn);
    listenForGridPageClicks(page, btn);
  });

  function listenForCompletionClick(btn) {
    btn.addEventListener('click', function () {
      var elId = btn.getAttribute("bingo-page");
      var bingoGrid = document.querySelector("bingo-grid");
      var done = bingoGrid.toggleDone(elId);
      setButtonStatus(btn, done);
    });
  }

  function setButtonStatus(btn, done) {
    if (done) {
      btn.innerHTML = "You got a bingo!";
    } else {
      btn.innerHTML = "Click here if someone said this";
    }
  }

  function listenForGridPageClicks(page, btn) {
    document.addEventListener('grid-button-clicked', function (event) {
      // set menu to nothing
      changePage(-1, 4);

      var details = event.detail;

      page.querySelector('#header-image').setAttribute('src', 'images/' + details.tileId + '.png');
      page.querySelector('#description').innerHTML = details.description;
      page.querySelector('#rules p').innerHTML = details.rules;
      page.querySelector('#main').innerHTML = "<p>" + details.main.join("</p>\n<p>") + "</p>";
      // populate page with appropriate stuff

      btn.setAttribute('bingo-page', details.tileId);
      setButtonStatus(btn, details.done);
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
      evt.preventDefault();
    });
  }

  function listenForHomeButtonClicks() {
    document.addEventListener('home-button-clicked', function (evt) {
      changePage(0);
      evt.preventDefault();
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
