const mysql = require("../../libs/mysqlDB");
const validation = require("../../utils/validation");
const common = require("../../utils/common");
const jwt = require("jsonwebtoken");
const config = require("../../utils/config");
const csv = require("csv-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
// const fcm =  require('../../libs/fcm');

const getsubscriberdetailsResponse = async (dataJson) => {
  try {
    let validate = [
      {
        fld: "mobilenumber",
        value: dataJson.mobilenumber,
        isRequired: false,
      },
    ];

    let response = {};
    let condition = [];
  let  mobilenumber = dataJson.mobilenumber;
  let  ipaddress = dataJson.ipaddress;
  
    let result2 = await mysql.selectData(
      `SELECT blockStatus,mobilenumber FROM profile Where mobilenumber = '${mobilenumber}'  AND blockStatus ='1'`
    );
    console.log("Check block status", result2);
    if (result2.length > 0) {
      response.noContent = true;
      response.message = `blocked`;
      return response;
    } else {
      let result = await mysql.selectData(
        `SELECT mobilenumber,otp,user_token,created_datetime,ipaddress,status FROM otp_verification Where mobilenumber = ${mobilenumber} AND ipaddress="${ipaddress}" AND status !=2`
      );
      console.log("result from dal", result);
      if (result.length == 0) {
        response.noContent = true;
        response.message = `empty`;
        return response;
      }
      response.message = `Records found successfully`;
      response.records = result[0];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const getSubscriberDetailsinsert = async (dataJson) => {
  try {
    let validate = [
      {
        fld: "mobilenumber",
        value: dataJson.mobilenumber,
        isRequired: false,
      },
    ];
    let response = {};
    let condition = [];
    mobilenumber = dataJson.mobilenumber;
    var actiontype = dataJson.actiontype;
    var otp = dataJson.otp;
    var DTM = dataJson.created_datetime;
    var ipaddress = dataJson.ipaddress;
    let result;
    if (actiontype == "insert") {
       result = await mysql.insertData(
        `INSERT INTO otp_verification (otp, status, mobilenumber,created_datetime,ipaddress) VALUES ('${otp}',0,'${mobilenumber}','${DTM}','${ipaddress}')`
      );
    } if (actiontype == "bypass") {
      let tokenUserDta = {
        mobilenumber: dataJson.mobilenumber,
      };
      tokenUserDta = common.JSONBuilder(tokenUserDta);
      const token = jwt.sign(tokenUserDta, config.jwtSecret, config.jwtOptions);
      let encodeToken = encodeURIComponent(token);
      response.token= encodeToken;
       result = await mysql.insertData(
        `INSERT INTO otp_verification (otp, status, mobilenumber,user_token,created_datetime) VALUES ('${otp}',1,'${mobilenumber}','${encodeToken}','${DTM}')`
      );

    
       
    }
    response.message = `Records added successfully`;
    response.records = result[0];
   
    console.log(response.records);
    return response;
  } catch (err) {
    throw err;
  }
};
const profieUpdate = async (dataJson) => {
  try {
    let response = {};
    let condition = [];
    
    var mobilenumber = dataJson.mobilenumber;
    var First_name = dataJson.First_name;
    var Middle_name = dataJson.Middle_name;
    var Last_name = dataJson.Last_name;
    var Nationality = dataJson.Nationality;
    var Gender = dataJson.Gender;
    var DOB = dataJson.DOB;
    var AltTelephoneNumber = dataJson.altTelephoneNumber;
    var SMSNumber = dataJson.SMSNumber;
    var AltMobileNumber = dataJson.altMobileNumber;
    var city = dataJson.city;
    var CityDesc = dataJson.CityDesc;
    var District = dataJson.District;
    var DistrictDesc = dataJson.DistrictDesc;
    var Country = dataJson.Country;
    var EmailID = dataJson.EmailID;
    var permanent_address_1 = dataJson.permanent_address_1;
    var permanent_address_2 = dataJson.permanent_address_2;
    var state = dataJson.state;
    var zipcode = dataJson.zipcode;
    var TelephoneNumber = dataJson.telePhonenumber;
    
    
    var result = await mysql.updateData(
      `UPDATE profile SET  First_name='${First_name}', Middle_name='${Middle_name}',Last_name='${Last_name}',Nationality='${Nationality}',Gender='${Gender}',DOB='${DOB}',AltTelephoneNumber='${AltTelephoneNumber}',TelephoneNumber='${TelephoneNumber}',SMSNumber='${SMSNumber}',AltMobileNumber='${AltMobileNumber}',city='${city}',CityDesc='${CityDesc}',District='${District}',DistrictDesc='${DistrictDesc}',Country='${Country}',EmailID='${EmailID}',permanent_address_1='${permanent_address_1}',permanent_address_2='${permanent_address_2}',state= '${state}',zipcode= '${zipcode}' WHERE mobilenumber = '${mobilenumber}'`
    );
    response.message = `Profile updated successfully`;
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
    let logData = {};

    var mobilenumber = dataJson.mobilenumber;
    var Nick_name = dataJson.Nick_name;
    var DOB = dataJson.DOB;
    var User_interest = dataJson.User_interest;
    var First_name = dataJson.First_name;
    var Middle_name = dataJson.Middle_name;
    var Last_name = dataJson.Last_name;
    var Nationality = dataJson.Nationality;
    var Gender = dataJson.Gender;
    var DOB = dataJson.DOB;
    var TelephoneNumber = dataJson.TelephoneNumber;
    var AltTelephoneNumber = dataJson.AltTelephoneNumber;
    var SMSNumber = dataJson.SMSNumber;
    var AltMobileNumber = dataJson.AltMobileNumber;
    var city = dataJson.city;
    var CityDesc = dataJson.CityDesc;
    var District = dataJson.District;
    var DistrictDesc = dataJson.DistrictDesc;
    var Country = dataJson.Country;
    var EmailID = dataJson.EmailID;
    var permanent_address_1 = dataJson.permanent_address_1;
    var permanent_address_2 = dataJson.permanent_address_2;
    var state = dataJson.state;
    var zipcode = dataJson.zipcode;
    var type = dataJson.type;
    dataJson = {
      zipcode: "zipcode",
    };
    var result = await mysql.insertData(
      `INSERT INTO profile (mobilenumber, nick_name,DOB,user_interest,First_name,Middle_name,Last_name,Nationality,Gender,TelephoneNumber,AltTelephoneNumber,SMSNumber,AltMobileNumber,city,CityDesc,District,DistrictDesc,Country,EmailID,permanent_address_1,permanent_address_2,state,zipcode,type) VALUES ('${mobilenumber}','${Nick_name}','${DOB}','${User_interest}','${First_name}','${Middle_name}','${Last_name}','${Nationality}','${Gender}','${TelephoneNumber}','${AltTelephoneNumber}','${SMSNumber}','${AltMobileNumber}','${city}','${CityDesc}','${District}','${DistrictDesc}','${Country}','${EmailID}','${permanent_address_1}','${permanent_address_2}','${state}','${zipcode}','${type}')`
    );
    // var result1 = await mysql.insertData(`INSERT INTO testprofile (id,jsondata) VALUES ('','${dataJson}')`);
    response.message2 = `Records added successfully`;
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
    var token = dataJson.token;
    var result = await mysql.selectData(
      `SELECT mobilenumber,type FROM profile  Where mobilenumber = '${mobilenumber}'`
    );
    if(dataJson.ipaddress==undefined){
      var insertToken = await mysql.insertData(
        `INSERT INTO otp_verification (mobilenumber,user_token,status,created_datetime) VALUES('${mobilenumber}','${token}','1','${dataJson.createdDTM}')`
      );
    }
    
    // var result2 = await mysql.updateData(`UPDATE otp_verification SET status= '1',user_token = '${token}'  WHERE mobilenumber = '${mobilenumber}'  AND status ='0' order by id desc limit 1 `);
    // console.log('result from dal',result2);
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
  } catch (err) {
    throw err;
  }
};
const profileCreate = async (dataJson) => {
  try {
    var profileCreateresponse = {};
    var mobilenumber = dataJson.mobilenumber;
    var result = await mysql.insertData(
      `INSERT INTO profile (mobilenumber) VALUES ('${mobilenumber}')`
    );
    console.log("result from dal", result);

    // response.message = `Records found successfully`;
    // response.records = result[0];

    profileCreateresponse.message = `DATA INSERTEDS`;

    // console.log(response.records);
    return profileCreateresponse;
  } catch (err) {
    throw err;
  }
};

const profiledatamatchCheck = async (dataJson) => {
  try {
    let profiledatamatchCheckresponse = {};
    var mobilenumber = dataJson.mobilenumber;
    var result = await mysql.selectData(
      `SELECT * FROM profile  Where mobilenumber = '${mobilenumber}'`
    );
    console.log("result from dal", result);
    if (result.length == 0) {
      // response.noContent = true;
      profiledatamatchCheckresponse.message = `empty`;
      console.log(
        "profiledatamatchCheckresponse not null 185",
        profiledatamatchCheckresponse.message
      );
      return profiledatamatchCheckresponse;
    } else {
      // response.message = `Records found successfully`;
      profiledatamatchCheckresponse.records = result[0];
      profiledatamatchCheckresponse.message = `notnull`;
      console.log(
        "profiledatamatchCheckresponse not null 190",
        profiledatamatchCheckresponse.message
      );

      return profiledatamatchCheckresponse;
    }

    // console.log(response.records);
  } catch (err) {
    throw err;
  }
};

const shareAndBorrowRequestCheck = async (dataJson) => {
  try {
    let shareAndBorrowResponse = {};
    console.log("data josn passing", dataJson);
    var mobilenumber = dataJson.mobilenumber;
    console.log("data josn passing mobilenumber", mobilenumber);

    var result = await mysql.selectData(
      `SELECT id,mobilenumber,data_balance,airtime_balance FROM share_and_borrow   Where request_mobilenumber = '${mobilenumber}' AND data_status = '0' AND airtime_status = '0'`
    );
    // console.log('result from dal',result);
    if (result.length == 0) {
      // response.noContent = true;
      result = "null";
      shareAndBorrowResponse.records = result;
      shareAndBorrowResponse.message = `empty`;
      console.log(
        "shareAndBorrowResponse not null 185",
        shareAndBorrowResponse.message
      );
      return shareAndBorrowResponse;
    } else {
      // response.message = `Records found successfully`;
      shareAndBorrowResponse.records = result;
      shareAndBorrowResponse.message = `notnull`;
      console.log(
        "shareAndBorrowResponse not null 190",
        shareAndBorrowResponse.message
      );

      return shareAndBorrowResponse;
    }

    // console.log(response.records);
  } catch (err) {
    throw err;
  }
};

const getSubscriberDetailsupdate = async (dataJson) => {
  try {
    let validate = [
      {
        fld: "mobilenumber",
        value: dataJson.mobilenumber,
        isRequired: false,
      },
    ];
    let response = {};
    let condition = [];
    mobilenumber = dataJson.mobilenumber;
    var actiontype = dataJson.actiontype;
    var otp = dataJson.otp;
    var ipaddress = dataJson.ipaddress;
    var DTM = dataJson.created_datetime;
    if (actiontype == "update") {
      var result = await mysql.updateData(
        `UPDATE otp_verification SET status= '2',otp='${otp}'  WHERE mobilenumber = '${mobilenumber}' AND ipaddress = '${ipaddress}' `
      );
    }
    if (actiontype == "elsetimeoutupdate") {
      var result = await mysql.updateData(
        `UPDATE otp_verification SET status= '0',otp='${otp}',created_datetime='${DTM}'  WHERE mobilenumber = '${mobilenumber}' AND ipaddress = '${ipaddress}' `
      );
      console.log("otp resend because time out ---------", result);
    }
    console.log(result);
    console.log("getSubscriberDetailsupdate", result);
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
        fld: "mobilenumber",
        value: dataJson.mobilenumber,
        isRequired: false,
      },
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
    var result = await mysql.updateData(
      `UPDATE otp_verification SET status= '${status}',user_token = '${encodeToken}'  WHERE mobilenumber = '${mobilenumber}' AND ipaddress='${ipaddress}' AND status ='0' order by id desc limit 1 `
    );
    console.log("getSubscriberDetailsupdate_otpvalidation", result);
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
    let validate = [
      {
        fld: "status",
        value: dataJson.status,
        isRequired: true,
      },
      {
        fld: "mobilenumber",
        value: dataJson.mobilenumber,
        isRequired: false,
      },
      {
        fld: "otp",
        value: dataJson.otp,
        isRequired: true,
      },
    ];

    let response = {};
    let condition = [];
    mobilenumber = dataJson.mobilenumber;
    let result = await mysql.selectData(
      `SELECT mobilenumber,otp,user_token,created_datetime,ipaddress,status FROM otp_verification Where mobilenumber = '${mobilenumber}' AND status = '0' AND ipaddress= '${dataJson.ipaddress}' order by id desc limit 1`
    );
    console.log(result);
    if (result.length === 0) {
      response.noContent = true;
      response.message = `Entered wrong number.`;
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

const tokenValidation = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    token = dataJson.token;
    let response = {};
    let result = await mysql.selectData(
      `SELECT mobilenumber,user_token,created_datetime,status FROM otp_verification Where mobilenumber = '${mobilenumber}' AND status = '1'  order by id desc limit 1 `
    );
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
  } catch (err) {
    throw err;
  }
};

const picpathupdate = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    profile_image = dataJson.profile_image;
    console.log("profile image", profile_image);
    var result = await mysql.updateData(
      `UPDATE profile SET profile_image= '${profile_image}'  WHERE mobilenumber = '${mobilenumber}' `
    );
    console.log("result", result);
    return result;
  } catch (err) {
    throw err;
  }
};

const picupload = async (dataJson) => {
  try {
   
    let uploadTempFile = await common.fileUpload(
      null,
      dataJson.files,
      config.UPLOAD_PATH.image
    );
    
    return uploadTempFile;
  } catch (err) {
    throw err;
  }
};

const logout = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    ipaddress = dataJson.ipaddress;
    token = dataJson.token;
    otpStatus = "2";
    let response = {};
    var result = await mysql.updateData(
      `UPDATE otp_verification SET  status='${otpStatus}' WHERE mobilenumber = '${mobilenumber}'`
    );
    response.message = `Records update successfully`;
    response.records = result;
    return response;
  } catch (err) {
    throw err;
  }
};

