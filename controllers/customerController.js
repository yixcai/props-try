const bcrypt = require('bcryptjs');

var Customer = require('../models/customer');

/** Customer registration
 * (POST) http://localhost:5000/customer/register
 */
exports.customerNewUserPost = function (req, res) {
    const { familyName, givenName, email, password} = req.body;
   
    Customer.findOne( {email: email} ).then((customer) => {
        if(customer) {
            res.status(409).json({error: 'Email already registered!'})
            //When email already registered, report error 
        }else{
            const newCustomer = new Customer ({
                familyName,
                givenName,  
                email, 
                password
            })

            // Encrypt the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newCustomer.password, salt, (err, hash) => {
                    if (err) {
                        throw (err);
                    }
                    newCustomer.password = hash;
                    newCustomer.save().then((customer) => {
                        res.json({
                            customer: {
                                familyName: customer.familyName, 
                                givenName: customer.givenName, 
                                email: customer.email, 
                                password: customer.password
                            }
                        })
                    })
                })
            })
        }
    })
};

exports.customerLoginPost = function(req,res){
    const {email, password} = req.body;
    //match customer
    Customer.findOne({
        email: email,
    }).then ((customer) => {
        if(!customer){
            res.status(404).json({sucess: false, error:"Email not registered"});
        }else{
            bcrypt.compare(password, customer.password, (err, isMatch) => {
                if(isMatch){
                    res.status(200).json({
                        success: true,
                        customer: {
                            id: customer.id,
                            givenName: customer.givenName,
                            familyName: customer.familyName,
                            email: customer.email,
                        },
                    });
                }else{
                    res.status(409).json({error: err, message:"password incorrect"});
                }
            })
        }
    })
}

// POST request to update customer
exports.customerUpdatePost = function(req, res){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                throw (err);
            }
            Customer.findOne({email:req.body.email}, function(err, duplicateCustomer){
                if(duplicateCustomer){
                    if(duplicateCustomer._id != req.params.id){
                        console.log(duplicateCustomer._id)
                        console.log(req.params.id)
                        res.status(409).json({success: false, message: "another customer has already registered that email"})
                    }
                }else{
                    Customer.findOneAndUpdate(
                        {_id: req.params.id},
                        {
                            familyName: req.body.familyName, 
                            givenName: req.body.givenName, 
                            email: req.body.email, 
                            password: hash
                        },
                        {new: true},
                        function (err, updatedCustomer) {
                            if(err){
                                res.status(404).json({success: false, message:"customer email does not exist"});
                            }else{
                                res.status(200).json({success: true, updatedCustomer: updatedCustomer});
                            }
                        }
                    )
                }
            })
            
        });
    });
                   
}