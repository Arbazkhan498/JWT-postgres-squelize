const { sequelize, User } = require('../models/');
const signIn = require('../functions/createUser');
const loginIn= require('../functions/loginUser');

//get username
const userFetch = async (username) => {
    const user = await User.findOne({
        where: { username }
    })
    return user.username;
}

//get user's access token
const user_authToken= async(username)=>{
    const user= await User.findOne({
        where: {username}
    })
    return user.auth_token;
}


const errors = [
      JSON.stringify({ status: 'error', error: 'Invalid username' })
    , JSON.stringify({ status: 'error', error: 'Invalid password' })
    , JSON.stringify({ status: 'error', error: 'password should be at least 6 characters' })
    , JSON.stringify({error: 'Username already exist'})
    , JSON.stringify({status:'error', error:'Login credentials is invalid'})]



beforeAll(async () => {
    await sequelize.authenticate()
    console.log('Database connected!');
})
afterAll(async () => {
    await sequelize.close();
})

describe('Signin cases', () => {

//     change username before this test.
    test('should create User', async () => {
        expect(await signIn('user7', '123456')).toBe(await userFetch('user7'));
       
    })
    test('should fail sign in ---> username already exist',async()=>{
        expect(await signIn('user4','123456')).toBe(errors[3]);
    })

    test('should fail sign in ---> invalid password',async()=>{
        expect(await signIn('user4',123456)).toBe(errors[1]);
    })

    test('should fail sign in ---> password is too short',async()=>{
        expect(await signIn('user4','1234')).toBe(errors[2]);
    })
    test('should fail sign in ---> username is invalid',async()=>{
        expect(await signIn(null,'123456')).toBe(errors[0]);
    })



})

describe('Login Cases',()=>{
    test('should login user', async () => {
        expect(await loginIn('user1','123456')).toBe(await user_authToken('user1'));
    })
    test('should fail login ---> invalid login credentials',async()=>{
        expect(await loginIn(null,'1234')).toBe(errors[4])
    })
    
})

