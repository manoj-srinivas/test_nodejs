const https = require("https");
const DAL = require("./dal");
// const { encrypt, decrypt } = require('./crypto');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const common = require("../../utils/common");
const helper = require("../../utils/helper");
var algorithm = "aes256"; // or any other algorithm supported by OpenSSL
var key = "password";

const moduleInfo = {
  key: "USER",
  name: "User",
};

const createpin = async (req, res) => {
  let logData = {};
  let dataJson = {};
  try {
    var token = req.headers["x-access-token"];
    var config_jwt = require("../../utils/config");
    var decodedData = await jwt.verify(token, config_jwt.jwtSecret);
    console.log("token gen data 42", decodedData);

    var mobilenumber = decodedData.mobilenumber;
    var ipaddress = decodedData.ipaddress;
    var createpin = req.body.pin;
    console.log("dddddddd", mobilenumber);
    if (mobilenumber == "" || ipaddress == "" || createpin == "") {
      res.setHeader("Content-Type", "application/json");
      return res.status(424).send(
        JSON.stringify({
          res_messageDescription: "mobile number or pin null",
          // res_statusCode: "200"
        })
      );
    } else {
      dataJson = {
        mobilenumber: mobilenumber,
        ipaddress: ipaddress,
      };
      logData = await helper.defaultLogInfo(
        req,
        moduleInfo.key,
        "checkpinfun",
        "checkpinfun"
      );
      console.log("checkpinfun datajson check", dataJson);
      var response = await DAL.checkpinfun(dataJson);
      console.log("response datajson check 64", response);
      if (response.message == "empty_data") {
        var cipher = crypto.createCipher(algorithm, key);
        var encryptedData =
          cipher.update(createpin, "utf8", "hex") + cipher.final("hex");
        console.log("Encrypted message: " + encryptedData);
        dataJson = {
          mobilenumber: mobilenumber,
          ipaddress: ipaddress,
          createpin: encryptedData,
        };

        console.log("createpinfun datajson check", dataJson);
        logData = await helper.defaultLogInfo(
          req,
          moduleInfo.key,
          "createpinfun",
          "createpinfun"
        );
        console.log("createpinfun datajson check", dataJson);
        var response = await DAL.createpinfun(dataJson);
        // console.log('getSubscriberDetailsupdate datajson check',dataJson);
        // let response = await DAL.getSubscriberDetailsupdate(dataJson);
        innerLogData = Object.assign({}, logData);
        innerLogData.state = "SUCCESS";
        console.log("getSubscriberDetailsupdate response", response);

        // var db_DTM = response.message;
        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(
          JSON.stringify({
            res_messageDescription: "pin set successfully",
            // res_statusCode: "200"
          })
        );
      } else {
        var cipher = crypto.createCipher(algorithm, key);
        var encryptedData =
          cipher.update(createpin, "utf8", "hex") + cipher.final("hex");
        console.log("Encrypted message: " + encryptedData);
        dataJson = {
          mobilenumber: mobilenumber,
          ipaddress: ipaddress,
          createpin: encryptedData,
        };

        console.log("updatepinfun datajson check", dataJson);
        logData = await helper.defaultLogInfo(
          req,
          moduleInfo.key,
          "updatepinfun",
          "updatepinfun"
        );
        console.log("updatepinfun datajson check", dataJson);
        var response = await DAL.updatepinfun(dataJson);
        innerLogData = Object.assign({}, logData);
        innerLogData.state = "SUCCESS";
        console.log("getSubscriberDetailsupdate response", response);

        // var db_DTM = response.message;
        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(
          JSON.stringify({
            res_messageDescription: "successfully pin update",
            // res_statusCode: "200"
          })
        );
      }
    }
  } catch (err) {
    logData.params = dataJson;
    logData.message = JSON.stringify(err);
    common.catchHandler(err, res, logData);

    res.setHeader("Content-Type", "application/json");

    return res.status(424).send(
      JSON.stringify({
        // res_messageDescription: "Please enter a mobile number",
        res_messageDescription: "error",
      })
    );
  }
};
// function decodeTokenData(token) {
//   const decodeTokenData = async (token) => {

//   // var token = req.headers['x-access-token'];
//   var config_jwt = require('../../utils/config');
//   var toekn_decodedData = await jwt.verify(token, config_jwt.jwtSecret);
//   var decodedData = toekn_decodedData;
//   console.log("token gen data 111",decodedData);
//   return decodedData;
// };
const updatepin = async (req, res) => {
  let logData = {};
  let dataJson = {};
  try {
    var token = req.headers["x-access-token"];
    const config_jwt = require("../../utils/config");
    let decodedData = await jwt.verify(token, config_jwt.jwtSecret);

    var mobilenumber = decodedData.mobilenumber;
    var ipaddress = decodedData.ipaddress;
    // var createpin = req.body.createpin;
    // var checkpin = req.body.checkpin;

    var createpin = req.body.newPin;
    var checkpin = req.body.oldPin;

    // console.log("dddddddd",mobilenumber);
    if (
      mobilenumber == "" ||
      ipaddress == "" ||
      createpin == "" ||
      checkpin == ""
    ) {
      res.setHeader("Content-Type", "application/json");
      return res.status(424).send(
        JSON.stringify({
          res_messageDescription: "mobile number or pin null",
          // res_statusCode: "200"
        })
      );
    } else {
      dataJson = {
        mobilenumber: mobilenumber,
        ipaddress: ipaddress,
        createpin: createpin,
        checkpin: checkpin,
      };
      console.log("validate pin check", dataJson);
      logData = await helper.defaultLogInfo(
        req,
        moduleInfo.key,
        "validatepinfun",
        "validatepinfun"
      );
      console.log("validatepinfun datajson check", dataJson);
      var response = await DAL.validatepinfun(dataJson);
      innerLogData = Object.assign({}, logData);
      innerLogData.state = "SUCCESS";
      console.log("getSubscriberDetailsupdate response", response.records.pin);
      var db_user_pin = response.records.pin;
      var decipher = crypto.createDecipher(algorithm, key);
      var decrypted_pin =
        decipher.update(db_user_pin, "hex", "utf8") + decipher.final("utf8");

      console.log("Encrypted message: " + decrypted_pin);

      if (decrypted_pin != checkpin) {
        res.setHeader("Content-Type", "application/json");
        return res.status(423).send(
          JSON.stringify({
            res_messageDescription: "pin not match",
            // res_statusCode: "200"
          })
        );
      } else {
        var cipher = crypto.createCipher(algorithm, key);
        var encryptedData =
          cipher.update(createpin, "utf8", "hex") + cipher.final("hex");

        dataJson = {
          mobilenumber: mobilenumber,
          ipaddress: ipaddress,
          createpin: encryptedData,
          checkpin: checkpin,
        };
        console.log("Encrypted message: " + encryptedData);
        logData = await helper.defaultLogInfo(
          req,
          moduleInfo.key,
          "updatepinfun",
          "updatepinfun"
        );
        console.log("updatepinfun datajson check", dataJson);
        var response = await DAL.updatepinfun(dataJson);
        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(
          JSON.stringify({
            res_messageDescription: "pin update successfully",
            // res_statusCode: "200"
          })
        );
      }
    }
  } catch (err) {
    logData.params = dataJson;
    logData.message = JSON.stringify(err);
    common.catchHandler(err, res, logData);

    res.setHeader("Content-Type", "application/json");

    return res.status(424).send(
      JSON.stringify({
        // res_messageDescription: "Please enter a mobile number",
        res_messageDescription: "error",
      })
    );
  }
};

module.exports = {
  createpin,
  updatepin,
};
