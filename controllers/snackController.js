var Snack = require('../models/snack');

/** View all snacks menu
 * (GET) http://localhost:5000/snacks/
 */
exports.snackMenuGet = function (req, res) {
    Snack.find().exec((err, snacks) => {

        // If not find a snack, return error
        if(err){
            res.status(404).json({
                success: false, 
                err: err})

        // If find a snack, return the information of snack
        }else{
            res.status(200).json({
                success: true, 
                snacks: snacks})
        }
    })
};

/** View detail of one snack by its id
 * (GET) http://localhost:5000/snacks/:snackID
 */
exports.snackOneGet = function (req, res) {
    Snack.findById(req.params.id, function(err, snack){
        if(snack){
            res.status(200).json({ 
                success: true, 
                snack: snack})
            
        }else{
            res.status(404).json({
                success: false, 
                err: err})

        }
    })
};
