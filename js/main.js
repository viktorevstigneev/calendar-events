"use strict";

const NUMBER_OF_MILLISECONDS_DAY = 86400000;
const MAX_DELAY_MILLISECONDS = 2147483647;
const MIN_DELAY_MILLISECONDS = 0;
const NUMBER_OF_DAYS_WEEK = 7;

const Period = {
	DAY: "Day",
	WEEK: "Week",
	MONTH: "Month",
	INTERVAL: "Interval"
}

let eventList = [];
let currentDate = new Date();

const setId = () => {
	let id = 0;

	return () => {
		id += 1;
		return  id;
	}
}

const getUniqueId = setId();

const updateСurrentDate = () => {
	currentDate = new Date();
}

const getCurrentWeekOfChoosingDay = (date) => {
	const weekList = [];
	let first = date.getDate() - date.getDay() + 1;
	date.setDate(first);
	
  for (let i = 0; i < 7; i++) {
    weekList.push(new Date(+date));
    date.setDate(date.getDate()+1);
  }
  return weekList;
}

const getDifferenceBetweenDates = (strartDate, finalDate) => {
	const datesIntervalList = [];
	let numberMillisecondOfFinalDate = finalDate.getTime()

	while(numberMillisecondOfFinalDate > strartDate.getTime()) {
		dateIntervalList.push(new Date(numberMillisecondOfFinalDate - NUMBER_OF_MILLISECONDS_DAY));
		numberMillisecondOfFinalDate -= NUMBER_OF_MILLISECONDS_DAY;
	}
	return datesIntervalList;
}

const getMillisecondsToNextDay = (hours, minutes) => {
	currentDate = new Date(); 
	const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1);
	nextDate.setHours(hours, minutes);
	const difference = nextDate - currentDate; 

  return difference; 
}

const setDaysTimeout = (callback) => {
	let dayCount = 0;
	let timer = setInterval(() => {
			dayCount++;  
			if(dayCount === NUMBER_OF_DAYS_WEEK) {
				 clearInterval(timer);
				 callback.apply(this,[]);
			}
	},NUMBER_OF_MILLISECONDS_DAY);
}

const setLongTimeout = (callback, delay, eventObj) => {
	if(delay > MAX_DELAY_MILLISECONDS) {   
  	eventObj.action = setTimeout(() => { 
				setLongTimeout(callback, (delay - MAX_DELAY_MILLISECONDS), eventObj); 
			}
		, MAX_DELAY_MILLISECONDS);
	}
 	else if(delay > MIN_DELAY_MILLISECONDS && delay <= MAX_DELAY_MILLISECONDS) {    
		eventObj.action = setTimeout(callback, delay);   
	} 
}

const setNewEvent = (eventName, eventTime, callback) => {
	if (eventTime.getTime() - new Date().getTime() > MIN_DELAY_MILLISECONDS){
		const eventObj = {
			id: getUniqueId(),
			name: eventName,
			time: eventTime,
			function: callback
		} 
		setLongTimeout(callback, eventTime.getTime() - new Date().getTime(), eventObj);
		eventList.push(eventObj);
	} else{
		console.log("can not to set event in past");
	}
}

const deleteEvent = (eventId, eventName) => { 
	eventList.forEach((item) => {
		item.id === eventId && clearTimeout(item.action); 
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

const showEventslist = (period, startDate, finalDate) => {
	let result = [];

	switch (period) {
		case Period.DAY:
			eventList.forEach((item) => {
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
			const currentWeek = getCurrentWeekOfChoosingDay(startDate);
			result = eventList.filter((eventItem) => {
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
			eventList.forEach((item) => {
				if(startDate.getMonth() === item.time.getMonth()
					&& startDate.getFullYear() === item.time.getFullYear()
				){
					result.push(item);
				}
			 });
			 console.log(result);
			break;

		case Period.INTERVAL:
			 const intervalDays = getDifferenceBetweenDates(startDate, finalDate);
			 result = eventList.filter((eventItem) => {
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

const setEveryDayEvents = (eventName, callback, hours = 0, minutes  = 0) => {
	const eventObj = {
		id: getUniqueId(),
		name: eventName,
		time: "every day",
	} 
	eventObj.action = setInterval(callback, getMillisecondsToNextDay(hours, minutes));
	eventList.push(eventObj);
}

const setSelectedDaysEvent = (eventName, days, callback, hours = 0, minutes  = 0) => {

}  
// setNewEvent("buying", new Date(2021, 1, 4, 21, 45), () => {console.log("buy a bread")});
// setNewEvent("test", new Date(2021, 2, 4, 19, 52), () => {console.log("test")});
// console.log('eventList: ', eventList);
// showEventslist("Day",new Date(2021, 1, 4));
// showEventslist("Month",new Date(2021, 1, 1));
// showEventslist("Week",new Date(2021, 1, 1));
// setInterval(updateСurrentDate, 10);
// changeEventDate(1,"buying", new Date(2021, 1, 4, 21, 50))

// console.log('eventList: ', eventList);
// deleteEvent(1,"buying");
// console.log('eventList: ', eventList);
// renameEvent(2,"test","bread");
// console.log('eventList: ', eventList);
// setNewEvent("test", new Date(2021, 1, 3, 15, 35), () => {console.log("test")});