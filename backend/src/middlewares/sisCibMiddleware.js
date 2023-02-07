const jwt = require('jsonwebtoken');
// const { end } = require('../models/connection');
require('dotenv').config();
const secret = process.env.JWT_SECRET

const validateFieldTitle = (request,response, next) => {
const {body}= request;
if(body.title === undefined){
  return  response.status(400).json({message: 'the field "title" is required' });
}
if(body.title === ''){
  return  response.status(400).json({message: 'title cannot be empty' });
}

next();
}


const validateFieldStatus = (request,response, next) => {
const {body}= request;
if(body.status === undefined){
  return  response.status(400).json({message: 'the field "status" is required' });
}
if(body.status === ''){
  return  response.status(400).json({message: 'status cannot be empty' });
}

next();
};

const validateLogin = (request,response,next)=>{
  const {body}= request;

if(body.user === undefined){
  return  response.status(401).json({message: 'the field "user" is required' });
}
if(body.user === ''){
  return  response.status(401).json({message: 'user cannot be empty' });
}
if(body.password === undefined){
  return  response.status(401).json({message: 'the field "password" is required' });
}
if(body.password === ''){
  return  response.status(401).json({message: 'password cannot be empty' });
}


next();

}

const verifyLogin = (request,response,next)=>{
  const token = request.headers['x-access-token'];
  jwt.verify(token,secret,(err,decoded) => {
      if (err) return response.status(401).json({message: 'Acesso negado!'}).end();
      request.userID = decoded.userID;
      next() 
        
     
  })
}


module.exports= {
    validateFieldTitle,
    validateFieldStatus,
    validateLogin,
    verifyLogin,
}