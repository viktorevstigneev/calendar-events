(() => {
  window.MIN_DELAY_MILLISECONDS = 0;
  const NUMBER_OF_MILLISECONDS_IN_SECOND = 1000;
  const NUMBER_OF_SECONDS_IN_MINUTE = 60;

  const WEEK_DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  window.eventList = [];

  /**
   * @param {string} eventName
   * @param {date} eventTime
   * @param {function} callback
   */
  const setNewEvent = (eventName, eventTime, callback) => {
    if (eventTime.getTime() - new Date().getTime() > window.MIN_DELAY_MILLISECONDS) {
      const eventObj = {
        id: window.utils.getUniqueId(),
        name: eventName,
        time: eventTime,
        function: callback,
      };
      window.utils.setLongTimeout(callback,
        eventTime.getTime() - new Date().getTime(), eventObj);
      window.eventList.push(eventObj);
    } else {
      console.log('can not to set event in past');
    }
  };

  /**
   * @param {string} eventName
   * @param {function} callback
   * @param {Array} days
   * @param {number} hours
   * @param {number} minutes
   */
  const setSelectedDaysRecurringEvent = (eventName, callback, days, hours, minutes) => {
    const eventObj = {
      id: window.utils.getUniqueId(),
      name: eventName,
      time: `selected ${days} ${hours} : ${minutes}`,
    };
    eventObj.action = setInterval(() => {
      const currentWeeksDay = WEEK_DAYS[new Date().getDay()];
      days.forEach((day) => {
        if (day === currentWeeksDay) {
          setTimeout(callback, window.utils.getMillisecondsToNextDay(hours, minutes));
        }
      });
    }, window.utils.getMillisecondsToNextDay());

    window.eventList.push(eventObj);
  };

  /**
   * @param {number} eventId
   * @param {string} eventName
   * @param {function} callback
   * @param {number} minutes
   * @param {number} hours
   */
  // add {  }
  const setBeforehandingsEvent = (eventId, eventName, callback, minutes = 1, hours = 1) => {
    const delay = hours * minutes * NUMBER_OF_SECONDS_IN_MINUTE * NUMBER_OF_MILLISECONDS_IN_SECOND;
    window.eventList.forEach((item) => {
      if (item.id === eventId && item.name === eventName) {
        item.beforehandingEvent = setTimeout(callback, item.time.getTime() - new Date().getTime() - delay);
      }
    });
  };

  /**
   * @param {function} callback
   * @param {number} minutes
   * @param {number} hours
   */
  const setBeforehandingsForAllEvents = (callback, minutes = 1, hours = 1) => {
    const delay = hours * minutes * 60 * 1000;
    window.eventList.forEach((item) => {
      item.beforehandingEvent = setTimeout(callback, item.time.getTime() - new Date().getTime() - delay);
    });
  };

  window.modules = {
    setNewEvent,
    setSelectedDaysRecurringEvent,
    setBeforehandingsEvent,
    setBeforehandingsForAllEvents,
  };
})();
