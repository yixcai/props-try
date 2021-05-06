const express = require('express');
const router = express.Router();

var customerController = require('../controllers/customerController');

// POST request to create a customer
router.post('/register', customerController.customerNewUserPost)

// POST request for customer login 
router.post('/login', customerController.customerLoginPost)

module.exports = router;