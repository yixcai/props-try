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