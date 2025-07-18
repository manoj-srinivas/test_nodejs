const mysql = require("../../libs/mysqlDB");
const fcm = require("../../libs/fcm");

const requestSend = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    requestMobilenumber = dataJson.reqMobilenumber;
    data_balance = dataJson.reqDatavalue;
    airtime_balance = dataJson.reqAirtimevalue;
    created_datetime = dataJson.created_datetime;
    otp = dataJson.otp;
    let response = {};

    if (dataJson.reqAirtimevalue != "") {
      var result = await mysql.insertData(
        `INSERT INTO share_and_borrow (mobilenumber,request_mobilenumber,airtime_balance,created_datetime,data_status,airtime_status,otp) VALUES ('${mobilenumber}','${requestMobilenumber}','${airtime_balance}','${created_datetime}','0','0','${otp}')`
      );
    } else {
      var result = await mysql.insertData(
        `INSERT INTO share_and_borrow (mobilenumber,request_mobilenumber,data_balance,created_datetime,data_status,airtime_status,otp) VALUES ('${mobilenumber}','${requestMobilenumber}','${data_balance}','${created_datetime}','0','0','${otp}')`
      );
    } 

    if (result[0] > 0) {
      //push notification
      let deviceToken = await mysql.selectData(
        `SELECT deviceToken from  devicedetails where mobilenumber='${mobilenumber}' order by id desc limit 1`
      );
      let lenderDeviceToken = await mysql.selectData(
        `SELECT deviceToken from  devicedetails where mobilenumber='${requestMobilenumber}' order by id desc limit 1`
      );
      let userinfo = await mysql.selectData(
        `SELECT nick_name from  profile where mobilenumber='${mobilenumber}' order by id desc limit 1`
      );

      if (dataJson.reqAirtimevalue != "") {
        fcmBody = `${userinfo[0].nick_name} has successfully borrowed ${airtime_balance} airtime from your mobile number`;
      } else {
        fcmBody = `${userinfo[0].nick_name} has successfully borrowed ${data_balance}MB data from your mobile number`;
      }
      //borrower notification
      if (deviceToken.length > 0) {
        var dataJson = {
          title: "Successful Borrow Request",
          body: "Thanks for borrowing data",
          deviceToken: deviceToken[0].deviceToken,
        };
        response = await fcm.sendNotification(dataJson);
      }
      // lender notification
      if (lenderDeviceToken.length > 0) {
        var dataJson = {
          title: "Successful Borrow Request",
          body: fcmBody,
          deviceToken: lenderDeviceToken[0].deviceToken,
        };

        response = await fcm.sendNotification(dataJson);
      }
      //end push notification
      response.status = `SUCCESS`;
      response.message = `request created successfully`;
      (response.code = "1234"), (response.records = result[0]);
      if (dataJson.reqAirtimevalue != "") {
        plandetails = {
          id: dataJson.plan,
          currency: "R",
          price: 30,
          weight: 1,
          validity: "24 hrs",
          airtime: "10 minutes",
          calls: "Trully Unlimited",
          payment: {
            subtotal: "30",
            "service Charege": 5,
            "amount Payble": 35,
          },
        };
      } else {
        plandetails = {
          id: dataJson.plan,
          currency: "R",
          price: 30,
          weight: 1,
          validity: "24 hrs",
          data: "100 MB",
          calls: "Trully Unlimited",
          payment: {
            subtotal: "30",
            "service Charege": 5,
            "amount Payble": 35,
          },
        };
      }
      response.plan = plandetails;
    } else {
      response.message = `Some error occured.Try Again`;
    }

    return response;
  } catch (err) {
    throw err;
  }
};

