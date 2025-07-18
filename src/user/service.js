const DAL = require("./dal");
const moment = require("moment");
const shortid = require("shortid");
const common = require("../../utils/common");
const tokenVal = require("../../libs/tokenVal");

const DTM = dateandtime();
const profile = async (req, res) => {
  try {
    let dataJson = {
      userID: req.params.userID,
    };
    response = await DAL.profile(dataJson);
    if(response.status_code=='424'){
      return res.status(424).send(
        JSON.stringify({
          "status_code": 424,
          "message": "Please enter a valid MTN mobile number",
          "status": "error"
        })
      );
      
    }else{
      return res.status(200).send(
        JSON.stringify({
          message: "Userinfo",
          response: response,
        })
      );
    }
   
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
function dateandtime() {
  var now = new Date();
  var dateStringWithTime = moment(now).format("YYYY-MM-DD HH:mm:ss");
  return dateStringWithTime;
}

const referalInvites = async (req, res) => {
  let referral_code = shortid.generate();
  try {
    let dataJson = {
      deviceType: req.query.deviceType,
    }
    var response = await DAL.referalInvite(dataJson);
    console.log("response", response);
    let responseMessage = response;
    let responseCode = "200";
    // referel_sms(refferalcode);
    return res.status(200).send(
      JSON.stringify({
        responseCode: responseCode,
        response: responseMessage,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const notification = async (req, res) => {
  try {
    var token = req.headers["x-access-token"];
    let mobilenumber = await tokenVal.getTokenVal(token);
    if (mobilenumber == "Wrong") {
      res.status(403).send(
        JSON.stringify({
          response: "Wrong email id.",
        })
      );
    }

    let dataJson = {
      mobilenumber: mobilenumber,
      deviceType: req.body.deviceType,
      deviceToken: req.body.deviceToken,
      DTM: DTM,
    };
    response = await DAL.notification(dataJson);
    return res.status(200).send(
      JSON.stringify({
        message: response.message,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const devicelist = async (req, res) => {
  try {
    let dataJson = {
      deviceType: req.body.deviceType,
      deviceToken: req.body.deviceToken,
      DTM: DTM,
    };
    response = await DAL.devicelist(dataJson);
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
  profile,
  referalInvites,
  notification,
  devicelist,
};
