const express = require("express");
const { createuser, getuserlist, getsingleuser, updateuser,createusertype } = require("../Controllers/UserController");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post('/create',createuser);
router.get('/createtype',createusertype);
router.get('/list',getuserlist);
router.get('/user/:id',getsingleuser);
router.put('/update/:id',updateuser);
// router.delete('/update/:id',updateuser );
module.exports = router;