const addlink = async (dataJson) => {
  try {
    GetSecondaryNumberRequest = dataJson.GetSecondaryNumberRequest;
    mobilenumber = dataJson.mobilenumber;
    addMobilenumber = dataJson.addMobilenumber;
    linkStatus = dataJson.linkStatus;
    created_datetime = dataJson.DTM;
    encryptedData = dataJson.encryptedData;
    let response = {};
    var prop = await mysql.selectData(
      `select nick_name,type  from profile  where mobilenumber='${addMobilenumber}'`
    );
    if (prop.length > 0) {
      var result = await mysql.insertData(
        `INSERT INTO link (mobilenumber,add_mobilenumber,secondryNumber,nickname,type,otp,status,created_datetime) VALUES ('${mobilenumber}','${addMobilenumber}','${JSON.stringify(
          GetSecondaryNumberRequest
        )}','${prop[0].nick_name}','${
          prop[0].type
        }','${encryptedData}','${linkStatus}','${created_datetime}')`
      );
      console.log("result", result);
      var result2 = await mysql.selectData(
        `select add_mobilenumber as SecondaryNumber,created_datetime as StartDate,nickname as NickName ,type as Type from link  where mobilenumber='${mobilenumber}' AND status = '1'`
      );
      response.message = `Records added successfully`;
      response.records = result;
      response.RowSet = result2;
    } else {
      response.message = `404`;
    }

    return response;
  } catch (err) {
    throw err;
  }
};

