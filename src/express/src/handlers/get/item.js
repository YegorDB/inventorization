const async = require('async');

const Item = require('../../models/item');
const { parentGroupsAggregation, jsonCallback } = require('../../utils');

const itemHandler = (req, res, next) => {
  async.parallel({
    item: callback => {
      Item
      .findOne({ _id: req.params.itemId })
      .populate('group')
      .exec(callback);
    },
    parentGroups: parentGroupsAggregation(Item, req.params.itemId),
  }, jsonCallback(res, next));
};

module.exports = itemHandler;
