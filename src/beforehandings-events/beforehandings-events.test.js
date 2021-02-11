require('../utils/utils');
require('../events-calendar/events-calendar');
require('../recurring-events/recurring-events');
require('./beforehandings-events');

test('Test setBeforehandingsEvent function ', () => {
  window.modules.setNewEvent('buying', new Date(2021, 1, 15, 15, 45), () => { console.log('buy a bread'); });

  window.modules.setBeforehandingsEvent({
    eventId: 1, eventName: 'buying', callback: () => { console.log('beforehanding'); }, minutes: 3, hours: 1,
  });

  expect(!!window.eventList[0].beforehandingEvent).toBe(true);
});
