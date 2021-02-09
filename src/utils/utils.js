(() => {
  const NUMBER_OF_MILLISECONDS_DAY = 86400000;
  const MAX_DELAY_MILLISECONDS = 2147483647;

  let currentDate = new Date();

  const setId = () => {
    let id = 0;

    return () => {
      id += 1;
      return id;
    };
  };

  const getUniqueId = setId();

  /**
   * @param {date} date
   * @returns {Array}
   */
  const getCurrentWeekOfChoosingDay = (date) => {
    const weekList = [];
    const first = date.getDate() - date.getDay() + 1;
    date.setDate(first);

    for (let i = 0; i < 7; i += 1) {
      weekList.push(new Date(+date));
      date.setDate(date.getDate() + 1);
    }
    return weekList;
  };

  /**
   * @param {date} date
   * @returns {array}
   */
  const getCurrentMonthOfChoosingDay = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  /**
   * @param {date} strartDate
   * @param {date} finalDate
   * @returns {Array}
   */
  const getDifferenceBetweenDates = (strartDate, finalDate) => {
    const datesIntervalList = [];
    let numberMillisecondOfFinalDate = finalDate.getTime();

    while (numberMillisecondOfFinalDate > strartDate.getTime()) {
      datesIntervalList.push(new Date(numberMillisecondOfFinalDate - NUMBER_OF_MILLISECONDS_DAY));
      numberMillisecondOfFinalDate -= NUMBER_OF_MILLISECONDS_DAY;
    }
    return datesIntervalList;
  };

  /**
   * @param {number} hours
   * @param {number} minutes
   * @returns {number}
   */
  const getMillisecondsToNextDay = (hours = 0, minutes = 0) => {
    currentDate = new Date();
    const nextDate = new Date(currentDate.getFullYear(),
      currentDate.getMonth(), currentDate.getDate() + 1);
    nextDate.setHours(hours, minutes);
    const difference = nextDate - currentDate;

    return difference;
  };

  /**
   * @param {number} hours
   * @param {number} minutes
   * @returns {number}
   */
  const getMillisecondsToSelectedTodayTime = (hours = 0, minutes = 0) => {
    currentDate = new Date();
    const selectedTime = new Date(currentDate.getFullYear(),
      currentDate.getMonth(), currentDate.getDate());
    selectedTime.setHours(hours, minutes);
    const difference = selectedTime - currentDate;

    return difference;
  };

  /**
   * @param {Function} callback
   * @param {number} delay
   * @param {object} eventObj
   */
  const setLongTimeout = (callback, delay, eventObj) => {
    if (delay > MAX_DELAY_MILLISECONDS) {
      eventObj.action = setTimeout(() => {
        setLongTimeout(callback, (delay - MAX_DELAY_MILLISECONDS), eventObj);
      },
      MAX_DELAY_MILLISECONDS);
    } else if (delay > window.MIN_DELAY_MILLISECONDS && delay <= MAX_DELAY_MILLISECONDS) {
      eventObj.action = setTimeout(callback, delay);
    }
  };

  window.utils = {
    getUniqueId,
    getCurrentWeekOfChoosingDay,
    getDifferenceBetweenDates,
    getMillisecondsToNextDay,
    getMillisecondsToSelectedTodayTime,
    setLongTimeout,
    getCurrentMonthOfChoosingDay,
  };
})();
