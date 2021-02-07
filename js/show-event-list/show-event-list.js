(() => {
  const Period = {
    DAY: 'Day',
    WEEK: 'Week',
    MONTH: 'Month',
    INTERVAL: 'Interval',
  };

  /**
   * @param {string} period
   * @param {date} startDate
   * @param {date} finalDate
   * @returns {Array}
   */
  const showEventslist = (period, startDate, finalDate) => {
    let result = [];

    switch (period) {
      case Period.DAY:
        window.eventList.forEach((item) => {
          if (startDate.getDay() === item.time.getDay()
            && startDate.getMonth() === item.time.getMonth()
            && startDate.getFullYear() === item.time.getFullYear()
          ) {
            result.push(item);
          }
        });
        console.log('result: ', result);
        break;

      case Period.WEEK:
        const currentWeek = window.utils.getCurrentWeekOfChoosingDay(startDate);
        result = window.eventList.filter((eventItem) => currentWeek.some((date) => (eventItem.time.getDate() === date.getDate()
                    && eventItem.time.getMonth() === date.getMonth()
                    && eventItem.time.getFullYear() === date.getFullYear()
        )));
        console.log(result);
        break;

      case Period.MONTH:
        window.eventList.forEach((item) => {
          if (startDate.getMonth() === item.time.getMonth()
            && startDate.getFullYear() === item.time.getFullYear()
          ) {
            result.push(item);
          }
        });
        console.log(result);
        break;

      case Period.INTERVAL:
        const intervalDays = window.utils.getDifferenceBetweenDates(startDate, finalDate);
        result = window.eventList.filter((eventItem) => intervalDays.some((date) => (eventItem.time.getDate() === date.getDate()
                    && eventItem.time.getMonth() === date.getMonth()
                    && eventItem.time.getFullYear() === date.getFullYear()
        )));
        console.log(result);
        break;

      default:
        console.log('nothing to search');
        break;
    }
  };

  window.showEventslist = showEventslist;
})();
