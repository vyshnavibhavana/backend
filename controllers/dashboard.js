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


//   const getTaskData=  async (req, res) => {
//     try {
//       const tasks = await Task.find({}); 

//       const columnMapping = {
//         'to-do': 'to-do' || 'To-Do',
//         'In Progress': 'In Progress',
//         'Completed': 'Done'
//       };

//     //   const columns = {
//     //     Backlog: [],
//     //     'to-do': [],
//     //     'In Progress': [],
//     //     Done: []
//     //   };

//       tasks.forEach(task => {
//         console.log(task,"dsjhgs")
//         const taskData = {
//           id: task.assignee_id,
//           title: task.title,
//           status: task.status,
//           priority: task.priority,
//           due_date: task.due_date ? task.due_date.toISOString().split('T')[0] : null, // Format date
//           checklist_count: task.checklist.length,
//           completed_checklist_count: task.checklist.filter(item => item.completed).length,
//           assignees: task.assignee_id ? [task.assignee_id] : [] // Modify this to get actual user names if needed
//         };

//         // console.log(taskData,"taskData")

//         const columnName = columnMapping[task.status] || 'Backlog';
//         console.log(columnName,"jdsfggfh")
//         // columns[columnName].push(taskData);

//         const response = {
//             status: 'success',
//             board: {
//               id: taskData.id, // This can be dynamic based on your logic
//               name: taskData.title,
//               task:taskData

//             }
//           };

//           res.json(response);
//       });

//     //   res.json(response);
//     } catch (err) {
//       res.status(500).json({ status: 'error', message: err.message });
//     }
//   };

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


module.exports = {
    createTask,
    getTaskData
}