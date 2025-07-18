const axios = require('axios');
const parseString = require('xml2js').parseString;
const https = require('https');
const DAL = require('./dal');
const jwt = require('jsonwebtoken');
const common = require('../../utils/common');
const helper = require('../../utils/helper');
const moment = require('moment');
const nodemailer = require('../../libs/nodemailer'); 
const flutterwave = require('../../libs/flutterwave');
const { v4: uuidv4 } = require('uuid');
const tokenVal = require('../../libs/tokenVal'); 

const moduleInfo = {
  "key": "Transaction",
  "name": "Transaction"
};

const agent = new https.Agent({
  rejectUnauthorized: false,
});
function dateandtime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}
const DTM = dateandtime();
// const transactionHistory = async (req, res) => {
//   try {
//     var token = req.headers['x-access-token'];
//      let mobilenumber = await tokenVal.getTokenVal(token);
  //  if(mobilenumber=='Wrong'){
  //   res.status(403).send(
  //     JSON.stringify(
  //       {
  //         response: "Wrong email id.",             
  //       }
  //     )
  //     );
  //  }
//     dataJson = {
//       token: token,
//       mobilenumber: mobilenumber,
//     };
//     if (!token) {
//       // return res.status(403).send({ auth: false, message: 'No token provided.' });
//       return res.status(403).send(
//         JSON.stringify(
//           {
//             res_messageDescription: " Non-Authoritative Information, token empty",

//           }
//         ));
//     } else {
//       logData = await helper.defaultLogInfo(req, moduleInfo.key, 'tokenValidation', 'tokenValidation');
//       let response = await DAL.tokenValidation(dataJson);

//       innerLogData = Object.assign({}, logData);
//       innerLogData.state = 'SUCCESS';
//       var response_data_token = response.records.user_token;
//       if (response_data_token == token) {

//         if (mobilenumber == "7305510550") {
//           var url = 'https://52.74.218.161:8243/GetRechargeMAEventDetailsone/1.0';
//         } else if (mobilenumber == "7305510551") {
//           var url = 'https://52.74.218.161:8243/GetRechargeMAEventDetailstwo/1.0';
//         }
//         else if (mobilenumber == "9062058586") {
//           var url = 'https://52.74.218.161:8243/GetRechargeMAEventDetailsthree/1.0';
//         } else if (mobilenumber == "9876543210") {
//           var url = 'https://52.74.218.161:8243/GetRechargeMAEventDetailsthree/1.0';
//         } else if (mobilenumber == "9876543211") {
//           var url = 'https://52.74.218.161:8243/GetRechargeMAEventDetailsthree/1.0';
//         } else if (mobilenumber == "9876543212") {
//           var url = 'https://52.74.218.161:8243/GetRechargeMAEventDetailsthree/1.0';
//         } else {
//           res.setHeader('Content-Type', 'application/json');
//           return res.status(401).send(
//             JSON.stringify(
//               {
//                 res_messageDescription: " Please use Mtn mobile number",
//               }
//             ));
//         }
//         var config = {
//           // url: 'https://52.74.218.161:8243/postpaidbalancewithoutamount/1.0', 
//           url: url,
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/xml'
//           },
//           data: mobilenumber,
//           httpsAgent: agent
//         };
//         axios(config)
//           .then(function (response) {
//             var xml2 = response.data;
//             parseString(xml2, function (err, result) {
//               var profiledatamatchCheck = result['soapenv:Envelope']['soapenv:Body'][0]['mtnn:GetRechargeDAEventDetailsResponse'][0]['mtnn:APIData'];
//               console.log("profiledatamatchCheck 54322", profiledatamatchCheck);
//               return res.status(200).send(
//                 JSON.stringify(
//                   {
//                     data: profiledatamatchCheck,
//                   }
//                 ));
//             });
//           })
//           .catch(function (error) {
//             console.log(error);
//           });

//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(401).send(
//           JSON.stringify(
//             {
//               res_messageDescription: " Token mismatch",

