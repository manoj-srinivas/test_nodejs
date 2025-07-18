const mysql = require("../../libs/mysqlDB");
const { v4: uuidv4 } = require("uuid");

const activate = async (dataJson) => {
  try {
    let planid = dataJson.planid;
    let mobilenumber = dataJson.mobilenumber;
    let DTM = dataJson.DTM;
    let response = {};
    let plan = await mysql.selectData(
      `SELECT * FROM tariff where id='${planid}'`
    );
    if (plan.length <= 0) {
      response.status = "ERROR";
      response.messageDescription = "You are choosing incorrect plan.";
    } else {
 
      let record = plan.map((item) => ({
        ...item,
        data: isNaN(item.data) ? 0 : item.data / 1000,
        data_type:"GB"
      }));
      response.status = "SUCCESS";
      response.messageDescription =
        "Your Terrif plan is activated successfully";
      response.row = record;
     
    }

    return response;
  } catch (err) {
    throw err;
  }
};

const tariffCategory = async () => {
  try {
    let response = {};
    let result = await mysql.selectData(
      `SELECT categories FROM tarrifcategory`
    );
    response = result[0].categories;

    return response;
  } catch (err) {
    throw err;
  }
};

const tariffPlan = async () => {
  try {
    let response = {};
    let result = await mysql.selectData(
      `SELECT * FROM tariff`
    );
    if (result.length > 0) {
      var record = result.map((item) => ({
        ...item,
        data: isNaN(item.data) ? 0 : item.data / 1000,
        data_type:"GB",
      }));
      response.rows = record;
    } else {
      response.message = "empty";
    }

    return response;
  } catch (err) {
    throw err;
  }
};
const planById = async (dataJson) => {
  try {
    let response = {};
    let result = await mysql.selectData(
      `SELECT * FROM tariff where id='${dataJson.planid}'`
    );
    if (result.length > 0) {
      var record = result.map((item) => ({
        ...item,
        data: isNaN(item.data) ? 0 : item.data / 1000,
        data_type:"GB",
      }));
      response.rows = record;
    } else {
      response.message = "empty";
    }

    return response;
  } catch (err) {
    throw err;
  }
};

const tarrifSearch = async (dataJson) => {
  try {
    // let combinedArray = [];
    let plan = dataJson.plan;
    let price = dataJson.price;
    let response = {};
    var result = await mysql.selectData(
      `SELECT * from tariff where title like '%${plan}%' OR price='${price}'`
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
/**
 * Exporting the modules
 */
module.exports = {
  activate,
  tariffCategory,
  tariffPlan,
  planById,
  tarrifSearch
};
