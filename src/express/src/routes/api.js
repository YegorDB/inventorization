const express = require('express');
const { validationResult } = require('express-validator');

const {
  authCheckHandler,
  groupHandler, groupsHandler,
  itemHandler, neededItemsHandler,
  searchGroupsHandler, searchItemsHandler,
} = require('../handlers/get');
const {
  addGroupHandler, addItemHandler, loginHandler, updateItemHandler,
} = require('../handlers/post');
const { nameValidator } = require('../validators');

const router = express.Router();

router.get('/auth/check/', authCheckHandler);
router.get('/groups/', groupsHandler);
router.get('/groups/:groupId/', groupHandler);
router.get('/items/:itemId/', itemHandler);
router.get('/needed-items/', neededItemsHandler);
router.get('/search/groups/', searchGroupsHandler);
router.get('/search/items/', searchItemsHandler);

const postRouter = (url, validators, handler) => {
  router.post(url, ...validators, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({
        status: 400,
        messages: errors.array(),
        client: true
      });
    }

    handler(req, res, next);
  });
}

postRouter('/auth/login/', [], loginHandler);
postRouter('/groups/add/:parentGroupId/', [nameValidator], addGroupHandler);
postRouter('/items/add/:parentGroupId/', [nameValidator], addItemHandler);
postRouter('/items/update/:itemId/', [nameValidator], updateItemHandler);

module.exports = router;
