const axios = require('axios');
const https = require('https');
const DAL = require('./dal');
const moment = require('moment');
const tokenVal = require("../../libs/tokenVal");


function CreatedDateTime() {
  let now =tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}
  
const generate = async (req, res) => {
  try {
    var dataJson = {
      requestTime: CreatedDateTime(),
      subscriberID: req.body.subscriberID,
      MSISDN: req.body.MSISDN,
      deviceInfo: req.body.deviceInfo,
      clientVersion: req.body.clientVersion,
      requestType: req.body.requestType,
      requestAction: req.body.requestAction,
      requestName: req.body.requestName,
      requestSize: req.body.requestSize,
      responseSize: req.body.responseSize,
      HTTPStatusCode: req.body.HTTPStatusCode,
      DeviceID: req.body.DeviceID,
      WidgetID: req.body.WidgetID,
      WidgetTransaction: req.body.WidgetTransaction,
      GroupName: req.body.GroupName,
      AppName: req.body.AppName,
      Category: req.body.Category,
      SubCategory: req.body.SubCategory,
      SubscriberType: req.body.SubscriberType,
      SessionID: req.body.SessionID,
      ResponseCode: req.body.ResponseCode,
      Param1: req.body.Param1,
      Param2: req.body.Param2,
      LocalHTTPHits: req.body.LocalHTTPHits,
      HTTPHitsSize: req.body.HTTPHitsSize,
      ExternalHTTPHits: req.body.ExternalHTTPHits,
      ExternalHTTPHitsSize: req.body.ExternalHTTPHitsSize,
      TransactionID: req.body.TransactionID,
      Circle: req.body.Circle,
      ResponseTime: req.body.ResponseTime,
    
      
    }
    var response = await DAL.generate(dataJson);
    console.log("response", response);
    let responseMessage = "Log Created.";
    let responseCode = "200";
    return res.status(200).send(
      JSON.stringify(
        {
         
          response: responseMessage,
        }
      ));

  } catch (err) {
    throw (err);
  }
};
 
const deleteFile = async (req, res) => {
  try {
    var response = await DAL.deleteFile();
    console.log("response", response);
    let responseMessage = "Last 30 days logs deleted.";
    let responseCode = "200";
    return res.status(200).send(
      JSON.stringify(
        {
         
          response: responseMessage,
        }
      ));

  } catch (err) {
    throw (err);
  }
};
module.exports = {
  generate,
  deleteFile

}

