const task = require('../model/task_schema');
const Joi = require('@hapi/joi');


const getData = async (req, res) => {

    try {
        const users = await task
            .find()

        if (users) {
            res.status(200).send({
                users
            });
        } else {
            res.status(400).send("No Users");
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};


const addData = async (req, res) => {
    const { Title, Discription,Due_Date,Status } = req.body;

    try {
      const schema = Joi.object({ 
        Title:Joi.string().required(),
        Discription:Joi.string().required(),
        Due_Date: Joi.date().required(),
        Status:Joi.string().required()
  
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

        const add_Data = new task({
          Title, Discription,Due_Date,Status });
        await add_Data.save();
        res.status(200).send('Data Added Successfully');
    } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const searchData = async (req, res) => {
  
    const key = req.params.key;
  
    const query = {
      $or: [
        { Title: { $regex: key, $options: "i" } },
        { Discription: { $regex: key, $options: "i" } },
        { Status: { $regex: key, $options: "i" } },
        
      ]
    };
  
    try {
      const users = await task
        .find(query)
        .sort({ Title: 1 })
        
  
        if (users && users.length > 0) {
          res.status(200).send(users);
        } else {
          res.status(400).send("No Users");
        }
    } catch (err) {
      res.status(500).send(err );
    }
  };

  const getId = async (req, res) => {
    const {id}=req.params
    try {
        const users = await designationUsers.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const updateData = async (req, res) => {
    try {
      const update_Data = await task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!update_Data) {
        return res.status(400).send("User not found" );
      }
  
      return res.status(200).send( "Data is Updated successfully" )
    } catch (error) {
      res.status(500).send( error);
    }
  };
  
  const deleteData = async (req, res) => {
    try {
      const delete_Data=await task.findByIdAndDelete(req.params.id);
      if (!delete_Data) {
        return res.status(400).send("User not found" );
      }
  
      return res.status(200).send("Data is deleted successfully" )
    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = {
    getData,
    addData,
    searchData,
    updateData,
    deleteData,
    // getId
  };
// Define other controller functions for your routes
