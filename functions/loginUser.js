const { sequelize, User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginIn = async (username, password) => {
    const user= await User.findOne({
        where:{username}
    })
    if(!user){
        return JSON.stringify({status:'error', error:'Login credentials is invalid'})
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
                const user2= await User.findOne({
                    where:{username}
                });
                    return user2.auth_token;
                }catch(err){
                    return err;
                }
        }
    }


}
module.exports = loginIn;