const express = require("express")
const router = express.Router()

const {getTypeById, createType, getType, getAllType, updateType, deleteType} = require("../controllers/type")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")


//  PARAMS
router.param("userId", getUserById)

router.param("typeId", getTypeById)

// ROUTES 

//CREATE ROUTER
router.post(
    "/type/create/:userId",
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    createType)


//READ
router.get("/type/:typeId", getType)
router.get("/type/all", getAllType)


//UPDATE

router.put(
    "/type/:typeId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateType)

//DELETE
router.delete(
    "/type/:typeId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteType)
    
module.exports = router