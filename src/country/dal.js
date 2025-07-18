const mysql = require("../../libs/mysqlDB");

const countrylist = async () => {
  try {
    let response = {};
    let result = await mysql.selectData(`SELECT * FROM countries`);
    response.message = `Records update successfully`;
    response.records = result;
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
  countrylist,
};
