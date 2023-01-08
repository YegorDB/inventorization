const { body } = require('express-validator');

const nameValidator = body('name').isLength({ min: 3, max: 50 });

module.exports = {
  nameValidator
};
