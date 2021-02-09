require('../utils/utils');
require('./create-event');
require('../show-event-list/show-event-list');

test('Test setNewEvent function ', () => {
  const callbackFunction = () => {
    console.log('you need to go to the store');
  };

  window.modules.setNewEvent('shop', new Date(2021, 1, 20), callbackFunction);

  expect(window.eventList).toHaveLength(1);
});
