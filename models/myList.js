const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    description:{
          type :String,
          required :true
    },
    
    category :{

        type :String,
        required : true
    },
   
    dueDate: {
        type: String,
        required: true,// Make it optional
      },


});

// define collection name , pnNo 
const List = mongoose.model('List' , listSchema);

// now export contact
module.exports = List;


