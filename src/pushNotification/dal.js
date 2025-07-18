const mysql = require('../../libs/mysqlDB');
const config = require('../../utils/config');
const common = require('../../utils/common');
const jwt = require('jsonwebtoken');
const moment = require('moment');
  

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
      let response = {};
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
      // mobilenumber = dataJson.mobilenumber;
      var mobilenumber= dataJson.mobilenumber;
      var First_name= dataJson.First_name;
      var Middle_name= dataJson.Middle_name;
      var Last_name= dataJson.Last_name;
      var Nationality= dataJson.Nationality;
      var Gender= dataJson.Gender;
      var DOB= dataJson.DOB;
      var TelephoneNumber= dataJson.TelephoneNumber;
      var AltTelephoneNumber= dataJson.AltTelephoneNumber;
      var SMSNumber= dataJson.SMSNumber;
      var AltMobileNumber= dataJson.AltMobileNumber;
      var city= dataJson.city;
      var CityDesc= dataJson.CityDesc;
      var District= dataJson.District;
      var DistrictDesc= dataJson.DistrictDesc;
      var Country= dataJson.Country;
      var EmailID= dataJson.EmailID;
      // if(actiontype == 'insert'){
      // var result = await mysql.insertData(`INSERT INTO profile (otp, status, mobilenumber,created_datetime,ipaddress) VALUES ('${otp}',0,'${mobilenumber}','${DTM}','${ipaddress}')`);        
      // }
      // console.log("getSubscriberDetailsinsert",result);
      // if (result.length === 0) {
      //   response.noContent = true;
      //   return response; 
      // } 
      // var result = await mysql.insertData(`INSERT INTO profile (mobilenumber, First_name, Middle_name,Last_name,Nationality,Gender,DOB,TelephoneNumber,AltTelephoneNumber,SMSNumber,AltMobileNumber,city,CityDesc,District,DistrictDesc,Country,EmailID) VALUES ('${mobilenumber}','${First_name}','${Middle_name}','${Last_name}','${Nationality}','${Gender}','${DOB}','${TelephoneNumber}','${AltTelephoneNumber}','${SMSNumber}','${AltMobileNumber}','${city}','${CityDesc}','${District}','${DistrictDesc}','${Country}','${EmailID}')`);        
      var result = await mysql.updateData(`UPDATE profile SET  First_name='${First_name}', Middle_name='${Middle_name}',Last_name='${Last_name}',Nationality='${Nationality}',Gender='${Gender}',DOB='${DOB}',TelephoneNumber='${TelephoneNumber}',AltTelephoneNumber='${AltTelephoneNumber}',SMSNumber='${SMSNumber}',AltMobileNumber='${AltMobileNumber}',city='${city}',CityDesc='${CityDesc}',District='${District}',DistrictDesc='${DistrictDesc}',Country='${Country}',EmailID='${EmailID}' WHERE mobilenumber = '${mobilenumber}'`);
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
      return profilecheckresponse; 
    } 
    // response.message = `Records found successfully`;
    // profilecheckresponse.records = result[0];
    profilecheckresponse.message = `notnull`;

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
      let response = {};
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
      let response = {};
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
       
      let response = {};
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
     console.log(result); 
    if (result.length == 0) {
      response.noContent = true;
      response.records = 0;
      return response;
    } else{    
    response.message = `Records found successfully`;
    response.records = result[0];
    // response.records = result;    
    console.log("response.records",response.records); 
    return response;
    }
  }catch (err) {
    throw err;
  }
}

const transaction = async (dataJson) =>{
  try {
    mobilenumber = dataJson.mobilenumber; 
    ipaddress = dataJson.ipaddress; 
    token = dataJson.token; 
    let response = {};
    let result = await mysql.selectData(`SELECT mobilenumber,otp,user_token,created_datetime,ipaddress,status FROM otp_verification Where mobilenumber = '${mobilenumber}' AND status = '1' AND ipaddress= '${ipaddress}' `);
    // console.log(result); 
    if (result.length == 0) {
      response.noContent = true;
      return response;
    } 
    response.message = `Records found successfully`;
    response.records = result[0];
    // response.records = result;    
    console.log(response.records); 
    return response;
  }catch (err) {
    throw err;
  }
}

