const express = require('express');
const router = express.Router();

var orderController = require('../controllers/orderController');


// to get the info about the list of snacks in manu
router.post('/create', orderController.orderNewPost)

// to get the info about all outstanding orders of specific vendor
router.get('/', orderController.orderRequestGet)

// to update the order of a specific customer to a vendor
router.post('/:id/update', orderController.orderStatusUpdate)

module.exports = router;