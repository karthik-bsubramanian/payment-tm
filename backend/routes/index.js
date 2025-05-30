const express = require("express");
// import userRouter from './user';
const userRouter = require("./user");
const accountRouter = require('./account');

const router = express.Router();

router.use("/user", userRouter);
router.use('/accounts',accountRouter);

module.exports = router;
