const mysql = require('../../libs/mysqlDB');
const validation = require('../../utils/validation');
// const config = require('../../utils/config');
const common = require('../../utils/common');
// const path = require('path');
// const gm = require('gm').subClass({
//   imageMagick: true
// });
//const client = require('../../libs/elastic');
const _ = require("underscore");
const helper = require('../../utils/helper');
const mailTemplate = require('../../utils/mail-template');
const jwt = require('jsonwebtoken');
const redisDAL = require('../../libs/redis');
const AWS = require('../../libs/AWS');
  

const config = require('../../utils/config');

const path = require('path');
const gm = require('gm').subClass({
  imageMagick: true
});

const getsubscriberdetailsResponse = async (dataJson) => {
  try {
    let validate = [
      {
        fld: 'mobilenumber',
        value: dataJson.mobilenumber,
        isRequired: false 
      }  
    ]; 
       
      let response = {};
      let condition = [];  
      mobilenumber = dataJson.mobilenumber; 
      ipaddress= dataJson.ipaddress; 
      console.log('validate',validate);
      console.log('mobilenumber',mobilenumber); 
      var result = await mysql.selectData(`SELECT mobilenumber,otp,user_token,created_datetime,ipaddress,status FROM otp_verification Where mobilenumber = '${mobilenumber}' AND ipaddress= '${ipaddress}' AND status !='2' `);
      console.log('result from dal',result);
      if (result.length == 0) {
        response.noContent = true; 
        response.message = `empty`;
        return response; 
      } 
      response.message = `Records found successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response; 
  } catch (err) {
    throw err;
  }
};
const getSubscriberDetailsinsert = async (dataJson) => {
  try {
    let validate = [
      {
        fld: 'mobilenumber',
        value: dataJson.mobilenumber,
        isRequired: false 
      }  
    ]; 
      let response = {};
      let condition = [];  
      mobilenumber = dataJson.mobilenumber;
      var actiontype = dataJson.actiontype;
      var otp = dataJson.otp;    
      var DTM = dataJson.created_datetime; 
      var ipaddress= dataJson.ipaddress;
      if(actiontype == 'insert'){
      var result = await mysql.insertData(`INSERT INTO otp_verification (otp, status, mobilenumber,created_datetime,ipaddress) VALUES ('${otp}',0,'${mobilenumber}','${DTM}','${ipaddress}')`);        
      }
      // console.log("getSubscriberDetailsinsert",result);
      // if (result.length === 0) {
      //   response.noContent = true;
      //   return response; 
      // } 
      response.message = `Records added successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const profieUpdate = async (dataJson) => {
  try {
    // let validate = [
    //   {
    //     fld: 'mobilenumber',
    //     value: dataJson.mobilenumber,
    //     isRequired: false 
    //   }  
    // ]; 
      let response = {};
      let condition = [];  
      // mobilenumber = dataJson.mobilenumber;

      // var mobilenumber= dataJson.mobilenumber;
      // var First_name= dataJson.First_name;
      // var Middle_name= dataJson.Middle_name;
      // var Last_name= dataJson.Last_name;
      // var Nationality= dataJson.Nationality;
      // var Gender= dataJson.Gender;
      // var DOB= dataJson.DOB;
      // var TelephoneNumber= dataJson.TelephoneNumber;
      // var AltTelephoneNumber= dataJson.AltTelephoneNumber;
      // var SMSNumber= dataJson.SMSNumber;
      // var AltMobileNumber= dataJson.AltMobileNumber;
      // var city= dataJson.city;
      // var CityDesc= dataJson.CityDesc;
      // var District= dataJson.District;
      // var DistrictDesc= dataJson.DistrictDesc;
      // var Country= dataJson.Country;
      // var EmailID= dataJson.EmailID;

      var mobilenumber= dataJson.reqFrom_mobilenumber;
      var First_name= dataJson.reqFrom_First_name;
      var Middle_name= dataJson.reqFrom_Middle_name;
      var Last_name= dataJson.reqFrom_Last_name;
      var Nationality= dataJson.reqFrom_Nationality;
      var Gender= dataJson.reqFrom_Gender;
      var DOB= dataJson.reqFrom_DOB;
      var TelephoneNumber= dataJson.reqFrom_TelephoneNumber;
      var AltTelephoneNumber= dataJson.reqFrom_AltTelephoneNumber;
      var SMSNumber= dataJson.reqFrom_SMSNumber;
      var AltMobileNumber= dataJson.reqFrom_AltMobileNumber;
      var city= dataJson.reqFrom_city;
      var CityDesc= dataJson.reqFrom_CityDesc;
      var District= dataJson.reqFrom_District;
      var DistrictDesc= dataJson.reqFrom_DistrictDesc;
      var Country= dataJson.reqFrom_Country;
      var EmailID= dataJson.reqFrom_EmailID;
      var permanent_address_1 = dataJson.reqFrom_permanent_address_1;
      var permanent_address_2 = dataJson.reqFrom_permanent_address_2;
      var state = dataJson.reqFrom_state;
      var zipcode = dataJson.reqFrom_zipcode;
      // if(actiontype == 'insert'){
      // var result = await mysql.insertData(`INSERT INTO profile (otp, status, mobilenumber,created_datetime,ipaddress) VALUES ('${otp}',0,'${mobilenumber}','${DTM}','${ipaddress}')`);        
      // }
      // console.log("getSubscriberDetailsinsert",result);
      // if (result.length === 0) {
      //   response.noContent = true;
      //   return response; 
      // }    
      // var result = await mysql.insertData(`INSERT INTO profile (mobilenumber, First_name, Middle_name,Last_name,Nationality,Gender,DOB,TelephoneNumber,AltTelephoneNumber,SMSNumber,AltMobileNumber,city,CityDesc,District,DistrictDesc,Country,EmailID) VALUES ('${mobilenumber}','${First_name}','${Middle_name}','${Last_name}','${Nationality}','${Gender}','${DOB}','${TelephoneNumber}','${AltTelephoneNumber}','${SMSNumber}','${AltMobileNumber}','${city}','${CityDesc}','${District}','${DistrictDesc}','${Country}','${EmailID}')`);        
      var result = await mysql.updateData(`UPDATE profile SET  First_name='${First_name}', Middle_name='${Middle_name}',Last_name='${Last_name}',Nationality='${Nationality}',Gender='${Gender}',DOB='${DOB}',TelephoneNumber='${TelephoneNumber}',AltTelephoneNumber='${AltTelephoneNumber}',SMSNumber='${SMSNumber}',AltMobileNumber='${AltMobileNumber}',city='${city}',CityDesc='${CityDesc}',District='${District}',DistrictDesc='${DistrictDesc}',Country='${Country}',EmailID='${EmailID}',permanent_address_1='${permanent_address_1}',permanent_address_2='${permanent_address_2}',state= '${state}',zipcode= '${zipcode}' WHERE mobilenumber = '${mobilenumber}'`);
      response.message = `Records added successfully`;
      response.records = result[0];
      // console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const chatprofieUpdate = async (dataJson) => {
  try {  
      let response = {};
      let condition = [];  

      var mobilenumber= dataJson.reqFrom_mobilenumber;
      var Nick_name= dataJson.reqFrom_Nick_name; 
      var DOB= dataJson.reqFrom_DOB;
      var User_interest= dataJson.reqFrom_User_interest;  
      var First_name= dataJson.reqFrom_First_name;
      var Middle_name= dataJson.reqFrom_Middle_name;
      var Last_name= dataJson.reqFrom_Last_name;
      var Nationality= dataJson.reqFrom_Nationality;
      var Gender= dataJson.reqFrom_Gender;
      var DOB= dataJson.reqFrom_DOB;
      var TelephoneNumber= dataJson.reqFrom_TelephoneNumber;
      var AltTelephoneNumber= dataJson.reqFrom_AltTelephoneNumber;
      var SMSNumber= dataJson.reqFrom_SMSNumber;
      var AltMobileNumber= dataJson.reqFrom_AltMobileNumber;
      var city= dataJson.reqFrom_city;
      var CityDesc= dataJson.reqFrom_CityDesc;
      var District= dataJson.reqFrom_District;
      var DistrictDesc= dataJson.reqFrom_DistrictDesc;
      var Country= dataJson.reqFrom_Country;
      var EmailID= dataJson.reqFrom_EmailID;
      var permanent_address_1 = dataJson.reqFrom_permanent_address_1;
      var permanent_address_2 = dataJson.reqFrom_permanent_address_2;
      var state = dataJson.reqFrom_state;
      var zipcode = dataJson.reqFrom_zipcode;
      // var result = await mysql.insertData(`INSERT INTO profile (mobilenumber, nick_name,DOB,user_interest) VALUES ('${mobilenumber}','${Nick_name}','${DOB}','${User_interest}')`);       
      var result = await mysql.insertData(`INSERT INTO profile (mobilenumber, nick_name,DOB,user_interest,First_name,Middle_name,Last_name,Nationality,Gender,TelephoneNumber,AltTelephoneNumber,SMSNumber,AltMobileNumber,city,CityDesc,District,DistrictDesc,Country,EmailID,permanent_address_1,permanent_address_2,state,zipcode) VALUES ('${mobilenumber}','${Nick_name}','${DOB}','${User_interest}','${First_name}','${Middle_name}','${Last_name}','${Nationality}','${Gender}','${TelephoneNumber}','${AltTelephoneNumber}','${SMSNumber}','${AltMobileNumber}','${city}','${CityDesc}','${District}','${DistrictDesc}','${Country}','${EmailID}','${permanent_address_1}','${permanent_address_2}','${state}','${zipcode}')`);        

      // var result = await mysql.updateData(`UPDATE profile SET  First_name='${First_name}', Middle_name='${Middle_name}',Last_name='${Last_name}',Nationality='${Nationality}',Gender='${Gender}',DOB='${DOB}',TelephoneNumber='${TelephoneNumber}',AltTelephoneNumber='${AltTelephoneNumber}',SMSNumber='${SMSNumber}',AltMobileNumber='${AltMobileNumber}',city='${city}',CityDesc='${CityDesc}',District='${District}',DistrictDesc='${DistrictDesc}',Country='${Country}',EmailID='${EmailID}' WHERE mobilenumber = '${mobilenumber}'`);
      response.message = `Records added successfully`;
      response.records = result[0];
      // console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const profileCheck = async (dataJson) => {
  try {
    let profilecheckresponse = {};
    var mobilenumber = dataJson.mobilenumber;
    var result = await mysql.selectData(`SELECT mobilenumber FROM profile  Where mobilenumber = '${mobilenumber}'`);
    console.log('result from dal',result);
    if (result.length == 0) {
      // response.noContent = true; 
      profilecheckresponse.message = `empty`;
      profilecheckresponse.status = `0`;

      return profilecheckresponse; 
    } 
    // response.message = `Records found successfully`;
    // profilecheckresponse.records = result[0];
    profilecheckresponse.message = `notnull`;
    profilecheckresponse.status = `1`;


    // console.log(response.records); 
    return profilecheckresponse;

  } catch (err){
    throw err;
  }
}
const profileCreate = async (dataJson) => {
  try {
    var profileCreateresponse ={};
    var mobilenumber = dataJson.mobilenumber;
    var result = await mysql.insertData(`INSERT INTO profile (mobilenumber) VALUES ('${mobilenumber}')`);
    console.log('result from dal',result);
     
    // response.message = `Records found successfully`;
    // response.records = result[0];
    
    profileCreateresponse.message = `DATA INSERTEDS`;

    // console.log(response.records); 
    return profileCreateresponse;

  } catch (err){
    throw err;
  }
}

const profiledatamatchCheck = async (dataJson) => {
  try {
    let profiledatamatchCheckresponse = {};
    console.log("data josn passing",dataJson);
    var mobilenumber = dataJson.mobilenumber;
    console.log("data josn passing mobilenumber",mobilenumber);

    var result = await mysql.selectData(`SELECT * FROM profile  Where mobilenumber = '${mobilenumber}'`);
    console.log('result from dal',result);
    if (result.length == 0) {
      // response.noContent = true; 
      profiledatamatchCheckresponse.message = `empty`;
     console.log('profiledatamatchCheckresponse not null 185',profiledatamatchCheckresponse.message);
      return profiledatamatchCheckresponse; 
    } else{
    // response.message = `Records found successfully`;
    profiledatamatchCheckresponse.records = result[0];
    profiledatamatchCheckresponse.message = `notnull`;
    console.log('profiledatamatchCheckresponse not null 190',profiledatamatchCheckresponse.message);

    
    return profiledatamatchCheckresponse;
    }

    // console.log(response.records); 

  } catch (err){
    throw err;
  }
}
const getSubscriberDetailsupdate = async (dataJson) => {
  try {
    let validate = [
      {
        fld: 'mobilenumber',
        value: dataJson.mobilenumber,
        isRequired: false 
      }  
    ]; 
      let response = {};
      let condition = [];  
      mobilenumber = dataJson.mobilenumber;
      var actiontype = dataJson.actiontype;
      var otp = dataJson.otp;    
      var ipaddress = dataJson.ipaddress;
      var DTM = dataJson.created_datetime;
      if(actiontype == 'update'){ 
        var result = await mysql.updateData(`UPDATE otp_verification SET status= '2',otp='${otp}'  WHERE mobilenumber = '${mobilenumber}' AND ipaddress = '${ipaddress}' `);                    
      }
      if(actiontype == 'elsetimeoutupdate'){ 
        var result = await mysql.updateData(`UPDATE otp_verification SET status= '0',otp='${otp}',created_datetime='${DTM}'  WHERE mobilenumber = '${mobilenumber}' AND ipaddress = '${ipaddress}' `);                    
        console.log('otp resend because time out ---------',result); 
      }
      console.log(result); 
      console.log("getSubscriberDetailsupdate",result); 
      response.message = `Records found successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};

const getSubscriberDetailsupdate_otpvalidation = async (dataJson) => {
  try {
    let validate = [
      {
        fld: 'mobilenumber',
        value: dataJson.mobilenumber,
        isRequired: false 
      }  
    ]; 
      let response = {};
      let condition = [];  
      var mobilenumber = dataJson.mobilenumber;
      var ipaddress = dataJson.ipaddress;

      // var token = dataJson.user_token;
      var status = dataJson.status; 
      let tokenUserDta = {
        mobilenumber: dataJson.mobilenumber,
        // token: dataJson.user_token,
        ipaddress: dataJson.ipaddress,
      };
      tokenUserDta = common.JSONBuilder(tokenUserDta);
      const token = jwt.sign(tokenUserDta, config.jwtSecret, config.jwtOptions);
      let encodeToken = encodeURIComponent(token);
      var result = await mysql.updateData(`UPDATE otp_verification SET status= '${status}',user_token = '${encodeToken}'  WHERE mobilenumber = '${mobilenumber}' AND ipaddress='${ipaddress}' AND status !='2' `);
      console.log("getSubscriberDetailsupdate_otpvalidation",result); 
      response.message = `getSubscriberDetailsupdate_otpvalidation Records update successfully`;
      response.tokenrecords = encodeToken;
      // console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};

const getUsersList = async (dataJson) => {
  try {
    let validate = [{
        fld: 'status',
        value: dataJson.status,
        isRequired: true 
      },
      {
        fld: 'mobilenumber',
        value: dataJson.mobilenumber,
        isRequired: false 
      },
      {
        fld: 'otp',
        value: dataJson.otp,
        isRequired: true 
      } 
    ]; 
       
      let response = {};
      let condition = [];  
      mobilenumber = dataJson.mobilenumber; 
      
      let result = await mysql.selectData(`SELECT mobilenumber,otp,user_token,created_datetime,ipaddress,status FROM otp_verification Where mobilenumber = '${mobilenumber}' AND status = '0' AND ipaddress= '${ipaddress}' `);
      
      console.log(result);
      if (result.length === 0) {
        response.noContent = true;
        return response;
      } 
      response.message = `Records found successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};


const tokenValidation = async (dataJson) =>{
  try {
    mobilenumber = dataJson.mobilenumber; 
    ipaddress = dataJson.ipaddress; 
    token = dataJson.token; 
    let response = {};
    let result = await mysql.selectData(`SELECT mobilenumber,otp,user_token,created_datetime,ipaddress,status FROM otp_verification Where mobilenumber = '${mobilenumber}' AND status = '1' AND ipaddress= '${ipaddress}' `);
    // console.log(result); 
    if (result.length === 0) {
      response.noContent = true;
      return response;
    } 
    response.message = `Records found successfully`;
    response.records = result[0];
    // response.records = result;    
    // console.log(response.records); 
    return response;
  }catch (err) {
    throw err;
  }
}

const ninCreate = async(dataJson) =>{
  var status = dataJson.status; 
  var ninMobilenumber = dataJson.ninMobilenumber;
  console.log("mobile number",ninMobilenumber);
  var nin = dataJson.defaultNin; 
  var otp =  dataJson.otp; 
  var created_datetime = dataJson.DTM;
  try{
    let response = {}; 
    var result = await mysql.insertData(`INSERT INTO nin (mobilenumber, status, nin,otp,created_datetime) VALUES ('${ninMobilenumber}','${status}','${nin}','${otp}','${created_datetime}')`);        
    // if (result.length === 0) {
    //   response.noContent = true;
    //   return response;
    // } 
    response.message = `Otp created successfully`;
    response.records = result; 
    response.status  = '1';
    if(result == ''){
      response.status  = '0';
    }else{
      response.status  = '1';
    } 
    return response;
  }catch(err){
    throw(err);
  }
}
const ninVerify = async(dataJson) =>{
  var status = dataJson.status;  
  var insertId = dataJson.insertId; 
  var otp =  dataJson.otp; 
  var created_datetime = dataJson.DTM;
  try{
    let response = {}; 
    let result = await mysql.selectData(`SELECT * FROM nin Where id='${insertId}'  AND status = '${status}'`);
    if(result == ''){
    response.records = 'null'; 
    response.status  = '0'; 
    }else{
    response.records = result[0]; 
    response.status  = '1'; 
    } 
    return response;
  }catch(err){
    throw(err);
  }
}


const checkOtp = async(dataJson) =>{
  var status = dataJson.status; 
  var mobilenumber = dataJson.mobilenumber; 
  console.log("mobile number",mobilenumber);
  var nin = dataJson.nin; 
  var ipaddress =  dataJson.ipaddress; 

  try{
    let response = {}; 
    // var result = await mysql.insertData(`INSERT INTO nin (mobilenumber, status, nin,otp) VALUES ('${mobilenumber}','${status}','${nin}','${otp}')`);        
    let result = await mysql.selectData(`SELECT mobilenumber,otp,nin,ipaddress,created_datetime FROM nin Where mobilenumber = '${mobilenumber}' AND status = '0' AND ipaddress = '${ipaddress}'  `);
    
    // if (result.length === 0) {
    //   response.noContent = true;
    //   return response;
    // } 
    response.message = `Records found successfully`;
    response.records = result[0]; 
    console.log('response.records',response.records);
    return response;
  }catch(err){
    throw(err);
  }
}

const ninstatusUpdate= async(dataJson) =>{
  var status = dataJson.status; 
  var mobilenumber = dataJson.mobilenumber; 
  console.log("mobile number",mobilenumber);
  var nin = dataJson.nin; 
  var ipaddress =  dataJson.ipaddress; 

  try{
    let response = {}; 
    // var result = await mysql.insertData(`INSERT INTO nin (mobilenumber, status, nin,otp) VALUES ('${mobilenumber}','${status}','${nin}','${otp}')`);        
    // let result = await mysql.updateData(`SELECT mobilenumber,otp,nin,ipaddress,created_datetime FROM nin Where mobilenumber = '${mobilenumber}' AND status = '0' AND ipaddress = '${ipaddress}'  `);
    var result = await mysql.updateData(`UPDATE nin SET  status='${status}' WHERE mobilenumber = '${mobilenumber}' AND ipaddress ='${ipaddress}' `);
      
    // if (result.length === 0) {
    //   response.noContent = true;
    //   return response;
    // } 
    response.message = `Records update successfully`;
    response.records = result[0]; 
    console.log('response.records',response.records);
    return response;
  }catch(err){
    throw(err);
  }
}

// const ninotpUpdate= async(dataJson) =>{
//   var status = dataJson.status; 
//   var mobilenumber = dataJson.mobilenumber; 
//   console.log("mobile number",mobilenumber);
//   // var nin = dataJson.nin; 
//   var ipaddress =  dataJson.ipaddress;  
//   var created_datetime	= dataJson.created_datetime;
//   try{
//     let response = {}; 
//     // var result = await mysql.insertData(`INSERT INTO nin (mobilenumber, status, nin,otp) VALUES ('${mobilenumber}','${status}','${nin}','${otp}')`);        
//     // let result = await mysql.updateData(`SELECT mobilenumber,otp,nin,ipaddress,created_datetime FROM nin Where mobilenumber = '${mobilenumber}' AND status = '0' AND ipaddress = '${ipaddress}'  `);
//     var result = await mysql.updateData(`UPDATE nin SET  status='${status}',created_datetime ='${created_datetime}' WHERE mobilenumber = '${mobilenumber}' AND ipaddress ='${ipaddress}' `);
      
//     // if (result.length === 0) {
//     //   response.noContent = true;
//     //   return response;
//     // } 
//     response.message = `Records update successfully`;
//     // response.records = result[0]; 
//     // console.log('response.records',response.records);
//     return response;
//   }catch(err){
//     throw(err);
//   }
// }
const linkNumberlist= async(dataJson) =>{
  // var status = dataJson.status; 
  var mobilenumber = dataJson.mobilenumber;  
  try{
    let response = {};  
    let result = await mysql.selectData(`SELECT * FROM link Where mobilenumber = '${mobilenumber}' AND status = '1'`);
    console.log('result',result);
    
    response.message = `Records found successfully`;
    if(result == ''){
      response.status = '0';       
      response.records = ""; 
    }else{
      response.status = '1';       
      response.records = result; 
    }
    // console.log('response.records',response.records);
    return response;
  }catch(err){
    throw(err);
  }
}

const ninOtpUpdate = async(dataJson) =>{
  var status = dataJson.status; 
  var insertId = dataJson.insertId; 

  var mobilenumber =  dataJson.mobilenumber;  
  try{
    let response = {}; 
    var result = await mysql.updateData(`UPDATE nin SET  status='${status}' WHERE id = '${insertId}' AND mobilenumber ='${mobilenumber}' order by id desc limit 1 `);
      
    response.message = `Records update successfully`;
    // response.records = result[0]; 
    // console.log('response.records',response.records);
    return response;
  }catch(err){
    throw(err);
  }
}
const ninNewOtpUpdate = async(dataJson) =>{ 
  var insertId  = dataJson.insertId;  
  var otp       = dataJson.otp; 
  var DTM       = dataJson.newDTM; 
  var mobilenumber =  dataJson.mobilenumber;  
  try{
    let response = {}; 
    let result = await mysql.updateData(`UPDATE nin SET otp='${otp}',status='0',created_datetime='${DTM}' WHERE id = '${insertId}'`);
    let record = await mysql.selectData(`SELECT mobilenumber from nin WHERE id = '${insertId}' `);
    response.record=record[0].mobilenumber;
    response.message = `Records update successfully`; 
    return response;
  }catch(err){
    throw(err);
  }
} 

const getUserProfileData = async(dataJson) => {
  try{
    let mobilenumber = dataJson.mobilenumber;
    let response = {};  
    let result = await mysql.selectData(`SELECT mobilenumber,nick_name  FROM profile Where mobilenumber = '${mobilenumber}'`);
    response.message = 'recordFound';
    response.records = result[0];
    return response;    
  }catch(err){
    throw(err);
  }
}
 

/**
 * Exporting the modules
 */
module.exports = { 
  // otp_test,
  // updateCertificate,
  getUsersList,
  getsubscriberdetailsResponse,
  getSubscriberDetailsinsert,
  getSubscriberDetailsupdate,
  getSubscriberDetailsupdate_otpvalidation,
  tokenValidation,
  profieUpdate,
  profileCreate,
  profileCheck,
  profiledatamatchCheck,
  chatprofieUpdate,
  ninCreate,
  checkOtp,
  ninstatusUpdate,
  // ninotpUpdate,
  linkNumberlist,
  ninVerify,
  ninOtpUpdate,
  ninNewOtpUpdate,
  getUserProfileData,
};
