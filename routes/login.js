const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize, User } = require('../models/')

router.post('/api/login',async(req,res)=>{
    const {username, password}= req.body;
    
    const user= await User.findOne({
        where: {username}
    })
    if(!user){
        return res.json({status:'error', error:'Login credentials is invalid'})
    }
    else{
        if(bcrypt.compare(password,user.password)){
            const auth_token= jwt.sign({
                id:user.id,
                username:user.username
            },'access',{expiresIn:'20s'})

            const ref_token= jwt.sign({
                id:user.id,
                username:user.username
            },'refresh',{expiresIn:'24h'})
            try{
                const user1= await User.update({auth_token,ref_token},
                    {where:{username}})

                    console.log(auth_token);
                    console.log(ref_token);
                    
                
                return res.json({status:'ok', data: auth_token, data2: ref_token})

            }catch(err){
                console.log(err);
                throw err;
            }
            
            


        }
    }
})
module.exports= router;