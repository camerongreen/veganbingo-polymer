(function (document) {
  'use strict';

  var myNs = 'org.camerongreen.veganbingo';

  var settings = localStorage[myNs + '.values'] ? JSON.parse(localStorage[myNs + '.values']) : {};
  var data;

  function persistSettings(settings) {
    localStorage[myNs + '.values'] = JSON.stringify(settings);
  }

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.appName = 'Vegan Bingo!';

  document.addEventListener('polymer-ready', function () {
    var ajax = document.querySelector("core-ajax");
    ajax.addEventListener("core-response", function (e) {
      data = e.detail.response
    });
  });

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function () {
    listenForMenuClicks();
    listenForHomeButtonClicks();
    listenForRestartButtonClicks();

    var page = document.querySelector('#bingo-page');
    var btn = page.querySelector('button');

    handleCompletionClick(btn);
    handleIndividualPage(page, btn);
    updateScore(settings);
  });

  function handleCompletionClick(btn) {
    btn.addEventListener('click', function () {
      updateValue(btn);
      setButtonStatus(btn);
    });
  }

  function updateValue(btn) {
    var elId = btn.getAttribute("bingo-page");
    if (settings.hasOwnProperty(elId)) {
      delete settings[elId];
    } else {
      settings[elId] = true;
    }
    updateScore(settings);
    persistSettings(settings);
  }

  function restartGame() {
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

  function setButtonStatus(btn) {
    var elId = btn.getAttribute("bingo-page");
    if (settings.hasOwnProperty(elId)) {
      btn.innerHTML = "Someone said this, you got a bingo!";
    } else {
      btn.innerHTML = "Click if someone said this";
    }
  }


  function handleIndividualPage(page, btn) {
    document.addEventListener('grid-button-clicked', function (event) {
      // set menu to nothing
      changePage(-1, 4);

      var bId = event.detail.buttonId;
      var gridEl = data[bId];

      page.querySelector('#header-image').setAttribute('src', 'images/' + bId + '.png');
      page.querySelector('#description').innerHTML = gridEl.description;
      page.querySelector('#rules p').innerHTML = gridEl.rules;
      page.querySelector('#main').innerHTML = "<p>" + gridEl.main.join("</p>\n<p>") + "</p>";
      // populate page with appropriate stuff

      btn.setAttribute('bingo-page', bId);
      setButtonStatus(btn);
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
      restartGame();
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
