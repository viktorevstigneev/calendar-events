(() => {
  window.MIN_DELAY_MILLISECONDS = 0;

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
   * @param {number} eventId
   * @param {string} eventName
   * @param {boolean} isBeforehanding
   * @returns {Array}
   */
  const deleteEvent = (eventId, eventName, isBeforehandingsEvent) => {
    window.eventList.forEach((item) => {
      if (isBeforehandingsEvent) {
        item.id === eventId && clearTimeout(item.beforehandingEvent);
      } else {
        item.id === eventId && clearTimeout(item.action) || clearTimeout(item.beforehandingEvent) || clearInterval(item.action);
      }
    });
    window.eventList = window.eventList.filter((item) => (item.name !== eventName && item.id !== eventId));
  };

  /**
   * @param {number} id
   * @param {string} eventName
   * @param {string} newEventName
   * @returns {Array}
   */
  const renameEvent = (id, eventName, newEventName) => {
    window.eventList.forEach((item) => {
      if (item.id === id && item.name === eventName) {
        item.name = newEventName;
      }
    });
  };

  /**
   * @param {number} eventId
   * @param {string} eventName
   * @param {Date} newEventTime
   */
  const changeEventDate = (eventId, eventName, newEventTime) => {
    let callback;
    window.eventList.forEach((item) => {
      if (item.id === eventId) {
        callback = item.function;
      }
    });
    deleteEvent(eventId, eventName);
    setNewEvent(eventName, newEventTime, callback);
  };

  const Period = {
    DAY: 'Day',
    WEEK: 'Week',
    MONTH: 'Month',
    INTERVAL: 'Interval',
  };

  /**
   * @param {Array} rangeList
   * @returns {Array}
   */
  const getEventFromRange = (rangeList) => {
    const result = window.eventList.filter((eventItem) => rangeList.some((date) => window.utils.isTwoDatesTheSame(eventItem.time, date)));
    console.log(result);
    return result;
  };

  // const intersectionBetweenEventsLists = (rangeList) => window.eventList.filter((eventItem) => rangeList.includes(eventItem));

  /**
   * @param {string} period
   * @param {date} startDate
   * @param {date} finalDate
   * @returns {Array}
   */
  const showEventslist = (period, startDate, finalDate) => {
    switch (period) {
      case Period.DAY:
        getEventFromRange([startDate]);
        break;

      case Period.WEEK:
        getEventFromRange(window.utils.getCurrentWeekOfChoosingDay(startDate));
        break;

      case Period.MONTH:
        getEventFromRange(window.utils.getCurrentMonthOfChoosingDay(startDate.getFullYear(), startDate.getMonth()));
        break;

      case Period.INTERVAL:
        getEventFromRange(window.utils.getDifferenceBetweenDates(startDate, finalDate));
        break;

      default:
        console.log('nothing to search');
        break;
    }
  };

  window.modules = {
    setNewEvent,
    deleteEvent,
    renameEvent,
    changeEventDate,
    showEventslist,
  };
})();
