(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.appName = 'Vegan Bingo!';

  var myNs = 'org.camerongreen.veganbingo';
  var settings = localStorage[myNs + '.values'] ? JSON.parse(localStorage[myNs + '.values']) : {};

  document.addEventListener("bingo-data-loaded", function (res) {
    app.model = {
      tiles: res.detail
    };
  });

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function () {
    listenForMenuClicks();
    listenForHomeButtonClicks();
    listenForRestartButtonClicks(settings);

    var page = document.querySelector('#bingo-page');
    var btn = page.querySelector('button');

    listenForCompletionClick(settings, btn);
    listenForGridPageClicks(page, btn);
    updateScore(settings);
  });

  function listenForCompletionClick(settings, btn) {
    btn.addEventListener('click', function () {
      var elId = btn.getAttribute("bingo-page");
      var done = settings.hasOwnProperty(elId);
      updateValue(settings, elId, !done);
      setButtonStatus(btn, !done);
    });
  }

  function updateValue(settings, elId, done) {
    app.model.tiles[elId].done = done;
    if (done) {
      settings[elId] = true;
    } else {
      delete settings[elId];
    }
    updateScore(settings);
    persistSettings(settings);
  }

  function restartGame(settings) {
    settings = {};
    updateScore(settings);
    persistSettings(settings);
  }

  function objectSize(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }
    return size;
  }

  function updateScore(settings) {
    document.querySelector("#completed").innerHTML = objectSize(settings);
  }

  function setButtonStatus(btn, done) {
    if (done) {
      btn.innerHTML = "Someone said this, you got a bingo!";
    } else {
      btn.innerHTML = "Click if someone said this";
    }
  }


  function listenForGridPageClicks(page, btn, data) {
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

  function listenForRestartButtonClicks(settings) {
    document.querySelector("#restart").addEventListener('click', function (evt) {
      restartGame(settings);
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

  function persistSettings(settings) {
    localStorage[myNs + '.values'] = JSON.stringify(settings);
  }

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
