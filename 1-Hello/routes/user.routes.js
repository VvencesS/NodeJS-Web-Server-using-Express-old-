var express = require('express');
var router = express.Router();

var controller = require('../controllers/user.controller');
var validate = require('../Validate/user.validate')

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;