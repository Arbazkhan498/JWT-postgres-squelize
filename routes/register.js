const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');
const { sequelize, User } = require('../models/');

router.post('/api/register',async(req,res)=>{
    try{
         const { username, password: plainText } = req.body;
    
    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }
    if (!plainText || typeof plainText !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }
    if (plainText.length < 5) {
        return res.json({ status: 'error', error: 'password should be at least 6 characters' })
    }
    
    const password = await bcrypt.hash(plainText, 10)

    try{
        const user= await User.findOne({
            where:{username}
        })
        if(user){return res.json({error:"Username already exist"})}
        else{
            const user1 = await User.create({username,password})
            console.log("username: "+user1.username)
            console.log("hashedPassword: "+user1.password)
            console.log("User is created")
            return res.json({status:'ok',message:"User is created"});
        }

    }catch(err){
        console.log(err)
        return res.status(500).json({error:"ERROR!"})
    }

    }catch(err){
        throw err;
    }
   


})
module.exports=router;