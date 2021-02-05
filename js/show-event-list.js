"use strict";

(()=>{

  const Period = {
    DAY: "Day",
    WEEK: "Week",
    MONTH: "Month",
    INTERVAL: "Interval"
  }

  const showEventslist = (period, startDate, finalDate) => {
    let result = [];

    switch (period) {
      case Period.DAY:
        window.eventList.forEach((item) => {
          if(startDate.getDay() === item.time.getDay()
            && startDate.getMonth() === item.time.getMonth()
            && startDate.getFullYear() === item.time.getFullYear()
          ){
            result.push(item);
          }
        });
        console.log("result: ", result);
        break;

      case Period.WEEK:
        const currentWeek = window.utils.getCurrentWeekOfChoosingDay(startDate);
        result = window.eventList.filter((eventItem) => {
          return currentWeek.some((date) => {
            return (eventItem.time.getDate() === date.getDate()
                    && eventItem.time.getMonth() === date.getMonth()
                    && eventItem.time.getFullYear() === date.getFullYear()
            );
          })
        });
        console.log(result);
        break;

      case Period.MONTH:
        window.eventList.forEach((item) => {
          if(startDate.getMonth() === item.time.getMonth()
            && startDate.getFullYear() === item.time.getFullYear()
          ){
            result.push(item);
          }
        });
        console.log(result);
        break;

      case Period.INTERVAL:
        const intervalDays = window.utils.getDifferenceBetweenDates(startDate, finalDate);
        result = window.eventList.filter((eventItem) => {
          return intervalDays.some((date) => {
            return (eventItem.time.getDate() === date.getDate()
                    && eventItem.time.getMonth() === date.getMonth()
                    && eventItem.time.getFullYear() === date.getFullYear()
            );
          })
        });
        console.log(result);
        break;
    }
  }

  window.showEventslist = showEventslist;

})()