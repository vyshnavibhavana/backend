const Task = require('../models/taskcreationmodel');


const createTask = async (req, res) => {
    try {
      const { title, priority, assignee_id, due_date, status, checklist } = req.body;
  
      const newTask = new Task({
        title,
        priority,
        assignee_id,
        due_date,
        status,
        checklist,
      });
  
      const savedTask = await newTask.save();
  
      res.json({
        status: 'success',
        task: {
          id: savedTask._id,
          title: savedTask.title,
          priority: savedTask.priority,
          assignee: savedTask.assignee_id,
          due_date: savedTask.due_date,
          checklist: savedTask.checklist,
        },
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };

  module.exports={
    createTask
  }