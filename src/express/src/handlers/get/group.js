const async = require('async');

const Group = require('../../models/group');
const Item = require('../../models/item');
const { parentGroupsAggregation, jsonCallback } = require('../../utils');

const groupHandler = (req, res, next) => {
  async.parallel({
    group: callback => {
      Group
      .findOne({ _id: req.params.groupId })
      .populate('group')
      .exec(callback);
    },
    groups: callback => {
      Group.find({ group: req.params.groupId }).exec(callback);
    },
    items: callback => {
      Item.find({ group: req.params.groupId }).exec(callback);
    },
    parentGroups: parentGroupsAggregation(Group, req.params.groupId),
  }, jsonCallback(res, next));
};

module.exports = groupHandler;
