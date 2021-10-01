const express = require('express')
const { sequelize, User } = require('../models/')
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/api/authentication',async(req,res)=>{
    try{
        const auth_token= req.body.token;
        const user_authToken= await User.findOne({
            where: {auth_token}
        })
        const user = jwt.verify(user_authToken.auth_token,'access')
        console.log('user: '+user);
        res.json({status: 'ok'})


    }catch(err){
        res.status(403).json({error: 'User not authenticated'})
        console.log(err)
    }

})

router.post('/api/auth2',async (req,res)=>{
    try{
        const auth_token= req.body.token2;
        const user_authToken= await User.findOne({
            where: {auth_token}
        })
        const user= jwt.verify(auth_token,'access')
        console.log('updated User: '+user);
        res.json({status:'ok'})
    }catch(err){
        res.status(403).json({error:'User not authenticated'})
        console.log(err)
    }
})

router.post('/api/ref/', async (req,res)=>{
    try{
        const ref_token= req.body.token;
        console.log(ref_token);
       if(ref_token===null){
           ref_token=req.body.token3;
       }
        if(!ref_token){
            return res.status(403).json({ error: "user not authenticated" })
        }

        const user_refToken= await User.findOne({
            where:{ref_token}
        })
        console.log(user_refToken)

        jwt.verify(ref_token,"refresh",async (err,newUser)=>{
            if(!err){
                const auth_token= jwt.sign({id:newUser.id,username:newUser.username},'access',{expiresIn:'20s'});
                const  updatedUser= jwt.verify(auth_token,'access')
                console.log('user: '+updatedUser)
                const newRefToken= jwt.sign({id:newUser.id,username:newUser.username},'refresh',{expiresIn:'24h'})
                try{
                   
                    const user= await User.update({auth_token,ref_token:newRefToken},
                        {
                            where:{ref_token}
                        })

                        console.log(user)
                     res.json({status:'ok',data:auth_token,data2:newRefToken})

                }catch(err){
                    console.log(err)
                }
            }
            else{
                return res.status(403).json({error:"user not authenticated"})
            }
            
        })
    }catch(err){
        console.log(err)
    }
})

module.exports=router;