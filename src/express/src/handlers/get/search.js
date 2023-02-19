const async = require('async');

const Group = require('../../models/group');
const Item = require('../../models/item');
const { jsonCallback } = require('../../utils');

const searchHandler = (model, req, res, next) => {
  const searchFilter = {
    $regex: `^${req.query.s}.*$`,
    $options: 'i'
  };
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;

  model
  .find({ name: searchFilter })
  .sort('-_id')
  .skip(offset)
  .limit(limit)
  .exec(jsonCallback(res, next));
};

const searchGroupsHandler = (req, res, next) => {
  return searchHandler(Group, req, res, next);
}

const searchItemsHandler = (req, res, next) => {
  return searchHandler(Item, req, res, next);
}

module.exports = {
  searchGroupsHandler,
  searchItemsHandler
};
