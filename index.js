const express= require('express');
const bodyParser= require('body-parser');
const path= require('path')
const app= express();
const {sequelize,User}= require('./models');



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',require(path.join(__dirname,'./routes/register.js')))
app.use('/',require(path.join(__dirname,'./routes/login.js')))
app.use('/',require(path.join(__dirname,'./routes/auth.js')))
app.use('/',express.static(path.join(__dirname,'static')))

    app.listen({port: 5000},async()=>{
        console.log('Server up at http://localhost:5000/register.html')
        await sequelize.authenticate()
        console.log('Database connected!');

    })
    



 