const addlinkverify = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    insertId = dataJson.insertId;
    linkStatus = dataJson.linkStatus;
    created_datetime = dataJson.DTM;
    encryptedData = dataJson.encryptedData;
    let response = {};
    var result = await mysql.selectData(
      `SELECT * FROM link Where mobilenumber = '${mobilenumber}'  AND status = '0' AND id= '${insertId}' order by id desc limit 1`
    );
    
    response.message = `Records found successfully`;
    response.records = result;
    return response;
  } catch (err) {
    throw err;
  }
};

const addlinkverifyupdate = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    add_mobilenumber = dataJson.add_mobilenumber;
    insertId = dataJson.insertId;
    linkStatus = dataJson.linkStatus;
    let response = {};
    let result = await mysql.updateData(
      `UPDATE link SET  status='${linkStatus}' WHERE id = '${insertId}' order by id desc limit 1 `
    );
   let userinfo=await mysql.selectData(`SELECT nick_name from  profile where mobilenumber='${mobilenumber}' order by id desc limit 1`);      
    let deviceToken=await mysql.selectData(`SELECT deviceToken from  devicedetails where mobilenumber='${add_mobilenumber}' order by id desc limit 1`); 
    if(deviceToken.length>0){
      var dataJson = {
        title:'Successfully linked',
        body:`${userinfo[0].nick_name} has successfully linked your mobile number to their account`,
        deviceToken: deviceToken[0].deviceToken,
      }
        // response=  await fcm.sendNotification(dataJson);
        response = { status: "success" };
       }       
    response.message = `Records added successfully`;
    response.records = result;
    return response;
  } catch (err) {
    throw err;
  }
};
const unlink = async (dataJson) => {
  try {
    var response = {};
    mobilenumber = dataJson.mobilenumber;
    removeMobilenumber = dataJson.removeMobilenumber;
    linkStatus = dataJson.linkStatus;
    var result = await mysql.updateData(
      `UPDATE link SET  status='${linkStatus}' WHERE mobilenumber = '${mobilenumber}'  AND add_mobilenumber= '${removeMobilenumber}'   `
    );
    response.message = `Records delinked successfully`;
    response.records = result;
    return response;
  } catch (err) {
    throw err;
  }
};
const addlinkList = async (dataJson) => {
  try {
    let arrVal=new Array();
    mobilenumber = dataJson.mobilenumber;
    linkStatus = dataJson.linkStatus;
    let response = {};
    let result = await mysql.selectData(
      `SELECT add_mobilenumber as SecondaryNumber,created_datetime as StartDate,nickname as NickName,type as Type FROM link Where mobilenumber = '${mobilenumber}' AND status = '1' `
    );
    if (result == "") {
      console.log("resultif", result);
      response.status = 0;
    } else {
      for(let i in result){
        let  mobilenumber=result[i].SecondaryNumber;
        let result2 = await mysql.selectData(`SELECT id,profile_image,nick_name,type FROM profile Where mobilenumber = '${mobilenumber}'`);
        let record = result2.map((item) => ({
          ...item,
          SecondaryNumber:result[i].SecondaryNumber,
          StartDate:result[i].StartDate,
            profile_image: item.profile_image?process.env.PUBLIC_ORIGIN+"/uploads/profile/image/"+item.profile_image:'',
        }));
        arrVal.push(record[0]);
      }
      console.log(arrVal);
      response.status = 1;
    }
    response.message = `Records found successfully`;
    response.records = arrVal;

    
    return response;
  } catch (err) {
    throw err;
  }
};

