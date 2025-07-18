const https = require("https");
const DAL = require("./dal");
const common = require("../../utils/common");
const moment = require("moment");
const tokenVal = require('../../libs/tokenVal');


const DTM = dateandtime();
const share = async (req, res) => {
  try {
    let token = req.headers["x-access-token"];
    let mobilenumber = await tokenVal.getTokenVal(token);
    if (mobilenumber == 'Wrong') {
      res.status(403).send(
        JSON.stringify(
          {
            response: "Wrong email id.",
          }
        )
      );
    }
    let dataJson = {
      senderMobilenumber: req.body.from,
      receiverMobilenumber: req.body.to,
    };
    let checkType = await DAL.checkType(dataJson);
    if (
      checkType.recieverType.type == "Postpaid" ||
      checkType.senderType.type == "Postpaid"
    ) {
      return res.status(403).send(
        JSON.stringify({
          messageDescription:
            "These features not available for postpaid number.",
        })
      );
    }

    //check number type
    dataJson = {
      // token: token,
      loginNumber: mobilenumber,
      senderMobilenumber: req.body.from,
      receiverMobilenumber: req.body.to,
      reqDatavalue: req.body.data,
      reqAirtimevalue: req.body.airtime,
      message: req.body.message,
      DTM: DTM,
    };
    if (req.body.from == req.body.to) {
      return res.status(403).send(
        JSON.stringify({
          messageDescription:
            "Sender and receiver number should not same.Please choose different number.",
        })
      );
    }
    if (req.body.from == "" && req.body.to == "") {
      return res.status(403).send(
        JSON.stringify({
          messageDescription: "Sender & Receiver number should not empty.",
        })
      );
    }
    if (req.body.from != "" && req.body.to == "") {
      return res.status(403).send(
        JSON.stringify({
          messageDescription: "Receiver field should not empty.",
        })
      );
    }
    if (req.body.data == "" && req.body.airtime == "") {
      return res.status(403).send(
        JSON.stringify({
          messageDescription: "Please choose the plan value to share.",
        })
      );
    }
    if (req.body.from != mobilenumber) {
      let validate = await DAL.validateNumber(dataJson);
      console.log(validate);
      if (validate.status == 0) {
        return res.status(403).send(
          JSON.stringify({
            messageDescription: "Please link this number first.",
          })
        );
      }
    }

    let senderMobilenumber = req.body.from;
    let receiverMobilenumber = req.body.to;
    let reqDatavalue = isNaN(parseInt(req.body.data))
      ? 0
      : parseInt(req.body.data);
    let reqAirtimevalue = isNaN(parseInt(req.body.airtime))
      ? 0
      : parseInt(req.body.airtime);

    let mobilenumberCheck = await tokenVal.mtnNumbers(receiverMobilenumber);
    if (mobilenumberCheck.status == '1') {
      if (reqDatavalue == "" && reqAirtimevalue == "") {
        return res.status(403).send(
          JSON.stringify({
            messageDescription: "please check you input",
          })
        );
      } else {
        let shareBalanceCheck = await DAL.shareBalanceCheck(dataJson); //.log("200",shareBalanceCheck.records);
        let receiver_shareBalanceCheck =
          shareBalanceCheck.records.receiverResult[0];
        shareBalanceCheck = shareBalanceCheck.records.senderResult[0];
        //sender balance
        let sender_data_balance = parseInt(shareBalanceCheck.data_balance);
        let sender_airtime_balance = parseInt(
          shareBalanceCheck.airtime_balance
        );
        //reciever balance
        let receiver_data_balance = parseInt(
          receiver_shareBalanceCheck.data_balance
        );
        let receiver_airtime_balance = parseInt(
          receiver_shareBalanceCheck.airtime_balance
        );

        if (reqDatavalue != "") {
          if (sender_data_balance >= reqDatavalue) {
            let senderDataBalance = sender_data_balance - reqDatavalue;
            let receiverDataBalance = receiver_data_balance + reqDatavalue;
            dataJson = {
              senderMobilenumber: senderMobilenumber,
              receiverMobilenumber: receiverMobilenumber,
              reqDatavalue: reqDatavalue,
              senderDataBalance: senderDataBalance,
              receiverDataBalance: receiverDataBalance,
              message: req.body.message,
              DTM: DTM,
              transactionId: "MTN" + Math.floor(Math.random() * 10000) + 1,
            };
            shareDataBalanceUpdate = await DAL.shareBalanceInsert(dataJson);
          } else {
            //insufficient balance

            return res.status(200).send(
              JSON.stringify({
                messageDescription:
                  "You do not have sufficient balance to share data",

              })
            );
          }
        }
        if (reqAirtimevalue != "") {
          if (sender_airtime_balance >= reqAirtimevalue) {
            let senderAirtimeBalance = sender_airtime_balance - reqAirtimevalue;
            let receiverAirtimeBalance =
              receiver_airtime_balance + reqAirtimevalue;
            dataJson = {
              // token: token,
              senderMobilenumber: senderMobilenumber,
              receiverMobilenumber: receiverMobilenumber,
              reqAirtimevalue: reqAirtimevalue,
              senderAirtimeBalance: senderAirtimeBalance,
              receiverAirtimeBalance: receiverAirtimeBalance,
              message: req.body.message,
              DTM: DTM,
              transactionId: "MTN" + Math.floor(Math.random() * 10000) + 1,
            };
            shareDataBalanceUpdate = await DAL.shareBalanceInsert(dataJson);
          } else {
            //insufficient balance
            return res.status(403).send(
              JSON.stringify({
                messageDescription:
                "You do not have sufficient balance to share airtime.",
              })
            );
          }
        }
        let messageDescription;
        if (req.body.data != null) {
          messageDescription = "Data Shared Successfully";
        }
        if (req.body.airtime != "") {
          messageDescription = "Airtime Shared Successfully";
        }

        return res.status(200).send(
          JSON.stringify({
            status: "SUCCESS",
            messageDescription: messageDescription,
            rows: {
              date: DTM,
              transactionId: transactionId,
              from: senderMobilenumber,
              to: receiverMobilenumber,
              shareddata: reqDatavalue + " MB",
              sharedairtime: reqAirtimevalue + " Mins",
              recievername:
                shareDataBalanceUpdate.records.recievername[0].nick_name,
              sendername:
                shareDataBalanceUpdate.records.sendername[0].nick_name,
            },
          })
        );
      }
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

function dateandtime() {
  let now = new Date();
  let dateStringWithTime = moment(now).format("YYYY-MM-DD HH:mm:ss");
  return dateStringWithTime;
}



const history = async (req, res) => {
  try {
    let dataJson = {
      mobilenumber: req.body.mobilenumber,
    };
    let transactionHistory = await DAL.history(dataJson);
    return res.status(200).send(
      JSON.stringify({
        transactionHistory: transactionHistory,
      })
    );
  } catch (ex) {
    console.err(ex);
    throw ex;
  }
};
const recentlyShared = async (req, res) => {
  try {
    let token = req.headers["x-access-token"];
    let mobilenumber = await tokenVal.getTokenVal(token);
    if (req.query.mobilenumber != '') {
      mobilenumber = req.query.mobilenumber;
    }
    if (mobilenumber == 'Wrong') {
      res.status(403).send(
        JSON.stringify(
          {
            response: "Wrong email id.",
          }
        )
      );
    }
    let dataJson = {
      // token: token,
      mobilenumber: mobilenumber,
      type: req.query.type,
    };
    let shareHistory = await DAL.recentlyShared(dataJson);

    return res.status(200).send(
      JSON.stringify({
        messageDescription: "Record found successfully",
        rows: shareHistory.records,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const data = async (req, res) => {
  try {
    return res.status(200).send(
      JSON.stringify({
        message: "Data list",
        rows: [
          {
            data: "50 MB",
          },
          {
            data: "150 MB",
          },
          {
            data: "250 MB",
          },
          {
            data: "500 MB",
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
            airtime: "10 mins",
          },
          {
            airtime: "150 mins",
          },
          {
            airtime: "250 mins",
          },
          {
            airtime: "500 mins",
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
  share,
  history,
  recentlyShared,
  data,
  airtime,
};
