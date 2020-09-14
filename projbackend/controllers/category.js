const Category = require("../models/category")


//==================================================================================================================================
//======== Find Category (( CALLED BY PARAMS )) ========

exports.getCategoryById = (req,res,next,id)=>{

    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error: "Category not found"
            })
        }
        req.category = cate
        next()
    })
}
//==================================================================================================================================


//==================================================================================================================================
//======== CREATE A CATEGORY (( REQUIRES ADMIN PREVAILEGES )) ========

exports.createCategory = (req,res)=>{
    const category = new Category(req.body);
    console.log(category)
    category.save((err,category)=>{
        console.log(err)
        if(err){
            return res.status(400).json({
                error: "Category not Saved // Category is duplicated"
            })
        }
        res.json({category})
    })
}
//==================================================================================================================================


//==================================================================================================================================
//======== SEND CATEGORY TO FRONT-END ========


exports.getCategory = (req,res)=>{
    return res.json(req.category)
}

//==================================================================================================================================


//==================================================================================================================================
//======== SHOW ALL CATEGORY ========

exports.getAllCategory = (req,res)=>{
    console.log("getAllCategory")
    Category.find().exec((err,categories)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error: "NO CATEGORIES "
            })
        }
        console.log(categories)
        res.json(categories)
    })
}

//==================================================================================================================================


//==================================================================================================================================
//======== UPDATE CATEGORY ========

exports.updateCategory = (req,res)=>{
    console.log(req.category)
    const category = req.category
    category.name = req.body.name
    console.log(category.name)
    category.save((err,updateCategory)=>{
        if(err){
            return res.status(400).json({
                error: "FAILED TO UPDATE CATEGORY"
            })
        }
        res.json(updateCategory)
    })
}

//==================================================================================================================================


//==================================================================================================================================
//======== DELETE CATEGORY ========

exports.deleteCategory = (req,res) =>{
    const category = req.category;

    category.remove((err, category)=>{
        if(err){
            return res.status(400).json({
                error: "FAILED TO DELETE CATEGORY"
            })
        }
        res.json({
            message: `Successfully deleted CATEGORY ->  ${category.name} `
        })
    })
}