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
                status: savedTask.status,
                checklist: savedTask.checklist,
            },
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};




const getTaskData = async (req, res) => {
    try {
        const tasks = await Task.find({}); 
    
        const columnMapping = {
          'to-do': 'To-do',
          'in-progress': 'In Progress',
          'completed': 'Done'
        };
    
        const columns = {
          Backlog: [],
          'To-do': [],
          'In Progress': [],
          Done: []
        };
    
        tasks.forEach(task => {
          const taskData = {
            id: task.assignee_id, 
            name: task.title, 
            priority: task.priority,
            due_date: task.due_date ? task.due_date.toISOString().split('T')[0] : null, 
            checklist_count: task.checklist.length,
            completed_checklist_count: task.checklist.filter(item => item.completed).length,
            assignees: task.assignee_id ? [task.assignee_id] : [] 
          };
    
          const columnName = columnMapping[task.status] || 'Backlog';
          columns[columnName].push(taskData);
        });
    
        const response = {
          status: 'success',
          board: {
            id: 'board_001', 
            name: 'Project Board',
            columns: Object.keys(columns).map(columnName => ({
              name: columnName,
              tasks: columns[columnName]
            }))
          }
        };
    
        res.json(response);
        res.status(200).json({ response});
      } catch (err) {
        if (!res.headersSent) {
            return res.status(500).json({ status: 'error', message: err.message });
          }
      }

}


const getTaskSummaryData = async (req, res) => {
  try {
      const tasks = await Task.find({});

      // Initialize counters for task statuses and priorities
      const taskStatusCounts = {
          Backlog: 0,
          'To-Do': 0,
          'In Progress': 0,
          Completed: 0
      };

      const priorityCounts = {
          Low: 0,
          Moderate: 0,
          High: 0,
          'Due Date': 0
      };

      // Map statuses to their labels
      const statusMapping = {
          'to-do': 'To-Do',
          'in-progress': 'In Progress',
          'completed': 'Completed'
      };

      // Count tasks by status and priority
      tasks.forEach(task => {
          const statusLabel = statusMapping[task.status] || 'Backlog';
          taskStatusCounts[statusLabel] += 1;

          if (task.priority === 'Low') priorityCounts.Low += 1;
          else if (task.priority === 'Moderate') priorityCounts.Moderate += 1;
          else if (task.priority === 'High') priorityCounts.High += 1;
          
          // Count due date tasks if they have a due date
          if (task.due_date) {
              priorityCounts['Due Date'] += 1;
          }
      });

      // Prepare response format
      const response = {
          status: 'success',
          data: {
              task: [
                  { label: "Backlog Tasks", count: taskStatusCounts.Backlog },
                  { label: "To-Do Tasks", count: taskStatusCounts['To-Do'] },
                  { label: "Progress Tasks", count: taskStatusCounts['In Progress'] },
                  { label: "Completed Tasks", count: taskStatusCounts.Completed }
              ],
              priority: [
                  { label: "Low Priority", count: priorityCounts.Low },
                  { label: "Moderate Priority", count: priorityCounts.Moderate },
                  { label: "High Priority", count: priorityCounts.High },
                  { label: "Due Date Tasks", count: priorityCounts['Due Date'] }
              ]
          }
      };

      res.status(200).json(response);
  } catch (err) {
      if (!res.headersSent) {
          return res.status(500).json({ status: 'error', message: err.message });
      }
  }
};





module.exports = {
    createTask,
    getTaskData,
    getTaskSummaryData
}