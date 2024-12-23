const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
require('dotenv').config();

const UserSchema = new  mongoose.Schema({
    name : {
        type : String,
        required : [true , 'please provide your name']
    },
    password:{
        type : String,
        required : [true , 'please pprovide a password'],
        minlength : 4
    },
    email :{
        type : String,
        required:[true , 'please provide an email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique:true
    }
})

UserSchema.pre('save' , async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId : this._id , name : this.name} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function(canPassword){
    const isMatch = await bcrypt.compare(canPassword , this.password)
    return isMatch
}

module.exports = mongoose.model('User' , UserSchema)