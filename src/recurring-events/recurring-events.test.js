require('../utils/utils');
require('../events-calendar/events-calendar');
require('./recurring-events');

test('Test setSelectedDaysRecurringEvent function ', () => {
  window.modules.setSelectedDaysRecurringEvent({
    eventName: 'to share money with people',
    callback: () => { console.log('reminding'); },
    days: ['Sunday', 'Monday', 'Thursday'],
    hours: 15,
    minutes: 30,
  });
  expect(window.eventList).toHaveLength(1);
});