//             }
//           ));
//       }
//     }
//   } catch (err) {
//     throw (err);
//   }
// }

const emergencyEc = async (req, res) => {
  try {
    var token = req.headers['x-access-token'];
    let mobilenumber = await tokenVal.getTokenVal(token);
    if(mobilenumber=='Wrong'){
     res.status(403).send(
       JSON.stringify(
         {
           response: "Wrong email id.",             
         }
       )
       );
    }
    dataJson = {
      token: token,
      mobilenumber: mobilenumber,
    };
    if (!token) {
      // return res.status(403).send({ auth: false, message: 'No token provided.' });
      return res.status(403).send(
        JSON.stringify(
          {
            res_messageDescription: " Non-Authoritative Information, token empty",

          }
        ));
    } else {
      logData = await helper.defaultLogInfo(req, moduleInfo.key, 'tokenValidation', 'tokenValidation');
      let response = await DAL.tokenValidation(dataJson);

      innerLogData = Object.assign({}, logData);
      innerLogData.state = 'SUCCESS';
      var response_data_token = response.records.user_token;
      if (response_data_token == token) {

        if (mobilenumber == "7305510550") {
          var url = 'https://52.74.218.161:8243/GetDataDetails/1.0';
        } else if (mobilenumber == "7305510551") {
          var url = 'https://52.74.218.161:8243/GetDataDetails/1.0';
        }
        else if (mobilenumber == "9062058586") {
          var url = 'https://52.74.218.161:8243/GetDataDetails/1.0';
        }
        else if (mobilenumber == "9876543210") {
          var url = 'https://52.74.218.161:8243/GetDataDetails/1.0';
        }
        else if (mobilenumber == "9876543211") {
          var url = 'https://52.74.218.161:8243/GetDataDetails/1.0';
        }
        else if (mobilenumber == "9876543212") {
          var url = 'https://52.74.218.161:8243/GetDataDetails/1.0';
        } else {
          res.setHeader('Content-Type', 'application/json');
          return res.status(401).send(
            JSON.stringify(
              {
                res_messageDescription: " Please use Mtn mobile number",
              }
            ));
        }
        var config = {
          // url: 'https://52.74.218.161:8243/postpaidbalancewithoutamount/1.0', 
          url: url,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/xml'
          },
          data: mobilenumber,
          httpsAgent: agent
        };
        axios(config)
          .then(function (response) {
            var xml2 = response.data;
            parseString(xml2, function (err, result) {
              var emergencyEc = result['soapenv:Envelope']['soapenv:Body'][0]['get:GetDataDetailsResponse'][0]['get:APIData'];
              // var profiledatamatchCheck = result['soapenv:Envelope']['soapenv:Body'][0]['mtnn:GetDataDetailsResponse']; 

              // console.log("profiledatamatchCheck 54322",profiledatamatchCheck);
              // var profiledatamatchCheck = result; 
              console.log("profiledatamatchCheck 54322", emergencyEc);


              return res.status(200).send(
                JSON.stringify(
                  {
                    data: emergencyEc,
                  }
                ));
            });
          })
          .catch(function (error) {
            console.log(error);
          });

      } else {
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).send(
          JSON.stringify(
            {
              res_messageDescription: " Token mismatch",

            }
          ));
      }
    }
  } catch (err) {
    throw (err);
  }
}

// const nigerianBank = async (req, res) => {
//   try {
//     var token = req.headers['x-access-token'];
//     const config_jwt = require('../../utils/config');
//     let decodedData = await jwt.verify(token, config_jwt.jwtSecret);
//     var dataJson = {};
//     var mobilenumber = decodedData.mobilenumber;
//     var ipaddress = decodedData.ipaddress;

//     dataJson = {
//       token: token,
//       mobilenumber: decodedData.mobilenumber,
//       ipaddress: decodedData.ipaddress,
//     };

//     if (!token) {
//       return res.status(403).send(
//         JSON.stringify(
//           {
//             res_messageDescription: " Non-Authoritative Information, token empty",
//           }
//         ));

