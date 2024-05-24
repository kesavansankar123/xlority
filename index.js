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
