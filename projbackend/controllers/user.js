const User = require("../models/user")
const {Order} = require("../models/order")


//==================================================================================================================================
//======== EXTRACT USER FROM DATABASE ========

exports.getUserById = (req, res, next, id)=>{
    console.log("========================")
    console.log("GET USER BY ID")
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            console.log(err)
            return res.status(400).json({
                error: "NO USER WAS FOUND IN DB"
            })
        }
        req.profile = user
        next();
    })
}

//==================================================================================================================================


//==================================================================================================================================
//======== SEND USER TO FRONT-END ========

exports.getUser = (req,res) =>{
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}




//==================================================================================================================================
//======== UPDATE USER-INFO ========

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    error: "YOU ARE NOT AUTHORIZED TO UPDATE THIS INFO"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            user.createdAt = undefined
            user.updatedAt = undefined
            res.json(user)
        }
    )
}

//==================================================================================================================================



//==================================================================================================================================
//======== CHECK CURRENT ORDERS FROM A USER ========


exports.userPurchaseList = (req,res)=>{
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order in this account"
            })
        }
        return res.json(order)
    })
}

//==================================================================================================================================




//==================================================================================================================================
//======== ADD PURCHASE INTO USER ACCOUNT FROM RECIEVED ORDERS ========


exports.pushOrderInPurchaseList = (req,res, next)=>{
    
    let purchases = []
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    } )
    
    // STORE TO DATABASE
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases)=>{
            if(err){
                return res.status(400).json({
                    error: "unable to save purchase"
                })
            }
            next()
        }
    )
} 



