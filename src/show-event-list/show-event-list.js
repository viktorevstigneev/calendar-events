(() => {
  const Period = {
    DAY: 'Day',
    WEEK: 'Week',
    MONTH: 'Month',
    INTERVAL: 'Interval',
  };

  /**
   * @param {Date} firstDate
   * @param {Date} secondDate
   * @returns {boolean}
   */
  const isTwoDatesTheSame = (firstDate, secondDate) => firstDate.getDate() === secondDate.getDate()
    && firstDate.getMonth() === secondDate.getMonth()
    && firstDate.getFullYear() === secondDate.getFullYear();

  /**
   * @param {Array} rangeList
   * @returns {Array}
   */
  const getEventFromRange = (rangeList) => {
    const result = window.eventList.filter((eventItem) => rangeList.some((date) => isTwoDatesTheSame(eventItem.time, date)));
    console.log(result);
    return result;
  };

  // const intersectionBetweenEventsList = (rangeList) => window.eventList.filter((eventItem) => rangeList.includes(eventItem));

  /**
   * @param {string} period
   * @param {date} startDate
   * @param {date} finalDate
   * @returns {Array}
   */
  const showEventslist = (period, startDate, finalDate) => {
    switch (period) {
      case Period.DAY:

        break;

      case Period.WEEK:
        getEventFromRange(window.utils.getCurrentWeekOfChoosingDay(startDate));
        // intersectionBetweenEventsList(window.utils.getCurrentWeekOfChoosingDay(startDate));
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
