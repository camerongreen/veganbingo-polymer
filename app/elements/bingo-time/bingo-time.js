(function () {
  /**
   * End result should be
   * 13 Apr 2015 23:44:14
   */
  function formatDate(date) {
    var shortMonthNames = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'June', 'Jul',
      'Aug', 'Sep', 'Oct',
      'Nov', 'Dec'
    ];

    return [date.getDate(), shortMonthNames[date.getMonth()], date.getFullYear(), date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()].join(' ');
  }

  /**
   * Take a number of seconds and divide it by weeks, days etc
   * and return string of the results
   *
   * 1 week, 2 days, 12 hours, 10 minutes, 5 hours, 2 minute, 10 seconds
   * In the life of Arrested Development
   *
   * @param totalSeconds
   * @returns {string}
   */
  function formatElapsedTime(totalSeconds) {
    var minute = 60;
    var hour = 60 * minute;
    var day = 24 * hour;
    var week = 7 * day;

    var times = [
      {
        name: 'week',
        seconds: week
      },
      {
        name: 'day',
        seconds: day
      },
      {
        name: 'hour',
        seconds: hour
      },
      {
        name: 'minute',
        seconds: minute
      }
    ];

    var returnVal = [];
    var last = false;

    for (var i = 0, l = times.length; i < l; i++) {
      var name = times[i].name;
      var seconds = times[i].seconds;
      var units = Math.floor(totalSeconds / seconds);

      if (units) {
        returnVal.push(units + ' ' + name + (units === 1 ? '' : 's'));
        totalSeconds %= seconds;
      } else if (last) {
        returnVal.push('0 ' + name);
      }

      last = last || units !== 0;
    }

    returnVal.push(totalSeconds + ' second' + (totalSeconds === 1 ? '' : 's'));

    return returnVal.join(', ');

  }

  Polymer({
    is: 'bingo-time',
    startTime: false,
    properties: {
      settings: Object,
      score: Number,
      total: Number
    },
    /**
     * Go through the timestamps on settings and
     * returns the earliest one or undefined
     *
     * @returns {Number|boolean}
     */
    getStartTime: function () {
      var startTime;
      for (var setting in this.settings) {
        if (this.settings.hasOwnProperty(setting)) {
          if (!startTime || (this.settings[setting] < startTime)) {
            startTime = this.settings[setting];
          }
        }
      }
      return startTime;
    },
    /**
     * Go through the timestamps on settings and
     * returns the latest one or undefined
     *
     * @returns {Number|boolean}
     */
    getEndTime: function () {
      var endTime;
      for (var setting in this.settings) {
        if (!endTime || (this.settings[setting] > endTime)) {
          endTime = this.settings[setting];
        }
      }
      return endTime;
    },
    /**
     * If the settings have changed, we need to check if there
     * has been a restart or if they have completed the challenge
     * so we send the user off to the tick function
     */
    settingsChanged: function () {
      this.tick();
    },
    /**
     * Update the time displayed to the users but also
     * check if been a restart or if they have completed the challenge
     * in which case we do things differently
     */
    tick: function () {
      this.startTime = this.getStartTime();
      if (this.startTime) {
        this.startTimeString = formatDate(new Date(this.startTime));

        this.async(function () {
          if (this.startTime) {
            var fromTime, completed = this.score === this.total;
            if (completed) {
              fromTime = this.getEndTime();
            } else {
              fromTime = Date.now();
            }
            var seconds = Math.round((fromTime - this.startTime) / 1000);
            this.timer = formatElapsedTime(seconds);
          }
          this.tick();
        }, null, 1000);
      } else {
        this.startTimeString = 'Not started';
      }
    }
  });
})();
