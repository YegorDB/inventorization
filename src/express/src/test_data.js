var Group = require('./models/group');
var Item = require('./models/item');

function createTestData() {
  let group = new Group({
    name: 'test',
  });

  group.save()
  .then(g => {
    let item = new Item({
      name: 'testItem1',
      count: 1,
      group: g._id
    });

    item.save()
  });
}

module.exports = createTestData;
