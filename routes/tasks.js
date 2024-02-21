const express= require('express');
const router= express.Router();
const {getAllTasks, SingleTask, UpdateTask, DeleteTask, CreateTask}= require('../controllers/tasks')
router.route('/').get(getAllTasks).post(CreateTask)

router.route('/:id').get(SingleTask).patch(UpdateTask).delete(DeleteTask)
module.exports=router;