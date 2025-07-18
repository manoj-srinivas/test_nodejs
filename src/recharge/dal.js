const mysql = require('../../libs/mysqlDB');
const validation = require('../../utils/validation');
const common = require('../../utils/common');
const config = require('../../utils/config');
const moment = require('moment');
const fcm =  require('../../libs/fcm');

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
      columns.push(`category,requestedDate,status,description,chat`);
      columnsValue.push(`:category,:requestedDate,:status,:description,'[]'`);
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
       dataJson.requestedDate = common.ptimeStamp();
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
    response.message = `Records found successfully`;
    response.records = result;
    response.state='success';
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
 

const topupRecharge = async(dataJson) =>{ 
  try {
    response={};
    let validate = [
      {
        card: 'card',
        value: dataJson.card,
        isRequired: false,
        type: config.validationType.String
      },
      {
        number: 'number',
        value: dataJson.number,
        isRequired: false,
        type: config.validationType.String
      },
      {
        fld: 'amount',
        value: dataJson.amount,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar50
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
      dataJson.purchasedDate = common.timeStamp();
    
      let columns = [];
      let columnsValue = [];
      columns.push(`amount,number,card,purchasedDate`);
      columnsValue.push(`:amount,:number,:card,:purchasedDate`);
      let result = await mysql.insertData(`INSERT INTO topuprecharge (${columns}) VALUES (${columnsValue})`, dataJson);

      if (result[1] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      //<--Master table entry-->//
      response.message = `Records inserted successfully`;
      response.records = result[1];
      console.log(response.records); 
      return response;
    }
    
  } catch (err) {
    throw err;
  }
};
const fetchRecharge = async (dataJson) =>{
  try {
   let response = {};
    let result = await mysql.selectData(`SELECT * from topuprecharge where number=${dataJson.number}`);
    // console.log(result); 
    response.message = `Records found successfully`;
    response.records = result;
    response.state='success';
    //  response.records = result;    
     console.log(response.records); 
    return response;
  }catch (err) {
    throw err;
  }
};
 
const notification = async (dataJson) =>{
  try {
   let response = {};
    let result = await mysql.selectData(`SELECT nick_name from profile where mobilenumber=${dataJson.mobilenumber}`);
    let deviceToken=await mysql.selectData(`SELECT deviceToken from  devicedetails where mobilenumber='${dataJson.mobilenumber}' order by id desc limit 1`); 
    if(deviceToken.length>0){
      var dataJson = {
        title:'Recharge Successful',
        body:'Your number has been recharged successfully',
        deviceToken: deviceToken[0].deviceToken,
      }
        // response=  await fcm.sendNotification(dataJson);
        response = { status: "success" };
       }    
 
    response.records = result;
  
    return response;
  }catch (err) {
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
  topupRecharge,
  fetchRecharge,
  notification
 
};
