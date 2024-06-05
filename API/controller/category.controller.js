import '../models/category.model.js';
import url from 'url';

import CategorySchemaModel from '../models/category.model.js';

export const save=async (req,res,next)=>{
 var cList=await CategorySchemaModel.find().sort({_id:-1});
 var _id=cList.length==0?1:cList[0]._id+1;    
 var cDetails={...req.body,"_id":_id};   
 var category=await CategorySchemaModel.create(cDetails);
 if(category)
  res.status(201).json({"status":true});
 else
  res.status(500).json({"status": false});
}

export const fetch=async (req,res,next)=>{
  var condition_obj=url.parse(req.url,true).query;
  var categoryList = await CategorySchemaModel.find(condition_obj);
  if(categoryList.length!=0)
    res.status(201).json(categoryList);
  else
    res.status(500).json({"result": "Server Error"});
 }

 
export const deleteCategory=async(req,res,next)=>{
  var condition_obj=JSON.parse(req.body.condition_obj);
  var category = await CategorySchemaModel.find(condition_obj);
  if(category.length!=0){
    let result = await CategorySchemaModel.deleteMany(condition_obj); 
    if(result)
     res.status(201).json({"msg":"record deleted successfully...."});
    else
     res.status(500).json({error: "Server Error"});
  }
  else
    res.status(404).json({error: "Resource not found"});
} 

export const updateCategory=async(req,res,next)=>{
  let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
  if(cDetails){
     let category=await CategorySchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set: JSON.parse(req.body.content_obj)});   
     if(category)
      res.status(201).json({"msg":"record updated successfully"});
     else
      res.status(500).json({error: "Server Error"});
  }
  else
   res.status(404).json({error: "Requested resource not available"});
}