require('../utils/utils');
require('../create-event/create-event');
require('./show-event-list');

test('Test showEventlist function ', () => {
  const callbackFunction = () => {
    console.log('you need to go to the store');
  };
  window.modules.setNewEvent('shop', new Date(2021, 1, 8, 23, 35), callbackFunction);
  expect(window.showEventslist('Day', new Date(2021, 1, 8))).toBe();
});
