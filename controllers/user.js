const User = require('../models/user');
const {BadRequest , UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes');


const register = async(req,res)=>{
const user = await User.create({...req.body});
const token = user.createJWT();
res.status(StatusCodes.CREATED).json({user :{name: user.name} , token})
}

const login = async(req,res)=>{
const {email , password} = req.body;
if(!email || !password){
    throw new BadRequest('must provide email and password')
}
const user = await User.findOne({email});
if(!user){
    throw new UnauthenticatedError('invalid credentials')
}
const checkPassword = await user.comparePassword(password);
if(!checkPassword){
    throw new UnauthenticatedError('invalid credetials')
}
const token =  user.createJWT();

res.status(StatusCodes.OK).json({user:{name : user.name} , token})
} 

module.exports = {
    register,
    login
}