//     } else {
//       logData = await helper.defaultLogInfo(req, moduleInfo.key, 'nigerianBank', 'nigerianBank');
//       let response = await DAL.tokenValidation(dataJson);
//       if (response.records == 0) {
//         return res.status(403).send(
//           JSON.stringify(
//             {
//               res_messageDescription: " token expired",
//             }
//           ));
//       } else {
//         console.log("response", response);
//         innerLogData = Object.assign({}, logData);
//         innerLogData.state = 'SUCCESS';
//         var response_data_token = response.records.user_token;
//         if (response_data_token == token) {
//           let tx_ref= uuidv4();
//           let payType=req.body.paytype;
//           dataJson = {
//             token: token,
//             mobilenumber: mobilenumber,
//             ipaddress: decodedData.ipaddress,
//             tx_ref: tx_ref,
//             amount: req.body.amount,
//             currency: req.body.currency,
            
//           }; console.log("284");
//           var flutterwaveResponse = await flutterwave.charge_ng_acct(dataJson);
//           dataJson = {
//             paymode:payType,
//             tx_ref: tx_ref,
//             type: req.body.type,
//             flag: req.body.flag,
//             amount: req.body.amount,
//             currency: req.body.currency,
//             mobilenumber: mobilenumber,
//             ipaddress: ipaddress,
//             transaction_data: flutterwaveResponse,
//             plan: req.body.plan,
//             reg_no: req.body.reg_no,
//             invoice: req.body.invoice,
//             excluding_vat: req.body.excluding_vat,
//             vat_at: req.body.vat_at,
//             total:req.body.total,
//             body:'Successful Payments with Bank Account'
//           };
//           var transactionHistory = await DAL.paymentTransactionHistory(dataJson);
//           return res.status(201).send(
//             JSON.stringify(
//               {
//                 response: flutterwaveResponse,
//               }
//             ));
//         } else {
//           res.setHeader('Content-Type', 'application/json');
//           return res.status(401).send(
//             JSON.stringify(
//               {
//                 res_messageDescription: " Token mismatch",
//               }
//             ));
//         }
//       }  

//     }
//   } catch (err) {
//     throw (err);
//   }
// }

const chargeCard = async (req, res) => {
  try {

    var token = req.headers['x-access-token'];
    const config_jwt = require('../../utils/config');
    let decodedData = await jwt.verify(token, config_jwt.jwtSecret);
    console.log("token gen data", decodedData);
    var dataJson = {};
    // console.log("260",dataJson);
    var mobilenumber = decodedData.mobilenumber;
    var ipaddress = decodedData.ipaddress;

    dataJson = {
      token: token,
      mobilenumber: decodedData.mobilenumber,
      ipaddress: decodedData.ipaddress,
    };
    if (!token) {
      // return res.status(403).send({ auth: false, message: 'No token provided.' });
      return res.status(403).send(
        JSON.stringify(
          {
            res_messageDescription: " Non-Authoritative Information, token empty",

          }
        ));
    } else {
      logData = await helper.defaultLogInfo(req, moduleInfo.key, 'chargeCard', 'chargeCard');
      let response = await DAL.tokenValidation(dataJson);
      let userinfo=await DAL.profile(dataJson);
      //console.log("response",response);
      innerLogData = Object.assign({}, logData);
      innerLogData.state = 'SUCCESS';
      var response_data_token = response.records.user_token;
      if (response_data_token == token) {
        let tx_ref= uuidv4();
        let payMode=req.body.payMode;
      let  vat_at= 14;
        let vat=Math.round(parseInt(req.body.amount)*vat_at/100);
      var  dataJson1 = {
          currency: req.body.currency,
          amount: parseInt(req.body.amount)+vat,
          tx_ref: tx_ref,
        };
        if(payMode=='card'){
          var flutterwaveResponse = await flutterwave.chargeCard(dataJson1);
          var responseData=flutterwaveResponse.callValidate.data;
          var body='Successful Payments with Credit / Debit Card';
        }else{
          var flutterwaveResponse = await flutterwave.charge_ng_acct(dataJson1);
          var responseData=flutterwaveResponse.data;
          var body='Successful Payments with Bank';
        }
       
        console.log(flutterwaveResponse);
        dataJson = {
          items:req.body.items,
          tx_ref: tx_ref,
          paymode: payMode,
          payType:userinfo.records.type,
          flag: req.body.flag,
          amount: req.body.amount,
          currency: req.body.currency,
          mobilenumber: mobilenumber,
          ipaddress: ipaddress,
          transactionData: responseData,
          reg_no:  "REGNO" + Math.floor(Math.random() * 100) + 1,
          invoice:  "MTN" + Math.floor(Math.random() * 10000) + 1,
          vat_at: vat_at,
          total:parseInt(req.body.amount)+vat,
          payStatus:flutterwaveResponse.status,
          transactionDate:DTM,
          body:body
        }
        return res.status(200).send(
          JSON.stringify(
            {
              response: flutterwaveResponse,
            }
          ));
      } else {
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).send(
          JSON.stringify(
            {
              res_messageDescription: " Token mismatch",

            }
          ));
      }

    }
  } catch (err) {
    throw (err);
  }
}

