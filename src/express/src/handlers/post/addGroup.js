const Group = require('../../models/group');

const addGroupHandler = (req, res, next) => {
  const group = new Group({
    name: req.body.name,
    group: req.params.parentGroupId == '_' ? null : req.params.parentGroupId,
  });

  group.save().then(group => res.json(group));
};

module.exports = addGroupHandler;
