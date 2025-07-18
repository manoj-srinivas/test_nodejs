const mysql = require('../../libs/mysqlDB');
// const fcm =  require('../../libs/fcm');

const balanceCheck  = async(dataJson) =>{
  try {
  let  senderMobilenumber       = dataJson.senderMobilenumber;  
  let  receiverMobilenumber     = dataJson.receiverMobilenumber;
    let response             = {};  
    let result;
    
     senderResult = await mysql.selectData(`select * from balance where mobilenumber = '${senderMobilenumber}'`);  
     receiverResult = await mysql.selectData(`select * from balance where mobilenumber = '${receiverMobilenumber}'`);        
    result = [senderResult,receiverResult];
    response.message = `Records added successfully`;
    // response.senderRecords   = senderResult; 
    // response.receiverRecords = receiverResult; 
    response.Records = result; 
    return response;
  }catch (err) {
    throw err;
  }
}
const shareBalanceCheck  = async(dataJson) =>{
  try {
    senderMobilenumber       = dataJson.senderMobilenumber;   
    receiverMobilenumber       = dataJson.receiverMobilenumber;   
    let response             = {};  
    var result;
    senderResult = await mysql.selectData(`select data_balance,airtime_balance from balance where mobilenumber = '${senderMobilenumber}' `); 
    receiverResult = await mysql.selectData(`select data_balance,airtime_balance from balance where mobilenumber = '${receiverMobilenumber}' `);        
    response.message = `Records found successfully`;
    result = {senderResult:senderResult,receiverResult: receiverResult};
    response.records = result; 
    console.log("result 585",result);
    return response;
  }catch (err) {
    throw err;
  }
}
const shareBalanceInsert  = async(dataJson) =>{
  try {
    // console.log("592",dataJson);
    senderMobilenumber   = dataJson.senderMobilenumber; 
    receiverMobilenumber = dataJson.receiverMobilenumber;
    data_balance         = dataJson.reqDatavalue;
    airtime_balance      = dataJson.reqAirtimevalue; 
    senderDataBalance= dataJson.senderDataBalance;
    senderAirtimeBalance= dataJson.senderAirtimeBalance;
    receiverDataBalance= dataJson.receiverDataBalance;
    receiverAirtimeBalance= dataJson.receiverAirtimeBalance;
    message= dataJson.message;
    transactionId=dataJson.transactionId;
    DTM = dataJson.DTM;
    let response       = {};  
  
    if(dataJson.reqDatavalue!=undefined){
      var senderResult   = await mysql.updateData(`UPDATE  balance set  data_balance = '${senderDataBalance}',	update_datetime = '${DTM}' WHERE mobilenumber = '${senderMobilenumber}'`); 
      var receiverResult = await mysql.updateData(`UPDATE  balance set  data_balance = '${receiverDataBalance}',update_datetime = '${DTM}' WHERE mobilenumber = '${receiverMobilenumber}'`); 
      var shareBorrowresult = await mysql.insertData(`INSERT INTO share_and_borrow (mobilenumber,request_mobilenumber,data_balance,data_status,created_datetime,message,transactionId) VALUES ('${senderMobilenumber}','${receiverMobilenumber}','${data_balance}','1','${DTM}','${message}','${transactionId}')`); 
      let recieverBalance=await mysql.selectData(`SELECT data_balance,airtime_balance  from balance WHERE mobilenumber = '${receiverMobilenumber}' `); 
      let senderBalance=await mysql.selectData(`SELECT data_balance,airtime_balance  from balance WHERE mobilenumber = '${senderMobilenumber}' `); 
      if(recieverBalance[0].data_balance<=0){
        await mysql.updateData(`UPDATE balance SET  data_balance=10000,update_datetime = '${DTM}' WHERE mobilenumber = '${receiverMobilenumber}' `); 
      }
      if(senderBalance[0].data_balance<=0){
        await mysql.updateData(`UPDATE balance SET  data_balance=10000,update_datetime = '${DTM}' WHERE mobilenumber = '${senderMobilenumber}' `); 
      }
    }else{
       senderResult   = await mysql.updateData(`UPDATE  balance set   airtime_balance = '${senderAirtimeBalance}',	update_datetime = '${DTM}' WHERE mobilenumber = '${senderMobilenumber}'`); 
       receiverResult = await mysql.updateData(`UPDATE  balance set  airtime_balance = '${receiverAirtimeBalance}',update_datetime = '${DTM}' WHERE mobilenumber = '${receiverMobilenumber}'`); 
       shareBorrowresult = await mysql.insertData(`INSERT INTO share_and_borrow (mobilenumber,request_mobilenumber,airtime_balance,airtime_status,created_datetime,message,transactionId) VALUES ('${senderMobilenumber}','${receiverMobilenumber}','${airtime_balance}','1','${DTM}','${message}','${transactionId}')`); 
       recieverBalance=await mysql.selectData(`SELECT data_balance,airtime_balance  from balance WHERE mobilenumber = '${receiverMobilenumber}' `); 
       senderBalance=await mysql.selectData(`SELECT data_balance,airtime_balance  from balance WHERE mobilenumber = '${senderMobilenumber}' `); 
       if(recieverBalance[0].airtime_balance<=0){
        await mysql.updateData(`UPDATE balance SET  airtime_balance=100,update_datetime = '${DTM}' WHERE mobilenumber = '${receiverMobilenumber}' `); 
      }
      if(senderBalance[0].airtime_balance<=0){
        await mysql.updateData(`UPDATE balance SET  airtime_balance=100,update_datetime = '${DTM}' WHERE mobilenumber = '${senderMobilenumber}' `); 
      }
    }
   
    var sendername = await mysql.selectData(`SELECT nick_name from profile where mobilenumber='${senderMobilenumber}'`);     
    var recievername = await mysql.selectData(`SELECT nick_name from profile where mobilenumber='${receiverMobilenumber}'`);               
    // console.log("104 from dal,",senderResult);
    console.log("106 from dal,",shareBorrowresult);
    if(shareBorrowresult[0]>0){
     //push notification
     let senderDeviceToken=await mysql.selectData(`SELECT deviceToken from  devicedetails where mobilenumber='${senderMobilenumber}' order by id desc limit 1`);        
     let reciverDeviceToken=await mysql.selectData(`SELECT deviceToken from  devicedetails where mobilenumber='${receiverMobilenumber}' order by id desc limit 1`);        
   
     //fcm message
     if(airtime_balance!=undefined){
        fcmBody=`${sendername[0].nick_name} has successfully shared ${airtime_balance} airtime to your mobile number`;
     }else{
       fcmBody=`${sendername[0].nick_name} has successfully shared ${data_balance}MB data to your mobile number`;
     }
     //borrower notification
     if(senderDeviceToken.length>0){
      var dataJson = {
        title:'Successful Share',
        body:'Thanks for sharing',
        deviceToken: senderDeviceToken[0].deviceToken,
      }
      //  response=  await fcm.sendNotification(dataJson);
      response = { status: "success" };
     }
    
 // lender notification
 if(reciverDeviceToken.length>0){
 var dataJson = {
   title:'Successful Share',
   body:fcmBody,
   deviceToken: reciverDeviceToken[0].deviceToken,
 }
  // response=  await fcm.sendNotification(dataJson);
  response = { status: "success" };
}
 //end push notification

      result = {senderResult:senderResult,receiverResult:receiverResult,shareBorrowresult:shareBorrowresult,sendername:sendername,recievername:recievername};
      response.message = `Records added successfully`;
      response.records = result; 
    }else{
      response.message = `Some error occured try again.`;
    }
   
   
    return response;
  }catch (err) {
    throw err;
  }
}

