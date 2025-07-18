const mysql = require('../../libs/mysqlDB');

const gm = require('gm').subClass({
  imageMagick: true
});
 
const category  = async(dataJson) =>{
  try {
    let response = {};  
    if(dataJson.limit!==undefined){
      var result = await mysql.selectData(`SELECT * from billscategory order by weight limit ${dataJson.limit}`); 
    }else{
      var result = await mysql.selectData(`SELECT * from billscategory`); 
    }   
    const record = result.map((item) => ({
      ...item,
      icon: item.icon?process.env.PUBLIC_ORIGIN+"/uploads/temp/"+item.icon:'', 
    }));
    response.message = 'Bills category';
    // console.log("result",result[0]); 
    response.records = record; 
    return response;
   
  }catch (err) {
    throw err;
  }
}
 

const pay= async(dataJson) =>{
  try {
    let response={};
    let result2 = await mysql.selectData(`SELECT name from meternumber where meternumber='${dataJson.meternumber}'`);
      let name= result2[0].name;
      let result = await mysql.insertData(`INSERT INTO electricitybillpay (meternumber,amount,billdate,transactionId,mobilenumber,name) VALUES ('${dataJson.meternumber}','${dataJson.amount}','${dataJson.billdate}','${dataJson.transactionId}','${dataJson.mobilenumber}','${name}')`);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `success`;
      response.records = result[0];
     
     return response;
  }catch (err) {
    throw err;
  }
}
const savednumber  = async(dataJson) =>{
  try {
    let response = {};  
    var result = await mysql.selectData(`SELECT name,meternumber FROM savedmeternumber WHERE mobilenumber='${dataJson.mobilenumber}'`); 
    response.message = 'Saved Numbers';
    response.records = result; 
    return response;
  }catch (err) {
    throw err;
  }
}
 
const meternumber  = async(dataJson) =>{
  try {
    let response = {};  
if(dataJson.flag=='insert'){
  var result = await mysql.insertData(`INSERT INTO  meternumber(meternumber,name,category,cdate) VALUES('${dataJson.meternumber}','${dataJson.name}','${dataJson.category}','${dataJson.cdate}')`); 
  response.name = dataJson.name; 
  response.meternumber = dataJson.meternumber; 
  response.flag='0';
}else{
  var result = await mysql.selectData(`SELECT  meternumber,name from meternumber where meternumber='${dataJson.meternumber}'`); 
  if(result.length>0){
    response.name = result[0].name; 
    response.meternumber = result[0].meternumber; 
    response.flag='1';
  }else{
    response.status = '0';
  }
}
    return response;
  }catch (err) {
    throw err;
  }
}
const saveMeter= async(dataJson) =>{
  try {
    let response={};
    let check= await mysql.selectData(`SELECT meternumber  from savedmeternumber where mobilenumber='${dataJson.mobilenumber}' and meternumber='${dataJson.meternumber}'`);
    if(check.length>0){
      response.message = `Already saved`;
    }else{
    let result2 = await mysql.selectData(`SELECT name  from meternumber where meternumber='${dataJson.meternumber}'`);
    if(result2.length>0){

      let name= result2[0].name;
      let result = await mysql.insertData(`INSERT INTO savedmeternumber (meternumber,name,mobilenumber,category) VALUES ('${dataJson.meternumber}','${name}','${dataJson.mobilenumber}','${dataJson.category}')`);
      console.log(result);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `Meter number is added successfully`;
    }else{
      response.message = `Entered wrong meter number`;
    }
     }
     return response;
  }catch (err) {
    throw err;
  }
}
const checkMeterNumber  = async(dataJson) =>{
  try {
    let response = {};  
 
  var result = await mysql.selectData(`SELECT  meternumber from savedmeternumber where meternumber='${dataJson.meternumber}' and mobilenumber='${dataJson.mobilenumber}'`); 
  if(result.length>0){
    response.status = 'Available';
     
  }else{
    response.status = 'Not Available';
  }

    return response;
  }catch (err) {
    throw err;
  }
}

const deleteMeter  = async(dataJson) =>{
  try {
    let response = {};  
     check = await mysql.selectData(`SELECT  meternumber from   savedmeternumber where meternumber='${dataJson.meternumber}' and mobilenumber='${dataJson.mobilenumber}'`); 
if(check.length>0){

 
  var result = await mysql.deleteData(`DELETE  from   savedmeternumber where meternumber='${dataJson.meternumber}' and mobilenumber='${dataJson.mobilenumber}'`); 
  if(result.length>0){
    response.message = 'Meter number removed successfully';
     
  }else{
    response.message = 'Some error occured';
  }
}else{
  response.message = 'Entered meter number is wrong';
}
    return response;
  }catch (err) {
    throw err;
  }
}
/**
 * Exporting the modules
 */
module.exports = {  
  category,
  pay,
savednumber,
meternumber,
saveMeter,
checkMeterNumber,
deleteMeter
};