const balanceCheck = async (dataJson) => {
  try {
    senderMobilenumber = dataJson.senderMobilenumber;
    receiverMobilenumber = dataJson.receiverMobilenumber;
    let response = {};
    var result;
    senderResult = await mysql.selectData(
      `select  data_balance,airtime_balance from balance where mobilenumber = '${senderMobilenumber}'`
    );
    receiverResult = await mysql.selectData(
      `select  data_balance,airtime_balance from balance where mobilenumber = '${receiverMobilenumber}'`
    );
    result = [senderResult, receiverResult];
    response.message = `Records added successfully`;
    response.Records = result;
    return response;
  } catch (err) {
    throw err;
  }
};
const shareBalanceCheck = async (dataJson) => {
  try {
    senderMobilenumber = dataJson.senderMobilenumber;
    receiverMobilenumber = dataJson.receiverMobilenumber;
    let response = {};
    var result;
    senderResult = await mysql.selectData(
      `select * from balance where mobilenumber = '${senderMobilenumber}' `
    );
    receiverResult = await mysql.selectData(
      `select * from balance where mobilenumber = '${receiverMobilenumber}' `
    );

    // result = shareBalanceCheck;
    response.message = `Records found successfully`;
    // response.senderRecords   = senderResult;
    // response.receiverRecords = receiverResult;
    result = { senderResult: senderResult, receiverResult: receiverResult };
    response.records = result;
    console.log("result 585", result);
    return response;
  } catch (err) {
    throw err;
  }
};
const shareBalanceInsert = async (dataJson) => {
  try {
    // console.log("592",dataJson);
    senderMobilenumber = dataJson.senderMobilenumber;
    receiverMobilenumber = dataJson.receiverMobilenumber;
    data_balance = dataJson.reqDatavalue;
    airtime_balance = dataJson.reqAirtimevalue;
    senderDataBalance = dataJson.senderDataBalance;
    senderAirtimeBalance = dataJson.senderAirtimeBalance;
    receiverDataBalance = dataJson.receiverDataBalance;
    receiverAirtimeBalance = dataJson.receiverAirtimeBalance;
    message = dataJson.message;
    transactionId = dataJson.transactionId;
    DTM = dataJson.DTM;
    let response = {};
    var senderResult = await mysql.updateData(
      `UPDATE  balance set  data_balance = '${senderDataBalance}', airtime_balance = '${senderAirtimeBalance}',	update_datetime = '${DTM}' WHERE mobilenumber = '${senderMobilenumber}'`
    );
    console.log("104 from dal,", senderResult);

    var receiverResult = await mysql.updateData(
      `UPDATE  balance set  data_balance = '${receiverDataBalance}',airtime_balance = '${receiverAirtimeBalance}',update_datetime = '${DTM}' WHERE mobilenumber = '${receiverMobilenumber}'`
    );
    console.log("105 from dal,", receiverResult);

    // var result = await mysql.selectData(`select * from share_and_borrow where id = '${id}'`);
    var shareBorrowresult = await mysql.insertData(
      `INSERT INTO share_and_borrow (mobilenumber,request_mobilenumber,data_balance,airtime_balance,data_status,airtime_status,created_datetime,message,transactionId) VALUES ('${receiverMobilenumber}','${senderMobilenumber}','${data_balance}','${airtime_balance}','1','1','${DTM}','${message}','${transactionId}')`
    );
    var sendername = await mysql.selectData(
      `SELECT nick_name  from profile where mobilenumber='${senderMobilenumber}'`
    );
    var recievername = await mysql.selectData(
      `SELECT nick_name  from profile where mobilenumber='${receiverMobilenumber}'`
    );
    // console.log("104 from dal,",senderResult);
    console.log("106 from dal,", shareBorrowresult);
    response.message = `Records added successfully`;
    result = {
      senderResult: senderResult,
      receiverResult: receiverResult,
      shareBorrowresult: shareBorrowresult,
      sendername: sendername,
      recievername: recievername,
    };
    response.records = result;
    return response;
  } catch (err) {
    throw err;
  }
};

