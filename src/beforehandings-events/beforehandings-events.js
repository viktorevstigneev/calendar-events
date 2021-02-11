(() => {
  window.MIN_DELAY_MILLISECONDS = 0;
  const NUMBER_OF_MILLISECONDS_IN_SECOND = 1000;
  const NUMBER_OF_SECONDS_IN_MINUTE = 60;

  /**
   * @param {number} eventId
   * @param {string} eventName
   * @param {function} callback
   * @param {number} minutes
   * @param {number} hours
   */
  const setBeforehandingsEvent = ({
    eventId, eventName, callback, minutes = 1, hours = 1,
  }) => {
    const delay = hours * minutes * NUMBER_OF_SECONDS_IN_MINUTE * NUMBER_OF_MILLISECONDS_IN_SECOND;
    const findedEvent = window.eventList.find((item) => (item.id === eventId && item.name === eventName));

    findedEvent.beforehandingEvent = setTimeout(callback, findedEvent.time.getTime() - new Date().getTime() - delay);
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
    ...window.modules,
    setBeforehandingsEvent,
    setBeforehandingsForAllEvents,
  };
})();
