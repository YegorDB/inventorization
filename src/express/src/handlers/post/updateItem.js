const Item = require('../../models/item');
const { callbackWrapper } = require('../../utils');

const updateItemHandler = (req, res, next) => {
  Item
  .findOne({
    _id: req.params.itemId
  })
  .exec(callbackWrapper(next, item => {
    if (!item) {
      return next({
        status: 401,
        messages: ['Not found.'],
        client: true
      });
    }

    for (const [key, value] of Object.entries(req.body)) {
      item[key] = value;
    }

    item.save().then(item => res.json(item));
  }));
};

module.exports = updateItemHandler;
