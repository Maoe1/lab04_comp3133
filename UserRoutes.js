const express = require('express');
const userModel = require('./user');
const app = express();


//http://localhost:3000/users 
app.get('/users', async (req , res) => {
   
    try {
        const users = await userModel.find({});
        res.status(200).send(users);
    } catch (err){
        res.status(500).send(err);
    }
});


module.exports = app;