"use strict";

(()=>{

   window.MIN_DELAY_MILLISECONDS = 0;

  const WEEK_DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  window.eventList = [];
  
  const setNewEvent = (eventName, eventTime, callback) => {
    if (eventTime.getTime() - new Date().getTime() > window.MIN_DELAY_MILLISECONDS){
      const eventObj = {
        id: window.utils.getUniqueId(),
        name: eventName,
        time: eventTime,
        function: callback
      } 
      window.utils.setLongTimeout(callback, eventTime.getTime() - new Date().getTime(), eventObj);
      window.eventList.push(eventObj);
    } else{
      console.log("can not to set event in past");
    }
  }

  const setEveryDayRecurringEvent = (eventName, callback, hours, minutes) => {
    const eventObj = {
      id: window.utils.getUniqueId(),
      name: eventName,
      time: `${hours} : ${minutes} every day `,
      function: callback
    } 
    if(window.utils.getMillisecondsToSelectedTodayTime(hours, minutes) > 0){
      eventObj.action = setInterval(callback, window.utils.getMillisecondsToSelectedTodayTime(hours, minutes));
      window.eventList.push(eventObj);
    } 
    else {
      eventObj.action = setInterval(callback, window.utils.getMillisecondsToNextDay(hours, minutes));
      window.eventList.push(eventObj);
    }
  }

  const setSelectedDayRecurringEvent = (eventName, callback, days, hours, minutes) => {
    const eventObj = {
      id: window.utils.getUniqueId(),
      name: eventName,
      time: `selected ${days} ${hours} : ${minutes}`,
    } 
    eventObj.action = setInterval(() => {
      const currentWeeksDay = WEEK_DAYS[new Date().getDay()];
      days.forEach((day) => {
        if (day === currentWeeksDay) {
          setTimeout(callback, window.utils.getMillisecondsToNextDay(hours, minutes) );
        }
      });
    }, window.utils.getMillisecondsToNextDay());

    window.eventList.push(eventObj);
  }

  const setBeforehandingsEvent = (eventId, eventName, callback, minutes = 1, hours = 1) => {
    const delay = hours * minutes * 60 * 1000;
    window.eventList.forEach((item) => {
      if (item.id === eventId && item.name === eventName) {
        setTimeout(callback, delay);
      }
    });
  }

  window.modules = {
    setNewEvent,
    setEveryDayRecurringEvent,
    setSelectedDayRecurringEvent,
    setBeforehandingsEvent
  }

})()