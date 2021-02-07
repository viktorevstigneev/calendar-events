require("../utils/utils");
require("../create-event/create-event");
require("../show-event-list/show-event-list");


test("Test getCurrentWeekOfChoosingDay function ", () => {
  
  expect(window.utils.getCurrentWeekOfChoosingDay(new Date()).length).toBe(7);

});