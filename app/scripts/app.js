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
    listenForMenuClicks(this);
    listenForHomeButtonClicks(this);

    var page = document.querySelector('#bingo-page');
    // this button used quote a log
    var btn = page.querySelector('button');

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

    document.addEventListener('grid-button-clicked', function (event) {
      // set menu to nothing
      document.querySelector('core-menu').setAttribute('selected', -1);
      // set page to the one we'll use to put details in
      document.querySelector('core-animated-pages').setAttribute("selected", 4);

      var bId = event.detail.buttonId;
      var bDone = settings.hasOwnProperty(bId);
      var gridEl = document.querySelector('#' + bId);

      page.querySelector('#header-image').setAttribute('src', 'images/' + bId + '.png');
      page.querySelector('#description').innerHTML = gridEl.querySelector("div.description").innerHTML;
      page.querySelector('#rules p').innerHTML = gridEl.querySelector("div.rules").innerHTML;
      page.querySelector('#main').innerHTML = gridEl.querySelector("div.main").innerHTML;
      // populate page with appropriate stuff

      btn.setAttribute('bingo-page', bId);
      btn.classList.add(bDone ? 'completed' : 'uncompleted');
      btn.classList.remove(bDone ? 'uncompleted' : 'completed');
    });
  });

  function listenForMenuClicks(app) {
    var els = app.querySelectorAll('core-item');

    for (var i = 0, l = els.length; i < l; i++) {
      (function (index) {
        els[i].addEventListener('click', function () {
          app.querySelector('core-animated-pages').setAttribute("selected", index);
          app.querySelector('core-menu').setAttribute('selected', index);
        });
      })(i);
    }
  }

  function listenForHomeButtonClicks(app) {
    app.addEventListener('home-button-clicked', function (evt) {
      app.querySelector('core-animated-pages').setAttribute("selected", 0);
      app.querySelector('core-menu').setAttribute('selected', 0);
      evt.preventDefault();
    });
  }
// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
