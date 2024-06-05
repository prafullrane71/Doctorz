import '../models/connection.js';
import url from 'url';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import path from 'path';
import sendMail from './mailapi.controller.js';
const __dirname = url.fileURLToPath(new URL('.',import.meta.url));
import DoctorSchemaModel from '../models/doctor.model.js';

export const save=async (req,res,next)=>{
  var doctorList=await DoctorSchemaModel.find().sort({_id:-1});
  var _id=doctorList.length==0?1:doctorList[0]._id+1;    
 
  var fileobj=req.files.profilepic;
  var filename=rs.generate(10)+"-"+Date.now()+"-"+fileobj.name;
  
  var uploadpath=path.join(__dirname,
    "../../UI/public/assets/uploads/profilepic",filename);
  fileobj.mv(uploadpath);
 
  var doctorDetails={...req.body,"profilepic":filename,"_id":_id,"status":0,"role":"doctor","info":Date()};   
 
  try
  {
   var pwd=rs.generate(7);   
   doctorDetails.password=pwd;
   var doctor=await DoctorSchemaModel.create(doctorDetails);
   sendMail(doctor.email,pwd);
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
 var doctorList=await DoctorSchemaModel.find(condition_obj);
 if(doctorList.length!=0)
 {
  var payload={"email":doctorList[0].email}; 
  var key=rs.generate();
  var token=jwt.sign(payload,key); 
  res.status(200).json({"status":true,"token":token,"doctorDetails":doctorList[0]});
 } 
 else
  res.status(404).json({"status":false,"token":"error"});    
}

export const fetch=async (req,res,next)=>{
  var condition_obj=url.parse(req.url,true).query;
  console.log(condition_obj);
  var doctorList = await DoctorSchemaModel.find(condition_obj);
  if(doctorList.length!=0)
    res.status(201).json({doctorDetails: doctorList});
  else
    res.status(500).json({"result": "Server Error"});
 }
 
 export const updateDoctor=async(req,res,next)=>{
  let doctorDetails = await DoctorSchemaModel.findOne(req.body.condition_obj);
  if(doctorDetails)
  {
     let doctor=await DoctorSchemaModel.updateOne(req.body.condition_obj,{$set: req.body.content_obj});   
     if(doctor)
      res.status(201).json({"msg":"record updated successfully"});
     else
      res.status(500).json({error: "Server Error"});
  }
  else
   res.status(404).json({error: "Requested resource not available"});  
}

export const deleteDoctor=async(req,res,next)=>{
  var condition_obj=(req.body);
  var doctor = await DoctorSchemaModel.find(condition_obj);
  if(doctor.length!=0){
    let result = await DoctorSchemaModel.deleteMany(condition_obj); 
    if(result)
     res.status(201).json({"msg":"record deleted successfully...."});
    else
     res.status(500).json({error: "Server Error"});
  }
  else
    res.status(404).json({error: "Resource not found"}); 
}