const express = require('express')
const router= express.Router();
const {
    createTask,
    getSingleTask,
    getAllTask,
    updateTask,
    deleteTask
} = require('../controllers/task')

router.route('/').post(createTask).get(getAllTask)
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router