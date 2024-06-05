import '../models/connection.js';
import url from 'url';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import sendMail from './mailapi.controller.js';
import UserSchemaModel from '../models/user.model.js';

export const save=async (req,res,next)=>{
 var userList=await UserSchemaModel.find().sort({_id:-1});
 var _id=userList.length==0?1:userList[0]._id+1;    
 var userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()};
 try
 {
  var user=await UserSchemaModel.create(userDetails);
  sendMail(user.email,user.password);
  res.status(201).json({"status":true});
 }
 catch(err)
 {
   console.log(err);
   res.status(500).json({"status": false});
 } 
}

export const login=async (req,res,next)=>{
 var condition_obj={...req.body,"status":1};
 var userList=await UserSchemaModel.find(condition_obj);
 if(userList.length!=0)
 {
  var payload={"email":userList[0].email}; 
  var key=rs.generate();
  var token=jwt.sign(payload,key); 
  res.status(200).json({"status":true,"token":token,"userDetails":userList[0]});
 } 
 else
  res.status(404).json({"status":false,"token":"error"});    
}

export const fetch=async (req,res,next)=>{
  var condition_obj=url.parse(req.url,true).query;
  var userList = await UserSchemaModel.find(condition_obj);
  if(userList.length!=0)
    res.status(201).json(userList);
  else
    res.status(500).json({"result": "Server Error"});
 }
 
 export const updateUser=async(req,res,next)=>{
  let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
  if(userDetails)
  {
     let user=await UserSchemaModel.updateOne(req.body.condition_obj,{$set: req.body.content_obj});   
     if(user)
      res.status(201).json({"msg":"record updated successfully"});
     else
      res.status(500).json({error: "Server Error"});
  }
  else
   res.status(404).json({error: "Requested resource not available"});  
}

export const deleteUser=async(req,res,next)=>{
  var condition_obj=(req.body);
  var user = await UserSchemaModel.find(condition_obj);
  if(user.length!=0){
    let result = await UserSchemaModel.deleteMany(condition_obj); 
    if(result)
     res.status(201).json({"msg":"record deleted successfully...."});
    else
     res.status(500).json({error: "Server Error"});
  }
  else
    res.status(404).json({error: "Resource not found"}); 
}