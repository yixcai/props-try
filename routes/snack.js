const express = require('express');
const router = express.Router();

var snackController = require('../controllers/snackController');

// View snacks menu and each snack detail
router.get('/', snackController.snackMenuGet)
router.get('/:id', snackController.snackOneGet)

module.exports = router;