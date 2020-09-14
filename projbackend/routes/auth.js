var express = require("express")
var router = express.Router()
const {check} = require("express-validator")

const {signout, signup, signin, isSignedIn} = require("../controllers/auth")


//===============================================================================================================================================
//=============== SIGN UP ROUTE ===============

router.post("/signup",[
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    // check("lastname", "lastname should be atleast 3 character").isLength({ min: 3 }),
    check("email", "email is not valid").isEmail(),
    check("password", "password should be atleast 3 char").isLength({ min: 3 })
], signup)

//==================================================================================================================================



//==================================================================================================================================
//=============== SIGN IN ROUTE ===============

router.post("/signin",
[
    check("email", "email is not valid").isEmail(),
    check("password", "password field is required").isLength({min: 3})
], signin)

//==================================================================================================================================



//==================================================================================================================================
//=============== SIGN OUT ROUTE===============

router.get("/signout", signout)

router.get("/testroute", isSignedIn, (req,res)=>{
    res.send(req.auth)
})

//==================================================================================================================================



module.exports = router