const filters = async (req, res) => {
  try {
    let dataJson = {
      limit: req.body.limit,
      type: req.body.type,
      flag: req.body.flag,
      shortKey: req.body.sortKey,
      number: req.body.number,
      fromdate: req.body.fromdate,
      todate: req.body.todate,
      sortOrder:req.body.sortOrder
    }
    let response;
    // if(req.body.fromdate !=undefined && req.body.todate != undefined && req.body.limit !=undefined){
    if(req.body.fromdate !=undefined && req.body.todate != undefined){
       response = await DAL.historyBasedOnDates(dataJson);
    } else{
       response = await DAL.filters(dataJson);
    }
  
    if (response.state == "success") {
      console.log("response", response.records);
      let responseMessage = "List of transaction";
      let responseCode = "200";
      return res.status(200).send(
        JSON.stringify(
          {
            responseCode: responseCode,
            responseMessage:responseMessage,
            response:  response.records,
            extra:response.extra,
            "pager": {
              "current_page": null,
              "total_items": 1,
              "total_pages": 1,
              "items_per_page": 10
          }
          }
        ));
    } else {
     
      let responseMessage = "No records found";
      let responseCode = "423";
      return res.status(423).send(
        JSON.stringify(
          {
            responseMessage: responseMessage,
            responseCode: responseCode,
           
          }
        ));
    }


  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const details = async (req, res) => {   
  try{
    var dataJson = {
      transactionid:parseInt(req.params.transactionid), 
    } 
      let response = await DAL.details(dataJson);  
      if(response.state == "success"){
        console.log("response",response.records);
        let responseMessage = "Details of recharge";
        let responseCode    = "200"; 
        return res.status(200).send(
        JSON.stringify(
            {
              responseCode:responseCode,
               response:(responseMessage,response.records),
               extra:response.extra
            }
            )); 
      }else{
        // console.log("response",response);
        let responseMessage = "Not found any records";
        let responseCode    = "423"; 
        return res.status(423).send(
        JSON.stringify(
            {
               messageDescription: responseMessage,   
               responseCode:responseCode

            }
            )); 
      }  
         
    
  }catch(err){
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const download = async (req, res) => {   
  try{
    var dataJson = {
      number:parseInt(req.params.number), 
    } 
      let response = await DAL.download(dataJson);  
      if(response.state == "success"){
        console.log("response",response.records);
        let responseMessage = "Download Transaction History";
        let responseCode    = "200"; 
        return res.status(200).send(
        JSON.stringify(
            {
              responseCode:responseCode,
               response:(responseMessage,response.records),
            }
            )); 
      }else{
        let responseMessage = "Not found any records";
        let responseCode    = "423"; 
        return res.status(423).send(
        JSON.stringify(
            {
               message: responseMessage,   
               responseCode:responseCode
            }
            )); 
      }  
         
    
  }catch(err){
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const rewards = async (req, res) => {   
  try{
    var dataJson = {
      number:parseInt(req.params.number), 
    } 
      let response = await DAL.rewards(dataJson);  
      if(response.state == "success"){
        console.log("response",response.records);
        let responseMessage = "List of rewards";
        let responseCode    = "200"; 
        return res.status(200).send(
        JSON.stringify(
            {
              responseCode:responseCode,
               response:(responseMessage,response.records),
            }
            )); 
      }else{
        // console.log("response",response);
        let responseMessage = "Not found any records";
        let responseCode    = "423"; 
        return res.status(423).send(
        JSON.stringify(
            {
               message: responseMessage,   
               responseCode:responseCode

            }
            )); 
      }  
         
  }catch(err){
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const pdf = async (req, res) => { 
  try { 
     //let response = await pdfGenerator.pdfCreate();
      path =process.env.PUBLIC_ORIGIN+"/uploads/pdf/transactionhistory.pdf";
    //  console.log(response); 
    return res.status(200).send(
      JSON.stringify(
           {
            "file":path
          },          
        
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
};

  
const sendEmail = async (req, res) => { 
  try { 
    var token = req.headers['x-access-token'];
    let mobilenumber = await tokenVal.getTokenVal(token);
    if(mobilenumber=='Wrong'){
     res.status(403).send(
       JSON.stringify(
         {
           response: "Wrong email id.",             
         }
       )
       );
    }
    
    let dataJson={
      mobilenumber:mobilenumber
    }
  let  response = await DAL.profile(dataJson);
    console.log(response)
    if(response.message=='empty'){
      return res.status(403).send(
        JSON.stringify(
          {
           message:"Sorry emailid is not found",
          
          }
        )
        );
    }
      dataJson={
       to:response.records.EmailID,
       mobilenumber:mobilenumber
     }
      response = await nodemailer.sendMail(dataJson);
      
      console.log(response); 
      if(response.accepted.length>0){
        // path ="./uploads/images/"+attachment;
        // let response = await nodemailer.deleteFile(path);
        message={
          "status": "SUCCESS",
    "message": "Your Transaction history records are send successfully! Check your Mail"   
        };
      }else{
        message={
          "status": "ERROR",
    "message": "your mail is not sent"   
        };
        
    
      }
     return res.status(200).send(
       JSON.stringify(
         {
          rows:message,
          //  response: response.response,          
         }
       )
       );
   
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
};

const verification = async (req, res) => { 
  try { 
 
    var mobilenumber = req.body.mobilenumber;
    let dataJson={
      transactionId:req.body.transactionId
    }
      verficationResponse = await flutterwave.verify(dataJson);
      if(verficationResponse.status=='error'){
        return res.status(403).send(
          JSON.stringify(
            {
              response:  {
                "message": "Your transaction is not completed.",
              }          
            }
          )
          );
      }
    let dataJson2={
      mobilenumber:mobilenumber,
      profileNo:req.body.profileNo,
      transactionId:req.body.transactionId,
      items:req.body.items,
      flag:req.body.flag,
      gatewayType:req.body.gatewayType,
      verficationResponse:verficationResponse,
       tx_ref:uuidv4(),
      reg_no:  "REGNO" + Math.floor(Math.random() * 100) + 1,
      invoice:  "MTN" + Math.floor(Math.random() * 10000) + 1,
    }
     results = await DAL.paymentTransactionHistory(dataJson2);
     return res.status(200).send(
       JSON.stringify(
         {
           response: results,   
             
         }
       )
       );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
};
module.exports = {
  // transactionHistory,
  emergencyEc,
  // nigerianBank,
  chargeCard,
  // historyBasedOnDates,
  filters,
  details,
  download,
  rewards,
  pdf,
  sendEmail,
  verification

}

