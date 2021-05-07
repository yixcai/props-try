var Order = require('../models/order');

/** Create New Order
 * (POST) http://localhost:5000/order/create
 */
exports.orderNewPost = function(req, res) {
    const order = new Order({
        customer: req.body.customer,
        vendor: req.body.vendor,
        snacks: req.body.snacks
    });
    order.save((err, createNewOrder) => {
        if (err) {
            res.status(400).json({
                success: false,
                err: err
            })
        } else {
            res.status(200).json({
                success: true,
                order: createNewOrder
            })
        }
    })
};

/**view list of orders of a vendor
*(GET) http://localhost:5000/order?customer=:customerId&status-outstanding [get all outstanding orders ]
 *      http://localhost:5000/order?vendor-:vendorId
 */
exports.orderRequestGet = function(req, res) {
    Order.find(req.query).populate("vendor").populate("customer"). then((orders) => {
        if (orders.length == 0) {
            res.status(404). json({success: false, errMessage: "no order found" }) 
        } else {
            res.status(200).json({success: true, allOrders: orders})
        }
    })
}


/** Update order snacks changes and its status
 * (POST) http://localhost:5000/order/:orderID/update
 */
exports.orderStatusUpdate = function(req, res) {
    Order.findByIdAndUpdate(
        req.params.id, {
            snacks: req.body.snacks,
            status: req.body.status
        }, { new: true },
        function(err, updatedChange) {
            if (err) {
                res.status(404).json({
                    success: false,
                    err: err
                });
            } else {
                res.status(200).json({
                    success: true,
                    updatedChange: updatedChange
                });
            }
        }
    );
};