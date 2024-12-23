const Task = require('../models/task');
const {BadRequest , UnauthenticatedError,NotFoundError } = require('../errors');
const {StatusCodes}= require('http-status-codes');


const createTask = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({task})
}
const getSingleTask = async (req,res)=>{
    const {user : {userId} , params : {id : taskId}} = req;
    const task = await Task.findOne({_id : taskId , createdBy : userId}).populate('createdBy', 'name email')
    if(!task){
        throw new NotFoundError(`task with id ${taskId} not found`)
    }
    res.status(StatusCodes.OK).json({task})
}
const getAllTask = async (req,res)=>{
    const task = await Task.find({createdBy : req.user.userId }).populate('createdBy', 'name email')
    res.status(StatusCodes.OK).json({task})
}

const updateTask = async (req,res)=>{
    const {user : {userId} , params :{id : taskId}} = req;
    const task = await Task.findOneAndUpdate({_id : taskId , createdBy : userId}, req.body ,{
        new:true,
        runValidators : true
    }).populate('createdBy' , 'name')

    if(!task){
        throw new NotFoundError(`no task with id ${taskId}...`)
    }
    res.status(StatusCodes.OK).json({task})
}
const deleteTask = async (req,res)=>{
    const {params : {id : taskId} , user : {userId}} = req;
    const task = await Task.findOneAndDelete({_id:taskId , createdBy:userId})
    if(!task){
        throw new NotFoundError(`no task with id ${taskId}...`)
    }
    res.status(StatusCodes.OK).json({success : [true , 'successfully deleted.......']})

}

module.exports = {
    createTask,
    getSingleTask,
    getAllTask,
    updateTask,
    deleteTask
}