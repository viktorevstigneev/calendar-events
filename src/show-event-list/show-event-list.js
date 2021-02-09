(() => {
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
    const result = window.eventList.filter((eventItem) => rangeList.some((date) => (eventItem.time.getDate() === date.getDate()
                && eventItem.time.getMonth() === date.getMonth()
                && eventItem.time.getFullYear() === date.getFullYear()
    )));
    console.log(result);
  };

  /**
   * @param {Date} date
   * @returns {Array}
   */
  const getEvent = (date) => {
    const result = [];
    window.eventList.forEach((item) => {
      if (date.getDay() === item.time.getDay()
        && date.getMonth() === item.time.getMonth()
        && date.getFullYear() === item.time.getFullYear()
      ) {
        result.push(item);
      }
    });
    console.log(result);
  };

  /**
   * @param {string} period
   * @param {date} startDate
   * @param {date} finalDate
   * @returns {Array}
   */
  const showEventslist = (period, startDate, finalDate) => {
    switch (period) {
      case Period.DAY:
        getEvent(startDate);
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

  window.showEventslist = showEventslist;
})();
