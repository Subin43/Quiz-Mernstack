const express = require("express");
const { getUser, createUser, getLoginUser } = require("../controller/UserController");
const router  = express.Router();

router.post("/",createUser)
router.get("/", getUser)
router.post("/email",getLoginUser);
    


module.exports = router;