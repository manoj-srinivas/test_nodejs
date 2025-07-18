const https = require('https'); 
const DAL = require('./dal');
const moment = require('moment');
const { response } = require('express');
const random_name = require('node-random-name');
const common = require('../../utils/common');
const tokenVal = require('../../libs/tokenVal');

 
const DTM= dateandtime();
function dateandtime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}
 
const category = async (req, res) => { 
  try {
    let dataJson={
      limit:req.query.limit
    }
     let response = await DAL.category(dataJson);
    console.log("response", response); 
    return res.status(200).send(
      JSON.stringify(
        {
          message:response.message,
          rows:response.records,          
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}
 
const savednumber = async (req, res) => { 
  try {
    var token = req.headers['x-access-token']; 
    let mobilenumber = await tokenVal.getTokenVal(token);
    if(mobilenumber=='Wrong'){
     res.status(403).send(
       JSON.stringify(
         {
           response: "Wrong email id.",             
         }
       )
       );
    }
        dataJson={
          mobilenumber:mobilenumber
        }
  
     let response = await DAL.savednumber(dataJson);
    console.log("response", response); 
    return res.status(200).send(
      JSON.stringify(
        {
          message:response.message,
          rows:response.records,          
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}
 
const addNumber = async (req, res) => { 
  try {
    var token = req.headers['x-access-token']; 
    let mobilenumber = await tokenVal.getTokenVal(token);
    if(mobilenumber=='Wrong'){
     res.status(403).send(
       JSON.stringify(
         {
           response: "Wrong email id.",             
         }
       )
       );
    }
    var meternumber  = req.body.meternumber;
    let category  = req.params.flag;
    if(meternumber.length!=10){
      return res.status(200).send(
        JSON.stringify(
          {
            message:"Please enter the valid meter number",   

          }
        )
        );
    }else{
    let dataJson={
      meternumber:req.body.meternumber
    }
   var response=await DAL.meternumber(dataJson);
    if(response.status==0){
      let name=random_name({first: true}); 
        dataJson={
        flag:'insert',
        meternumber:req.body.meternumber,
        name:name,
        cdate:DTM,
        category:category
      }
    var  response=await DAL.meternumber(dataJson);
    }
    return res.status(200).send(
      JSON.stringify(
        {
          message:'Meter details',
          response:response,
        }
      )
      );
      }
 
  
  } catch (err) {
    return res.status(500).send(
      JSON.stringify(
        {
          error:error,
        }
      )
      );
  }
  
};

const saveMeter = async (req, res) => { 
  try {
    var token = req.headers['x-access-token']; 
    let mobilenumber = await tokenVal.getTokenVal(token);
    if(mobilenumber=='Wrong'){
     res.status(403).send(
       JSON.stringify(
         {
           response: "Wrong email id.",             
         }
       )
       );
    }
    let category=req.params.flag;
    let dataJson={
      mobilenumber:mobilenumber,
      meternumber:req.body.meternumber,
      category:category
    }
  
     let response = await DAL.saveMeter(dataJson);
    console.log("response", response); 
    return res.status(200).send(
      JSON.stringify(
        {
          response:response
          // rows:response.records,          
        }
      )
      );
    
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
};

const checkMeterNumber = async (req, res) => { 
  try {
    var token = req.headers['x-access-token']; 
    let mobilenumber = await tokenVal.getTokenVal(token);
    if(mobilenumber=='Wrong'){
     res.status(403).send(
       JSON.stringify(
         {
           response: "Wrong email id.",             
         }
       )
       );
    }
        let meternumber  = req.query.meternumber;
        dataJson={
          mobilenumber:mobilenumber,
          meternumber:meternumber
        }
  
     let response = await DAL.checkMeterNumber(dataJson);
    console.log("response", response); 
    return res.status(200).send(
      JSON.stringify(
        {
          response:response,         
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}
const deleteMeter = async (req, res) => { 
  try {
    var token = req.headers['x-access-token']; 
    let mobilenumber = await tokenVal.getTokenVal(token);
    if(mobilenumber=='Wrong'){
     res.status(403).send(
       JSON.stringify(
         {
           response: "Wrong email id.",             
         }
       )
       );
    }
        dataJson={
          mobilenumber:mobilenumber,
          meternumber:req.params.meternumber
        }
  
     let response = await DAL.deleteMeter(dataJson);
    console.log("response", response); 
    return res.status(200).send(
      JSON.stringify(
        {
          message:response.message,
                   
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}
module.exports = {   
category,
// pay,
savednumber,
addNumber,
saveMeter,
checkMeterNumber,
deleteMeter
}