const switchNumber = async (dataJson) => {
  try {
  let  switchMobilenumber = dataJson.switchMobilenumber;
  let  mobilenumber = dataJson.mobilenumber;
    let response = {};
    let result = await mysql.selectData(
      `SELECT * FROM link Where mobilenumber = '${mobilenumber}' AND add_mobilenumber= '${switchMobilenumber}' AND status = '1'`
    );
    response.message = `Records found successfully`;
    response.status = `1`;
    response.records = result;
    return response;
  } catch (err) {
    throw err;
  }
};
const verifyNumberaddedOrNot = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    addMobilenumber = dataJson.addMobilenumber;
    let response = {};
    var userinfo = await mysql.selectData(
      `SELECT id FROM profile Where mobilenumber = '${addMobilenumber}'`
    );
    if (userinfo.length > 0) {
      var result = await mysql.selectData(
        `SELECT id FROM link Where mobilenumber = '${mobilenumber}' AND add_mobilenumber= '${addMobilenumber}' AND status = '1'`
      );
      response.message = `Records found successfully`;
      if (result == "") {
        response.status = "0";
        response.records = result;
      } else {
        response.status = "1";
        response.records = result;
      }
      response.userid = userinfo[0].id;
    } else {
      response.status = "null";
    }
    return response;
  } catch (err) {
    throw err;
  }
};
const test = async (dataJson) => {
  try {
    // let data = dataJson.data;
    var result = await mysql.selectData(`SELECT * FROM a`);
    // console.log("result",result);
    return result;
  } catch (err) {
    throw err;
  }
};

