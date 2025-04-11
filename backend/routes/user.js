const express = require('express');
const userRouter = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} =  require ('../config');
const { Accounts } = require ('../db');
const middleWare = require('../middleware');
const {User} = require('../db');

const signUpBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
});

userRouter.post('/signup',async (req,res)=>{
    const {success} = signUpBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Entered inputs were wrong"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "user already exists"
        })
    }

    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });


    await Accounts.create({
        userid: newUser._id,
        balance: 1+Math.random()*10000
    })

    const token = jwt.sign({
        userid: newUser._id
    },JWT_SECRET);

    res.status(201).json({
        message:"user succesfully created",
        token: token
    })


})

const signInBody=zod.object({
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post("/signin",async (req,res)=>{
    const {success} = signInBody.safeParse(req.body);

    if(!success){
        return res.status(400).json({
            message: "invalid input credentials"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(existingUser){
        const token = jwt.sign({
            userid: existingUser._id  //jwt payloads are meant to store key value pairs.
        },JWT_SECRET);

        return res.status(200).json({
            token: token
        })
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

userRouter.put('/',middleWare,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "password length is too small"
        })
    }

    await User.updateOne({_id: req.userid},req.body);

    res.status(200).json({
        message: "Updated successfully"
    })

})

userRouter.get('/bulk',async (req,res)=>{
    const query = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstname:{
                "$regex": query
            }
        },{
            lastname:{
                "$regex": query
            }
        }]
    });

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


module.exports = userRouter;