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
    console.log('Vegans go!');
  });

  var els = document.querySelectorAll('core-item');

  for (var i = 0, l = els.length; i < l; i++) {
    (function (index) {
      els[i].addEventListener('click', function () {
        document.querySelector('core-animated-pages').setAttribute("selected", index);
        document.querySelector('core-menu').setAttribute('selected', index);
      });
    })(i);
  }

  document.addEventListener('home-button-clicked', function (evt) {
    document.querySelector('core-animated-pages').setAttribute("selected", 0);
    document.querySelector('core-menu').setAttribute('selected', 0);
    evt.preventDefault();
  });

  document.addEventListener('grid-button-clicked', function (event) {
    // set menu to nothing
    document.querySelector('core-menu').setAttribute('selected', -1);
    // set page to the one we'll use to put details in
    document.querySelector('core-animated-pages').setAttribute("selected", 4);
    var bId = event.detail.buttonId;
    var page = document.querySelector('#info');
    var gridEl = document.querySelector('#' + bId);

    // populate page with appropriate stuff
    page.querySelector('#header-image').setAttribute('src', 'images/' + bId + '.png');
    page.querySelector('#description').innerHTML = gridEl.querySelector("div.description").innerHTML;
    page.querySelector('#rules p').innerHTML = gridEl.querySelector("div.rules").innerHTML;
    page.querySelector('#main').innerHTML = gridEl.querySelector("div.main").innerHTML;
  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
