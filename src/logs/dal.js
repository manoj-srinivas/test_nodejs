const mysql = require('../../libs/mysqlDB');
const validation = require('../../utils/validation');
// const config = require('../../utils/config');
const common = require('../../utils/common');
const config = require('../../utils/config');
const moment = require('moment');
var fs = require('fs');


function CreatedDate() {
  var now = new Date();
var dateStringWithTime = moment(now).format('YYYY-MM-DD');
return dateStringWithTime;
}
 

const generate = async(dataJson) =>{ 
  try {
    response={};
    console.log(dataJson);
    let vals=Object.values(dataJson);
    let arrayVal=[];
    vals.forEach((values)=>{
        console.log(values);
        arrayVal.push(values);
    })
    
    let text = arrayVal.join(" |  ");
console.log(text);
  // let url=process.env.PUBLIC_ORIGIN+"/uploads/temp/";
 let filename='subscriber.'+CreatedDate()+'.cdr';
 chek = await mysql.selectData(`SELECT filename FROM logs where filename='${filename}' and cdate='${dataJson.requestTime}'`);
if(chek.length<=0){
  result = await mysql.insertData(`INSERT INTO logs (filename,cdate) values('${filename}','${dataJson.requestTime}')`);
}
    fs.appendFile(config.UPLOAD_PATH.LOGS+`${filename}`,`${text+"\n"}`, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
      return response;
  } catch (err) {
    throw err;
  }
};
 
const deleteFile = async() =>{ 
  try {
    response={}; 
 result = await mysql.selectData(`SELECT * FROM logs WHERE DATE(cdate) >= DATE(NOW()) - INTERVAL 30 DAY`);
for(let i=0;i<result.length;i++){
 var filename=config.UPLOAD_PATH.LOGS+`${result[i].filename}`;
 fs.unlink(filename, function (err) {
    if (err)
      throw err;
  });
  if(i>=result.length){
    result = await mysql.deleteData(`DELETE  FROM logs WHERE DATE(cdate) >= DATE(NOW()) - INTERVAL 30 DAY`);
    console.log('File deleted!');
  }
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
  generate,
  deleteFile
};
