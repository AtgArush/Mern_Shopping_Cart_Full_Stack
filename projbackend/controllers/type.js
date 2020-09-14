const Type = require("../models/type")


//==================================================================================================================================
//======== Find Category (( CALLED BY PARAMS )) ========

exports.getTypeById = (req,res,next,id)=>{

    Type.findById(id).exec((err,type)=>{
        if(err){
            return res.status(400).json({
                error: "Type not found"
            })
        }
        req.type = type
        next()
    })
}
//==================================================================================================================================


//==================================================================================================================================
//======== CREATE A CATEGORY (( REQUIRES ADMIN PREVAILEGES )) ========

exports.createType = (req,res)=>{
    const type = new Type(req.body);
    type.save((err,type)=>{
        if(err){
            return res.status(400).json({
                error: "Type not Saved // Type already exists"
            })
        }
        res.json({type})
    })
}
//==================================================================================================================================


//==================================================================================================================================
//======== SEND CATEGORY TO FRONT-END ========


exports.getType = (req,res)=>{
    return res.json(req.type)
}

//==================================================================================================================================


//==================================================================================================================================
//======== SHOW ALL CATEGORY ========

exports.getAllType = (req,res)=>{
    Type.find().exec((err,types)=>{
        if(err){
            return res.status(400).json({
                error: "NO TYPES COULD BE FOUND"
            })
        }
        res.json(types)
    })
}

//==================================================================================================================================


//==================================================================================================================================
//======== UPDATE CATEGORY ========

exports.updateType = (req,res)=>{

    console.log(req.type)
    const type = req.type
    type.name = req.body.name
    console.log(type.name)
    type.save((err,updateType)=>{
        if(err){
            return res.status(400).json({
                error: "FAILED TO UPDATE TYPE"
            })
        }
        res.json(updateType)
    })
}

//==================================================================================================================================


//==================================================================================================================================
//======== DELETE CATEGORY ========

exports.deleteType = (req,res) =>{
    const type = req.type;

    type.remove((err, type)=>{
        if(err){
            return res.status(400).json({
                error: "FAILED TO DELETE TYPE"
            })
        }
        res.json({
            message: `Successfully deleted TYPE ->  ${type.name} `
        })
    })
}