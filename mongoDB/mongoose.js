const mongoose = require("mongoose");

// connected mongoose to dataBase
mongoose.connect('mongodb://127.0.0.1/todoList');

// connected
const db = mongoose.connection;

// if error in connection
db.on('error' ,console.error.bind(console , 'error connecting database'));

// if connected successfully
db.once('open' , function(){
    console.log(
        "successfull mongoose connected to database 😍"  
    )
})