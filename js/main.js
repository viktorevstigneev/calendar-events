"use strict";

const NUMBER_OF_MILLISECONDS_DAY = 86400000;
const MAX_TIMEOUT_MILLISECONDS = 2147483647;

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

const setLongTimeout = (callback, delay) => {
	if (delay > MAX_TIMEOUT_MILLISECONDS) {
			setTimeout(() => {
				setLongTimeout(callback, (delay - MAX_TIMEOUT_MILLISECONDS)); 
			}, MAX_TIMEOUT_MILLISECONDS);
	}
	else{ 
		setTimeout(callback, delay);
	}
}

const createNewEvent = (eventName, eventTime, callback) =>{
	const eventObj = {
		id: getUniqueId(),
		name: eventName,
		time: eventTime,
		action: callback
	}
	setLongTimeout(callback, eventTime.getTime() - new Date().getTime());
	eventList.push(eventObj);
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

const changeEventDate = (id, eventTime, newEventTime) => {
	eventList.map((item) => { 
		if(item.id === id && item.time === eventTime){
			return item.time = newEventTime
		}
	});
}

const showEventslist = (period, startDate, finalDate) => {
	switch (period) {
		case Period.DAY:
			eventList.forEach((item) => {
			  if(startDate.getDay() === item.time.getDay()){
					console.log(`id: ${item.id}, name: ${item.name}`);
				}
			});
			break;

		case Period.WEEK:
			const currentWeek = getCurrentWeekOfChoosingDay(startDate);
			const result = eventList.filter((eventItem) => {
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
				if(startDate.getMonth() === item.time.getMonth()){
					console.log(`id: ${item.id}, name: ${item.name}`);
				}
			 });
			break;

		case Period.INTERVAL:
			 const intervalDays = getDifferenceBetweenDates(startDate, finalDate);
			 const events = eventList.filter((eventItem) => {
				return intervalDays.some((date) => {
					return (eventItem.time.getDate() === date.getDate()
									&& eventItem.time.getMonth() === date.getMonth()
									&& eventItem.time.getFullYear() === date.getFullYear()
					);
				})
			});
			console.log(events);
			break;
	}
}

const setCyclicEvent = (eventName, eventTime, callback) =>{
	const eventObj = {
		id: getUniqueId(),
		name: eventName,
		time: eventTime,
		action: callback
	}
	setLongTimeout(callback, eventTime.getTime() - new Date().getTime());
	eventList.push(eventObj);
}

// createNewEvent("buying", new Date(2021, 1, 3, 14, 50), () => {console.log("buy a bread")});
// createNewEvent("test", new Date(2021, 1, 3, 14, 21), () => {console.log("test")});

// showEventslist("day",new Date(2021, 1, 1));
// showEventslist("month",new Date(2021, 1, 1));
// showEventslist("Week",new Date(2021, 1, 1));
// setInterval(updateСurrentDate, 10);
// setInterval(checkingDateEvents, 10);
// console.log('eventList: ', eventList);
// deleteEvent(1,"buying");
// console.log('eventList: ', eventList);
// renameEvent(2,"test","bread");
// console.log('eventList: ', eventList);
// console.log("today", new Date().getTime());
// console.log("tomorrow",new Date(2021, 1, 4).getTime());
// console.log("difference",new Date(2021, 1, 3, 14, 48).getTime() - new Date().getTime());
// createNewEvent("test", new Date(2021, 1, 3, 15, 35), () => {console.log("test")});
