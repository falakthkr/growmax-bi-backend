const Task = require("../models/Task")

const getTasks = (req,res) => {
    Task.find()
    .then((tasks=>res.json(tasks)))
    .catch((err)=>res.status(400).json("Error: "+err))
}

const addTask = (req,res) => {
    const {content} = req.body;
    const newTask = new Task({content});

    newTask
    .save()
    .then(()=>res.json("Task added successfully"))
    .catch((err)=>res.status(400).json("Error: "+err))
}

const deleteTask = (req,res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Deleted task successfully"))
    .catch((err)=>res.status(400).json("Error: "+err))
}

const updateTask = (req,res) => {
    Task.findById(req.params.id)
      .then((task) => {
        if(req.params.id){
          task.content = req.body.content;
        }
        task
          .save()
          .then(() => res.json("Task updated Successfully"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
}


module.exports = { getTasks, addTask, deleteTask, updateTask }