const shareBorrowFind  = async(dataJson) =>{
  try {
    mobilenumber       = dataJson.mobilenumber;  
    id              = dataJson.reqId;

    let response       = {};  
    // var result = await mysql.insertData(`UPDATE link SET  status='${linkStatus}' WHERE mobilenumber = '${mobilenumber}' AND ipaddress = '${ipaddress}' AND add_mobilenumber= '${removeMobilenumber}'   `); 
    var result = await mysql.selectData(`select * from share_and_borrow where id = '${id}'`);        
    response.message = `Records added successfully`;
    response.records = result[0]; 
    return response;
  }catch (err) {
    throw err;
  }
}

const shareandborrowPinFind  = async(dataJson) =>{
  try { 
    var mobilenumber       = dataJson.mobilenumber;  
    var reqId              = dataJson.reqId;   
    console.log("192",reqId);
    let response       = {};   
    var result = await mysql.selectData(`select otp from share_and_borrow where id = '${reqId}' and mobilenumber= '${mobilenumber}'`);        
    response.recordsCheck = result[0]; 
    if(response.recordsCheck == ''){
      response.records = result[0]; 
      response.status = `0`;
    }else{
      response.records = result[0]; 
      response.status = `1`;
    }
    return response;
  }catch (err) {
    throw err;
  }
}
const history  = async(dataJson) =>{
  try {
    mobilenumber       = dataJson.mobilenumber;  
    let response       = {};  
    var result = await mysql.selectData(`select * from share_and_borrow where mobilenumber = '${mobilenumber}'`);        
    response.message = `Records founds successfully`;
    response.records = result[0]; 
    return response;
  }catch (err) {
    throw err;
  }
}
const recentlyShared  = async(dataJson) =>{
  try {
    mobilenumber       = dataJson.mobilenumber;  
    let response       = {}; 
    let sender= await mysql.selectData(`select nick_name as senderName,mobilenumber as senderNumber from  profile  where mobilenumber = '${mobilenumber}' `); 
    if(dataJson.type=='data'){        
      var result = await mysql.selectData(`select data_balance as shared,profile.nick_name as receivername,profile.profile_image as image,profile.mobilenumber as recieverNumber from share_and_borrow INNER JOIN profile ON profile.mobilenumber=share_and_borrow.request_mobilenumber  where share_and_borrow.mobilenumber = '${mobilenumber}' and data_balance!='' order by share_and_borrow.id desc limit 4`);        
      var record = result.map((item) => ({
        ...item,
        image: item.image?process.env.PUBLIC_ORIGIN+"/uploads/profile/image/"+item.image:'', 
        shared:isNaN(item.shared)?0:item.shared+' Data',
       type:dataJson.type,
       senderName:sender[0].senderName,
       senderNumber:sender[0].senderNumber,
      }));
    }else{
      var result = await mysql.selectData(`select airtime_balance as shared,profile.nick_name as receivername,profile.profile_image as image,profile.mobilenumber as recieverNumber from share_and_borrow INNER JOIN profile ON profile.mobilenumber=share_and_borrow.request_mobilenumber  where share_and_borrow.mobilenumber = '${mobilenumber}' and airtime_balance!='' order by share_and_borrow.id desc limit 4`);        
      var record = result.map((item) => ({
        ...item,
        image: item.image?process.env.PUBLIC_ORIGIN+"/uploads/profile/image/"+item.image:'', 
        shared:isNaN(item.shared)?0:item.shared+' Mins',
       type:dataJson.type,
       senderName:sender[0].senderName,
       senderNumber:sender[0].senderNumber,
      }));
    }
  //  console.log(result);
    response.message = `Records founds successfully`;
    response.records = record;
    return response;
  }catch (err) {
    throw err;
  }
}
const validateNumber = async(dataJson)=>{
  try{
    mobilenumber          = dataJson.loginNumber; 
    addMobilenumber       = dataJson.senderMobilenumber; 
    let response = {};  
    var result = await mysql.selectData(`SELECT * FROM link Where mobilenumber = '${mobilenumber}' AND add_mobilenumber= '${addMobilenumber}' AND status = '1'`);
    response.message = `Records found successfully`;
    if(result == ''){
      response.status = '0';
      response.records = result; 
    }else{
      response.status = '1';
      response.records = result; 
    }
    return response;
  }catch (err) {
    throw err;
  }
}

const checkType = async(dataJson)=>{
  try{
    senderMobilenumber          = dataJson.senderMobilenumber; 
    receiverMobilenumber       = dataJson.receiverMobilenumber; 
    let response = {};  
    let typeSend = await mysql.selectData(`SELECT type FROM profile Where mobilenumber = '${senderMobilenumber}'`);
      response.senderType=typeSend[0];
      let typeRes = await mysql.selectData(`SELECT type FROM profile Where mobilenumber = '${receiverMobilenumber}'`);
      response.recieverType=typeRes[0];
      return response;
  }catch (err) {
    throw err;
  }
}
/**
 * Exporting the modules
 */
module.exports = {  
  balanceCheck,
  shareBorrowFind,
  shareBalanceCheck,
  shareBalanceInsert,
  shareandborrowPinFind,
  history,
  recentlyShared,
  validateNumber,
  checkType
};
