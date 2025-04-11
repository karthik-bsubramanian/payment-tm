const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://karthikbalasubramanian08:%40Karthik773@cluster0.pycz6.mongodb.net/");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
        lowercase: true
    },
    password:{
        type:String,
        minLength: 6,
        required: true
    },
    firstname:{
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    lastname:{
        type: String,
        lowercase: true,
        trim: true
    }
});


const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  //refer the User model
        required: true
    },balance:{
        type: Number,
        required: true
    }
});

const Accounts = mongoose.model('Accounts',accountSchema);


module.exports = {
    User,
    Accounts
};