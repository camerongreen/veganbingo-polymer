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
        var p = document.querySelector('core-animated-pages');
        document.querySelector('core-menu').setAttribute('selected', index);
        p.selected = index;
      });
    })(i);
  }

  document.addEventListener('grid-button-clicked', function (event) {
    document.querySelector('core-menu').setAttribute('selected', -1);
    var p = document.querySelector('core-animated-pages');
    p.selected = 4;
  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
