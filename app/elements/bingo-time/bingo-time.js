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
    created: function () {
      this.settings = {};
      this.startTime = false;
    },
    getStartTime: function () {
      var startTime;
      for (var setting in this.settings) {
        if (!startTime || (this.settings[setting] < startTime)) {
          startTime = this.settings[setting];
        }
      }
      return startTime;
    },
    getEndTime: function () {
      var endTime;
      for (var setting in this.settings) {
        if (!endTime || (this.settings[setting] > endTime)) {
          endTime = this.settings[setting];
        }
      }
      return endTime;
    },
    settingsChanged: function () {
      this.tick();
    },
    tick: function () {
      var startTime = this.getStartTime();
      if (startTime) {
        this.startTimeString = formatDate(new Date(startTime));

        this.async(function () {
          if (startTime) {
            var fromTime, completed = this.score === this.total;
            if (completed) {
              fromTime = this.getEndTime();
            } else {
              fromTime = Date.now();
            }
            var seconds = Math.round((fromTime - startTime) / 1000);
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
