require('../utils/utils');
require('../create-event/create-event');
require('../show-event-list/show-event-list');
require('./change-event-list');

test('Test renameEvent function ', () => {
  const callbackFunction = () => {
    console.log('you need to go to the store');
  };

  window.modules.setNewEvent('shop', new Date(2021, 1, 15, 23, 35), callbackFunction);
  window.renameEvent(1, 'shop', 'new bread');

  expect(window.eventList[0].name).toBe('new bread');
});
