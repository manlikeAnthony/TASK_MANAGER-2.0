const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name : {
        type:String,
        trim : true,
        required : [true , 'Please provide a name'],
        maxlength : [50 , 'namme cnt exceed 50 characters']
    },
    description:{
        type : String,
        trim : true,
        required : [true , 'Please provide a description of your task'],
        maxlength : [200 , 'namme cnt exceed 200 characters']
    },
    priority:{
        type : String,
        enum : ['low','medium','high'],
        default : 'medium'
    },
    dueDate:{
        type :Date
    },
    completed:{
        type:Boolean,
        default: false
    },
    createdBy :{
        type: mongoose.Types.ObjectId,
        ref : 'User',
        required : [true , 'Must login as a user']

    }
},{timestamps:true});

module.exports = mongoose.model('Task',TaskSchema)