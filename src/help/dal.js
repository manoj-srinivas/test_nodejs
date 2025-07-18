const mysql = require('../../libs/mysqlDB');
const validation = require('../../utils/validation');
// const config = require('../../utils/config');
const common = require('../../utils/common');
// const path = require('path');
// const gm = require('gm').subClass({
//   imageMagick: true
// });
//const client = require('../../libs/elastic');
const _ = require("underscore");
const helper = require('../../utils/helper');
const mailTemplate = require('../../utils/mail-template');
const jwt = require('jsonwebtoken');
const redisDAL = require('../../libs/redis');
const AWS = require('../../libs/AWS');
const config = require('../../utils/config');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const {v4 : uuidv4} = require('uuid')
const moment = require('moment');
const gm = require('gm').subClass({
  imageMagick: true
});



const categories = async (dataJson) => {
  try {
    response={};
    let validate = [
      {
        fld: 'category',
        value: dataJson.category,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar50
      },
      
      {
        status: 'status',
        value: dataJson.status,
        isRequired: true,
        type: config.validationType.String
     
      },
      {
        description: 'description',
        value: dataJson.description,
        isRequired: true,
        type: config.validationType.String
     
      },
     
    ];
    const processValidation = await validation.processValidation(validate);
    if (processValidation.hasOwnProperty('error') && processValidation.error.length) {
      throw {
        propertyError: processValidation.error
      };
    } else {
      if (processValidation.hasOwnProperty('replacements') && processValidation.replacements.length) {
        processValidation.replacements.map(obj => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.requestedDate = common.timeStamp();
    
      let columns = [];
      let columnsValue = [];
      // columns.push(`category,requestedDate,status,description,chat`);
      // columnsValue.push(`:category,:requestedDate,:status,:description,'[]'`);
      columns.push(`category,requestedDate,status,description`);
      columnsValue.push(`:category,:requestedDate,:status,:description`);
      let result = await mysql.insertData(`INSERT INTO category (${columns}) VALUES (${columnsValue})`, dataJson);

      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      //<--Master table entry-->//
      response.message = `Records added successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response;
    }
    
  } catch (err) {
    throw err;
  }
};
const updateCategories = async (dataJson) => {
  try {
    response={};
    let validate = [
      {
        fld: 'catid',
        value: dataJson.catid,
        isRequired: false,
        type: config.validationType.Integer
      },
      {
        fld: 'category',
        value: dataJson.category,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar50
      },
      
      {
        status: 'status',
        value: dataJson.status,
        isRequired: true,
        type: config.validationType.String
     
      },
      {
        description: 'description',
        value: dataJson.description,
        isRequired: true,
        type: config.validationType.String
     
      },
     
    ];
    const processValidation = await validation.processValidation(validate);
    if (processValidation.hasOwnProperty('error') && processValidation.error.length) {
      throw {
        propertyError: processValidation.error
      };
    } else {
      if (processValidation.hasOwnProperty('replacements') && processValidation.replacements.length) {
        processValidation.replacements.map(obj => {
          dataJson[obj.key] = obj.value;
        });
      }
       dataJson.requestedDate = common.timeStamp();
      result = await mysql.updateData(`UPDATE category SET category=:category,status=:status, description=:description WHERE id=:catid`, dataJson);
      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      //<--Master table entry-->//
      response.message = `Records updated successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response;
    }
    
  } catch (err) {
    throw err;
  }
};
const deleteCategories = async (dataJson) => {
  try {
    response={};
    let validate = [
      {
        fld: 'catid',
        value: dataJson.catid,
        isRequired: false,
        type: config.validationType.Integer
      }
      
     
    ];
    const processValidation = await validation.processValidation(validate);
    if (processValidation.hasOwnProperty('error') && processValidation.error.length) {
      throw {
        propertyError: processValidation.error
      };
    } else {
      if (processValidation.hasOwnProperty('replacements') && processValidation.replacements.length) {
        processValidation.replacements.map(obj => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.requestedDate = common.timeStamp();
      result = await mysql.deleteData(`DELETE from category where id=:catid`, dataJson);
      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      //<--Master table entry-->//
      response.message = `Records deleted successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response;
    }
    
  } catch (err) {
    throw err;
  }
};

const getCategory = async () =>{
  try {
   let response = {};
    let result = await mysql.selectData(`SELECT * from category`);
    let active_records = await mysql.selectData(`SELECT * from category where status='Active'`);
    response.message = `Records found successfully`;
    response.records = result;
    response.state='success';
   response.active_records=active_records;
     const array2=response.records;
  const newArr = array2.map(obj => {
    var datinnumber=parseInt(obj.requestedDate);
          let d4 = moment(datinnumber);
      obj.time = d4.format("ddd h.mm A");
    return {...obj, requestedDate:d4.format("DD MMM YYYY ")};
});

response.records=newArr
    return response;
  }catch (err) {
    throw err;
  }
};
const categoriesChat = async (dataJson) => {
  try {
    response={};
    let validate = [
      {
        fld: 'catid',
        value: dataJson.catid,
        isRequired: false,
        type: config.validationType.Integer
      },
      {
        fld: 'number',
        value: dataJson.number,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar50
      },
      
      {
        status: 'status',
        value: dataJson.status,
        isRequired: true,
        type: config.validationType.String
     
      },
      {
        message: 'message',
        value: dataJson.message,
        isRequired: true,
        type: config.validationType.String
     
      },
     
    ];
    const processValidation = await validation.processValidation(validate);
    if (processValidation.hasOwnProperty('error') && processValidation.error.length) {
      throw {
        propertyError: processValidation.error
      };
    } else {
      if (processValidation.hasOwnProperty('replacements') && processValidation.replacements.length) {
        processValidation.replacements.map(obj => {
          dataJson[obj.key] = obj.value;
        });
      }
      dataJson.requestedDate = common.timeStamp();
      var jsonValues={
        'requestedId':uuidv4(),
        'number':dataJson.number,
        'status':dataJson.status,
        'message':dataJson.message,
        'requestedDate':dataJson.requestedDate
      };
     
      oldObject = await mysql.selectData(`SELECT  chat from category WHERE id=:catid`, dataJson);
      console.log(oldObject[0].chat.requestedId);
      if(typeof oldObject[0].chat.requestedId !== "undefined"){
        let previousChat=oldObject[0].chat;
        var dataval = new Array();
        dataval.push(jsonValues);
        dataval.push(previousChat);
      }else{
        var dataval=jsonValues;
      }

      result = await mysql.updateData(`UPDATE category SET chat='${JSON.stringify(dataval)}' WHERE id=:catid`, dataJson);
      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      //<--Master table entry-->//
      response.message = `Records updated successfully`;
      response.records = result[1];
      console.log(response.records); 
      return response;
    }
    
  } catch (err) {
    throw err;
  }
};

/**
 * Exporting the modules
 */
module.exports = { 
  categories,
  getCategory,
  updateCategories,
  deleteCategories,
  categoriesChat
};