const shareBorrowFind = async (dataJson) => {
  try {
    id = dataJson.reqId;
    let response = {};
    var result = await mysql.selectData(
      `select mobilenumber,request_mobilenumber,otp,data_balance,airtime_balance,data_status,airtime_status from share_and_borrow where id = '${id}'`
    );
    response.message = `Records added successfully`;
    response.records = result[0];
    return response;
  } catch (err) {
    throw err;
  }
};

const databalanceUpdate = async (dataJson) => {
  try {
    let senderMobilenumber = dataJson.mobilenumber.senderMobilenumber;
    let receiverMobilenumber = dataJson.mobilenumber.receiverMobilenumber;
    let receiverDataBalance = dataJson.balance.receiverDataBalance;
    let senderDataBalance = dataJson.balance.senderDataBalance;
    let receiverAirtimeBalance = dataJson.balance.receiverAirtimeBalance;
    let senderAirtimeBalance = dataJson.balance.senderAirtimeBalance;
    let updatetype = dataJson.updatetype;
    let reqId = dataJson.reqId;
    let DTM = dataJson.DTM;
    let response = {};
    if (updatetype == "data") {
      var receiverResult = await mysql.updateData(
        `UPDATE balance SET  data_balance='${receiverDataBalance}',update_datetime = '${DTM}' WHERE mobilenumber = '${receiverMobilenumber}' `
      );
      var senderResult = await mysql.updateData(
        `UPDATE balance SET  data_balance='${senderDataBalance}',update_datetime = '${DTM}' WHERE mobilenumber = '${senderMobilenumber}' `
      );
      var shareandborrowResult = await mysql.updateData(
        `UPDATE share_and_borrow SET  data_status='1',update_datetime = '${DTM}' WHERE id = '${reqId}' `
      );
      result = [receiverResult, senderResult, shareandborrowResult];
      let recieverBalance=await mysql.selectData(`SELECT data_balance,airtime_balance  from balance WHERE mobilenumber = '${receiverMobilenumber}' `); 
      let senderBalance=await mysql.selectData(`SELECT data_balance,airtime_balance  from balance WHERE mobilenumber = '${senderMobilenumber}' `); 
      if(recieverBalance[0].data_balance<=0){
        await mysql.updateData(`UPDATE balance SET  data_balance=10000,update_datetime = '${DTM}' WHERE mobilenumber = '${receiverMobilenumber}' `); 
      }
      if(senderBalance[0].data_balance<=0){
        await mysql.updateData(`UPDATE balance SET  data_balance=10000,update_datetime = '${DTM}' WHERE mobilenumber = '${senderMobilenumber}' `); 
      }
    }
    if (updatetype == "airtime") {
      var receiverResult = await mysql.updateData(
        `UPDATE balance SET  airtime_balance='${receiverAirtimeBalance}',update_datetime = '${DTM}' WHERE mobilenumber = '${receiverMobilenumber}' `
      );
      var senderResult = await mysql.updateData(
        `UPDATE balance SET  airtime_balance='${senderAirtimeBalance}',update_datetime = '${DTM}' WHERE mobilenumber = '${senderMobilenumber}' `
      );
      var shareandborrowResult = await mysql.updateData(
        `UPDATE share_and_borrow SET  airtime_status='1',update_datetime = '${DTM}' WHERE id = '${reqId}' `
      );
      result = [receiverResult, senderResult, shareandborrowResult];
       recieverBalance=await mysql.selectData(`SELECT data_balance,airtime_balance  from balance WHERE mobilenumber = '${receiverMobilenumber}' `); 
       senderBalance=await mysql.selectData(`SELECT data_balance,airtime_balance  from balance WHERE mobilenumber = '${senderMobilenumber}' `); 
      if(recieverBalance[0].airtime_balance<=0){
        await mysql.updateData(`UPDATE balance SET  airtime_balance=100,update_datetime = '${DTM}' WHERE mobilenumber = '${receiverMobilenumber}' `); 
      }
      if(senderBalance[0].airtime_balance<=0){
        await mysql.updateData(`UPDATE balance SET  airtime_balance=100,update_datetime = '${DTM}' WHERE mobilenumber = '${senderMobilenumber}' `); 
      }
    }

    //push notification
    let senderDeviceToken = await mysql.selectData(
      `SELECT deviceToken from  devicedetails where mobilenumber='${senderMobilenumber}' order by id desc limit 1`
    );
    let recieverDeviceToken = await mysql.selectData(
      `SELECT deviceToken from  devicedetails where mobilenumber='${receiverMobilenumber}' order by id desc limit 1`
    );
    //borrower notification
    if (senderDeviceToken.length > 0) {
      var dataJson = {
        title: "Borrow Response",
        body: "Successful Borrow Response",
        deviceToken: senderDeviceToken[0].deviceToken,
      };
      response = await fcm.sendNotification(dataJson);
    }

    //lender notification
    if (recieverDeviceToken.length > 0) {
      var dataJson = {
        title: "Lender Borrow Response",
        body: "Successful Borrow Response",
        deviceToken: recieverDeviceToken[0].deviceToken,
      };
      response = await fcm.sendNotification(dataJson);
    }
    //end push notification
    response.message = `Records update successfully`;
    response.records = result;
    return response;
  } catch (err) {
    throw err;
  }
};

