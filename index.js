const express = require('express');
const DBDetails = require('./config/db');
const task_router=require('./router/task_router')
const app=express();
const port=3000


DBDetails()


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!!!')
  })
  
app.use('/task',task_router)  

   app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());

// // mongoose.connect('mongodb://127.0.0.1:27017/taskManager', { useNewUrlParser: true, useUnifiedTopology: true });
// DBDetails()

// const taskSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   dueDate: Date,
//   completed: { type: Boolean, default: false },
// });

// const Task = mongoose.model('Task', taskSchema);

// // Create task
// app.post('/tasks', async (req, res) => {
//   try {
//     const { title, description, dueDate } = req.body;
//     const task = new Task({ title, description, dueDate });
//     await task.save();
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Read tasks with optional filtering
// app.get('/tasks', async (req, res) => {
//   try {
//     const { status, keyword } = req.query;
//     const filter = {};
    
//     if (status) {
//       filter.completed = status === 'completed';
//     }

//     if (keyword) {
//       filter.$or = [
//         { title: { $regex: keyword, $options: 'i' } },
//         { description: { $regex: keyword, $options: 'i' } }
//       ];
//     }

//     const tasks = await Task.find(filter);
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Update task
// app.put('/tasks/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, dueDate, completed } = req.body;
//     const task = await Task.findByIdAndUpdate(id, { title, description, dueDate, completed }, { new: true });
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Delete task
// app.delete('/tasks/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Task.findByIdAndDelete(id);
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
