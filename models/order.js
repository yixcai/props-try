const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Info that must include in a order
var OrderSchema = new Schema({
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
        },

        vendor: {
            type: Schema.Types.ObjectId,
            ref: "Vendor",
        },

        status: {
            type: String,
            default: 'outstanding',
        },

        snacks: {
            type: Array,
            default: []
        },

        comment: {
            type: String,
        },
        rating: {
            type: Number,
        }
    },

    // Can help to do the time calculation
    { timestamps: true }

);


module.exports = mongoose.model("Order", OrderSchema);