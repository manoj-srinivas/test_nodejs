const https = require("https");
const mockResponse = require("../../libs/mockResponse");
const common = require("../../utils/common");
const DAL = require("./dal");
const moment = require("moment");
const tokenVal = require('../../libs/tokenVal'); 


function dateandtime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}

const postpaidCategory = async (req, res) => {
  try {
    let response = await mockResponse.postpaidCategory();

    return res.status(200).send(
      JSON.stringify({
        response: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const postpaidPlan = async (req, res) => {
  try {
    response = await DAL.postpaidPlan();
    // console.log("response", dataJson);
    return res.status(200).send(
      JSON.stringify({
        response: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const postpaidSearch = async (req, res) => {
  try {
    //search is based on the plan or amount
    dataJson = {
      plan: req.query.plan,
      price: req.query.price,
    };
    response = await DAL.postpaidSearch(dataJson);
    // console.log("response", dataJson);
    return res.status(200).send(
      JSON.stringify({
        response: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const activate = async (req, res) => {
  try {
    //search is based on the plan or amount
    dataJson = {
      planid: req.body.id,
      mobilenumber: req.body.mobilenumber,
      DTM: dateandtime(),
    };
    response = await DAL.activate(dataJson);
    // console.log("response", dataJson);
    return res.status(200).send(
      JSON.stringify({
        response: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
module.exports = {
  postpaidPlan,
  postpaidCategory,
  postpaidSearch,
  activate,
};
