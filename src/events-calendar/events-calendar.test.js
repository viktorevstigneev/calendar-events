require('./events-calendar');
require('../utils/utils');

test('Test setNewEvent function ', () => {
  window.modules.setNewEvent('buying', new Date(2021, 1, 15, 15, 45), () => { console.log('buy a bread'); });
  expect(window.eventList).toHaveLength(1);
});

test('Test deleteEvent function ', () => {
  window.modules.setNewEvent('buying', new Date(2021, 1, 15, 15, 45), () => { console.log('buy a bread'); });
  window.modules.deleteEvent(1, 'buying');
  expect(window.eventList).toHaveLength(0);
});

test('Test renameEvent function ', () => {
  window.modules.setNewEvent('buying', new Date(2021, 1, 15, 15, 45), () => { console.log('buy a bread'); });
  window.modules.renameEvent(3, 'buying', 'shopping');
  expect(window.eventList[0].name).toBe('shopping');
});
