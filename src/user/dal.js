const mysql = require('../../libs/mysqlDB');
const validation = require('../../utils/validation');
const FCM = require('../../libs/fcm');
const common = require('../../utils/common');
const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const { v4: uuidv4 } = require('uuid')
const moment = require('moment');
const gm = require('gm').subClass({
  imageMagick: true
});

const profile = async (dataJson) => {
  try {
    let response = {};
    userID = dataJson.userID;

    var result = await mysql.selectData(`SELECT id,mobilenumber,nick_name,profile_image,type FROM userprofile Where mobilenumber = '${userID}' `);
    console.log('result from dal', result);
    if (result.length == 0) {
      response.status_code= 424;
      return response;
    }
    const record = result.map((item) => ({
      ...item,
      profile_image: item.profile_image ? process.env.PUBLIC_ORIGIN + "/uploads/profile/image/" + item.profile_image : '',
    }));
    response.records = record[0];
    response.message = `Records found successfully`;
    // response.records = result[0];
    console.log(response.records);
    return response;

  } catch (err) {
    throw err;
  }
};

const referalInvite = async (dataJson) => {
  try {
    response = {};
    let link;
    if (dataJson.deviceType == 'android') {
      link = 'https://play.google.com/store/apps/details?id=com.mymtn.app';
    } else {
      link = 'https://testflight.apple.com/join/OJhSr6O8';
    }
    response.message = `I’m inviting you to download MTN App, Welcome to the world of services to suit everyone’s needs. With MyMTN you can topup airtime, purchase bundles pay your bills and much more.${link}`;

    return response;


  } catch (err) {
    throw err;
  }
};
const notification = async (dataJson) => {
  try {
    let response = {};
    deviceType = dataJson.deviceType;
    deviceToken = dataJson.deviceToken;
    dataJson.topic = 'Testing push notification';
    var Userinfo = await mysql.selectData(`SELECT id FROM profile where mobilenumber='${dataJson.mobilenumber}'`);
    var result = await mysql.insertData(`INSERT INTO  devicedetails (userid,mobilenumber,deviceType,deviceToken,createdAt) values('${Userinfo[0].id}','${dataJson.mobilenumber}','${deviceType}','${deviceToken}','${dataJson.DTM}')`);
    // result2= await FCM.sendNotification(dataJson);
    response.message = `Records added successfully`;
    return response;

  } catch (err) {
    throw err;
  }
};

const devicelist = async (dataJson) => {
  try {

    let response = {};
    userID = dataJson.userID;
    var result = await mysql.selectData(`SELECT * FROM devicedetails `);
    console.log('result from dal', result);
    if (result.length == 0) {
      response.noContent = true;
      response.message = `empty`;
      return response;
    }
    response.message = `Records found successfully`;
    response.records = result;
    return response;

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
    let result = await mysql.selectData(`SELECT * FROM tempprofile Where mobilenumber = '${mobilenumber}'`);
    // console.log(result); 
    if (result.length === 0) {
      response.noContent = true;
      return response;
    }
    response.message = `Records found successfully`;
    response.records = result[0];
    return response;
  } catch (err) {
    throw err;
  }
}
/**
 * Exporting the modules
 */
module.exports = {
  // otp_test,
  // updateCertificate,
  profile,
  referalInvite,
  notification,
  devicelist,
  userTempDetails

};
