const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// One customer stores five features, funllname, location, email and password 
var CustomerDetail = new Schema({
    givenName: {
        type: String,
    },
    familyName: {
        type: String,
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

//store features in mongoose 
module.exports = mongoose.model("Customer", CustomerDetail);