const express = require("express");
const portNo = 9000;
const db = require("./mongoDB/mongoose");
const List = require("./models/myList");  

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('styles'));


let myTodoList = [];
   
app.get('/', function (req, res) {
    List.find({}, function (err, allTasks) {
            
        if (err) {
            console.log("Error in fetching tasks", err);
            return res.send("An error occurred while fetching tasks.");
        }
        return res.render('home', {
          title: "Todo App",
            todo_List: allTasks
        });
    });
});

app.post("/Todos", function (req, res) {
        List.create({
          
            description: req.body.description,
            category: req.body.option,
            dueDate: req.body.date,
        }, function (err, newTask) {
          if (err) {
            console.log("Error in connecting to Task", err);
            return res.send("An error occurred while adding the task.");
          }
          console.log("Successfully added", newTask);
          return res.redirect('back'); 
        });
    })
    
  
app.post('/deleteTasks', async (req, res) => {
    const selectedTasks = req.body.selectedTasks || [];
  
    try {
      await List.deleteMany({ description: { $in: selectedTasks } });
      console.log('Delete successfully', req.body);
      return res.redirect('/');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error deleting tasks');
    };
  });
  

app.listen(portNo, function (err) {
    if (err) {
        console.log(`Error in running express server`, err);
    }
    console.log(`Express is running Successfully on ${portNo} `);
});