const shareandborrowPinFind = async (dataJson) => {
  try {
    var reqId = dataJson.reqId;
    console.log("192", reqId);
    let response = {};
    var result = await mysql.selectData(
      `select otp from share_and_borrow where id = '${reqId}'`
    );
    response.recordsCheck = result[0];
    if (response.recordsCheck == "") {
      response.records = result[0];
      response.status = `0`;
    } else {
      response.records = result[0];
      response.status = `1`;
    }
    return response;
  } catch (err) {
    throw err;
  }
};
const history = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    let response = {};
    var result = await mysql.selectData(
      `select * from share_and_borrow where mobilenumber = '${mobilenumber}'`
    );
    response.message = `Records founds successfully`;
    response.records = result[0];
    return response;
  } catch (err) {
    throw err;
  }
};
const recentlyShared = async (dataJson) => {
  try {
    mobilenumber = dataJson.mobilenumber;
    let response = {};
    var result = await mysql.selectData(
      `select data_balance,airtime_balance,data_status,airtime_status,profile.nick_name ,profile.profile_image,profile.mobilenumber from share_and_borrow INNER JOIN profile ON profile.mobilenumber=share_and_borrow.request_mobilenumber  where share_and_borrow.mobilenumber = '${mobilenumber}' `
    );
    //  console.log(result);
    response.message = `Records founds successfully`;
    const record = result.map((item) => ({
      ...item,
      profile_image: item.profile_image
        ? process.env.PUBLIC_ORIGIN +
          "/uploads/profile/image/" +
          item.profile_image
        : "",
    }));
    response.records = record;
    // response.records = result;
    return response;
  } catch (err) {
    throw err;
  }
};
const profile = async (dataJson) => {
  try {
    let response = {};
    mobilenumber = dataJson.senderMobilenumber;
    var result = await mysql.selectData(
      `SELECT id,mobilenumber,nick_name,profile_image FROM profile Where mobilenumber = '${mobilenumber}' `
    );
    console.log("result from dal", result);
    if (result.length == 0) {
      response.noContent = true;
      response.message = `empty`;
      return response;
    }
    const record = result.map((item) => ({
      ...item,
      profile_image: item.profile_image
        ? process.env.PUBLIC_ORIGIN +
          "/uploads/profile/image/" +
          item.profile_image
        : "",
    }));
    response.userinfo = record[0];
    return response;
  } catch (err) {
    throw err;
  }
};

/**
 * Exporting the modules
 */
module.exports = {
  requestSend,
  balanceCheck,
  shareBorrowFind,
  databalanceUpdate,
  // airtimebalanceUpdate,
  shareBalanceCheck,
  shareBalanceInsert,
  shareandborrowPinFind,
  history,
  recentlyShared,
  profile,
};
