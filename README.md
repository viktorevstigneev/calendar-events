# event-calendar

This app give an oportunity to set reminding for some date,
to set reminding to set cyclic reminder for some event
also you have possibilities to edit event.

firstly, you need to clone a project on your machine
Use it https://github.com/viktorevstigneev/calendar-events/archive/task1.zip for download application
or you can use this <code> git clone https://github.com/viktorevstigneev/calendar-events.git </code>

after it unpack this archive and open <file> index.html </file> in your browser
finaly, show a browser console and you can to try  :

.
1. create-event
2. change-event-list
3. show-event-list
4. utils

1) The create-event module is needed so that the user can create events for specific dates and times:

  -for creating event : window.modules.setNewEvent (eventName, eventTime, callback)
  example : window.modules.setNewEvent("shop",new Date(2021,1,7),()=>{console.log("shop event")});

  -for creating every day recurring event : window.modules.setEveryDayRecurringEvent(eventName, callback, hours, minutes);
  example : window.modules.setEveryDayRecurringEvent("shop",()=>{console.log("shop event")});

  -for creating selected days recurring event : window.modules.setSelectedDayRecurringEvent(eventName, callback, days, hours, minutes);
  example : window.modules.setSelectedDayRecurringEvent("shop",()=>{console.log("shop event")},["Monday","Friday"]);

  -for creating beforehanding event : window.modules.setBeforehandingsEvent(eventId, eventName, callback, minutes, hours);
  example : window.modules.setBeforehandingsEvent(1, "some name", ()=>{console.log("remind shop event")}, 42, 17);

2) The change-event-list module is needed so that the user can edit events: rename, change the date and time of an event, delete events:

  -for deleting event : window.deleteEvent(eventId, eventName);
  example : window.deleteEvent(3, "newing bread");

  -for renaming event: window.renameEvent(id, eventName, newEventName);
  example: window.renameEvent(1, "bread", "new bread");

  -for changing event date: window.changeEventDate(eventId, eventName, newEventTime);
  example: window.changeEventDate(2, "btghfgrgrg", new Date(2021,1,7,23,28));

3)  The show-event-list module is needed so that the user can wathcing existing events:

  -for showing event list: window.showEventslist(period, startDate, finalDate);

  this functing consist from 4 cases:
    - Day : this case show event for chosing day;
    - Week: this case show event for chosing week;
    - Month: this case show event for chosing month;
    - Interval: this case show event for chosing interval;

  example : window.showEventslist("Day",new Date(2021,1,7));

    
  