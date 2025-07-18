const DAL = require("./dal");
const crypto = require("crypto");
const common = require("../../utils/common");
const moment = require("moment");
const tokenVal = require("../../libs/tokenVal");
let algorithm = "aes256"; // or any other algorithm supported by OpenSSL
let key = "password";
 

const DTM = dateandtime();
const requestSend = async (req, res) => {
  try {
    let token = req.headers["x-access-token"];
    let mobilenumber = await tokenVal.getTokenVal(token);
    if (mobilenumber == "Wrong") {
      res.status(403).send(
        JSON.stringify({
          response: "Wrong email id.",
        })
      );
    }
   let reqMobilenumber = req.body.mobilenumber;
   let from = req.body.from;
    if (reqMobilenumber == from) {
      return res.status(403).send(
        JSON.stringify({
          messageDescription:
            "Requested and sender number should not be same.Please choose different number.",
        })
      );
    }
    let mobilenumberCheck = await tokenVal.mtnNumbers(reqMobilenumber);
    let fromnumberCheck = await tokenVal.mtnNumbers(from);
    if (fromnumberCheck.status != "1") {
      return res.status(403).send(
        JSON.stringify({
          messageDescription: "Enter valid MTN mobile number",
        })
      );
    }
    if (mobilenumberCheck.status == "1") {
    let  reqStatus = "0";
      let reqDatavalue = isNaN(parseInt(req.body.data))
        ? 0
        : parseInt(req.body.data);
      let reqAirtimevalue = isNaN(parseInt(req.body.airtime))
        ? 0
        : parseInt(req.body.airtime);
      let DTM = dateandtime();

      let otp = otp_genrate_fun();
      // var OTP_GEN = "1234";
      let otp_pass = [otp, from];
      console.log("234 OTP_GEN", otp);
      otp_sms_fun(otp_pass);
      let cipher = crypto.createCipher(algorithm, key);
      let encryptedOtp =
        cipher.update(otp, "utf8", "hex") + cipher.final("hex");
      console.log("encryptedOtp", encryptedOtp);
      console.log("otp", otp);
    let  dataJson = {
        token: token,
        mobilenumber: from,
        reqMobilenumber: reqMobilenumber,
        reqStatus: reqStatus,
        reqDatavalue: reqDatavalue,
        reqAirtimevalue: reqAirtimevalue,
        created_datetime: DTM,
        plan: req.body.plan,
        otp: encryptedOtp,
      };

     
      let response = await DAL.requestSend(dataJson);
      let response2 = await DAL.profile(dataJson);
      return res.status(200).send(
        JSON.stringify({
          responseDescription: response.message,
          userinfo: response2.userinfo,
          plan: response.plan,
          insertId: response.records,
          code: otp,
        })
      );
    } else {
      return res.status(403).send(
        JSON.stringify({
          messageDescription: "Enter valid MTN mobile number",
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const requestStatus = async (req, res) => {
  try {
    let token = req.headers["x-access-token"];
    let mobilenumber = await tokenVal.getTokenVal(token);
    if (mobilenumber == "Wrong") {
      res.status(403).send(
        JSON.stringify({
          response: "Wrong email id.",
        })
      );
    }
    let reqId = req.body.insertId;
    let pin = req.body.code;
    if (pin == "" || reqId == "") {
      return res.status(403).send(
        JSON.stringify({
          messageDescription: "please check your input",
        })
      );
    } else {
      dataJson = {
        token: token,
        reqId: reqId,
        DTM: DTM,
      };

    let  shareBorrowFind = await DAL.shareandborrowPinFind(dataJson);
    let  shareBorrowFindStatus = shareBorrowFind.status;
      if (shareBorrowFindStatus == "1") {
        dbPin = shareBorrowFind.records.otp;
        let decipher = crypto.createDecipher(algorithm, key);
        var decryptedPin =
          decipher.update(dbPin, "hex", "utf8") + decipher.final("utf8");
        if (decryptedPin == pin) {
          shareBorrowFind = await DAL.shareBorrowFind(dataJson);
          shareBorrowFind = shareBorrowFind.records;
          shareBorrow_mobilenumber = shareBorrowFind.mobilenumber;
          senderMobilenumber = shareBorrowFind.mobilenumber;
          receiverMobilenumber = shareBorrowFind.request_mobilenumber;

          let shareBorrow_data_balance = isNaN(
            parseInt(shareBorrowFind.data_balance)
          )
            ? 0
            : parseInt(shareBorrowFind.data_balance);
          let shareBorrow_airtime_balance = isNaN(
            parseInt(shareBorrowFind.airtime_balance)
          )
            ? 0
            : parseInt(shareBorrowFind.airtime_balance);
          dataJson = {
            receiverMobilenumber: receiverMobilenumber,
            senderMobilenumber: senderMobilenumber,
          };
          let response2 = await DAL.profile(dataJson);
          let balanceCheck = await DAL.balanceCheck(dataJson);
          senderBalanceCheck = balanceCheck.Records[0][0];
          //sender balance
          let senderDbBalance_airtime_balance = parseInt(
            senderBalanceCheck.airtime_balance
          );
          let senderDbBalance_data_balance = parseInt(
            senderBalanceCheck.data_balance
          );
           senderDataBalance =
            senderDbBalance_data_balance - shareBorrow_data_balance;
          //reciever balance

          receiverBalanceCheck = balanceCheck.Records[1][0];

          let receiverDbBalance_airtime_balance=isNaN(
            parseInt(receiverBalanceCheck.airtime_balance)
          )
            ? 0
            : parseInt(receiverBalanceCheck.airtime_balance);

          let receiverDbBalance_data_balance =isNaN(
            parseInt(receiverBalanceCheck.data_balance)
          )
            ? 0
            : parseInt(receiverBalanceCheck.data_balance);
          //reciever balance
           receiverDataBalance =
            receiverDbBalance_data_balance + shareBorrow_data_balance;
          if (shareBorrow_airtime_balance != "") {
            if (senderDbBalance_airtime_balance >= shareBorrow_airtime_balance) {
              var senderAirtimeBalance =
                senderDbBalance_airtime_balance - shareBorrow_airtime_balance;
              var receiverAirtimeBalance =
                receiverDbBalance_airtime_balance -
                -shareBorrow_airtime_balance;
              console.log("senderAirtimeBalance--", senderAirtimeBalance);
              console.log("receiverAirtimeBalance--", receiverAirtimeBalance);
              mobilenumber = {
                senderMobilenumber: senderMobilenumber,
                receiverMobilenumber: receiverMobilenumber,
              };
              balance = {
                senderAirtimeBalance: senderAirtimeBalance,
                receiverAirtimeBalance: receiverAirtimeBalance,
              };
              var dataJson = {
                mobilenumber: mobilenumber,
                balance: balance,
                updatetype: "airtime",
                reqId: reqId,
                DTM: DTM,
                // reqId: reqId
              };
               balanceUpdate = await DAL.databalanceUpdate(dataJson);
              return res.status(200).send(
                JSON.stringify({
                  status: "SUCCESS",
                  messageDescription: "Airtime Shared Successfully",
                  rows: {
                    date: DTM,
                    date1: moment(DTM).utc().toISOString(true),
                    date2: moment(DTM).toISOString(true),
                    message: "Thank you for using Airtime Borrow",
                    desc:
                      response2.userinfo.nick_name +
                      " has accepted to lend you Airtime and will be process soon",
                  },
                })
              );
            } else {
              return res.status(403).send(
                JSON.stringify({
                  status: "ERROR",
                  messageDescription: "Sorry your sharetime balance is low",
                })
              );
            }
          } else {
            let senderDataBalance =
              senderDbBalance_data_balance - shareBorrow_data_balance;
            if (senderDbBalance_data_balance >= shareBorrow_data_balance) {
              console.log("lessthan");
               senderDataBalance =
                senderDbBalance_data_balance - shareBorrow_data_balance;
              let receiverDataBalance =
                receiverDbBalance_data_balance - -shareBorrow_data_balance;
              mobilenumber = {
                senderMobilenumber: senderMobilenumber,
                receiverMobilenumber: receiverMobilenumber,
              };
            let  dataBalance = {
                senderDataBalance: senderDataBalance,
                receiverDataBalance: receiverDataBalance,
              };

              let dataJson = {
                mobilenumber: mobilenumber,
                balance: dataBalance,
                updatetype: "data",
                reqId: reqId,
                DTM: DTM,
              };
              balanceUpdate = await DAL.databalanceUpdate(dataJson);
              dataFinalResult = "data balance updated";

              return res.status(200).send(
                JSON.stringify({
                  status: "SUCCESS",
                  messageDescription: "Data Shared Successfully",
                  rows: {
                    date: DTM,
                    date1: moment(DTM).utc().toISOString(true),
                    date2: moment(DTM).toISOString(true),
                   
                    message: "Thank you for using Data Borrow",
                    desc:
                      response2.userinfo.nick_name +
                      " has accepted to lend you Data and will be process soon",
                  },
                })
              );
            } else {
              return res.status(403).send(
                JSON.stringify({
                  status: "ERROR",
                  messageDescription: "Sorry your data balance is low.",
                })
              );
            }
          }
        } else {
          return res.status(403).send(
            JSON.stringify({
              pinStatus: 0,
              pinMessage: "wrong pin",
            })
          );
        }
      }
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

function dateandtime() {
  let now =tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}

function otp_genrate_fun() {
  let otpValue = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);
  console.log("otp function calling", otpValue);
  return 1111;
}

function otp_sms_fun(otp_pass) {
  let mobilenumber = otp_pass[1];
  let OTP_GEN = otp_pass[0];
  let DTM = dateandtime();
  const accountSid = process.env.ACCOUNTSID;  
  const authToken = process.env.AUTHTOKEN;  
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: `Dear customer herewith we attached your OTP ${OTP_GEN}, mobilenumber ${mobilenumber}, time is ${DTM}`,
      messagingServiceSid: process.env.messagingServiceSid,
      to: mobilenumber,
    })
    .then((message) => console.log(message.sid))
    .done();
  
  console.log(
    "otp sms function calling",
    OTP_GEN,
    "mobile number",
    mobilenumber
  );
}

 
const data = async (req, res) => {
  try {
    return res.status(200).send(
      JSON.stringify({
        message: "Data list",
        rows: [
          {
            id: 1,
            currency: "R",
            price: 30,
            weight: 1,
            validity: "24 hrs",
            data: "100 MB",
            calls: "Trully Unlimited",
          },
          {
            id: 2,
            currency: "R",
            price: 40,
            weight: 2,
            validity: "30 hrs",
            data: "200 MB",
            calls: "Trully Unlimited",
          },
          {
            id: 3,
            currency: "R",
            price: 50,
            weight: 3,
            validity: "40 hrs",
            data: "300 MB",
            calls: "Trully Unlimited",
          },
          {
            id: 4,
            currency: "R",
            price: 50,
            weight: 4,
            validity: "48 hrs",
            data: "500 MB",
            calls: "Trully Unlimited",
          },
          {
            id: 5,
            currency: "R",
            price: 60,
            weight: 5,
            validity: "50 hrs",
            data: "600 MB",
            calls: "Trully Unlimited",
          },
          {
            id: 6,
            currency: "R",
            price: 800,
            weight: 6,
            validity: "24 hrs",
            data: "800 MB",
            calls: "Trully Unlimited",
          },
        ],
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const airtime = async (req, res) => {
  try {
    return res.status(200).send(
      JSON.stringify({
        message: "Airtime list",
        rows: [
          {
            id: 1,
            currency: "R",
            price: 30,
            weight: 1,
            validity: "24 hrs",
            airtime: "10 mins",
            calls: "Trully Unlimited",
          },
          {
            id: 2,
            currency: "R",
            price: 30,
            weight: 2,
            validity: "24 hrs",
            airtime: "150 minutes",
            calls: "Trully Unlimited",
          },
          {
            id: 3,
            currency: "R",
            price: 40,
            weight: 3,
            validity: "30 hrs",
            airtime: "250 minutes",
            calls: "Trully Unlimited",
          },
          {
            id: 4,
            currency: "R",
            price: 50,
            weight: 4,
            validity: "40 hrs",
            airtime: "350 minutes",
            calls: "Trully Unlimited",
          },
          {
            id: 5,
            currency: "R",
            price: 50,
            weight: 5,
            validity: "48 hrs",
            airtime: "450 minutes",
            calls: "Trully Unlimited",
          },
          {
            id: 6,
            currency: "R",
            price: 60,
            weight: 6,
            validity: "50 hrs",
            airtime: "550 minutes",
            calls: "Trully Unlimited",
          },
        ],
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
module.exports = {
  requestSend,
  requestStatus,
  data,
  airtime,
};
