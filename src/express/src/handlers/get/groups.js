const Group = require('../../../models/group');
const { jsonCallback } = require('../../../utils');

const groupsHandler = (req, res, next) => {
  Group
  .find({group: null}, '_id name')
  .exec(jsonCallback(res, next));
};

module.exports = groupsHandler;
