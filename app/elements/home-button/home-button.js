(function () {
    'use strict';

    Polymer({
        is: 'home-button',
        properties: {
            text: String
        },
        doClick: function () {
            this.fire('home-button-clicked');
        }
    });
})();
