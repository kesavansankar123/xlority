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
    const { Name, Email,Phone_No,DOB,Date,Address } = req.body;

    try {
      const schema = Joi.object({ 
        Name:Joi.string().required(),
        Email:Joi.string().email().required(),
        Phone_No: Joi.number().required() ,
        DOB:Joi.date().required(),
        Date:Joi.date().required(),
        Address:Joi.string().required()

  
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await task.findOne({Email}); 
      if(user) return res.status(400).send("Email Already Registered");

        const add_Data = new task({Name, Email,Phone_No,DOB,Date,Address });
        await add_Data.save();
        res.status(200).send('Data Added Successfully');
    } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const searchData = async (req, res) => {
  const key = req.params.key;
  const numericKey = !isNaN(Number(key)) ? Number(key) : null;

  const query = {
    $or: [
      { Name: { $regex: key, $options: 'i' } },
      { Email: { $regex: key, $options: 'i' } },
      // numericKey !== null ? { Phone_No: numericKey } : { Phone_No: { $regex: key, $options: 'i' } },
      { Address: { $regex: key, $options: 'i' } },
    ],
  };

  try {
    const users = await task.find(query).sort({ Name: 1 });

    if (users && users.length > 0) {
      res.status(200).send(users);
    } else {
      res.status(400).send('No Users');
    }
  } catch (err) {
    res.status(500).send(err);
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
