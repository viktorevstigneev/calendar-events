require('./utils');

test('Test getCurrentWeekOfChoosingDay function ', () => {
  expect(window.utils.getCurrentWeekOfChoosingDay(new Date()).length).toBe(7);
});
