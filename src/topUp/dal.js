const mysql = require("../../libs/mysqlDB");
const validation = require("../../utils/validation");

const common = require("../../utils/common");
const config = require("../../utils/config");
// const fcm = require("../../libs/fcm");

const topupRecharge = async (dataJson) => {
  try {
    response = {};
    let validate = [
      {
        card: "card",
        value: dataJson.card,
        isRequired: false,
        type: config.validationType.String,
      },
      {
        number: "number",
        value: dataJson.number,
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
      dataJson.purchasedDate = common.timeStamp();

      let columns = [];
      let columnsValue = [];
      if (dataJson.card == undefined) {
        columns.push(`amount,number,purchasedDate`);
        columnsValue.push(`:amount,:number,:purchasedDate`);
      } else if (dataJson.number == undefined) {
        columns.push(`amount,card,purchasedDate`);
        columnsValue.push(`:amount,:card,:purchasedDate`);
      } else {
        columns.push(`amount,number,card,purchasedDate`);
        columnsValue.push(`:amount,:number,:card,:purchasedDate`);
      }

      let result = await mysql.insertData(
        `INSERT INTO topuprecharge (${columns}) VALUES (${columnsValue})`,
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
      let deviceToken = await mysql.selectData(
        `SELECT deviceToken from  devicedetails where mobilenumber='${dataJson.number}' order by id desc limit 1`
      );
      if (deviceToken.length > 0) {
        var dataJson = {
          title: "Recharge Successful",
          body: "Your number has been recharged successfully",
          deviceToken: deviceToken[0].deviceToken,
        };
        // response = await fcm.sendNotification(dataJson);
        response = { status: "success" };
      }
      response.message = `Records inserted successfully`;
      response.records = result[1];
      console.log(response.records);
      return response;
    }
  } catch (err) {
    throw err;
  }
};
const fetchRecharge = async (dataJson) => {
  try {
    let response = {};
    let result = await mysql.selectData(
      `SELECT * from topuprecharge where number=${dataJson.number}`
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

const recentRecharge = async (dataJson) => {
  try {
    let response = {};
    let result = await mysql.selectData(
      `SELECT id,amount from topuprecharge where number=${dataJson.number} order by id desc limit 3`
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

/**
 * Exporting the modules
 */
module.exports = {
  topupRecharge,
  fetchRecharge,
  recentRecharge,
};
