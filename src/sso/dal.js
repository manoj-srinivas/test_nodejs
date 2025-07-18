const mysql = require('../../libs/mysqlDB');
const {v4 : uuidv4} = require('uuid')

const JWTVal = async (dataJson) => {
  try {
      let response = {};
      email = dataJson.email; 
        var result = await mysql.selectData(`SELECT EmailID,mobilenumber FROM tempprofile Where EmailID = '${email}' order by id desc limit 1`);
        console.log('result from dal',result);
        if (result.length == 0) {
          response.status = 0;
          response.message = `empty`;
          return response; 
        } 
        response.status = 1;
        response.message = "Record found.";
        response.records = result;
        return response; 
      
  } catch (err) {
    throw err;
  }
};

const validateNumbers = async (dataJson) => {
  try {
      let response = {};
      
      mobilenumber = dataJson.mobilenumber; 
        var result = await mysql.selectData(`SELECT mobilenumber FROM tempprofile Where mobilenumber = '${mobilenumber}'`);
        
        if (result.length == 0) {
          response.status = 0;
          response.message = `Not available`;
          return response; 
        }  
        let result2 = await mysql.selectData(`SELECT mobilenumber,blockStatus FROM userprofile Where mobilenumber = '${mobilenumber}'`);
        response.status = 1;
        if(result2.length>0){
          response.blockStatus = result2[0].blockStatus;
        }
        
        response.message = "Available";
        response.records = result;
        return response; 
      
  } catch (err) {
    throw err;
  }
};

 
/**
 * Exporting the modules
 */
module.exports = { 
  JWTVal,
  validateNumbers
};
