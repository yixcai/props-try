const bcrypt = require('bcryptjs');

var Vendor = require('../models/vendor');

/** Create a new vendor 
 *  (POST) http://localhost:5000/vendor/register
 */
exports.vendorRegisterUpdate = function(req, res) {
    const { userName, password } = req.body;
    Vendor.findOne({ userName: userName }).then((vendor) => {
        if (vendor) {
            res.status(409).json({ error: 'Sorry, the name is already registered!' })
        } else {
            const vendorNew = new Vendor({
                userName,
                password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(vendorNew.password, salt, (err, hash) => {
                    if (err) {
                        throw (err);
                    }
                    vendorNew.password = hash;
                    vendorNew.save().then((vendor) => {
                        res.json({
                            vendor: {
                                userName: vendor.userName,
                                password: vendor.password
                            }
                        })
                    })
                })
            })
        }
    })
};

/** Update the info of vendor
 * (POST) http://localhost:5000/vendor/park/:vendorID
 */
exports.vendorParkUpdate = function(req, res) {
    Vendor.findByIdAndUpdate(
        req.params.vendorId, 
        {location: { type: "Point", coordinates: req.body.location },
        textAddress: req.body.textAddress,
        parkStatment: req.body.parkStatment
        }, { new: true },
        function(err, updatedVendor) {
            if (err) {
                res.status(404).json({
                    success: false, 
                    err: err });
            } else {
                res.status(200).json({ 
                    success: true, 
                    pdatedVendor: updatedVendor
                });
            }
        }
    );
};

exports.vendorFiveGet = function(req, res) {
    Vendor.find().exec((err, vendors) => {
        if(err){
            res.status(404).json({success: false, err: err})

        }else{
            var mapDistance = []
            for (i = 0; i < vendors.length; i++){
                var distance = Math.sqrt(Math.hypot(
                    req.query.lat - vendors[i].location.coordinates[0],
                    req.query.lng - vendors[i].location.coordinates[1]
                ))
                if(Number.isFinite(distance)){
                    mapDistance.push({
                        "id":vendors[i].id,
                        "name":vendors[i].name,
                        "textAddress":vendors[i].textAddress,
                        "distance":parseFloat(distance).toFixed(4),
                        "location":vendors[i].location.coordinates
                    })
                }
            }
            mapDistance = mapDistance.sort(({distance:a},{distance:b}) => a - b).slice(0, 5)
            res.status(200).json({success:true, vendors: mapDistance})
        }
    })
};