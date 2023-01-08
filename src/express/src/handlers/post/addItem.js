const Item = require('../../../models/item');

const addItemHandler = (req, res, next) => {
  const item = new Item({
    name: req.body.name,
    count: req.body.count,
    group: req.params.parentGroupId,
  });

  item.save().then(item => res.json(item));
};

module.exports = addItemHandler;
