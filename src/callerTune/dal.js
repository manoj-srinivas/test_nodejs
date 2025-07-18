const mysql = require('../../libs/mysqlDB');

const subscribe = async (dataJson) => {
  try {
    
      let response = {};
      msisdn = dataJson.msisdn;   
      toneid = dataJson.toneId;   
       DTM = dataJson.DTM; 
       DTM_next = dataJson.DTM_next; 
       let deleteval=await mysql.deleteData(`DELETE  from subscribedcallertunes where mobilenumber='${msisdn}'`);
      
        let result = await mysql.insertData(`INSERT INTO subscribedcallertunes (mobilenumber,toneid,enableDate,toneStatus,nextRenewalDate) VALUES ('${msisdn}','${toneid}','${DTM}','ACTIVE','${DTM_next}')`);        
        response.records = result[0];
       

      return response;
  } catch (err) {
    throw err;
  }
};

const toneProfile = async (dataJson) => {
  try {
    // let combinedArray = [];
      let response = {};
      msisdn = dataJson.mssidn;   
       DTM = dataJson.DTM; 

       var result = await mysql.selectData(`SELECT toneid,enableDate,toneStatus,nextRenewalDate from subscribedcallertunes  where mobilenumber='${msisdn}'`);
      if(result.length>0){
        for(let i=0;i<result.length;i++){
          let toneid=result[i].toneid;
          var toneDetails = await mysql.selectData(`SELECT toneid as toneId,contentPlan as optedPlan,contentPrice,contentPath,contentValidity,contentImagePath,contentArtist,contentAlbum as soRame,contentType,shortCode,title from callertune where toneid='${toneid}'`);
          var record = toneDetails.map((item) => ({
            ...item,
  status:result[i].toneStatus,
  toneStatus:result[i].toneStatus,
  enableDate:result[i].enableDate,
  seriesEndTime: result[i].nextRenewalDate,
  enableDateTime: result[i].enableDate,
  toneExpiryDate: result[i].nextRenewalDate,
  lastBillingTime:  result[i].enableDate.slice(0, result[i].enableDate.lastIndexOf(" ")),
  nextRenewalDate: result[i].nextRenewalDate.slice(0, result[i].nextRenewalDate.lastIndexOf(" ")),
  nextRenewalTime:result[i].nextRenewalDate.slice(result[i].nextRenewalDate.length-8),
  seriesStartTime: result[i].enableDate,
  contentExpiryDate: result[i].enableDate,
  lastBillingDateTime: result[i].enableDate,
  nextRenewalDateTime: result[i].nextRenewalDate,
          }));
    
         }
         response.records = record;
      }else{
        response.message='empty'
      }
      
       console.log(result);
      return response;
  } catch (err) {
    throw err;
  }
};
const toneDelete = async (dataJson) => {
  try {
    
      let response = {};
      msisdn = dataJson.msisdn;   
      toneid=dataJson.toneId;
      var result = await mysql.selectData(`SELECT toneid from subscribedcallertunes  where mobilenumber='${msisdn}'`);
      if(result.length>0){
       var result = await mysql.deleteData(`DELETE  from subscribedcallertunes  where mobilenumber='${msisdn}' and toneid='${toneid}'`);
      }else{
        response.message='empty'
      }
      return response;
  } catch (err) {
    throw err;
  }
};
const allCallertune = async (req,res) => {
  try {
      let response = {};
      let combinedArray = [];
       var result = await mysql.selectData(`SELECT toneId as id,contentPlan,contentPrice,contentPath,contentValidity,contentImagePath,contentArtist,contentAlbum,contentType,ccode,shortCode,genre,subGenre,subSubGenre,cpName,status,title from callertune`);     
         response.records = result;
      return response;
  } catch (err) {
    throw err;
  }
};
/**
 * Exporting the modules
 */
module.exports = { 
  subscribe,
  toneProfile,
  toneDelete,
  allCallertune
};
