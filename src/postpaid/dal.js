const mysql = require("../../libs/mysqlDB");

const postpaidPlan = async (req, res) => {
  try {
    // let combinedArray = [];
    let response = {};
    var result = await mysql.selectData(`SELECT * from postpaid`);
    if (result.length > 0) {
      var record = result.map((item) => ({
        ...item,
        data: isNaN(item.data) ? 0 : item.data / 1000,
        data_type:"GB",
        validity_type:'per month'
      }));
      response.message = "Record Founds.";
      response.rows = record;
    } else {
      response.message = "empty";
    }

  
    return response;
  } catch (err) {
    throw err;
  }
};

const postpaidSearch = async (dataJson) => {
  try {
    // let combinedArray = [];
    let plan = dataJson.plan;
    let price = dataJson.price;
    let response = {};
    var result = await mysql.selectData(
      `SELECT * from postpaid where title like '%${plan}%' OR price='${price}'`
    );
    if (result.length > 0) {
      var record = result.map((item) => ({
        ...item,
        data: isNaN(item.data) ? 0 : item.data / 1000,
      }));
      response.message = "Record Founds.";
      response.rows = record;
    } else {
      response.message = "empty";
    }

    console.log(result);
    return response;
  } catch (err) {
    throw err;
  }
};

const activate = async (dataJson) => {
  try {
    // let combinedArray = [];
    let planid = dataJson.planid;
    let mobilenumber = dataJson.mobilenumber;
    let DTM = dataJson.DTM;
    let response = {};
    let planChek = await mysql.selectData(
      `SELECT title,data,calls,sms,price,currency,label,plantype FROM postpaid where id='${planid}'`
    );
    if (planChek.length <= 0) {
      response.status = "ERROR";
      response.messageDescription = "You are choosing incorrect plan.";
    } else {
      let check = await mysql.selectData(
        `SELECT planid FROM subscribedpostpaid where planid='${planid}' and mobilenumber='${mobilenumber}'`
      );
      // if(check.length>0){
      //   response.message='This plan is already activated.';
      // }else{
      var result = await mysql.insertData(
        `INSERT INTO subscribedpostpaid (planid,mobilenumber,activatedData) values('${planid}','${mobilenumber}','${DTM}')`
      );
      let plan = await mysql.selectData(
        `SELECT title,data,calls,sms,price,currency,label,plantype FROM postpaid where id='${planid}'`
      );
      response.status = "SUCCESS";
      response.messageDescription =
        "Your Postpaid plan is activated successfully";
      response.row = plan;
      // }
    }

    return response;
  } catch (err) {
    throw err;
  }
};
/**
 * Exporting the modules
 */
module.exports = {
  postpaidPlan,
  postpaidSearch,
  activate,
};