const checkMobilenumberInBalanceTable = async (dataJson) => {
  try {
    var mobilenumber = dataJson.mobilenumber;
    var result = await mysql.selectData(
      `SELECT * FROM balance where mobilenumber = '${mobilenumber}'`
    );
    // console.log("result",result);
    if (result == "") {
      result.message = "null";
    } else {
      result.message = "not_null";
    }
    return result;
  } catch (err) {
    throw err;
  }
};
const insertMobilenumberInBalanceTable = async (dataJson) => {
  try {
    var mobilenumber = dataJson.mobilenumber;
    var created_datetime = dataJson.createdDTM;
    var expiry_date = dataJson.expiry_date;
    var recharge_type = await mysql.selectData(
      `SELECT type FROM tempprofile where mobilenumber='${mobilenumber}'`
    );
    if (recharge_type[0].type == "Prepaid") {
      var data_balance = 100000;
      var airtime_balance = 200;
      var plan_name = "Mtn Xtradata";
      var left_gb = 200000;
      var result = await mysql.insertData(
        `INSERT INTO balance(mobilenumber,data_balance,airtime_balance,recharge_type,plan_name,left_gb,created_datetime,expiry_date) VALUES ('${mobilenumber}','${data_balance}','${airtime_balance}','${recharge_type[0].type}','${plan_name}','${left_gb}','${created_datetime}','${expiry_date}')`
      );
    } else {
      var plan_name = "Mtn Xtradata Postpaid";
      var currentBill = "135";
      var restVoiceData = 200;
      var restSms = 200;
      var sms = 300;
      var voice = 300;
      var data = 100000;
      var restData = 2500;

      var result = await mysql.insertData(
        `INSERT INTO balance(mobilenumber,currentBill,restVoiceData,restSms,sms,voice,data,restData,recharge_type,plan_name,created_datetime,expiry_date)  VALUES ('${mobilenumber}','${currentBill}','${restVoiceData}','${restSms}','${sms}','${voice}','${data}','${restData}','${recharge_type[0].type}','${plan_name}','${created_datetime}','${expiry_date}')`
      );
    }

    return result;
  } catch (err) {
    throw err;
  }
};

const uploadCsv = async (dataJson) => {
  try {
    pic = dataJson.files;
    let uploadTempFile = await common.fileUpload(
      null,
      dataJson.files,
      config.UPLOAD_PATH.TEMP
    );
    return uploadTempFile;
  } catch (err) {
    throw err;
  }
};
const uploadSubscriptionImage = async (dataJson) => {
  try {
    pic = dataJson.files;
    let uploadTempFile = await common.fileUpload(
      null,
      dataJson.files,
      config.UPLOAD_PATH.TEMP
    );
    return uploadTempFile;
  } catch (err) {
    throw err;
  }
};
const blockUsersBulk = async (dataJson) => {
  try {
    let result = await mysql.updateData(
      `UPDATE profile SET blockStatus=:blockStatus WHERE mobilenumber=:mobileNo`,
      dataJson
    );
    if (result[1] <= 0) {
      // throw `Data not updated`;
      throw {
        type: "unprocessableentity",
        errorCode: config.errorCode.unProcessableEntity.recordNotFound,
      };
    }
    // //<--Master table entry-->//
  } catch (err) {
    throw err;
  }
};
const blacklistedUsers = async () => {
  try {
    let response = {};
    let result = await mysql.selectData(
      `SELECT id,mobilenumber,nick_name,First_name,Middle_name,Last_name from profile where blockStatus=1`
    );
    // console.log(result);
    response.message = `Records found successfully`;
    response.records = result;
    response.state = "success";
    //  response.records = result;
    console.log(response.records);
    return response;
  } catch (err) {
    throw err;
  }
};
const transactions = async (dataJson) => {
  try {
    let validate = [
      {
        fld: "mobilenumber",
        value: dataJson.mobilenumber,
        isRequired: true,
        type: config.validationType.Integer,
      },
    ];

    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      let response = {};
      let conditions = [];
      let result = await mysql.selectData(
        `SELECT * FROM transaction where mobilenumber=:mobilenumber`,
        dataJson,
        dataJson.txn,
        dataJson.domainID
      );
      if (result.length === 0) {
        response.records = [];
        return response;
      }
      let result2 = {
        rows: [
          {
            Date: "21/03/2021",
            Transaction: "Call Recharges",
            amount: 17,
            currency: "R",
          },
          {
            Date: "21/03/2021",
            Transaction: "250 MB Bundle Disc",
            amount: 17,
            currency: "R",
          },
        ],
      };
      response.extra = result2;
      response.records = result;
      return response;
    }
  } catch (err) {
    throw err;
  }
};
const csvpathupdate = async (dataJson) => {
  try {
    response = {};
    const mobileNoArr = [];
    const blockStatusArr = [];
    // const blockIdArr = [];
    csvfilename = dataJson.csvFileName;
    console.log("csv file name", csvfilename);
    fs.createReadStream("./uploads/temp/" + csvfilename)
      .pipe(csv())
      .on("data", (row) => {
        let mobileNo = row.mobileNo;
        let blockStatus = row.blockStatus;
        // let blockId = row.blockId;
        if (mobileNo != "" && blockStatus != "") {
          mobileNoArr.push(mobileNo);
          blockStatusArr.push(blockStatus);
          // blockIdArr.push(blockId);
        }
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
      });

    var result = await mysql.insertData(
      `INSERT INTO blockusercsv(csvfilename) VALUES ('${csvfilename}')`
    );
    for (const i in mobileNoArr) {
      let check = await mysql.selectData(
        `SELECT mobilenumber from profile WHERE mobilenumber=${mobileNoArr[i]}`
      );
      if (check.length == 0) {
        response.noContent = true;
        response.message = `empty`;
        console.log("response", response);
      } else {
        let resultss = await mysql.updateData(
          `UPDATE profile SET blockStatus=${blockStatusArr[i]} WHERE mobilenumber=${mobileNoArr[i]}`
        );
      }
    }
    console.log("result", result);
    return result;
  } catch (err) {
    throw err;
  }
};

