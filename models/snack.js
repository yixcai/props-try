const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// One snack stores three features, name, image and price 
var SnackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {

        // store image link here
        type: String,  
        required: true,    
    },
    price: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Snack", SnackSchema);