const mysql = require('../../libs/mysqlDB');
const validation = require('../../utils/validation');
const FCM = require('../../libs/fcm');
const common = require('../../utils/common');
const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const {v4 : uuidv4} = require('uuid')
const moment = require('moment');
const gm = require('gm').subClass({
  imageMagick: true
});

const language = async (dataJson) => {
  try {
      let response = {};
      filename = dataJson.filename; 
        var result = await mysql.selectData(`SELECT * FROM languages Where filename = '${filename}' order by id desc limit 1`);
        console.log('result from dal',result);
        if (result.length == 0) {
          response.noContent = true; 
          response.message = `empty`;
          return response; 
        } 
        const record = result.map((item) => ({
          ...item,
          files: item.files?"../../uploads/temp/"+item.files:'', 
        }));
        response.records = record;
        console.log(response.records); 
        return response; 
      
  } catch (err) {
    throw err;
  }
};
const uploadFile = async (dataJson) => {
  try {
  
    let uploadTempFile = await common.fileUpload(
      null,
      dataJson.files,
      config.UPLOAD_PATH.TEMP
    );
    return uploadTempFile;
  } catch (err) {
    throw err;
  }
};
const pathupdate = async (dataJson) => {
  try {
    filename = dataJson.filename;
    files = dataJson.files;

    var result = await mysql.insertData(
      `INSERT INTO languages (filename,files) values('${filename}','${files}') `
    );
    console.log("result", result);
    return result;
  } catch (err) {
    throw err;
  }
};
/**
 * Exporting the modules
 */
module.exports = { 
  language,
  uploadFile,
  pathupdate
 
};
