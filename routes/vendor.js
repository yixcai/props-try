var  vendorController = require('../controllers/vendorController');

const express = require('express');

const router = express.Router();

// to register a new vendor
router.post('/register', vendorController.vendorRegisterUpdate);

// to find or update park status for a specific vendor by its id 
router.post('/park/:vendorId', vendorController.vendorParkUpdate);

router.get('/', vendorController.vendorFiveGet);

module.exports = router;