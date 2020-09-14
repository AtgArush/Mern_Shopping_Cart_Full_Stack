const express = require("express")
const router = express.Router()

const {isAdmin, isAuthenticated,isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories, getAllAdminProducts } = require("../controllers/product")

//PARAMS
router.param("userId", getUserById)
router.param("productId", getProductById)

//ROUTES
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)
router.get("/products", getAllProducts)
router.get("/products/all", getAllAdminProducts)
router.get("/products/:userId", isSignedIn, isAuthenticated, isAdmin, getAllAdminProducts)
router.get("/products/categories", getAllUniqueCategories)

//UPDATE

router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct)

//DELETE
router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct)


module.exports = router