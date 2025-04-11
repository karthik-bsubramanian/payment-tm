const mongoose = require('mongoose');
const Account = require('./db');

const transferFunds = async (fromAccount,toAccount,amount)=>{
    await Account.findByIdAndUpdate(fromAccount,{$inc:{balance: -amount}});

    await Account.findByIdAndUpdate(toAccount,{$inc:{balance: amount}});
}

module.exports = transferFunds;