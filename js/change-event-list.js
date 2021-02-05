(() => {
  const deleteEvent = (eventId, eventName) => {
    window.eventList.forEach((item) => {
      item.id === eventId && clearTimeout(item.action) || clearInterval(item.action);
    });
    window.eventList = window.eventList.filter((item) => (item.name !== eventName && item.id !== eventId));
  };

  const renameEvent = (id, eventName, newEventName) => {
    window.eventList.map((item) => {
      if (item.id === id && item.name === eventName) {
        return item.name = newEventName;
      }
    });
  };

  const changeEventDate = (eventId, eventName, newEventTime) => {
    let callback;
    window.eventList.forEach((item) => {
      item.id === eventId ? callback = item.function : 'there is no this event';
    });
    deleteEvent(eventId, eventName);
    setNewEvent(eventName, newEventTime, callback);
  };

  window.deleteEvent = deleteEvent;
  window.renameEvent = renameEvent;
  window.changeEventDate = changeEventDate;
})();
