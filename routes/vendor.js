var  vendorController = require('../controllers/vendorController');

const express = require('express');

const router = express.Router();

// to register a new vendor
router.post('/register', vendorController.vendorRegisterUpdate);

// to login a vendor
router.post('/login', vendorController.vendorLoginPost);

// to find or update park status for a specific vendor by its id 
router.post('/park/:vendorId', vendorController.vendorParkUpdate);

// to get five nearest vendors 
router.get('/', vendorController.vendorFiveGet);

module.exports = router;