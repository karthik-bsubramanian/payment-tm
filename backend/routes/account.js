const express = require('express');
const router = express.Router();
const {Accounts} = require('../db');
const authMiddleWare = require('../middleware');
const mongoose = require('mongoose');

router.get('/balance',authMiddleWare,async (req,res)=>{
    // console.log(req.userid);
    // const userIdObject = new mongoose.Types.ObjectId(req.userid);  no need to do this.
    // console.log(userIdObject);
    const useraccount = await Accounts.findOne({
        userid: req.userid
    });

    

    res.json({
        balance: useraccount.balance
    })
});


router.post('/transfer',authMiddleWare,async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount,to}=req.body;

    const useraccount = await Accounts.findOne({userid:req.userid}).session(session);

    if(!useraccount||useraccount.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "insufficient balance"
        });
    }

    const toAccount = await Accounts.findOne({userid:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "invalid account"
        });
    }

    await Accounts.updateOne({userid:req.userid},{$inc:{balance:-amount}}).session(session);
    await Accounts.updateOne({userid:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
        message:"transaction succesfull"
    });
});

// router.post('/transfer', authMiddleWare, async (req, res) => {
//     const session = await mongoose.startSession();
  
//     try {
//       session.startTransaction();
  
//       const { amount, to } = req.body;

//       const useraccount = await Accounts.findOne({ userid: req.userid }).session(session);
      
  
//       if (!useraccount || useraccount.balance < amount) {
//         await session.abortTransaction();
//         return res.status(400).json({ message: "insufficient balance" });
//       }
  
//       const toAccount = await Accounts.findOne({ userid: to }).session(session);
      
  
//       if (!toAccount) {
//         await session.abortTransaction();
//         return res.status(400).json({ message: "invalid account" });
//       }
  
//       await Accounts.updateOne({ userid: req.userid }, { $inc: { balance: -amount } }).session(session);
//       await Accounts.updateOne({ userid: to }, { $inc: { balance: amount } }).session(session);
  
//       await session.commitTransaction();
  
//       res.status(200).json({ message: "transaction successful" });
  
//     } catch (error) {
//       await session.abortTransaction();
//       console.error("Transaction failed:", error);
//       res.status(500).json({ message: "Something went wrong", error: error.message });
//     } finally {
//       await session.endSession(); // Always end the session!
//     }
//   });
  
    







module.exports = router;