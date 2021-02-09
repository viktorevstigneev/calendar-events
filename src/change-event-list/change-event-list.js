(() => {
  /**
   * @param {number} eventId
   * @param {string} eventName
   * @returns {Array}
   */
  const deleteEvent = (eventId, eventName) => {
    window.eventList.forEach((item) => {
      item.id === eventId && clearTimeout(item.action) || clearTimeout(item.beforehandingEvent) || clearInterval(item.action);
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
    window.modules.setNewEvent(eventName, newEventTime, callback);
  };

  window.deleteEvent = deleteEvent;
  window.renameEvent = renameEvent;
  window.changeEventDate = changeEventDate;
})();
