const { sequelize, User } = require('../models');
const bcrypt = require('bcryptjs');


const  signIn =async (username, password) => {
    
        try{
        if (!username || typeof username !== 'string') {
            return JSON.stringify({ status: 'error', error: 'Invalid username' })
        }
        if (!password || typeof password !== 'string') {
            return JSON.stringify({ status: 'error', error: 'Invalid password' })
        }
        if (password.length < 5) {
            return JSON.stringify({ status: 'error', error: 'password should be at least 6 characters' })
        }
        
            
                const hashedPassword = await bcrypt.hash(password, 10);
                
                try{
                    const user= await User.findOne({
                        where:{username}
                    })
                    if(user){
                        return JSON.stringify({error: 'Username already exist'})
                    }
                    else{
                    
                        const user1 = await User.create({username,password:hashedPassword})
                            return user1.username;
                        
                        
                        
                         
                            
                        
                        // return JSON.stringify({status:'ok',message:'User is created'})
                    }
                }catch(err){
                    
                    return err;
                }
    }catch(err){
        return err
    }
   
    
        
            
            

        
        
    
}
module.exports= signIn;