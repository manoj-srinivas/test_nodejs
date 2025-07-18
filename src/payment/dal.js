const mysql = require('../../libs/mysqlDB');
const validation = require('../../utils/validation');
const config = require('../../utils/config');
const common = require('../../utils/common');
const path = require('path');
const moment = require('moment');
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
const fcm =  require('../../libs/fcm');
  

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
    let result = await mysql.selectData(`SELECT mobilenumber,otp,user_token,created_datetime,ipaddress,status FROM otp_verification Where mobilenumber = '${mobilenumber}' AND status = '1'  order by id desc limit 1 `);
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
    let response={};

 let transaction_data=JSON.stringify(verficationResponse);
let tx_ref=verficationResponse.data.tx_ref;
let payment_type=verficationResponse.data.payment_type;
let status=verficationResponse.status;
let amount_settled=verficationResponse.data.amount_settled;
let charged_amount=verficationResponse.data.charged_amount;
let currency=verficationResponse.data.currency; 
let created_at=moment(verficationResponse.data.created_at).format('YYYY-MM-DD HH:mm:ss');
let items=JSON.stringify(dataJson.items);
let userinfo=await mysql.selectData(`SELECT type from  profile where mobilenumber='${dataJson.mobilenumber}' order by id desc limit 1`);    
let checkPayment=await mysql.selectData(`SELECT transactionId,transactionSeqNO from  transaction where transactionId='${dataJson.transactionId}' order by transactionSeqNO desc limit 1`);   
if(checkPayment.length<=0){
  let result = await mysql.insertData(`INSERT INTO transaction (transactionId,mobileNo,profileNo,payType,transactionRefNo,payMode,flag,amount,currency,transactionData,registrationNo,invoice,total,transactionDate,payStatus,items,gatewayType) 
  VALUES ('${dataJson.transactionId}','${dataJson.mobilenumber}','${dataJson.profileNo}','${userinfo[0].type}','${tx_ref}','${payment_type}','${dataJson.flag}','${charged_amount}','${currency}','${transaction_data}','${dataJson.reg_no}','${dataJson.invoice}','${amount_settled}','${created_at}','${status}','${items}','${dataJson.gatewayType}')`);
}     

 
    let deviceToken=await mysql.selectData(`SELECT deviceToken from  devicedetails where mobilenumber='${dataJson.mobilenumber}' order by id desc limit 1`);        
    if(deviceToken.length>0){
      var dataJson3 = {
        title:'Payment successful',
        body:payment_type+'payment is successfully done',
        deviceToken: deviceToken[0].deviceToken,
      }
      //  response=  await fcm.sendNotification(dataJson3);
       response = { status: "success" };
     }
     if(status=='success'){
      response.message = `Your transaction is `+verficationResponse.data.processor_response; 
      response.transactionId = dataJson.transactionId;   
      response.tx_ref = dataJson.tx_ref;   
      response.invoiceId = dataJson.invoice;   
      response.transactionDate = created_at;   
      response.pdfUrl=process.env.PUBLIC_ORIGIN+"/uploads/pdf/transactionhistory.pdf";
      return response;
     }
     else{
      response.message = `Your transaction is `+verficationResponse.data.processor_response; 
      return response;
     }
  

  }catch (err) {
    throw err;
  }
}
 
const historyBasedOnDates = async (dataJson) =>{
  try {
   let response = {};
    // let result = await mysql.selectData(`SELECT * from transaction where (transactionDate >= '${dataJson.fromdate}' AND transactionDate <='${dataJson.todate}') AND mobileNo='${dataJson.number}' order by transactionDate desc limit ${dataJson.limit}`);
    let result = await mysql.selectData(`SELECT * from transaction where (date(transactionDate) >= '${dataJson.fromdate}' AND date(transactionDate) <='${dataJson.todate}') AND profileNo='${dataJson.number}' order by transactionDate desc`);
    const record = result.map((item) => ({
      ...item,
      transactionDate:moment(item.transactionDate).format('YYYY-MM-DD HH:mm:ss'),
      transactionRefNo: item.transactionRefNo.substring(0, 10),
     
    }));
    
    let result2={
      rows:[
        {
         "Date":"21/03/2021",
         "Transaction":"Call Recharges",
         "amount":17,
         "currency":"R"
      },
      {
       "Date":"21/03/2021",
       "Transaction":"250 MB Bundle Disc",
       "amount":17,
       "currency":"R"
    }
     ]
    }
    response.records=record;
    response.extra = result2;
    
    if(result.length>0){
      response.state='success';
      console.log(response.records); 
    }
    return response;
  }catch (err) {
    throw err;
  }
};


