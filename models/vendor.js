const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// One vendor stores five features, user name, location, address, park status and password 
var VendorSchema = new Schema({
    userName: {
        type: String,
    },
    
    password: {
        type: String,
        required: true,
    },
    
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [String]
        }
    },
     
    textAddress: {
        type: String,
    },
    
    parkStatment: {
        type: Boolean,
        defalt: false,
    }
});

module.exports = mongoose.model("Vendor", VendorSchema);