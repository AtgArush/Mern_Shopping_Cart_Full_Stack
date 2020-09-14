const express = require("express")
const router = express.Router()

const {updateCategory, getCategory, getAllCategory, getCategoryById, createCategory, deleteCategory} = require("../controllers/category")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//==========================================================================================================================================
//======================== CUSTOM PARAMS ========================================

router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

//==========================================================================================================================================


//==========================================================================================================================================
//======================== CREATE CATEGORY ========================================
router.post(
    "/category/create/:userId",
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    createCategory)

//==========================================================================================================================================

//==========================================================================================================================================
//======================== GET ONE// ALL CATEGORY ========================================

router.get("/category/:categoryId", getCategory)
router.get("/category",getAllCategory)

//==========================================================================================================================================


//==========================================================================================================================================
//======================== UPDATE CATEGORY ========================================

router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory)

//==========================================================================================================================================


//==========================================================================================================================================
//======================== DELETE CATEGORY ========================================
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory)

module.exports = router