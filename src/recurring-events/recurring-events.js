(() => {
  window.MIN_DELAY_MILLISECONDS = 0;

  const WEEK_DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  /**
   * @param {string} eventName
   * @param {function} callback
   * @param {Array} days
   * @param {number} hours
   * @param {number} minutes
   */
  const setSelectedDaysRecurringEvent = ({
    eventName, callback, days, hours, minutes,
  }) => {
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

  window.modules = {
    ...window.modules,
    setSelectedDaysRecurringEvent,
  };
})();