const paymentTransactionHistory = async (dataJson) =>{
  try {
    paymode = dataJson.paymode; 
    tx_ref = dataJson.tx_ref; 
    type = dataJson.type; 
    shop = dataJson.shop; 
    amount = dataJson.amount; 
    currency = dataJson.currency; 
    mobilenumber = dataJson.mobilenumber; 
    ipaddress = dataJson.ipaddress; 
    transaction_data = dataJson.transaction_data; 
    token = dataJson.token; 
    let response = {};
    const createdDTM = dateandtime();
   let result = await mysql.insertData(`INSERT INTO transaction (mobilenumber,ipaddress,paymode,tx_ref,type,shop,amount,currency,transaction_data,transactionDate)
    VALUES (${mobilenumber},'${ipaddress}','${paymode}','${tx_ref}','${type}','${shop}','${amount}','${currency}','${JSON.stringify(transaction_data)}','${createdDTM}')`);
   response.message = `Records added successfully`; 
    response.records = result;    
    return response;
  }catch (err) {
    throw err;
  }
}
function dateandtime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}

const historyBasedOnDates = async (dataJson) =>{
  try {
   let response = {};

    let result = await mysql.selectData(`SELECT * from transaction where transactionDate between '${dataJson.fromdate}' AND '${dataJson.todate}' AND mobilenumber='${dataJson.numbers}' order by transactionDate desc`);
    console.log(result); 
    response.message = `Records found successfully`;
    response.records = result;
    response.state='success';
    //  response.records = result;    
     console.log(response.records); 
    return response;
  }catch (err) {
    throw err;
  }
};
const filters = async (dataJson) =>{
  try {

    limit = dataJson.limit; 
    type = dataJson.type; 
    shop = dataJson.shop; 
    amount = dataJson.amount; 
    number = dataJson.number; 
    
   let response = {};
   if(shop!='' && type!='' && amount!='' && limit!=''){
    var result = await mysql.selectData(`SELECT * from transaction where type like '%${type}%' and shop like '%${shop}%' and mobilenumber='${number}' order by amount ${amount}  limit ${limit}`);
   }else if(shop!='' && type=='' && amount!='' && limit!=''){
    var result = await mysql.selectData(`SELECT * from transaction where shop like '%${shop}%' and mobilenumber='${number}' order by amount ${amount}  limit ${limit}`);
   }
   else if(shop=='' && type!='' && amount!='' && limit!=''){
    var result = await mysql.selectData(`SELECT * from transaction where  type like '%${type}%' and mobilenumber='${number}' order by amount ${amount}  limit ${limit}`);
   }
   else if(shop=='' && type=='' && amount!='' && limit!=''){
    var result = await mysql.selectData(`SELECT * from transaction where  mobilenumber='${number}' order by amount ${amount} limit ${limit}`);
   }
   else if(shop=='' && type=='' && amount=='' && limit!=''){
    var result = await mysql.selectData(`SELECT * from transaction  where  mobilenumber='${number}' order by idtransaction desc limit ${limit}`);
   }
   else if(shop!='' && type!='' && amount!='' && limit==''){
    var result = await mysql.selectData(`SELECT * from transaction where type like '%${type}%' and shop like '%${shop}%'  order by '${amount}' desc`);
   }else{
    var result = await mysql.selectData(`SELECT * from transaction  order by idtransaction desc`);
   }
  
    console.log(result); 
    response.message = `Records found successfully`;
    response.records = result;
    response.state='success';
    //  response.records = result;    
     console.log(response.records); 
    return response;
  }catch (err) {
    throw err;
  }
};
const details = async (dataJson) =>{
  try {
   let response = {};
    let result = await mysql.selectData(`SELECT * from transaction where idtransaction=${dataJson.transactionid}`);
    // console.log(result); 
    response.message = `Records found successfully`;
    response.records = result;
    response.state='success';
    //  response.records = result;    
     console.log(response.records); 
    return response;
  }catch (err) {
    throw err;
  }
};
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
  transaction,
  paymentTransactionHistory,
  historyBasedOnDates,
  filters,
  details
  
};
