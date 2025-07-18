const https = require("https");
const DAL = require("./dal");
const HTTP_STATUS = require("http-status");
const tokenVal = require("../../libs/tokenVal");
const crypto = require("crypto");
const dotenv = require("dotenv");
const common = require("../../utils/common");
const helper = require("../../utils/helper");
const logger = require("../../libs/logger");
const moment = require("moment");


const moduleInfo = {
  key: "getSubscriberDetails",
  name: "getSubscriberDetails",
};
let algorithm = "aes256"; // or any other algorithm supported by OpenSSL
let key = "password";

const otpCreate = async (req, res) => {
  let dataJson = {};

  try {
    let data = req.body.mobilenumber;
    let ipaddress = req.body.ipaddress;

    if (data == "") {
      res.setHeader("Content-Type", "application/json");
      return res.status(424).send(
        JSON.stringify({
          messageDescription: "Please enter a mobile number",
          // res_statusCode: "200"
        })
      );
    } else {
      console.log("Mobile number", data);
      dataJson = {
        mobilenumber: data,
        ipaddress: ipaddress,
      };
      let response = await DAL.getsubscriberdetailsResponse(dataJson);
      let gettingresponseMgs = response.message;
      if (gettingresponseMgs == "blocked") {
        return res.status(424).send(
          JSON.stringify({
            status_code: 424,
            message: "This number has been blocked",
            status: "error",
          })
        );
      }
      // OTP function START
      let OTP_GEN = otp_genrate_fun();
      let mobilenumber = data;
      let otp_pass = [OTP_GEN, mobilenumber];
      otp_sms_fun(otp_pass);

      let message = OTP_GEN;
      let cipher = crypto.createCipher(algorithm, key);
      let encryptedData =
        cipher.update(message, "utf8", "hex") + cipher.final("hex");
      console.log("Encrypted message: " + encryptedData);

      // OTP ENCRYP function END
      // if (gettingresponseMgs == 'empty') {
      let DTM = dateandtime();
      console.log("if working");
      dataJson = {
        mobilenumber: data,
        otp: encryptedData,
        status: "0",
        created_datetime: DTM,
        actiontype: "insert",
        ipaddress: ipaddress,
      };

      response = await DAL.getSubscriberDetailsinsert(dataJson);
      console.log("getSubscriberDetailsinsert response", response);
      let responseMessage = "successfully logged in";
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(
        JSON.stringify({
          messageDescription: responseMessage,
          encryptOtp: encryptedData,
          nonEncryptOtp: OTP_GEN,
          status: "0",
          Createdtime: DTM,
          ExperyTime: process.env.ExperyTime,
          enableResend: process.env.EnableResendTime,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const otpVerify = async (req, res) => {
  try {
    let dataJson = {};
    let mobilenumber = req.body.mobilenumber;
    console.log(mobilenumber);
    let ipaddress = req.body.ipaddress;
    let otp = req.body.otp;
    if (mobilenumber == "" || ipaddress == "" || otp == "") {
      res.setHeader("Content-Type", "application/json");
      let responseMessage = "Please enter the otp";
      return res.status(424).send(
        JSON.stringify({
          messageDescription: responseMessage,
        })
      );
    } else {
      try {
        dataJson = {
          mobilenumber: req.body.mobilenumber,
          otp: req.body.otp,
          ipaddress: req.body.ipaddress,
        };
        console.log("data json", dataJson);
        let response = await DAL.getUsersList(dataJson);
        let db_DTM = response.records.created_datetime;
        let secondsDiff = find_secondsDiff_fun(db_DTM);
        let db_user_otp = response.records.otp;
        let mobilenumber = response.records.mobilenumber;
        let decipher = crypto.createDecipher(algorithm, key);
        let decrypted_otp =
          decipher.update(db_user_otp, "hex", "utf8") + decipher.final("utf8");
        let conform_otp = req.body.otp;
        if (decrypted_otp != conform_otp) {
          console.log("if working, otp not match", db_user_otp, conform_otp);
          res.setHeader("Content-Type", "application/json");
          return res.status(424).send(
            JSON.stringify({
              messageDescription: "Wrong otp",
              conformOtp: conform_otp,
              DBOtp: decrypted_otp,
              decipher: decipher,
            })
          );
        } else {
          if (secondsDiff < process.env.ExperyTime) {
            console.log("else working, otp is match", db_user_otp, conform_otp);
            dotenv.config();

            const createdDTM = dateandtime();
            const expiry_date = moment(createdDTM)
              .add(90, "d")
              .format("YYYY-MM-DD HH:mm:ss");
            dataJson = {
              status: "1",
              mobilenumber: mobilenumber,
              ipaddress: ipaddress,
              createdDTM: createdDTM,
              expiry_date: expiry_date,
            };

            let response = await DAL.getSubscriberDetailsupdate_otpvalidation(
              dataJson
            );


            let profilecheck_response = await DAL.profileCheck(dataJson);

            let checkMobilenumberInBalanceTable =
              await DAL.checkMobilenumberInBalanceTable(dataJson);
            if (checkMobilenumberInBalanceTable.message == "null") {
              let insertMobilenumberInBalanceTable =
                await DAL.insertMobilenumberInBalanceTable(dataJson);
              console.log(
                "insertMobilenumberInBalanceTable",
                insertMobilenumberInBalanceTable
              );
            }
            let profile_message;
            let profile_status;
            if (profilecheck_response.message == "empty") {
              console.log("profilecreate datajson check 326", "empty");
              profile_message = "new_user";
              profile_status = "0";
            } else {
              profile_message = "old_user";
              profile_status = "1";
              console.log("profilecreate datajson check 337", "not empty");
            }
            let responseMessage = "otp is match,it got within 60 seconds";

            res.setHeader("Content-Type", "application/json");
            return res.status(200).send(
              JSON.stringify({
                messageDescription: responseMessage,
                userToken: response,
                status: "1",
                profileStatus: profile_status,
                profileType: profile_message,
              })
            );
          } else {
            let OTP_GEN = otp_genrate_fun();
            let mobilenumber = mobilenumber;
            let ipaddress = ipaddress;
            let otp_pass = [OTP_GEN, mobilenumber, ipaddress];

            console.log("234 OTP_GEN", OTP_GEN);
            let OTP_SEND_SMS = otp_sms_fun(otp_pass);
            let DTM = dateandtime();
            console.log("OTP time out so resend SMS ", OTP_SEND_SMS);

            let cipher = crypto.createCipher(algorithm, key);
            let encryptedData =
              cipher.update(OTP_GEN, "utf8", "hex") + cipher.final("hex");
            console.log("Encrypted message: " + encryptedData);
            dataJson = {
              mobilenumber: mobilenumber,
              otp: encryptedData,
              // status: '0',
              user_token: "",
              actiontype: "elsetimeoutupdate",
              created_datetime: DTM,
              ipaddress: ipaddress,
            };

            console.log("getSubscriberDetailsupdate datajson check", dataJson);
            let response = await DAL.getSubscriberDetailsupdate(dataJson);

            console.log("getSubscriberDetailsupdate response", response);
            let responseMessage =
              "This OTP has been expired, Please use the latest OTP";

            res.setHeader("Content-Type", "application/json");
            return res.status(406).send(
              JSON.stringify({
                messageDescription: responseMessage,
                // res_statusCode: "500",
                status: "0",
                encryptOtp: encryptedData,
                nonEncryptOtp: OTP_GEN,
                ipaddress: ipaddress,
              })
            );
          }
        }
      } catch (err) {
        let error = JSON.stringify(err);
        common.catchHandler(err, res, error);
      }
    }
  } catch (err) {
    throw err;
  }
};
const resend_otp = async (req, res) => {
  try {
    let OTP_GEN = otp_genrate_fun();
    let mobilenumber = req.body.mobilenumber;
    let ipaddress = req.body.ipaddress;
    otp_sms_fun(otp_pass);
    let DTM = dateandtime();
    let cipher = crypto.createCipher(algorithm, key);
    let encryptedData =
      cipher.update(OTP_GEN, "utf8", "hex") + cipher.final("hex");

    let dataJson = {
      mobilenumber: mobilenumber,
      otp: encryptedData,
      // status: '0',
      user_token: "",
      actiontype: "elsetimeoutupdate",
      created_datetime: DTM,
      ipaddress: ipaddress,
    };
    console.log(dataJson);
    let responseMessage = "OTP has been resent successfully";

    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(
      JSON.stringify({
        messageDescription: responseMessage,
        // res_statusCode: "500",
        status: "0",
        encryptOtp: encryptedData,
        nonEncryptOtp: OTP_GEN,
        ipaddress: ipaddress,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const tokenValidation = async (req, res) => {
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

    let dataJson = {
      token: token,
      mobilenumber: mobilenumber,
    };

    if (!token) {
      let responseMessage = " Non-Authoritative Information, token empty";
      return res.status(403).send(
        JSON.stringify({
          messageDescription: responseMessage,
        })
      );
    } else {
      let response = await DAL.tokenValidation(dataJson);

      let response_data_token = response.records.user_token;
      if (response_data_token == token) {
        console.log("mobilenumber", mobilenumber);

        if (req.body.mobilenumber != undefined) {
          let switchMobilenumber = req.body.mobilenumber;
          mobilenumber = switchMobilenumber;
          let dataJson = {
            token: token,
            mobilenumber: mobilenumber,
          };
          profiledatamatchCheck(dataJson, res);
        } else {
          let dataJson = {
            token: token,
            mobilenumber: mobilenumber,
          };
          profiledatamatchCheck(dataJson, res);
          console.log("544", dataJson);
        }
      } else {
        res.setHeader("Content-Type", "application/json");
        let responseMessage = "Token mismatch";
        return res.status(401).send(
          JSON.stringify({
            messageDescription: responseMessage,
          })
        );
      }
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const profiledatamatchCheck = async (dataJson, res) => {
  try {
    let profiledatamatchCheckresponse = await DAL.profiledatamatchCheck(
      dataJson
    );
    let shareAndBorrowRequestCheck = await DAL.shareAndBorrowRequestCheck(
      dataJson
    );
    if (profiledatamatchCheckresponse.message == "notnull") {
      let db_shareAndBorrowRequestCheck_data =
        shareAndBorrowRequestCheck.records;
      console.log(
        "db_shareAndBorrowRequestCheck_data 553",
        db_shareAndBorrowRequestCheck_data
      );
      let db_profile_data = profiledatamatchCheckresponse.records;
      let data_Json_return = {
        userid: db_profile_data.id,
        firstName: db_profile_data.First_name,
        middleName: db_profile_data.Middle_name,
        lastName: db_profile_data.Last_name,
        nationality: db_profile_data.Nationality,
        gender: db_profile_data.Gender,
        dob: db_profile_data.DOB,
        telePhonenumber: db_profile_data.TelephoneNumber,
        altTelephonenumber: db_profile_data.AltTelephoneNumber,
        smsNumber: db_profile_data.SMSNumber,
        altMobilenumber: db_profile_data.AltMobileNumber,
        mobilenumber: db_profile_data.mobilenumber,
        city: db_profile_data.city,
        cityDesc: db_profile_data.CityDesc,
        district: db_profile_data.District,
        districtDesc: db_profile_data.DistrictDesc,
        country: db_profile_data.Country,
        emailID: db_profile_data.EmailID,
        userInterest: db_profile_data.user_interest,
        nickName: db_profile_data.nick_name,
        permanentAddress1: db_profile_data.permanent_address_1,
        permanentAddress2: db_profile_data.permanent_address_2,
        state: db_profile_data.state,
        zipCode: db_profile_data.zipcode,
        type: db_profile_data.type,
        borrowRequest: db_shareAndBorrowRequestCheck_data,
        profileImage: db_profile_data.profile_image
          ? process.env.PUBLIC_ORIGIN +
          "/uploads/profile/image/" +
          db_profile_data.profile_image
          : "",
      };
      console.log("data ,match response", data_Json_return);
      let responseMessage = "Token matched successfully";

      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(
        JSON.stringify({
          messageDescription: responseMessage,
          data_Json_return: data_Json_return,
        })
      );
    } else {
      res.setHeader("Content-Type", "application/json");
      let responseMessage = "Go first chat.";

      return res.status(200).send(
        JSON.stringify({
          user_type: responseMessage,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};


const profieUpdate = async (req, res) => {
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

  
    const validateTelePhonenumber= validateNumber(req.body.telePhonenumber);
    if(validateTelePhonenumber===true){
      return res.status(403).send(
        JSON.stringify({
          messageDescription: "Please enter a valid secondary number..",
        })
      );
    }
   
    let dataJson = {
      token: token,
      mobilenumber: mobilenumber,
    };
    if (!token) {
      let responseMessage = "Non-Authoritative Information, token empty";
      return res.status(403).send(
        JSON.stringify({
          messageDescription: responseMessage,
        })
      );
    } else {
      let response = await DAL.tokenValidation(dataJson);
      let response_data_token = response.records.user_token;
      if (response_data_token == token) {
        let First_name = req.body.firstName;
        console.log("898", First_name);
        let Middle_name = req.body.middleName;
        let Last_name = req.body.lastName;
        let Nationality = req.body.nationality;
        let Gender = req.body.gender;
        let DOB = moment(new Date(req.body.dob)).format("YYYY-MM-DD");
        let SMSNumber = req.body.smsNumber;
        let city = req.body.city;
        let CityDesc = req.body.cityDesc;
        let District = req.body.district;
        let DistrictDesc = req.body.districtDesc;
        let Country = req.body.country;
        let EmailID = req.body.emailID;
        let permanent_address_1 = req.body.permanentAddress1;
        let permanent_address_2 = req.body.permanentAddress2;
        let state = req.body.state;
        let zipcode = req.body.zipCode;
        dataJson = {
          mobilenumber: mobilenumber,
          First_name: First_name,
          Middle_name: Middle_name,
          Last_name: Last_name,
          Nationality: Nationality,
          Gender: Gender,
          DOB: DOB,
          altTelephoneNumber: req.body.altTelephonenumber,
          telePhonenumber: req.body.telePhonenumber,
          SMSNumber: SMSNumber,
          altMobileNumber: req.body.altMobilenumber,
          city: city,
          CityDesc: CityDesc,
          District: District,
          DistrictDesc: DistrictDesc,
          Country: Country,
          EmailID: EmailID,
          permanent_address_1: permanent_address_1,
          permanent_address_2: permanent_address_2,
          state: state,
          zipcode: zipcode,
        };

        await DAL.profieUpdate(dataJson);
        res.setHeader("Content-Type", "application/json");
        let responseMessage = "profile data update successfully.";
        return res.status(200).send(
          JSON.stringify({
            message: responseMessage,
          })
        );
      } else {
        res.setHeader("Content-Type", "application/json");
        let responseMessage = "Token mismatch";
        return res.status(401).send(
          JSON.stringify({
            message: responseMessage,
          })
        );
      }
    }
  } catch (err) {
    logData.message = JSON.stringify(err);
    common.catchHandler(err, res, logData);
  }
};

const chatData = async (req, res) => {
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
    let dataJson = {
      token: token,
      mobilenumber: mobilenumber,
    };
    if (!token) {
      return res.status(403).send(
        JSON.stringify({
          messageDescription: " Non-Authoritative Information, token empty",
        })
      );
    } else {
      let response = await DAL.tokenValidation(dataJson);
      let response_data_token = response.records.user_token;
      if (response_data_token == token) {
        let Nick_name = req.body.nickName;
        let DOB = req.body.dob;
        let User_interest = req.body.userInterest;

        let dataJsonpass = {
          mobilenumber: mobilenumber,
          Nick_name: Nick_name,
          DOB: DOB,
          User_interest: User_interest,
        };
        let mobilenumberCheck = await tokenVal.mtnNumbers(mobilenumber);
        if (mobilenumberCheck.status == "1") {
          let response = await DAL.userTempDetails(dataJsonpass);
          dataJson = {
            mobilenumber: response.records.mobilenumber,
            First_name: response.records.First_name,
            Middle_name: response.records.Middle_name,
            Last_name: response.records.Last_name,
            Nationality: response.records.Nationality,
            Gender: response.records.Gender,
            DOB: req.body.dob,
            TelephoneNumber: response.records.TelephoneNumber,
            AltTelephoneNumber: response.records.AltTelephoneNumber,
            SMSNumber: response.records.SMSNumber,
            AltMobileNumber: response.records.AltMobileNumber,
            city: response.records.city,
            CityDesc: response.records.CityDesc,
            District: response.records.District,
            DistrictDesc: response.records.DistrictDesc,
            Country: response.records.Country,
            EmailID: response.records.EmailID,
            Nick_name: req.body.nickName,
            User_interest: req.body.userInterest,
            permanent_address_1: response.records.permanent_address_1,
            permanent_address_2: response.records.permanent_address_2,
            state: response.records.state,
            zipcode: response.records.zipcode,
            type: response.records.type,
          };
          let response2 = await DAL.chatprofieUpdate(dataJson);

          res.setHeader("Content-Type", "application/json");
          return res.status(200).send(
            JSON.stringify({
              message: response2.message2,
              records: response2.records,
              messageDescription: response.message,
            })
          );
        } else {
          res.setHeader("Content-Type", "application/json");
          let responseMessage = " Please use Mtn mobile number";
          return res.status(401).send(
            JSON.stringify({
              messageDescription: responseMessage,
            })
          );
        }
      } else {
        return res.status(400).send(
          JSON.stringify({
            message: 'Some error occured',
          })
        );
      }
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const picupdate = async (req, res) => {
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
    let profileImage = req.files.profileImage;
    let dataJson = {
      files: profileImage,
      mobilenumber: mobilenumber,
    };
    var response = await DAL.picupload(dataJson);

    if (response.state == "success") {

      let profile_image = response.value;
      let dataJson = {
        files: profileImage,
        mobilenumber: mobilenumber,
        profile_image: profile_image,
      };
      response = await DAL.picpathupdate(dataJson);

      let responseMessage = "Profile pic uploaded";
      return res.status(200).send(
        JSON.stringify({
          response: responseMessage,
        })
      );
    } else {
      return res.status(423).send(
        JSON.stringify({
          messageDescription: "profile pic not uploaded",
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const logout = async (req, res) => {
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
    let dataJson = {
      token: token,
      mobilenumber: mobilenumber,
    };

    let response = await DAL.logout(dataJson);

    return res.status(200).send(
      JSON.stringify({
        messageDescription: response.message,
        passwordStatus: "2",
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const addlink = async (req, res) => {
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
    let GetSecondaryNumberRequest = req.body.GetSecondaryNumberRequest;
    let addMobilenumber = req.body.GetSecondaryNumberRequest.ALC;

    if (addMobilenumber != mobilenumber) {
      let linkStatus = 0;
      let OTP_GEN = otp_genrate_fun();

      let otp_pass = [OTP_GEN, addMobilenumber];
      otp_sms_fun(otp_pass);
      let DTM = dateandtime();
      let cipher = crypto.createCipher(algorithm, key);
      let encryptedData =
        cipher.update(OTP_GEN, "utf8", "hex") + cipher.final("hex");
      console.log("Encrypted message: " + encryptedData);
      let dataJson = {
        // token: token,
        GetSecondaryNumberRequest: GetSecondaryNumberRequest,
        mobilenumber: mobilenumber,
        addMobilenumber: addMobilenumber,
        linkStatus: linkStatus,
        encryptedData: encryptedData,
        DTM: DTM,
      };
      let verifyNumberaddedOrNot = await DAL.verifyNumberaddedOrNot(dataJson);
      console.log("1064", verifyNumberaddedOrNot);
      if (verifyNumberaddedOrNot.status == "null") {
        let response = await DAL.addlink(dataJson);
        let responseMessage = response.message;
        if (responseMessage == "404") {
          return res.status(404).send(
            JSON.stringify({
              "status_code": 404,
              "message": "Please enter valid mobilenumber",
              "status": "error"
            })
          );
        } else {
          return res.status(200).send(
            JSON.stringify({
              GetSecondaryNumberResponse: {
                API_Output: {
                  SuccessFlag: 1,
                  RequestStatus: 0,
                  AbilityTransId: 8757849912,
                  ResponseErrorCode: 0,
                  SuccessMessageLang1: response.message,
                  SuccessMessageLang2: "تمت إضافة السجلات بنجاح",
                  SuccessMessageLang3: "Enregistrements ajoutés avec succès",
                  TransactionLogReference: "",
                  insertId: response.records[0],
                  otp: OTP_GEN,
                },
                RowSet: response.RowSet,
              },
            })
          );
        }
      }

      if (verifyNumberaddedOrNot.status == "0") {
        let response = await DAL.addlink(dataJson);
        let responseMessage = response.message;
        if (responseMessage == "404") {
          return res.status(404).send(
            JSON.stringify({
              "status_code": 404,
              "message": "Please enter valid mobilenumber",
              "status": "error"

            })
          );
        } else {
          return res.status(200).send(
            JSON.stringify({
              GetSecondaryNumberResponse: {
                API_Output: {
                  SuccessFlag: 1,
                  RequestStatus: 0,
                  AbilityTransId: 8757849912,
                  ResponseErrorCode: 0,
                  SuccessMessageLang1: response.message,
                  SuccessMessageLang2: "تمت إضافة السجلات بنجاح",
                  SuccessMessageLang3: "Enregistrements ajoutés avec succès",
                  TransactionLogReference: "",
                  insertId: response.records[0],
                  otp: OTP_GEN,
                },
                RowSet: response.RowSet,
              },
            })
          );
        }
      } else {

        return res.status(403).send(
          JSON.stringify({

            "status_code": 424,
            "message": "This number is already linked",
            "status": "error"

          })
        );
      }
    } else {
     
      return res.status(403).send(
        JSON.stringify({
          "status_code": 403,
          "message": "Invalid mobile number.",
          "status": "error"
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const addlinkverify = async (req, res) => {
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
    let otp = req.body.otp;
    let insertId = req.body.insertId;
    let dataJson = {
      // token: token,
      mobilenumber: mobilenumber,
      insertId: insertId,
    };
    let response = await DAL.addlinkverify(dataJson);
    let add_mobilenumber = response.records[0].add_mobilenumber;
    let otpDB = response.records[0].otp;
    let decipher = crypto.createDecipher(algorithm, key);
    let decrypted_otp =
      decipher.update(otpDB, "hex", "utf8") + decipher.final("utf8");
    console.log("otpDB", decrypted_otp);

    if (otp == decrypted_otp) {
      dataJson = {
        mobilenumber: mobilenumber,
        insertId: insertId,
        linkStatus: "1",
        add_mobilenumber: add_mobilenumber,
      };
      let response = await DAL.addlinkverifyupdate(dataJson);
      console.log(response);
      let responseMessage = "otp is match";

      return res.status(200).send(
        JSON.stringify({
          messageDescription: responseMessage,
          linkStatus: "1",
        })
      );
    } else {
      let responseMessage = "Invalid Otp verification code";

      return res.status(404).send(
        JSON.stringify({
          messageDescription: responseMessage,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const unlink = async (req, res) => {
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
    let removeMobilenumber = req.body.LinkDelinkMSISDNRequest.MSISDN;
    let dataJson = {
      token: token,
      mobilenumber: mobilenumber,
      removeMobilenumber: removeMobilenumber,
      linkStatus: "2",
    };
    await DAL.unlink(dataJson);
    return res.status(200).send(
      JSON.stringify({
        LinkDelinkMSISDNResponse: {
          API_Output: {
            SuccessFlag: 1,
            RequestStatus: 0,
            AbilityTransId: 83641364,
            SuccessMessageLang1: "Request has been Processed Successfully",
            SuccessMessageLang2: "تمت معالجة الطلب بنجاح",
            SuccessMessageLang3: "Anfrage wurde erfolgreich verarbeitet",
          },
        },
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const addlinkList = async (req, res) => {
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

    let dataJson = {
      token: token,
      mobilenumber: mobilenumber,
    };
    if (!token) {
      return res.status(403).send(
        JSON.stringify({
          messageDescription: " Non-Authoritative Information, token empty",
        })
      );
    } else {
      let response = await DAL.tokenValidation(dataJson);
      let response_data_token = response.records.user_token;
      if (response_data_token == token) {
        let response = await DAL.addlinkList(dataJson);

        let responseRecords = response.records;
        return res.status(200).send(
          JSON.stringify({
            // data: responseRecords,

            GetSecondaryNumberResponse: {
              API_Output: {
                SuccessFlag: 1,
                RequestStatus: 0,
                AbilityTransId: 8757849912,
                ResponseErrorCode: 0,
                SuccessMessageLang1: "Request has been Processed Successfully",
                SuccessMessageLang2: "تمت معالجة الطلب بنجاح",
                SuccessMessageLang3: "Anfrage wurde erfolgreich verarbeitet",
                TransactionLogReference: "",
              },
              RowSet: responseRecords,
            },
          })
        );
      } else {
        return res.status(403).send(
          JSON.stringify({
            messageDescription: "Non-Authoritative Information, token is mismatched",

          })
        );
      }
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const switchNumber = async (req, res) => {
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
    let switchMobilenumber = req.body.mobilenumber;
    let dataJson = {
      token: token,
      mobilenumber: mobilenumber,
      switchMobilenumber: switchMobilenumber,

    };

    let response = await DAL.switchNumber(dataJson);
    if (response.status != "1") {
      let responseMessage = "add number rquest not approved by the customer";

      return res.status(401).send(
        JSON.stringify({
          messageDescription: responseMessage,
          //  passwordStatus: '0',
        })
      );
    } else {
      dataJson = {
        mobilenumber: switchMobilenumber,
      };
      let response_data1 = await DAL.userBalanceDetails(dataJson);
      console.log("respinseee", response_data1);
      res.setHeader("Content-Type", "application/json");

      return res.status(200).send(
        JSON.stringify({
          BalanceInfo: response_data1,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const GetOffers = async (req, res) => {
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
    let dataJson = {
      token: token,
      mobilenumber: mobilenumber,
    };
    if (req.body.mobilenumber != undefined) {
      let switchMobilenumber = req.body.mobilenumber;
      mobilenumber = switchMobilenumber;
    }
    console.log("res.body.switchMobilenumber", switchMobilenumber);
    if (!token) {
      return res.status(403).send(
        JSON.stringify({
          messageDescription: " Non-Authoritative Information, token empty",
        })
      );
    } else {

      let response = await DAL.tokenValidation(dataJson);

      let response_data_token = response.records.user_token;
      if (response_data_token == token) {
        let mobilenumberCheck = await tokenVal.mtnNumbers(mobilenumber);
        if (mobilenumberCheck.status == "1") {
          return res.status(200).send(
            JSON.stringify({
              messageDescription: "Offers",
            })
          );
        } else {
          res.setHeader("Content-Type", "application/json");
          return res.status(401).send(
            JSON.stringify({
              messageDescription: "Please use Mtn mobile number",
            })
          );
        }
      } else {
        let responseMessage = " Token mismatch";
        res.setHeader("Content-Type", "application/json");
        return res.status(401).send(
          JSON.stringify({
            messageDescription: responseMessage,
          })
        );
      }
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
  return OTP_GEN;
}

function find_secondsDiff_fun(db_DTM) {
  let DTM = dateandtime();
  console.log("db_DTM ", db_DTM);
  console.log("DTM", DTM);

  let startDate = moment(db_DTM, "YYYY-M-DD HH:mm:ss");
  let endDate = moment(DTM, "YYYY-M-DD HH:mm:ss");
  let secondsDiff = endDate.diff(startDate, "seconds");
  console.log("secondsDiff from source fun", secondsDiff);

  return secondsDiff;
}

const blockUsers = async (req, res) => {
  try {
    let csvFile = req.files.csvFileName;
    console.log("955", csvFile);
    let dataJson = {
      files: csvFile,
    };

    let response = await DAL.uploadCsv(dataJson);
    if (response.state == "success") {
      console.log("response", response.value);
      let csvFileName = response.value;
      let dataJson = {
        files: csvFileName,
        csvFileName: csvFileName,
      };
      response = await DAL.csvpathupdate(dataJson);
      let responseMessage = "Csv file uploaded and numbers status is updated.";

      return res.status(200).send(
        JSON.stringify({
          //  messageDescription: profileImage,
          response: responseMessage,
        })
      );
    } else {


      return res.status(423).send(
        JSON.stringify({
          messageDescription: "csv not uploaded",
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const blackListedUsers = async (req, res) => {
  try {
    let response = await DAL.blacklistedUsers();
    if (response.state == "success") {
      console.log("response", response.records);
      let responseMessage = "List of blacklisted users";
      return res.status(200).send(
        JSON.stringify({
          response: (responseMessage, response.records),
        })
      );
    } else {


      return res.status(423).send(
        JSON.stringify({
          messageDescription: "Not found any data",
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const transactions = async (req, res, next) => {
  let logData = {};
  let dataJson = {};
  try {
    logData = await helper.defaultLogInfo(
      req,
      moduleInfo.key,
      "Transaction",
      "Get user transaction"
    );
    dataJson = {
      mobilenumber: parseInt(req.params.mobilenumber),
    };
    let response;
    response = await DAL.transactions(dataJson);
    innerLogData = Object.assign({}, logData);
    innerLogData.state = "SUCCESS";

    logger.info(innerLogData);
    let statusCode = HTTP_STATUS.OK;
    if (!response.records || response.records.length === 0) {
      statusCode = HTTP_STATUS.NO_CONTENT;
      response = {};
    }
    common.okResponseHandler(response, req, res, next, statusCode);
  } catch (err) {
    logData.params = dataJson;
    logData.message = JSON.stringify(err);
    common.catchHandler(err, res, logData);
  }
};
const category = async (req, res) => {
  try {
    let dataJson = {
      category: req.body.category,
      status: req.body.status,
      description: req.body.description,
    };
    let response = await DAL.categories(dataJson);
    console.log("response", response);
    let responseMessage = "Successfull.";
    return res.status(200).send(
      JSON.stringify({
        //  messageDescription: profileImage,
        response: responseMessage,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    let dataJson = {
      catid: parseInt(req.params.catid),
      category: req.body.category,
      status: req.body.status,
      description: req.body.description,
    };
    let response = await DAL.updateCategories(dataJson);
    console.log("response", response);
    let responseMessage = "Successfull.";
    return res.status(200).send(
      JSON.stringify({
        //  messageDescription: profileImage,
        response: responseMessage,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const deleteCategory = async (req, res) => {
  try {
    let dataJson = {
      catid: parseInt(req.params.catid),
    };
    let response = await DAL.deleteCategories(dataJson);
    console.log("response", response);
    let responseMessage = "Successfull.";
    return res.status(200).send(
      JSON.stringify({
        //  messageDescription: profileImage,
        response: responseMessage,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const allUsers = async (req, res) => {
  try {
    let response = await DAL.allUsers();
    if (response.state == "success") {
      console.log("response", response.records);
      let responseMessage = "List of  users";
      return res.status(200).send(
        JSON.stringify({
          response: (responseMessage, response.records),
        })
      );
    } else {
      // console.log("response",response);

      return res.status(423).send(
        JSON.stringify({
          messageDescription: "Not found any data",
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const getCategory = async (req, res) => {
  try {
    let response = await DAL.getCategory();
    if (response.state == "success") {
      console.log("response", response.records);
      let responseMessage = "List of  users";
      return res.status(200).send(
        JSON.stringify({
          response: (responseMessage, response.records),
        })
      );
    } else {
      // console.log("response",response);
      return res.status(423).send(
        JSON.stringify({
          messageDescription: "Not found any data",
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const categoryChat = async (req, res) => {
  try {
    let dataJson = {
      catid: parseInt(req.params.catid),
      number: req.body.number,
      status: req.body.status,
      message: req.body.message,
    };
    let response = await DAL.categoriesChat(dataJson);
    console.log("response", response);
    let responseMessage = "Successfull.";
    return res.status(200).send(
      JSON.stringify({
        //  messageDescription: profileImage,
        response: responseMessage,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const subscription = async (req, res) => {
  try {
    let imageFile = req.files.image;
    console.log("955", imageFile);
    let dataJson = {
      files: imageFile,
    };

    let response = await DAL.uploadSubscriptionImage(dataJson);
    if (response.state == "success") {
      console.log("response", response.value);
      let subImage = response.value;
      let dataJson = {
        image: subImage,
        amount: req.body.amount,
        cycle: req.body.cycle,
        autorenew: req.body.autorenew,
        reminder: req.body.reminder,
        planName: req.body.planName,
        description: req.body.description,
      };
      let response = await DAL.subscription(dataJson);
      console.log("response", response);
      let responseMessage = "Subscription is inserted.";
      return res.status(200).send(
        JSON.stringify({
          //  messageDescription: profileImage,
          response: responseMessage,
        })
      );
    } else {
      // console.log("response",response);
      let responseMessage = "Sorry some error occured";
      let responseCode = "423";

      return res.status(423).send(
        JSON.stringify({
          responseCode: responseCode,
          messageDescription: responseMessage,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const updateSubscription = async (req, res) => {
  try {
    let imageFile = req.files.image;
    console.log("955", imageFile);
    let dataJson = {
      files: imageFile,
      subscriptionId: parseInt(req.params.subscriptionId),
    };

    let response = await DAL.uploadSubscriptionImage(dataJson);
    if (response.state == "success") {
      console.log("response", response.value);
      let subImage = response.value;
      let dataJson = {
        subscriptionId: parseInt(req.params.subscriptionId),
        image: subImage,
        amount: req.body.amount,
        cycle: req.body.cycle,
        autorenew: req.body.autorenew,
        reminder: req.body.reminder,
        planName: req.body.planName,
        description: req.body.description,
      };
      let response = await DAL.updateSubscription(dataJson);
      console.log("response", response);
      let responseMessage = "Subscription is updated.";
      return res.status(200).send(
        JSON.stringify({
          //  messageDescription: profileImage,
          response: responseMessage,
        })
      );
    } else {
      // console.log("response",response);
      let responseMessage = "Sorry some error occured";
      let responseCode = "423";

      return res.status(423).send(
        JSON.stringify({
          responseCode: responseCode,
          messageDescription: responseMessage,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const subscriptionList = async (req, res) => {
  try {
    let response = await DAL.subscriptionList();
    if (response.state == "success") {
      console.log("response", response.records);
      let responseMessage = "List of subscription";
      let responseCode = "200";
      return res.status(200).send(
        JSON.stringify({
          responseCode: responseCode,
          response: (responseMessage, response.records),
        })
      );
    } else {
      // console.log("response",response);
      let responseMessage = "Not found any records";
      let responseCode = "423";
      return res.status(423).send(
        JSON.stringify({
          messageDescription: responseMessage,
          responseCode: responseCode,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const deleteSubscription = async (req, res) => {
  try {
    let dataJson = {
      subscriptionId: parseInt(req.params.subscriptionId),
    };
    let response = await DAL.deleteSubscription(dataJson);
    console.log("response", response);
    let responseMessage = "Successfull.";
    return res.status(200).send(
      JSON.stringify({
        //  messageDescription: profileImage,
        response: responseMessage,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const subscriptionDetails = async (req, res) => {
  try {
    let dataJson = {
      planName: req.body.planName,
    };
    let response = await DAL.subscriptionDetails(dataJson);
    if (response.state == "success") {
      console.log("response", response.records);
      let responseMessage = "List of subscription";
      let responseCode = "200";
      return res.status(200).send(
        JSON.stringify({
          responseCode: responseCode,
          response: (responseMessage, response.records),
        })
      );
    } else {
      // console.log("response",response);
      let responseMessage = "Not found any records";
      let responseCode = "423";
      return res.status(423).send(
        JSON.stringify({
          messageDescription: responseMessage,
          responseCode: responseCode,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const purchaseSubscription = async (req, res) => {
  try {
    let dataJson = {
      subscriptionId: req.body.subscriptionId,
      number: req.body.number,
    };
    let response = await DAL.purchaseSubscription(dataJson);
    console.log("response", response);
    let responseMessage = "Successfully subscribed.";
    return res.status(200).send(
      JSON.stringify({
        //  messageDescription: profileImage,
        response: responseMessage,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const fetchSubscription = async (req, res) => {
  try {
    let dataJson = {
      number: parseInt(req.params.number),
    };
    let response = await DAL.fetchSubscription(dataJson);
    if (response.state == "success") {
      console.log("response", response.records);
      let responseMessage = "List of subscription";
      let responseCode = "200";
      return res.status(200).send(
        JSON.stringify({
          responseCode: responseCode,
          response: (responseMessage, response.records),
        })
      );
    } else {
      // console.log("response",response);
      let responseMessage = "Not found any records";
      let responseCode = "423";
      return res.status(423).send(
        JSON.stringify({
          messageDescription: responseMessage,
          responseCode: responseCode,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const verifyToken = async (req, res) => {
  try {
    let token = req.body.token;
    let mobilenumber = await tokenVal.getTokenVal(token);
    if (mobilenumber == "Wrong") {
      res.status(403).send(
        JSON.stringify({
          response: "Wrong email id.",
        })
      );
    }

    let mobilenumberCheck = await tokenVal.mtnNumbers(mobilenumber);
    if (mobilenumberCheck.blockStatus == 1) {
      return res.status(424).send(
        JSON.stringify({
          status_code: 424,
          message: "This number has been blocked",
          status: "error",
        })
      );
    }
    if (mobilenumberCheck.status == "1") {
      const createdDTM = dateandtime();
      const expiry_date = moment(createdDTM)
        .add(90, "d")
        .format("YYYY-MM-DD HH:mm:ss");
      dataJson = {
        token: token,
        mobilenumber: mobilenumber,
        createdDTM: createdDTM,
        expiry_date: expiry_date,
      };

      let checkBalance = await DAL.checkMobilenumberInBalanceTable(dataJson);
      if (checkBalance.message == "null") {
        let insertBalance = await DAL.insertMobilenumberInBalanceTable(
          dataJson
        );
        console.log(insertBalance);
      }

      let profilecheck_response = await DAL.profileCheck(dataJson);
      if (profilecheck_response.message == "empty") {
        console.log("profilecreate datajson check 326", "empty");
        profile_message = "new_user";
        profile_status = "0";
      } else {
        profile_message = "old_user";
        profile_status = "1";
        console.log("profilecreate datajson check 337", "not empty");
      }
      // console.log("response", dataJson);
      return res.status(200).send(
        JSON.stringify({
          message: "Successfully verified.",
          profileStatus: profile_status,
          profileType: profile_message,
        })
      );
    } else {
      return res.status(200).send(
        JSON.stringify({
          message: "Please eneter the valid number.",
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const bypassLogin = async (req, res) => {
  let dataJson = {};

  try {
    let data = req.body.mobilenumber;
    let otp = req.body.otp;
    if (otp != '1111') {
      res.setHeader("Content-Type", "application/json");
      return res.status(424).send(
        JSON.stringify({
          messageDescription: "Entered wrong OTP.",

        })
      );
    }
    if (data == "") {
      res.setHeader("Content-Type", "application/json");
      return res.status(424).send(
        JSON.stringify({
          messageDescription: "Please enter a mobile number",

        })
      );
    } else {
      console.log("Mobile number", data);
      dataJson = {
        mobilenumber: data,
        otp: otp,
      };
      let response = await DAL.getsubscriberdetailsResponse(dataJson);
      let checkDemoNumbers = await DAL.checkDemoNumbers(dataJson);
      if (checkDemoNumbers.message == "Not Available") {
        return res.status(424).send(
          JSON.stringify({
            status_code: 424,
            message: "Please enter valid mobilenumber",
            status: "error",
          })
        );
      }

      let gettingresponseMgs = response.message;
      if (gettingresponseMgs == "blocked") {
        return res.status(424).send(
          JSON.stringify({
            status_code: 424,
            message: "This number has been blocked",
            status: "error",
          })
        );
      }
      // OTP function START
      let OTP_GEN = '1111';
      let mobilenumber = data;
      let otp_pass = [OTP_GEN, mobilenumber];
      //  otp_sms_fun(otp_pass);

      let message = OTP_GEN;
      let cipher = crypto.createCipher(algorithm, key);
      let encryptedData =
        cipher.update(message, "utf8", "hex") + cipher.final("hex");
      let DTM = dateandtime();
      console.log("if working");
      dataJson = {
        mobilenumber: data,
        otp: encryptedData,
        status: "1",
        created_datetime: DTM,
        actiontype: "bypass",
      };

      response = await DAL.getSubscriberDetailsinsert(dataJson);
      let responseMessage = "successfully logged in";
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(
        JSON.stringify({
          messageDescription: responseMessage,
          encryptOtp: encryptedData,
          nonEncryptOtp: OTP_GEN,
          status: "0",
          Createdtime: DTM,
          ExperyTime: process.env.ExperyTime,
          enableResend: process.env.EnableResendTime,
          token: response.token,
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const demoNumbers = async (req, res) => {
  try {
    let response = await DAL.demoNumbers();
    return res.status(200).send(
      JSON.stringify({
        message: "List of demo numbers",
        data: response.records
      })
    );

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
//check if enter the character in the mobilenumber


 function validateNumber(numbers){
  const pattern =/[a-zA-Z]/;
  const checkCharacter=pattern.test(numbers);
  if(checkCharacter===true){
    return true;
  }else{
    return false;
  }
 }
module.exports = {

  otpCreate,
  otpVerify,
  tokenValidation,
  resend_otp,
  profieUpdate,
  profiledatamatchCheck,
  chatData,
  picupdate,
  logout,
  addlink,
  unlink,
  addlinkverify,
  switchNumber,
  GetOffers,
  addlinkList,
  blockUsers,
  blackListedUsers,
  transactions,
  category,
  allUsers,
  getCategory,
  updateCategory,
  deleteCategory,
  categoryChat,
  subscription,
  subscriptionList,
  updateSubscription,
  deleteSubscription,
  subscriptionDetails,
  purchaseSubscription,
  fetchSubscription,
  verifyToken,
  bypassLogin,
  demoNumbers
  // upload
};
