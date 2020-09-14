const Product = require("../models/product")

const formidable = require ("formidable")
const _ = require("lodash")
const fs = require("fs")
const product = require("../models/product")
const { update } = require("lodash")


exports.getProductById = (req,res,next,id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next()
    })
}


exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }

        //field destructure
        const {name, price, description, category, stock} = fields

        if(!name || !description || !price || !stock || !category){
            return res.status(400).json({
                error: "Please include all fields"
            })
            }

        let product = new Product(fields)
    
        //HANDLE UPLOADED FILE
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "IMAGE TOO LARGE",
                    size: file.photo.size
                })  
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }
        product.save((err, product)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    error:"Saving product failed"
                })
            }
            product.photo = undefined
            res.json(product)
        })
    })

}


exports.getProduct = (req,res)=>{
    req.product.photo = undefined
    return res.json(req.product)
}


exports.photo = (req,res, next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}


exports.deleteProduct = (req,res)=>{
    console.log("In Delete Prodict")
    const product = req.product
    product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: `Failed to delete ${req.product.name}`
            })
        }
        res.json({
            msg: "Product deleted sucessfully",
            deletedProduct
        })
    })
}


exports.updateProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }

        let product = req.product
    
        product = _.extend(product, fields)

        //HANDLE UPLOADED FILE
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "IMAGE TOO LARGE",
                    size: file.photo.size
                })  
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }
    
        product.save((err, product)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    error:"updating the product failed"
                })
            }
            product.photo = undefined
            res.json(product)
        })
    })
}


exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products)=>{
        if(err){
            return res.status(400).json({
                error: "No products found"
            })
        }
        res.json(products)
    })
}

exports.getAllAdminProducts = (req,res)=>{
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .exec((err, products)=>{
        if(err){
            return res.status(400).json({
                error: "No products found"
            })
        }
        res.json(products)
    })
}


exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category", {}, (err, category)=>{
        if (err){
            return res.status(400).json({
                error:"No category Found"
            })
        }
        res.json(category)
    })
}

exports.updateStock = (req, res, next) =>{

    let myOperations = req.body.order.products.map(prod =>{
        return {
            updateOne:{
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products)=>{
        if(err){
            return res.status(400).json({
                error: "BULK Operation failed"
            })
        }
        next()
    })
}
