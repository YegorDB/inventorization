const mongoose = require('mongoose');

const parentGroupsAggregation = (model, objId) => callback => {
  model
  .aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(objId)
      }
    },
    {
      $graphLookup: {
        from: 'groups',
        startWith: '$group',
        connectFromField: 'group',
        connectToField: '_id',
        as: 'parentGroups'
      }
    }
  ])
  .exec((err, data) => {
    if (err) {
      return callback(err, data);
    }

    parentGroupsByParent = {};
    for (const group of data[0].parentGroups) {
      const key = group.group ? group.group.toString() : '_';
      parentGroupsByParent[key] = group;
    }

    let orderedGroups = [];
    let key = '_';
    while (Object.keys(parentGroupsByParent).length > 0) {
      const value = parentGroupsByParent[key]
      orderedGroups.push(value);
      delete parentGroupsByParent[key];
      key = value._id.toString();
    }

    return callback(err, orderedGroups);
  });
};

const jsonCallback = (res, next) => (err, data) => {
  if (err) {
    return next(err);
  }

  res.json(data);
};

module.exports = {
  parentGroupsAggregation,
  jsonCallback,
};
