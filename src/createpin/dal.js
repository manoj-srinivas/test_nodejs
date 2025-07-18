const mysql = require('../../libs/mysqlDB');
const validation = require('../../utils/validation');
const config = require('../../utils/config');
const common = require('../../utils/common');
const path = require('path');
const gm = require('gm').subClass({
  imageMagick: true
});
//const client = require('../../libs/elastic');
const _ = require("underscore");
const helper = require('../../utils/helper');
const mailTemplate = require('../../utils/mail-template');
const jwt = require('jsonwebtoken');
const redisDAL = require('../../libs/redis');
const AWS = require('../../libs/AWS');
  
  

 
const createpinfun = async(dataJson) => {
  try{
    let response = {};
   var mobilenumber = dataJson.mobilenumber;
   var ipaddress = dataJson.ipaddress;
   var createpin = dataJson.createpin;

   var result = await mysql.insertData(`INSERT INTO pin (mobilenumber, ipaddress, pin) VALUES ('${mobilenumber}','${ipaddress}','${createpin}')`);        
   response.message = `Records added successfully`;
   response.records = result[0];
  //  console.log(response.message); 
   return response;
  }
  catch (err) {
    throw err;
  }
} 
const checkpinfun = async(dataJson) => {
  try{
    let response = {};
   var mobilenumber = dataJson.mobilenumber;
   var ipaddress = dataJson.ipaddress;
   var createpin = dataJson.createpin;

   var result = await mysql.selectData(`SELECT pin FROM pin Where mobilenumber = '${mobilenumber}' AND ipaddress= '${ipaddress}'`);        
  //  response.message = `Records added successfully`;
  if(result == ""){
   response.message = `empty_data`;
   console.log("msg from dal 48",result);
   return response;
  }else{
    response.records = result[0];
   console.log(response.message); 
   response.message = `data_not_empty`;
   console.log("msg from dal 54",result);
   return response;
  }
   
  }
  catch (err) {
    throw err;
  }
} 



const updatepinfun = async (dataJson) => {
  try{
    let response = {};
    var mobilenumber = dataJson.mobilenumber;
    var ipaddress = dataJson.ipaddress;
    var updatepin = dataJson.createpin;
 
    var result = await mysql.updateData(`UPDATE pin SET pin= '${updatepin}'  WHERE mobilenumber = '${mobilenumber}' AND ipaddress = '${ipaddress}' `);                    
    
    response.message = `Records update successfully`;
    response.records = result[0];
    console.log(response.records); 
    return response;
   }
   catch (err) {
     throw err;
   }
}

const validatepinfun = async (dataJson) => {
  try{
    let response = {};
    var mobilenumber = dataJson.mobilenumber;
    var ipaddress = dataJson.ipaddress;
    var updatepin = dataJson.createpin;
    var checkpin = dataJson.checkpin;
 
    // var result = await mysql.updateData(`UPDATE pin SET pin= '${updatepin}'  WHERE mobilenumber = '${mobilenumber}' AND ipaddress = '${ipaddress}' `);                    
    let result = await mysql.selectData(`SELECT pin FROM pin Where mobilenumber = '${mobilenumber}' AND ipaddress= '${ipaddress}' `);
      
    response.message = `Records update successfully`;
    response.records = result[0];
    console.log(response.records); 
    return response;
   }
   catch (err) {
     throw err;
   }
}
  
 

 
 

/**
 * Exporting the modules
 */
module.exports = { 
  // otp_test,
  // updateCertificate,
  // getUsersList,
  // getsubscriberdetailsResponse,
  // getSubscriberDetailsinsert,
  // getSubscriberDetailsupdate,
  // getSubscriberDetailsupdate_otpvalidation,
  // tokenValidation,
  createpinfun,
  updatepinfun,
  validatepinfun,
  checkpinfun
};
