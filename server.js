const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./UserRoutes.js');
const fs = require('fs');
const userModel = require('./user');

const app = express();
app.use(express.json());


mongoose
.connect(
    'mongodb+srv://maoe1:google123@cluster0.mtvhcjr.mongodb.net/lab04?retryWrites=true&w=majority',
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }
)
.then((success) =>{
    console.log("Success MongoDdb connection");
})
.catch((err) =>
{
    console.log('Error Mongodb connection');
});

const db = mongoose.connection;


db.once('open', function() {
  userModel.estimatedDocumentCount((err, count) => {
    if (err) {
      console.error(err);
      db.close();
    } else if (count === 0) {
      fs.readFile('./UsersData.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const users = JSON.parse(data);
          userModel.create(users, (err, newUsers) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`${newUsers.length} users created.`);
            }
            db.close();
          });
        }
      });
    } else {
      console.log('Users already exist in the collection, not reading from file.');
    }
  });
});

app.use(UserRouter);

app.listen(3000, ()=> {
    console.log('Server is running');
});
