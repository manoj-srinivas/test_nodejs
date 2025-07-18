const https = require("https");
const moment = require("moment");
const DAL = require("./dal");
const common = require("../../utils/common");
const tokenVal = require("../../libs/tokenVal");

function dateandtime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}

function nexttime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).format("HH:mm:ss");
  return dateStringWithTime;
}
const toneActivation = async (req, res) => {
  console.log("req.body", req.body);
  
  try {
    var DTM_next = dateandtimenext();
    let dataJson = {
      transId: req.query.transId,
      caller: req.body.caller,
      contentType: req.body.contentType,
      msisdn: req.body.msisdn,
      operation: req.body.operation,
      overRideTonePlan: req.body.overRideTonePlan,
      setting: req.body.setting,
      subPlanId: req.body.subPlanId,
      toneId: req.body.toneId,
      tonePlanId: req.body.tonePlanId,
      DTM: dateandtime(),
      DTM_next: DTM_next,
    };
    response = await DAL.subscribe(dataJson);
    console.log("response", response);
    if (response.message == "exists") {
      return res.status(200).send(
        JSON.stringify({
          responseCode: {
            respCode: "0",
            respMsg: "Already activated the callertune.",
            resultCode: 0,
            result: null,
            transactionId: null,
            childTrId: null,
          },
        })
      );
    }
    return res.status(200).send(
      JSON.stringify({
        responseCode: {
          respCode: "0",
          respMsg: "Your have successfully activated the callertune.",
          resultCode: 0,
          result: null,
          transactionId: null,
          childTrId: null,
        },
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const toneDelete = async (req, res) => {
  try {
    let dataJson = {
      caller: req.body.caller,
      contentType: req.body.contentType,
      msisdn: req.body.msisdn,
      setting: req.body.setting,
      toneId: req.body.toneId,
      jukebox: req.body.jukebox,
      offset: req.body.offset,
      size: req.body.size,
      transId: req.query.transId,
    };
    console.log("dataJson", dataJson);
    response = await DAL.toneDelete(dataJson);
    console.log("response", response);
    if (response.message === "empty") {
      return res.status(404).send(
        JSON.stringify({
          response: "Sorry not found any records.",
        })
      );
    }

    return res.status(200).send(
      JSON.stringify({
        responseCode: {
          respCode: "0",
          respMsg: "Your callertune removed successfully.",
          resultCode: 0,
          result: null,
          transactionId: null,
          childTrId: null,
        },
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

function dateandtimenext() {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 2)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let DateAndTime =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return DateAndTime;
}

const toneProfile = async (req, res) => {
  try {
    var DTM = dateandtime();
    var DTM_next = dateandtimenext();
    var next_time = nexttime();
   let dataJson = {
      DTM: DTM,
      DTM_next: DTM_next,
      mssidn: req.params.mssidn,
      profileType: req.query.profileType,
      transId: req.query.transId,
      next_time: next_time,
    };
    response = await DAL.toneProfile(dataJson);
    console.log(response.message);
    if (response.message === "empty") {
      return res.status(200).send(
        JSON.stringify({
          respCode: "0",
          respMsg: "Profile Query is successfully executed",
          resultCode: 0,
          result: null,
          transactionId: null,
          childTrId: null,
          subscriberDetails: null,
          toneDetails: {
            toneCnt: 3,
            allCaller: [],
          },
        })
      );
    }
    return res.status(200).send(
      JSON.stringify({
        respCode: "0",
        respMsg: "Profile Query is successfully executed",
        resultCode: 0,
        result: null,
        transactionId: null,
        childTrId: null,
        subscriberDetails: null,
        toneDetails: {
          toneCnt: 3,
          allCaller: response.records,
        },
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const all = async (req, res) => {
  try {
    response = await DAL.allCallertune();
    console.log("response", response.records);
    return res.status(200).send(
      JSON.stringify({
        respCode: "0",
        respMsg: "Content fetched successfully",
        resultCode: 0,
        result: null,
        transactionId: null,
        childTrId: null,
        responseCode: response.records,
        category: null,
        parentId: null,
        parentTitle: null,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

module.exports = {
  toneDelete,
  toneProfile,
  toneActivation,
  all,
};
