"use strict";

(()=>{

  const deleteEvent = (eventId, eventName) => { 
    eventList.forEach((item) => {
      item.id === eventId && clearTimeout(item.action) || clearInterval(item.action); 
    });
    eventList = eventList.filter((item) => {
      return (item.name !== eventName && item.id !== eventId)
    }); 
  }

  const renameEvent = (id, eventName, newEventName) => {
    eventList.map((item) => { 
      if(item.id === id && item.name === eventName){
        return item.name = newEventName
      }
    });
  }

  const changeEventDate = (eventId, eventName, newEventTime) => {
    let callback;
    eventList.forEach((item) => {
      item.id === eventId ? callback = item.function : "there is no this event"; 
    });
    deleteEvent(eventId, eventName);
    setNewEvent(eventName, newEventTime, callback);
  }

  window.deleteEvent = deleteEvent;
  window.renameEvent = renameEvent;
  window.changeEventDate = changeEventDate;

})()