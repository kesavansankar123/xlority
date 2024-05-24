const express = require('express');
const router = express.Router();
const task_Controller = require('../controller/task_controller');




router.route('/').get(task_Controller.getData);
router.route('/add').post(task_Controller.addData);
// router.get("/:id", task_Controller.getId);
router.get("/data/:key", task_Controller.searchData);
router.route('/update/:id').patch(task_Controller.updateData);
router.route('/delete/:id').delete(task_Controller.deleteData);

// Define other routes using the corresponding controller functions

module.exports = router;