const filters = async (dataJson) =>{
  try {
    limit = dataJson.limit; 
    type = dataJson.type; 
    flag = dataJson.flag; 
    shortKey = dataJson.shortKey; 
    number = dataJson.number; 
    sortOrder=dataJson.sortOrder;
   let response = {};
   let arrayResult=[];
   let condition;
   if(flag!=undefined && type!=undefined && shortKey!=undefined && limit!=undefined){
    condition = `payType like '%${type}%' and flag like '%${flag}%' and profileNo='${number}' order by  ${shortKey} ${sortOrder} limit ${limit}`;
   }else if(flag!=undefined && type==undefined && shortKey!='' && limit!=undefined){
     condition = `flag like '%${flag}%' and profileNo='${number}' order by ${shortKey} ${sortOrder} limit ${limit}`;
   }
   else if(flag==undefined && type!=undefined && shortKey!=undefined && limit!=undefined){
     condition = `payType like '%${type}%' and profileNo='${number}' order by  ${shortKey} ${sortOrder}  limit ${limit}`;
   }
   else if(flag==undefined && type==undefined && shortKey!=undefined && limit!=undefined){
     condition =  `profileNo='${number}' order by  ${shortKey} ${sortOrder} limit ${limit}`;
   }
   else if(flag!=undefined && type!=undefined && shortKey!=undefined && limit==undefined){
     condition = `profileNo='${number}' and payType like '%${type}%' and flag like '%${flag}%'  order by '${amount}' desc`;
   } else if(flag==undefined && type==undefined && shortKey==undefined && limit!=undefined && number!=undefined){
     condition = `profileNo='${number}'  order by transactionSeqNO desc limit ${limit}`;
   }else{
     condition = `profileNo='${number}' order by transactionSeqNO desc`;
   }
   let result = await mysql.selectData(`SELECT * from transaction where ${condition}`);
   let result2={
    rows:[
      {
       "Date":"21/03/2021",
       "Transaction":"Call Recharges",
       "amount":17,
       "currency":"R"
    },
    {
     "Date":"21/03/2021",
     "Transaction":"250 MB Bundle Disc",
     "amount":17,
     "currency":"R"
  }
   ]
  }
  response.extra = result2;
    response.message = `Records found successfully`;
    const record = result.map((item) => ({
      ...item,
      transactionDate:moment(item.transactionDate).format('YYYY-MM-DD HH:mm:ss'),
      transactionRefNo: item.transactionRefNo.substring(0, 10),
      
    }));
    response.records = record;
    if(result.length>0){
      response.state='success';
      console.log(response.records); 
    }
    return response;
  }catch (err) {
    throw err;
  }
};
const details = async (dataJson) =>{
  try {
   let response = {};
    let result = await mysql.selectData(`SELECT * from transaction where transactionSeqNO=${dataJson.transactionid}`);
   let result2={
     rows:[
       {
        "Date":"21/03/2021",
        "Transaction":"Call Recharges",
        "amount":17,
        "currency":"R"
     },
     {
      "Date":"21/03/2021",
      "Transaction":"250 MB Bundle Disc",
      "amount":17,
      "currency":"R"
   }
    ]
   }
   response.extra = result2;
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

const download = async (dataJson) =>{
  try {
   let response = {};
    let result = {
      "title":"Transaction History",
      "download_url":process.env.PUBLIC_ORIGIN+"/uploads/temp/transaction_history.png"
    };
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
const rewards = async (dataJson) =>{
  try {
   let response = {};
    let result = {
      rows:[
        {   
         "title":"Cashback Won",
      "value":40
      },
      {   
        "title":"Points Won",
     "value":260
     },
     {   
      "title":"Voucher & Deals",
   "value":12
   },
    ]
  
    };
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
const picupload = async(dataJson) =>{ 
  try{   
    pic = dataJson.files;
    let uploadTempFile = await common.fileUpload(null, dataJson.files, config.UPLOAD_PATH.images);
    return uploadTempFile;
  }catch(err){
    throw(err);
  }
}
const profile = async (dataJson) => {
  try {
      let response = {};
      mobilenumber = dataJson.mobilenumber; 
        var result = await mysql.selectData(`SELECT EmailID,type FROM profile Where mobilenumber = '${mobilenumber}' `);
        console.log('result from dal',result);
        if (result[0].EmailID == '') {
          response.noContent = true; 
          response.message = `empty`;
          return response; 
        } 
      
        response.records = result[0];
        response.message = `Records found successfully`;
        // response.records = result[0];
        console.log(response.records); 
        return response; 
      
  } catch (err) {
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
  details,
  download,
  rewards,
  picupload,
  profile
  
};