const categories = async (dataJson) => {
  try {
    response = {};
    let validate = [
      {
        fld: "category",
        value: dataJson.category,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar50,
      },

      {
        status: "status",
        value: dataJson.status,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        description: "description",
        value: dataJson.description,
        isRequired: true,
        type: config.validationType.String,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      if (
        processValidation.hasOwnProperty("replacements") &&
        processValidation.replacements.length
      ) {
        processValidation.replacements.map((obj) => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.requestedDate = common.timeStamp();

      let columns = [];
      let columnsValue = [];
      columns.push(`category,requestedDate,status,description,chat`);
      columnsValue.push(`:category,:requestedDate,:status,:description,'[]'`);
      let result = await mysql.insertData(
        `INSERT INTO category (${columns}) VALUES (${columnsValue})`,
        dataJson
      );

      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: "unprocessableentity",
          errorCode: config.errorCode.unProcessableEntity.recordNotFound,
        };
      }
      //<--Master table entry-->//
      response.message = `Records added successfully`;
      response.records = result[0];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    throw err;
  }
};
const updateCategories = async (dataJson) => {
  try {
    response = {};
    let validate = [
      {
        fld: "catid",
        value: dataJson.catid,
        isRequired: false,
        type: config.validationType.Integer,
      },
      {
        fld: "category",
        value: dataJson.category,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar50,
      },

      {
        status: "status",
        value: dataJson.status,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        description: "description",
        value: dataJson.description,
        isRequired: true,
        type: config.validationType.String,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      if (
        processValidation.hasOwnProperty("replacements") &&
        processValidation.replacements.length
      ) {
        processValidation.replacements.map((obj) => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.requestedDate = common.ptimeStamp();
      result = await mysql.updateData(
        `UPDATE category SET category=:category,status=:status, description=:description WHERE id=:catid`,
        dataJson
      );
      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: "unprocessableentity",
          errorCode: config.errorCode.unProcessableEntity.recordNotFound,
        };
      }
      //<--Master table entry-->//
      response.message = `Records updated successfully`;
      response.records = result[0];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    throw err;
  }
};
const deleteCategories = async (dataJson) => {
  try {
    response = {};
    let validate = [
      {
        fld: "catid",
        value: dataJson.catid,
        isRequired: false,
        type: config.validationType.Integer,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      if (
        processValidation.hasOwnProperty("replacements") &&
        processValidation.replacements.length
      ) {
        processValidation.replacements.map((obj) => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.requestedDate = common.timeStamp();
      result = await mysql.deleteData(
        `DELETE from category where id=:catid`,
        dataJson
      );
      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: "unprocessableentity",
          errorCode: config.errorCode.unProcessableEntity.recordNotFound,
        };
      }
      //<--Master table entry-->//
      response.message = `Records deleted successfully`;
      response.records = result[0];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    throw err;
  }
};
const allUsers = async () => {
  try {
    let response = {};
    let result = await mysql.selectData(`SELECT * from profile`);
    // console.log(result);

    response.message = `Records found successfully`;
    response.records = result;
    response.state = "success";
    //  response.records = result;
    console.log(response.records);
    return response;
  } catch (err) {
    throw err;
  }
};
const getCategory = async () => {
  try {
    let response = {};
    let result = await mysql.selectData(`SELECT * from category`);
    response.message = `Records found successfully`;
    response.records = result;
    response.state = "success";
    const array2 = response.records;
    const newArr = array2.map((obj) => {
      var datinnumber = parseInt(obj.requestedDate);
      let d4 = moment(datinnumber);
      obj.time = d4.format("ddd h.mm A");
      return { ...obj, requestedDate: d4.format("DD MMM YYYY ") };
    });

    response.records = newArr;
    return response;
  } catch (err) {
    throw err;
  }
};
const categoriesChat = async (dataJson) => {
  try {
    response = {};
    let validate = [
      {
        fld: "catid",
        value: dataJson.catid,
        isRequired: false,
        type: config.validationType.Integer,
      },
      {
        fld: "number",
        value: dataJson.number,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar50,
      },

      {
        status: "status",
        value: dataJson.status,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        message: "message",
        value: dataJson.message,
        isRequired: true,
        type: config.validationType.String,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      if (
        processValidation.hasOwnProperty("replacements") &&
        processValidation.replacements.length
      ) {
        processValidation.replacements.map((obj) => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.requestedDate = common.timeStamp();
      var jsonValues = {
        requestedId: uuidv4(),
        number: dataJson.number,
        status: dataJson.status,
        message: dataJson.message,
        requestedDate: dataJson.requestedDate,
      };

      oldObject = await mysql.selectData(
        `SELECT  chat from category WHERE id=:catid`,
        dataJson
      );
      console.log(oldObject[0].chat.requestedId);
      if (typeof oldObject[0].chat.requestedId !== "undefined") {
        let previousChat = oldObject[0].chat;
        var dataval = new Array();
        dataval.push(jsonValues);
        dataval.push(previousChat);
      } else {
        var dataval = jsonValues;
      }

      result = await mysql.updateData(
        `UPDATE category SET chat='${JSON.stringify(dataval)}' WHERE id=:catid`,
        dataJson
      );
      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: "unprocessableentity",
          errorCode: config.errorCode.unProcessableEntity.recordNotFound,
        };
      }
      //<--Master table entry-->//
      response.message = `Records updated successfully`;
      response.records = result[1];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    throw err;
  }
};
const subscription = async (dataJson) => {
  try {
    response = {};
    let validate = [
      {
        image: "image",
        value: dataJson.image,
        isRequired: false,
        type: config.validationType.String,
      },
      {
        fld: "amount",
        value: dataJson.amount,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar50,
      },

      {
        autorenew: "autorenew",
        value: dataJson.autorenew,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        reminder: "reminder",
        value: dataJson.reminder,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        planName: "planName",
        value: dataJson.reminder,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        description: "description",
        value: dataJson.description,
        isRequired: true,
        type: config.validationType.String,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      if (
        processValidation.hasOwnProperty("replacements") &&
        processValidation.replacements.length
      ) {
        processValidation.replacements.map((obj) => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.createdAt = common.timeStamp();

      let columns = [];
      let columnsValue = [];
      columns.push(
        `amount,cycle,autorenew,reminder,planName,image,description,createdAt`
      );
      columnsValue.push(
        `:amount,:cycle,:autorenew,:reminder,:planName,:image,:description,:createdAt`
      );
      let result = await mysql.insertData(
        `INSERT INTO subscription (${columns}) VALUES (${columnsValue})`,
        dataJson
      );

      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: "unprocessableentity",
          errorCode: config.errorCode.unProcessableEntity.recordNotFound,
        };
      }
      //<--Master table entry-->//
      response.message = `Records updated successfully`;
      response.records = result[1];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    throw err;
  }
};
const updateSubscription = async (dataJson) => {
  try {
    response = {};
    let validate = [
      {
        subscriptionId: "subscriptionId",
        value: dataJson.subscriptionId,
        isRequired: false,
        type: config.validationType.Integer,
      },
      {
        image: "image",
        value: dataJson.image,
        isRequired: false,
        type: config.validationType.String,
      },
      {
        fld: "amount",
        value: dataJson.amount,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar50,
      },

      {
        autorenew: "autorenew",
        value: dataJson.autorenew,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        reminder: "reminder",
        value: dataJson.reminder,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        planName: "planName",
        value: dataJson.reminder,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        description: "description",
        value: dataJson.description,
        isRequired: true,
        type: config.validationType.String,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      if (
        processValidation.hasOwnProperty("replacements") &&
        processValidation.replacements.length
      ) {
        processValidation.replacements.map((obj) => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.updatedAt = common.timeStamp();
      result = await mysql.updateData(
        `UPDATE subscription SET amount=:amount,cycle=:cycle, autorenew=:autorenew,reminder=:reminder,planName=:planName,image=:image,description=:description,updatedAt=:updatedAt WHERE id=:subscriptionId`,
        dataJson
      );

      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: "unprocessableentity",
          errorCode: config.errorCode.unProcessableEntity.recordNotFound,
        };
      }
      //<--Master table entry-->//
      response.message = `Records updated successfully`;
      response.records = result[1];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    throw err;
  }
};
const subscriptionList = async () => {
  try {
    let response = {};
    let result = await mysql.selectData(`SELECT * from subscription`);
    // console.log(result);

    response.message = `Records found successfully`;
    response.records = result;
    response.state = "success";
    //  response.records = result;
    console.log(response.records);
    return response;
  } catch (err) {
    throw err;
  }
};
const deleteSubscription = async (dataJson) => {
  try {
    response = {};
    let validate = [
      {
        fld: "subscriptioId",
        value: dataJson.subscriptionId,
        isRequired: false,
        type: config.validationType.Integer,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      if (
        processValidation.hasOwnProperty("replacements") &&
        processValidation.replacements.length
      ) {
        processValidation.replacements.map((obj) => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.requestedDate = common.timeStamp();
      result = await mysql.deleteData(
        `DELETE from subscription where id=:subscriptionId`,
        dataJson
      );
      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: "unprocessableentity",
          errorCode: config.errorCode.unProcessableEntity.recordNotFound,
        };
      }
      //<--Master table entry-->//
      response.message = `Records deleted successfully`;
      response.records = result[0];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    throw err;
  }
};

const subscriptionDetails = async (dataJson) => {
  try {
    let response = {};
    let result = await mysql.selectData(
      `SELECT * from subscription where planName like '%${dataJson.planName}%'`
    );
    // console.log(result);
    response.message = `Records found successfully`;
    const record = result.map((item) => ({
      ...item,
      image: item.image
        ? process.env.PUBLIC_ORIGIN + "/uploads/temp/" + item.image
        : "",
    }));
    response.records = record;
    // response.records = result;
    response.state = "success";
    //  response.records = result;
    console.log(response.records);
    return response;
  } catch (err) {
    throw err;
  }
};
const fetchSubscription = async (dataJson) => {
  try {
    let response = {};
    let result = await mysql.selectData(
      `SELECT * from purchased_subscription where number=${dataJson.number}`
    );
    // console.log(result);
    response.message = `Records found successfully`;
    response.records = result;
    response.state = "success";
    //  response.records = result;
    console.log(response.records);
    return response;
  } catch (err) {
    throw err;
  }
};
const purchaseSubscription = async (dataJson) => {
  try {
    response = {};
    let validate = [
      {
        number: "number",
        value: dataJson.number,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        subscriptionId: "subscriptionId",
        value: dataJson.subscriptionId,
        isRequired: true,
        type: config.validationType.String,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      if (
        processValidation.hasOwnProperty("replacements") &&
        processValidation.replacements.length
      ) {
        processValidation.replacements.map((obj) => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.subscribedDate = common.timeStamp();

      let columns = [];
      let columnsValue = [];
      columns.push(`subscriptionId,subscribedDate,number`);
      columnsValue.push(`:subscriptionId,:subscribedDate,:number`);
      let result = await mysql.insertData(
        `INSERT INTO purchased_subscription (${columns}) VALUES (${columnsValue})`,
        dataJson
      );

      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: "unprocessableentity",
          errorCode: config.errorCode.unProcessableEntity.recordNotFound,
        };
      }
      //<--Master table entry-->//
      response.message = `Records inserted successfully`;
      response.records = result[1];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    throw err;
  }
};

const userTempDetails = async (dataJsonpass) => {
  try {
    mobilenumber = dataJsonpass.mobilenumber;
    Nick_name = dataJsonpass.Nick_name;
    DOB = dataJsonpass.DOB;
    User_interest = dataJsonpass.User_interest;
    let response = {};
    let result = await mysql.selectData(
      `SELECT * FROM tempprofile Where mobilenumber = '${mobilenumber}'`
    );
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
  } catch (err) {
    throw err;
  }
};
const userBalanceDetails = async (dataJson) => {
  try {
    let validate = [
      {
        fld: "mobilenumber",
        value: dataJson.mobilenumber,
        isRequired: false,
      },
    ];

    let response = {};
    mobilenumber = dataJson.mobilenumber;
    ipaddress = dataJson.ipaddress;
    console.log("validate", validate);
    console.log("mobilenumber", mobilenumber);
    if (
      mobilenumber == "7305510550" ||
      mobilenumber == "9062058586" ||
      mobilenumber == "9876543212"
    ) {
      //postpaid number
      var result = await mysql.selectData(
        `SELECT id,mobilenumber,data,restData as data_balance,recharge_type as type,created_datetime,currentBill,restSms,sms,voice,restVoiceData,planID from balance Where mobilenumber = '${mobilenumber}'`
      );
      var record = result.map((item) => ({
        ...item,
        data_balance: isNaN(item.data_balance) ? 0 : item.data_balance / 1000,
        data: isNaN(item.data) ? 0 : item.data / 1000,
      }));
    } else {
      //prepaid number
      var result = await mysql.selectData(
        `SELECT id,mobilenumber,data_balance,data,airtime_balance,recharge_type as type,plan_name,DATEDIFF(expiry_date,curdate()) AS days_left,DATEDIFF(expiry_date,created_datetime) AS total_days,created_datetime,expiry_date from balance Where mobilenumber = '${mobilenumber}'`
      );
      var record = result.map((item) => ({
        ...item,
        data_balance: isNaN(item.data_balance) ? 0 : item.data_balance / 1000,
        airtime_balance: isNaN(item.airtime_balance) ? 0 : item.airtime_balance,
        data: isNaN(item.data) ? 0 : item.data / 1000,
      }));
    }

    if (result.length == 0) {
      response.noContent = true;
      response.message = `empty`;
      return response;
    } else {
      response.message = `not_empty`;
      response.records = record;
      return response;
    }
  } catch (err) {
    throw err;
  }
};
const validateEmail = async (dataJson) => {
  try {
      let response = {};
      email = dataJson.email; 
        var result = await mysql.selectData(`SELECT EmailID,mobilenumber FROM profile Where EmailID = '${email}' order by id desc limit 1`);
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
const profile = async (dataJson) => {
  try {
     
      let response = {};
     
    
        let result2 = await mysql.selectData(`SELECT id,mobilenumber,nick_name,profile_image,type FROM profile Where mobilenumber = '${userID}' `);
        console.log('result from dal',result);
        if (result2.length == 0) {
          response.noContent = true; 
          response.message = `empty`;
          return response; 
        } 
        const record = result2.map((item) => ({
          ...item,
            profile_image: item.profile_image?process.env.PUBLIC_ORIGIN+"/uploads/profile/image/"+item.profile_image:'',
        }));
        response.records = record[0];
        response.message = `Records found successfully`;
        console.log(response.records); 
        return response; 
      
  } catch (err) {
    throw err;
  }
};

const demoNumbers = async () => {
  try {
    
    let response = {};
    let result = await mysql.selectData(
      `SELECT mobilenumber FROM demonumbers`
    );
    response.message = `Data fetched successfully`;
    response.records = result;
   

    return response;
  } catch (err) {
    throw err;
  }
};
const checkDemoNumbers = async (dataJson) => {
  try {
    let validate = [
      {
        fld: "mobilenumber",
        value: dataJson.mobilenumber,
        isRequired: false,
      },
    ];

    let response = {};
  let  mobilenumber = dataJson.mobilenumber;
  
    let result2 = await mysql.selectData(
      `SELECT mobilenumber FROM demonumbers Where mobilenumber = '${mobilenumber}' `
    );
    if (result2.length > 0) {
      response.noContent = true;
      response.message = `available`;
      return response;
    } else {
      response.message = `Not Available`;
      return response;
    }
  } catch (err) {
    console.log(err);
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
  chatprofieUpdate,
  picpathupdate,
  picupload,
  logout,
  addlink,
  addlinkverify,
  addlinkverifyupdate,
  unlink,
  shareAndBorrowRequestCheck,
  switchNumber,
  verifyNumberaddedOrNot,
  test,
  checkMobilenumberInBalanceTable,
  insertMobilenumberInBalanceTable,
  addlinkList,
  uploadCsv,
  csvpathupdate,
  blacklistedUsers,
  blockUsersBulk,
  transactions,
  categories,
  allUsers,
  getCategory,
  updateCategories,
  deleteCategories,
  categoriesChat,
  subscription,
  uploadSubscriptionImage,
  subscriptionList,
  updateSubscription,
  deleteSubscription,
  subscriptionDetails,
  purchaseSubscription,
  fetchSubscription,
  userTempDetails,
  userBalanceDetails,
  validateEmail,
  profile,
  demoNumbers,
  checkDemoNumbers
};
