const mysql = require("../../libs/mysqlDB");
const validation = require("../../utils/validation");
const common = require("../../utils/common");
const config = require("../../utils/config");

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
    let type = await mysql.selectData(
      `SELECT type from profile Where mobilenumber = '${mobilenumber}'`
    );
    if (type[0].type == "Postpaid") {
      //postpaid number
      var result = await mysql.selectData(
        `SELECT id,mobilenumber,data,restData as data_balance,recharge_type as type,created_datetime,currentBill,restSms,sms,voice,restVoiceData,planID from balance Where mobilenumber = '${mobilenumber}'`
      );
      var record = result.map((item) => ({
        ...item,
        data_balance: isNaN(item.data_balance) ? 0 : item.data_balance / 1000,
        data: isNaN(item.data) ? 0 : item.data / 1000,
        data_type: "GB",
        currency_code: "$",
      }));
    } else {
      //prepaid number
      var result = await mysql.selectData(
        `SELECT id,mobilenumber,data_balance,left_gb as data,airtime_balance,recharge_type as type,plan_name,DATEDIFF(expiry_date,curdate()) AS days_left,DATEDIFF(expiry_date,created_datetime) AS total_days,created_datetime,expiry_date from balance Where mobilenumber = '${mobilenumber}'`
      );
      var record = result.map((item) => ({
        ...item,
        data_balance: isNaN(item.data_balance) ? 0 : item.data_balance / 1000,
        airtime_balance: isNaN(item.airtime_balance) ? 0 : item.airtime_balance,
        data: isNaN(item.data) ? 0 : item.data / 1000,
        data_type: "GB",
        currency_code: "$",
      }));
    }

    // var result = await mysql.selectData(`SELECT id,mobilenumber,data_balance,data,airtime_balance,recharge_type,plan_name as recharge_ec_type,left_gb,DATEDIFF(expiry_date,curdate()) AS days_left,DATEDIFF(expiry_date,created_datetime) AS total_days,left_date,created_datetime,expiry_date,currentBill,restSms,sms,voice,restVoiceData,planID from balance Where mobilenumber = '${mobilenumber}'`);

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

const verifyNumberaddedOrNot = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    addMobilenumber = dataJson.addMobilenumber;
    let response = {};

    var result = await mysql.selectData(
      `SELECT * FROM link Where mobilenumber = '${mobilenumber}' AND add_mobilenumber= '${addMobilenumber}' AND status = '1'`
    );
    response.message = `Records found successfully`;
    if (result == "") {
      response.status = "0";
      response.records = result;
    } else {
      response.status = "1";
      response.records = result;
    }

    return response;
  } catch (err) {
    throw err;
  }
};
const postpaiddata = async (dataJson) => {
  try {
    let validate = [
      {
        fld: "mobilenumber",
        value: dataJson.mobilenumber,
        isRequired: true,
        type: config.validationType.Integer,
      },
      {
        fld: "currentBill",
        value: dataJson.currentBill,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        fld: "restData",
        value: dataJson.restData,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        fld: "restVoiceData",
        value: dataJson.restVoiceData,
        isRequired: true,
        type: config.validationType.Integer,
      },
      {
        fld: "restSms",
        value: dataJson.restSms,
        isRequired: true,
        type: config.validationType.Integer,
      },
      {
        fld: "data",
        value: dataJson.data,
        isRequired: true,
        type: config.validationType.String,
      },
      {
        fld: "voice",
        value: dataJson.voice,
        isRequired: true,
        type: config.validationType.Integer,
      },
      {
        fld: "sms",
        value: dataJson.sms,
        isRequired: true,
        type: config.validationType.Integer,
      },
      {
        fld: "planid",
        value: dataJson.planid,
        isRequired: true,
        type: config.validationType.Integer,
      },
      {
        fld: "recharge_type",
        value: dataJson.recharge_type,
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
      mobilenumber = dataJson.mobilenumber;
      addMobilenumber = dataJson.addMobilenumber;
      let response = {};
      let columns = [];
      let columnsValue = [];
      dataJson.createdAt = dataJson.updatedAt = common.timeStamp();
      columns.push(
        `planid,mobilenumber,currentBill,restData,restVoiceData,restSms,data,voice,sms,recharge_type,createdAt,updatedAt`
      );
      columnsValue.push(
        `:planid,:mobilenumber,:currentBill,:restData,:restVoiceData,:restSms,:data,:voice,:sms,:recharge_type,:createdAt,:updatedAt`
      );
      let result = await mysql.insertData(
        `INSERT INTO postpaiddata (${columns}) VALUES (${columnsValue})`,
        dataJson
      );
      console.log("result", result);
      dataJson.userID = result[0];
      if (result == "") {
        response.status = "0";
        response.records = result;
      } else {
        response.status = "1";
        response.records = result;
      }

      return response;
    }
  } catch (err) {
    throw err;
  }
};
const userBalancePostPaid = async (dataJson) => {
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
    var result = await mysql.selectData(
      `SELECT id,recharge_type,planid,mobilenumber,currentBill,restData,restVoiceData,restSms,data,voice,sms from postpaiddata Where mobilenumber = '${mobilenumber}' order by id desc limit 1`
    );
    console.log("result from dal", result);
    if (result.length == 0) {
      response.noContent = true;
      response.message = `empty`;
      return response;
    } else {
      response.message = `not_empty`;
      response.records = result;
      return response;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  userBalanceDetails,
  verifyNumberaddedOrNot,
  postpaiddata,
  userBalancePostPaid,
};
