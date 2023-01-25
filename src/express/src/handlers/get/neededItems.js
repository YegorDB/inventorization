const async = require('async');

const Item = require('../../models/item');
const { jsonCallback } = require('../../utils');

const neededItemsHandler = (req, res, next) => {
  Item
  .$where('this.neededCount > this.count')
  .populate('group')
  .exec(jsonCallback(res, next));
};

module.exports = neededItemsHandler;
