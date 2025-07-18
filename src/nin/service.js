const https = require("https");
const DAL = require("./dal");
// const { encrypt, decrypt } = require('./crypto');
const crypto = require("crypto");
const tokenVal = require("../../libs/tokenVal");
const common = require("../../utils/common");
const moment = require("moment");

var algorithm = "aes256"; // or any other algorithm supported by OpenSSL
var key = "password";


const linkNumberlist = async (req, res) => {
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
    dataJson = {
      token: token,
      mobilenumber: mobilenumber,
    };

    let response = await DAL.linkNumberlist(dataJson);
    console.log("response", response.records);
    let responseRecords = response.records;
    let linkNumberlistSize = Object.keys(responseRecords).length;
    console.log("351", linkNumberlistSize);
    var addMobilenumberArray = [];
    for (let addMobilenumber of responseRecords) {
      const addMobilenumberData = addMobilenumber.add_mobilenumber;
      addMobilenumberArray.push(addMobilenumberData);
    }
    console.log("368", addMobilenumberArray);
    let primaryuserName = await DAL.getUserProfileData(dataJson);
    var addMobilenumberNameFindArray = [];
    for (var i = 0; i < linkNumberlistSize; i++) {
      dataJson = {
        mobilenumber: addMobilenumberArray[i],
      };
      let userName = await DAL.getUserProfileData(dataJson);
      addMobilenumberNameFindArray.push(userName);
    }
    console.log("addMobilenumberNameFindArray", addMobilenumberNameFindArray);
    addedMobilenumberNameFinalList = [];
    addedMobilenumberNumberFinalList = [];
    finalData = [];
    for (var i = 0; i < linkNumberlistSize; i++) {
      var userNames = addMobilenumberNameFindArray[i].records.nick_name;
      var addmobilenumber =
        addMobilenumberNameFindArray[i].records.mobilenumber;
      // var data = [userNames,addmobilenumber];
      var data = {
        userNames: userNames,
        addmobilenumber: addmobilenumber,
        linked: "1",
      };
      addedMobilenumberNumberFinalList.push(addmobilenumber);
      addedMobilenumberNameFinalList.push(userNames);
      finalData.push(data);
    }
    console.log(
      "addedMobilenumberNumberFinalList",
      addedMobilenumberNumberFinalList
    );
    console.log(
      "addedMobilenumberNameFinalList",
      addedMobilenumberNameFinalList
    );
    console.log("final data", finalData);

    responseStatus = response.status;
    if (responseStatus == "1") {
      // responseRecords = response.records;
      const name = response.records[0].nick_name;
      const linked = "1";
      responseRecords = [
        // {name:name, number: mobilenumber},
        { name: name, number: mobilenumber },
        // ...(response.records || []).map(r => ({
        ...(finalData || []).map((r) => ({
          // name: r.name,
          name: r.userNames,
          number: r.addmobilenumber,
          linked,
        })),
      ];
      return res.status(200).send(
        JSON.stringify({
          // message: "foundData",
          // status:'1',
          records: responseRecords,
          // mobilenumber: mobilenumber,
          // linked
        })
      );
    } else {
      const name = primaryuserName.records.nick_name;
      // const linked = '1';
      responseRecords = [
        // {name:name, number: mobilenumber},
        { name: name, number: mobilenumber },
        ...(response.records || []).map((r) => ({
          // name: r.name,
          name,
          number: r.mobilenumber,
          // linked
        })),
      ];
      return res.status(200).send(
        JSON.stringify({
          // message: "noData",
          // status:'0',
          records: responseRecords,
          mobilenumber: mobilenumber,
          // linked
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const ninCreate = async (req, res) => {
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

    ninMobilenumber = req.body.mobilenumber;
    nin = req.body.nin;

    let mobilenumberCheck = await tokenVal.mtnNumbers(ninMobilenumber);
    if (mobilenumberCheck.status == "1") {
      defaultNin = ninMobilenumber;
    }
    if (nin == "") {
      return res.status(403).send(
        JSON.stringify({
          message: "please check nin",
        })
      );
    } else if (ninMobilenumber == "") {
      return res.status(403).send(
        JSON.stringify({
          message: "please check Mobilenumber",
        })
      );
    } else {
      if (defaultNin == nin) {
        let OTP_GEN = otp_genrate_fun();
        // var OTP_GEN = "1234";
        let otp_pass = [OTP_GEN, ninMobilenumber];
        otp_sms_fun(otp_pass);
        console.log("234 OTP_GEN", OTP_GEN);
        let DTM = dateandtime();
        // defaultNin
        let cipher = crypto.createCipher(algorithm, key);
        let encryptedOtp =
          cipher.update(OTP_GEN, "utf8", "hex") + cipher.final("hex");
        dataJson = {
          otp: encryptedOtp,
          DTM: DTM,
          ninMobilenumber: ninMobilenumber,
          defaultNin: defaultNin,
          status: "0",
        };
        let response = await DAL.ninCreate(dataJson);
        if (response.status == "1") {
          console.log("1292", response.records);
          return res.status(200).send(
            JSON.stringify({
              message: "Nin otp is created successfully",
              insertId: response.records[0],
              ExperyTime: process.env.ExperyTime,
              enableResend: process.env.EnableResendTime,
            })
          );
        } else {
          return res.status(403).send(
            JSON.stringify({
              message: "dataInsertFailed",
            })
          );
        }
      } else {
        return res.status(403).send(
          JSON.stringify({
            message: "NIN its not valid, please check your details",
          })
        );
      }
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
// ninVerify
const ninVerify = async (req, res) => {
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

    //

    insertId = req.body.insertId;
    otp = req.body.otp;

    dataJson = {
      insertId: insertId,
      status: "0",
    };
    let response = await DAL.ninVerify(dataJson);
    if (response.status == "1") {
      encryptedOtp = response.records.otp;
      var decipher = crypto.createDecipher(algorithm, key);
      var decrypted_otp =
        decipher.update(encryptedOtp, "hex", "utf8") + decipher.final("utf8");
      if (otp == decrypted_otp) {
        var db_DTM = response.records.created_datetime;
        // DTM  = dateandtime();
        differentBwTime = find_secondsDiff_fun(db_DTM);
        differentBwTime = parseInt(differentBwTime);
        ExperyTime = parseInt(process.env.ExperyTime);
        console.log("differentBwTime", differentBwTime, ExperyTime);

        if (differentBwTime < ExperyTime) {
          dataJson = {
            insertId: insertId,
            status: "1",
            mobilenumber: mobilenumber,
          };
          console.log("501", dataJson);
          return res.status(200).send(
            JSON.stringify({
              message: "Nin Otp verified successfully.",
              status: 1,
            })
          );
        } else {
          console.log("493", differentBwTime, process.env.ExperyTime);
          // let response = await DAL.ninstatusUpdate(dataJson);
          // var OTP_GEN = otp_genrate_fun();
          var OTP_GEN = "1234";
          var newDTM = dateandtime();
          var cipher = crypto.createCipher(algorithm, key);
          var encryptedOtp =
            cipher.update(OTP_GEN, "utf8", "hex") + cipher.final("hex");
          dataJson = {
            newDTM: newDTM,
            otp: encryptedOtp,
            insertId: insertId,
            mobilenumber: mobilenumber,
          };
          return res.status(403).send(
            JSON.stringify({
              message: "Time is expired",
              status: 0,
              ExperyTime: process.env.ExperyTime,
              ResendOtpTime: process.env.EnableResendTime,
            })
          );
        }
      } else {
        return res.status(403).send(
          JSON.stringify({
            message: "Wrong Otp",
          })
        );
      }
    } else {
      return res.status(403).send(
        JSON.stringify({
          message: "No records found.",
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const ninOtpResend = async (req, res) => {
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
    dataJson = {
      token: token,
      mobilenumber: mobilenumber,
    };

    insertId = req.body.insertId;
    otp = otp_genrate_fun();
    //otp             = '1234';
    var cipher = crypto.createCipher(algorithm, key);
    var encryptedOtp = cipher.update(otp, "utf8", "hex") + cipher.final("hex");
    DTM = dateandtime();
    dataJson = {
      insertId: insertId,
      otp: encryptedOtp,
      newDTM: DTM,
      mobilenumber: mobilenumber,
    };

    let responses = await DAL.ninNewOtpUpdate(dataJson);
    mobilenumber = responses.record;
    var OTP_GEN = otp;
    // var OTP_GEN = "1234";
    var otp_pass = [OTP_GEN, mobilenumber];
    console.log("234 OTP_GEN", OTP_GEN);
    var DTM = dateandtime();
    // defaultNin
    var cipher = crypto.createCipher(algorithm, key);
    var encryptedOtp =
      cipher.update(OTP_GEN, "utf8", "hex") + cipher.final("hex");
    return res.status(200).send(
      JSON.stringify({
        message: "NIN Otp resent succesfully",
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

function dateandtime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}

function otp_genrate_fun() {
  var otpValue = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);
  console.log("otp function calling", otpValue);
  return 1111;
}
function otp_sms_fun(otp_pass) {
  var mobilenumber = otp_pass[1];
  var OTP_GEN = otp_pass[0];
  var DTM = dateandtime();
  const accountSid = process.env.ACCOUNTSID;  
  const authToken = process.env.AUTHTOKEN;  
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: `Dear customer herewith we attached your OTP ${OTP_GEN}, mobilenumber ${mobilenumber}, time is ${DTM}`,
      messagingServiceSid: process.env.messagingServiceSid,
      to: mobilenumber,
    })
    .then((message) => console.log(message.sid))
    .done();
  // console.log("otp sms function calling",OTP_GEN,"mobile number",mobilenumber);
  console.log(
    "otp sms function calling",
    OTP_GEN,
    "mobile number",
    mobilenumber
  );
}
function find_secondsDiff_fun(db_DTM) {
  var DTM = dateandtime();
  console.log("db_DTM ", db_DTM);
  console.log("DTM", DTM);

  var startDate = moment(db_DTM, "YYYY-M-DD HH:mm:ss");
  var endDate = moment(DTM, "YYYY-M-DD HH:mm:ss");
  var secondsDiff = endDate.diff(startDate, "seconds");
  console.log("secondsDiff from source fun", secondsDiff);

  return secondsDiff;
}

module.exports = {
  linkNumberlist,
  ninCreate,
  ninVerify,
  ninOtpResend,
  // upload
};
