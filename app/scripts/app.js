(function (document) {
  'use strict';

  var myNs = 'org.camerongreen.veganbingo';

  var settings = localStorage[myNs + '.values'] ? JSON.parse(localStorage[myNs + '.values']) : {};

  function persistSettings() {
    localStorage[myNs + '.values'] = JSON.stringify(settings);
  }

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

    var page = document.querySelector('#bingo-page');
    var btn = page.querySelector('button');

    handleCompletionClick(btn);
    handleIndividualPage(page, btn);
  });

  function handleCompletionClick(btn) {
    btn.addEventListener('click', function (e) {
      if (e.target.id === "completionButton") {
        var elId = this.getAttribute("bingo-page");
        if (settings.hasOwnProperty(elId)) {
          this.classList.add('uncompleted');
          this.classList.remove('completed');
          delete settings[elId];
        } else {
          this.classList.add('completed');
          this.classList.remove('uncompleted');
          settings[elId] = true;
        }
        persistSettings();
      }
    });
  }

  function handleIndividualPage(page, btn) {
    document.addEventListener('grid-button-clicked', function (event) {
      // set menu to nothing
      changePage(-1, 4);

      var bId = event.detail.buttonId;
      var bDone = settings.hasOwnProperty(bId);
      var gridEl = this.querySelector('#' + bId);

      page.querySelector('#header-image').setAttribute('src', 'images/' + bId + '.png');
      page.querySelector('#description').innerHTML = gridEl.querySelector("div.description").innerHTML;
      page.querySelector('#rules p').innerHTML = gridEl.querySelector("div.rules").innerHTML;
      page.querySelector('#main').innerHTML = gridEl.querySelector("div.main").innerHTML;
      // populate page with appropriate stuff

      btn.setAttribute('bingo-page', bId);
      btn.classList.add(bDone ? 'completed' : 'uncompleted');
      btn.classList.remove(bDone ? 'uncompleted' : 'completed');
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
