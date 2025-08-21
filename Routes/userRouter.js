const express = require("express");
const { createuser, getuserlist, getsingleuser } = require("../Controllers/UserController");
const router = express.Router();

router.get('/create',createuser);
router.get('/list',getuserlist);
router.get('/user/:id',getsingleuser);
module.exports = router;
