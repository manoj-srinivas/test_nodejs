// Importing the required modules
// const jwt = require('jsonwebtoken');
const cfg = require("./config");
const moment = require("moment");
const crypto = require("crypto");
let logger = require("../libs/logger");

const HTTP_STATUS = require("http-status");
let UAParser = require("ua-parser-js");
const msg = require("./msg");
const fs = require("fs");
const reqModule = require("request");
const _ = require("underscore");
const glob = require("glob");
const moduleName = "Common";

const pathMod = require("path");
const AWS = require("../libs/AWS");
const config = require("./config");
const base64Img = require("base64-img");
const jwt_decode = require("jwt-decode");
const DAL = require("../src/sso/dal");

/**
 * Token Generation Code.
 * @param {Object} res response object.
 * @param {Object} userObj user details object.
 */
let authorization = async (req, res, userObj) => {
  try {
    var expires = moment()
      .add(cfg.logUserExpireTime, cfg.logUserExpireType)
      .valueOf();
    let currentUser = {
      accountID: userObj.ID,
      accountType:
        userObj.hasOwnProperty("roleType") &&
        ![null, undefined, ""].includes(userObj.roleType.key)
          ? userObj.roleType.key
          : "SUPER_ADMIN",
      role: userObj.roleType.key,
      accountEmail: userObj.emailID,
      accountName:
        userObj.accountDetail.firstName +
        (userObj.accountDetail.hasOwnProperty("lastName") &&
        ![null, undefined, ""].includes(userObj.accountDetail.lastName)
          ? " " + userObj.accountDetail.lastName
          : ""),
      customerID: userObj.customer.customerID,
      expires: expires,
      portaldns: userObj.customerAdmin.portalDNSName,
    };
    const Authorization = jwt.sign(currentUser, cfg.jwtSecret, cfg.jwtOptions);
    const token = `Bearer ${Authorization}`;
    delete currentUser.expires;
    delete currentUser.portaldns;

    currentUser.isTrial =
      userObj.customerAdmin.subscriptionTransactions[0].subscriptionPlan.isTrial;
    currentUser.roleName = userObj.roleType.title;
    currentUser.locationName = userObj.accountDetail.locationName;
    currentUser.ACCESS_CONTROL = userObj.roleType.permission;
    currentUser.profilePicture = userObj.accountDetail.profilePicture;
    currentUser.companyLogo = userObj.customer.companyLogo;
    currentUser.organizationName = userObj.customer.organizationName;
    currentUser.customerStatus = userObj.customerAdmin.status;
    return {
      token,
      currentUser,
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Pasword Encryption Code.
 * @param {String} password given password for encryption.
 * @param {String} salt given salt for encryption.
 */
const generatePassword = (password, salt) => {
  // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
};

const validatePassword = (hash, salt, password) => {
  return (
    hash ===
    crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
  );
};

/**
 * This function is to Validate, Update and set token in headers
 * @param {Object} res is an object
 * @param {String} oldAuthorization is old Authorization
 */
let options = async (req, res, next) => {
  try {
    if (req.method != "OPTIONS") {
      next();
    } else {
      okResponseHandler(
        {
          method: "OPTIONS",
          access: "Granted",
        },
        req,
        res,
        next
      );
      return false;
    }
  } catch (err) {
    if (typeof err === "string") {
      res.boom.unauthorized(err);
    } else if (err.name === "JsonWebTokenError") {
      res.boom.unauthorized(err.message);
    } else if (err.name === "TokenExpiredError") {
      res.boom.unauthorized("Token is expired.");
    } else {
      res.boom.badRequest("Internal error");
    }
  }
};

/**
 * This function is to Validate, Update and set token in headers
 * @param {Object} res is an object
 * @param {String} oldAuthorization is old Authorization
 */
let refreshAuthorization = async (req, res, next) => {
  try {
    if (req.method != "OPTIONS") {
      let originalUrl = req.originalUrl;
      let accessState = false;
      if (
        originalUrl.includes("/api/test") ||
        originalUrl.includes("/api/auth/login") ||
        originalUrl.includes("/password/set") ||
        originalUrl.includes("/password/reset") ||
        originalUrl.includes("/email-id/change") ||
        originalUrl.includes("/api/security-question") ||
        ((req.method === "POST" || req.method === "GET") &&
          originalUrl.includes("/api/security-answer")) ||
        ((req.method === "POST" || req.method === "GET") &&
          originalUrl.includes("/api/temp-key")) ||
        originalUrl.includes("/api/security-answer/list") ||
        (req.method === "POST" && originalUrl.includes("/api/location/list")) ||
        (req.method === "POST" &&
          originalUrl.includes("/api/subscription-plan/list")) ||
        (req.method === "GET" &&
          originalUrl.includes("/api/subscription-plan")) ||
        (req.method === "GET" &&
          originalUrl.includes("/api/customer-admin/plan-expiry-notice")) ||
        (req.method === "GET" &&
          originalUrl.includes("/api/customer-admin/payment-auto-deduction")) ||
        (req.method === "GET" &&
          originalUrl.includes("/api/customer-admin/re-payment")) ||
        ((req.method === "POST" || req.method === "GET") &&
          originalUrl.includes("/api/customer-admin")) ||
        (req.method === "POST" &&
          originalUrl.includes("/api/seat-master/list")) ||
        (req.method === "GET" && originalUrl.includes("/api/seat-master")) ||
        (req.method === "POST" && originalUrl.includes("/api/usps")) ||
        (req.method === "POST" && originalUrl.includes("/api/sales-tax"))
      ) {
        accessState = true;
      }
      if (![null, undefined, ""].includes(req.headers.token)) {
        let curTime = moment().valueOf();
        let token = decodeURIComponent(req.headers.token);
        let decodedData = await jwt.verify(token.split(" ")[1], cfg.jwtSecret);
        let invalid = false;
        if (
          [null, undefined, ""].includes(decodedData.expires) ||
          [null, undefined, ""].includes(decodedData.accountID) ||
          [null, undefined, ""].includes(decodedData.role) ||
          [null, undefined, ""].includes(decodedData.accountType) ||
          [null, undefined, ""].includes(decodedData.accountName) ||
          [null, undefined, ""].includes(decodedData.accountEmail) ||
          [null, undefined, ""].includes(decodedData.portaldns)
        ) {
          invalid = true;
        }
        if (invalid) {
          throw "Token is invalid.";
        } else if (
          decodedData.portaldns &&
          req.headers.portaldns &&
          decodedData.portaldns.toLowerCase() !==
            req.headers.portaldns.toLowerCase()
        ) {
          throw "Token is invalid.";
        } else if (decodedData.expires < curTime) {
          throw "Token is expired.";
        }
        delete decodedData.expires;
        delete decodedData.exp;
        delete decodedData.ias;
        req.tokenData = decodedData;
        next();
        return;
      } else if (accessState) {
        next();
        return;
      } else {
        throw "Token is required.";
      }
    } else {
      okResponseHandler(
        {
          method: "OPTIONS",
          access: "Granted",
        },
        req,
        res,
        next
      );
      return false;
    }
  } catch (err) {
    // let logData = defaultLogInfo(req, moduleName, 'refreshAuthorization', 'REFRESH_AUTHORIZATION');
    // logData.message = err;
    // logger.error(logData);
    if (typeof err === "string") {
      res.boom.unauthorized(err);
    } else if (err.name === "JsonWebTokenError") {
      res.boom.unauthorized(err.message);
    } else if (err.name === "TokenExpiredError") {
      res.boom.unauthorized("Token is expired.");
    } else {
      res.boom.badRequest("Internal error");
    }
  }
};

/**
 * This function is to Validate, Update and set token in headers
 * @param {Object} res is an object
 * @param {String} oldAuthorization is old Authorization
 */
let tokenValidation = async (req, res, next) => {
  try {
    if (
      ![null, undefined, ""].includes(req.cookies.token) ||
      (![null, undefined, ""].includes(req.headers.token) &&
        ![null, undefined, ""].includes(req.headers["app-token"]))
    ) {
      if (req.headers["app-token"] !== process.env.APP_TOKEN) {
        throw {
          type: "unauthorized",
          errorCode: cfg.errorCode.unauthorized.invalidToken,
        };
      }
      let curTime = parseInt(timeStamp() / 1000);
      let token = req.cookies.token
        ? decodeURIComponent(req.cookies.token)
        : decodeURIComponent(req.headers.token);
      // console.log(token);
      // const jwt_token = token.split(' ')[1];
      // // console.log(jwt_token);
      // let decodedData = await jwt.verify(jwt_token, cfg.jwtSecret);
      let decodedData = await decodeTokenData(token);
      // console.log(decodedData);
      let invalid = false;
      if (
        [null, undefined, ""].includes(decodedData.exp) ||
        [null, undefined, ""].includes(decodedData.userID)
      ) {
        invalid = true;
      }
      if (invalid) {
        // throw 'Token is invalid.';
        throw {
          type: "unauthorized",
          errorCode: cfg.errorCode.unauthorized.invalidToken,
        };
      } else if (decodedData.exp < curTime) {
        // throw 'Token is expired.';
        throw {
          type: "unauthorized",
          errorCode: cfg.errorCode.unauthorized.tokenExpired,
        };
      }
      let timeDiff = await dateDif(decodedData.iat * 1000, timeStamp(), "hour");
      delete decodedData.exp;
      delete decodedData.iat;
      if (timeDiff >= 24) {
        let currentUser = decodedData;
        const Authorization = jwt.sign(
          currentUser,
          cfg.jwtSecret,
          cfg.jwtOptions
        );
        const token = `Bearer ${Authorization}`;
        res.setHeader(`token`, token);
        res.cookie(process.env.COOKIE_NAME, `${token}`, {
          Domain: process.env.COOKIE_DOMAIN,
          maxAge: process.env.COOKIEMAXAGE,
          httpOnly: false,
          sameSite: "None",
          secure: true,
          encode: String,
        });
      }
      req.tokenData = decodedData;
      req.headers.domainid = decodedData.domainID;
      next();
      return;
    } else if (![null, undefined, ""].includes(req.headers["app-token"])) {
      if (req.headers["app-token"] !== process.env.APP_TOKEN) {
        throw {
          type: "unauthorized",
          errorCode: cfg.errorCode.unauthorized.invalidToken,
        };
      }
      req.tokenData = {};
      req.headers.domainid = process.env.DOMAINID.toLowerCase();
      req.tokenData.userID = 0;
      next();
      return;
    } else {
      throw {
        type: "unauthorized",
        errorCode: cfg.errorCode.unauthorized.tokenExpected,
      };
    }
  } catch (err) {
    // res.boom.unauthorized(null, {
    //   errorCode: error.errorCode
    // });
    // res.boom.unauthorized(err);
    catchHandler(err, res, {});
  }
};

/**
 * This function is to used to decoded the token
 * @param {String} token is encoded data
 */
let decodeTokenData = async (token) => {
  try {
    return await jwt.verify(token.split(" ")[1], cfg.jwtSecret);
  } catch (err) {
    throw err;
  }
};

let okResponseHandler = (
  result,
  req,
  res,
  next,
  statusCode = HTTP_STATUS.OK
) => {
  try {
    addCommonResponseHeaders(req, res);
    res.status(statusCode);
    res.json(result);
    res.end();
    // if (!string(req.originalUrl.toLowerCase()).endsWith('/statuscheck')) {
    //     // if (process) {
    //     //     logger.info('Ok Response handler completed, statusCode:' + res.statusCode);
    //     // }
    // }
  } catch (err) {
    next(err);
  }
};

let addCommonResponseHeaders = (req, res) => {
  if (!res) return;

  //modify common response headers..
  res.removeHeader("X-Powered-By");
  //server reponse should always be no cache
  res.setHeader(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate"
  );
  res.setHeader("Expires", "-1");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Powered-By", "Senseon Plus");
};

/**
 * This function is to return timestamp
 * @param {Object} date is an preferred date.
 */
let timeStamp = (date = null) => {
  let currentDate = new Date();
  if (date) {
    currentDate = new Date(date);
  }

  let timestamp = currentDate.getTime();
  return timestamp;
};

/**
 * This function is to Validate & remove undefined and return json data
 * @param {Object} data is an object
 */
let JSONBuilder = (data = {}) => {
  let returnData = {};
  Object.keys(data).map((key) => {
    if (![undefined].includes(data[key])) {
      if (
        ![null].includes(data[key]) &&
        typeof data[key] === "object" &&
        !Array.isArray(data[key])
      ) {
        returnData[key] = JSONBuilder(data[key]);
      } else {
        returnData[key] = data[key];
      }
    }
  });
  return returnData;
};

/**
 * @desc Convert the json object to query string.
 * @param {JSON} obj - Json boject that to be processed.
 * @param {string} separator - separating the data using this value
 * @param {string} prefix - prefix string of object key.
 * @return {string|JSON} - query string.
 */

const objectToQuerystring = (
  obj,
  separator = "&",
  prefix = null,
  type = "URL",
  decode = true
) => {
  return Object.keys(obj)
    .filter((key) => ![null, undefined].includes(obj[key]))
    .reduce((str, key, i) => {
      let delimiter;
      let val;
      delimiter = i === 0 ? "" : separator;
      if (Array.isArray(obj[key])) {
        key = encodeURIComponent(key);
        const arrayVar = obj[key].reduce((innerStr, item) => {
          if (type === "FORM") {
            val = encodeURIComponent(JSON.stringify(item));
          } else {
            val = encodeURIComponent(item);
          }
          return [innerStr, key, "=", val, "&"].join("");
        }, "");
        return [str, delimiter, arrayVar.trimRightString("&")].join("");
      } else {
        key = encodeURIComponent(key);
        if (type === "FORM") {
          val = encodeURIComponent(JSON.stringify(obj[key]));
        } else {
          val = encodeURIComponent(obj[key]);
        }
        if (prefix) {
          key = prefix + "." + key;
        }
        return [
          str,
          delimiter,
          key,
          "=",
          decode ? decodeURIComponent(val) : val,
        ].join("");
      }
    }, "");
};

/**
 * @desc Remove double quote from the json key.
 * @param {Object} json properties to be processed.
 * @return {string} json properties to a string value.
 */

const parameterized = (value) => {
  if (value && typeof value === "string") {
    value = value.replace(/["\\^]/g, "\\$&");
  }
  return value;
};

/**
 * @desc Mreging two JSON object.
 * @param object source - Soruce JSON object.
 * @param object data - JSON object which is to be merged with source JSON object.
 * @return JSON object.
 */
const JSONMerge = (source, data) => {
  if (
    ![null, undefined].includes(source) &&
    ![null, undefined].includes(data)
  ) {
    for (const key in data) {
      if (
        typeof source === "object" &&
        source.hasOwnProperty(key) &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        source[key] = JSONMerge(source[key], data[key]);
      } else if (typeof source === "object") {
        source[key] = data[key];
      }
    }
  }

  return source;
};

const randomizer = (length = 24) => {
  return crypto.randomBytes(length).toString("hex");
};

const getRandomValueFromArray = (dataArray) => {
  let length = dataArray.length;
  return dataArray[Math.floor(Math.random() * length)];
};

const getRandomXValueFromArray = (dataArray, n) => {
  var shuffled = dataArray.sort(function () {
    return 0.5 - Math.random();
  });
  var selected = shuffled.slice(0, getRndBetween(1, n));
  return selected;
};

const randomString = (length, chars) => {
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const getRndBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomAlphanumeric = (length, alphaNumeric = false) => {
  let allowedLetters = "0123456789";
  if (alphaNumeric) {
    allowedLetters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  return randomString(length, allowedLetters);
};

const getNewOTP = () => {
  if (process.env.USEDEFAULTOTP) {
    return process.env.DEFAULTOTP;
  } else {
    return randomAlphanumeric(process.env.OTPLENGTH);
  }
};

const getUUID = () => {
  let timestamp = timeStamp();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16;
    r = (timestamp + r) % 16 | 0;
    timestamp = Math.floor(timestamp / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const accessControl = (moduleName, session, access) => {
  let role = session.role;
  let accountType = session.accountType;
  if (
    typeof moduleName !== "string" ||
    ["", undefined, null].includes(moduleName)
  ) {
    throw new Error(`Invalid module name.`);
  }

  if (
    typeof role !== "string" ||
    ["", undefined, null].includes(role) ||
    !cfg.permissions.hasOwnProperty(role)
  ) {
    throw new Error(`Invalid role.`);
  }

  if (typeof access !== "string" || ["", undefined, null].includes(access)) {
    throw new Error(`Invalid access code.`);
  }

  if ((role === "USER" || role === "ADMIN") && cfg.permissions[role]) {
    if (cfg.permissions[role][accountType]) {
      if (cfg.permissions[role][accountType][moduleName]) {
        if (cfg.permissions[role][accountType][moduleName][access]) {
          return;
        }
        throw `${access} permission from ${moduleName} module is not accessible to you.`;
      }
      throw `${moduleName} module is not accessible to you.`;
    }
    throw `${accountType} type for ${role} role is not yet configured.`;
  }
  return;
};

const getClientIP = (request) => {
  return (
    (request.headers["x-forwarded-for"] || "").split(",").pop() ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    (request.connection.socket ? request.connection.socket.remoteAddress : "::")
  );
};

const getClientBrowser = (ua) => {
  let parser = new UAParser();
  parser.setUA(ua);
  let result = parser.getResult();
  let returnData = {
    browser: result.browser,
    os: result.os,
  };
  return returnData;
};

const catchHandler = (error, response, logData) => {
  console.error(error);
  if (typeof error === "object") {
    if (error.hasOwnProperty("propertyError") && error.propertyError.length) {
      logData.status = "propertyError";
      logger.error(logData);
      response.boom.badData("Invalid Data.", {
        propertyError: error.propertyError,
        errorCode: cfg.errorCode.unProcessableEntity.propertyError,
      });
    } else if (
      error.hasOwnProperty("name") &&
      error.name === "SequelizeUniqueConstraintError"
    ) {
      logData.status = "SequelizeUniqueConstraintError";
      logger.error(logData);
      let propertyError = [];
      if (typeof error.errors.length) {
        let errJson = {
          [error.errors[0].path.replace(/[``]/g, "")]:
            msg.v_txt[0][error.errors[0].path] +
            ` (${error.errors[0].value.replace(
              /[']/g,
              ""
            )}) is already exists.`,
        };
        propertyError.push(errJson);
      }
      if (propertyError.length) {
        response.boom.badData("Duplicate entry found.", {
          propertyError,
        });
      } else {
        response.boom.badRequest(
          "A system error occurred. Please try again later."
        );
      }
    } else if (error.hasOwnProperty("name") && error.name === "ResponseError") {
      logData.status = "ResponseError-elastic";
      logger.error(logData);
      if (
        error.message &&
        error.message == "resource_already_exists_exception"
      ) {
        response.boom.badData("Duplicate entry found.", {
          errorCode: "DUPLICATE",
        });
      } else {
        response.boom.badRequest(
          "A system error occurred. Please try again later.",
          error
        );
      }
    } else if (
      error.hasOwnProperty("name") &&
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      logData.status = "SequelizeForeignKeyConstraintError";
      logger.error(logData);
      let propertyError = [];
      let Msg = "Unknown entry found";
      if (typeof error.fields.length) {
        let errMsg = `Given ${msg.v_txt[0][error.fields[0]]} does not exists.`;
        if (error.reltype === "parent") {
          Msg = "Unable to process data";
          errMsg = `Given ${
            msg.v_txt[0][error.fields[0]]
          } has been used by another module.`;
        }
        let errJson = {
          [error.fields[0].replace(/[``]/g, "")]: errMsg,
        };
        propertyError.push(errJson);
      }
      if (propertyError.length) {
        response.boom.badData(Msg, {
          propertyError,
        });
      } else {
        response.boom.badRequest(
          "A system error occurred. Please try again later."
        );
      }
    } else if (
      error.hasOwnProperty("name") &&
      error.name === "SequelizeHierarchyError"
    ) {
      logData.status = "SequelizeHierarchyError";
      logger.error(logData);
      response.boom.badData(error.message);
    } else if (
      error.hasOwnProperty("name") &&
      error.name === "SequelizeDatabaseError"
    ) {
      logData.status = "SequelizeDatabaseError";
      logger.error(logData);
      response.boom.badData(error.message);
    } else if (error.hasOwnProperty("name") && error.name === "Neo4jError") {
      logData.status = "neo4jError";
      logger.error(logData);
      let propertyError = [];
      if (
        typeof error.code !== "undefined" &&
        error.code === "Neo.ClientError.Schema.ConstraintValidationFailed"
      ) {
        let findProperty = error.message.search("and property");
        let pos = error.message.indexOf("`", findProperty);
        let property = error.message.substr(pos) || "";
        let propertyArr = property.split(" = ") || [];
        if (propertyArr.length === 2) {
          let errJson = {
            [propertyArr[0].replace(/[``]/g, "")]:
              msg.v_txt[0][propertyArr[0].replace(/[``]/g, "")] +
              ` (${propertyArr[1].replace(/[']/g, "")}) is already exists.`,
          };
          propertyError.push(errJson);
        }
      }
      if (propertyError.length) {
        response.boom.badData("Duplicate entry found.", {
          propertyError,
        });
      } else {
        response.boom.badRequest(
          "A system error occurred. Please try again later."
        );
      }
    } else if (
      error.hasOwnProperty("error") &&
      error.hasOwnProperty("method")
    ) {
      logData.status = "ERROR";
      logger.error(logData);
      response.boom.badData(error.error);
    } else if (
      error.hasOwnProperty("name") &&
      error.name === "JsonWebTokenError"
    ) {
      logData.status = "ERROR";
      logger.error(logData);
      response.boom.unauthorized(error);
    } else if (error.hasOwnProperty("errorCode")) {
      logData.status = "ERROR";
      logData.errCode = error.errorCode;
      logger.error(logData);
      if (error.hasOwnProperty("type") && error.type === "unauthorized") {
        response.boom.unauthorized(
          `A system error occurred. Please try again later.`,
          {
            errorCode: error.errorCode,
          }
        );
      } else if (error.hasOwnProperty("type") && error.type === "forbidden") {
        response.boom.forbidden(
          `A system error occurred. Please try again later.`,
          {
            errorCode: error.errorCode,
          }
        );
      } else if (
        error.hasOwnProperty("type") &&
        error.type === "unprocessableentity"
      ) {
        response.boom.badData(
          `A system error occurred. Please try again later.`,
          {
            errorCode: error.errorCode,
          }
        );
      }
    } else {
      logData.status = "ERROR";
      logger.error(logData);
      response.boom.badRequest(
        "A system error occurred. Please try again later."
      );
    }
  } else if (typeof error === "string") {
    logData.status = "ERROR";
    logger.error(logData);
    response.boom.badData("A system error occurred. Please try again later.", {
      error: error,
    });
  } else {
    logger.error(logData);
    response.boom.badRequest(
      "A system error occurred. Please try again later."
    );
  }
  return null;
};

const fileUpload = async (req, file, path) => {
  try {
    return new Promise(async (resolve, reject) => {
      const helper = require("./helper");
      // let logData = {}; let tokenData;
      // if(req){
      //   logData = helper.defaultLogInfo(req, moduleName, 'fileUpload', 'FILE_UPLOAD');
      //   tokenData = req.tokenData;
      // }
      // let fileName = generateFileName(file.name);
      let fileNameArr = file.name.split(".");
      let fileName = `${getUUID()}.${fileNameArr[fileNameArr.length - 1]}`;
      await file.mv(`${path}${fileName}`, (err, success) => {
        // if (![null, undefined, ''].includes(tokenData)) {
        //   logData.userID = tokenData.userID;
        // }
        if (err) {
          // logData.message = err;
          // logger.error(logData);
          resolve({
            state: "ERROR",
            err,
          });
        } else {
          // logger.info(logData);
          resolve({
            state: "success",
            value: fileName,
          });
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

const fileRemove = async (req, file, path) => {
  try {
    return new Promise(async (resolve, reject) => {
      let fileExists = await fileExist(req, file, path);
      let tokenData = req.tokenData;
      if (fileExists) {
        await fs.unlink(`${path}${file}`, (err) => {
          let logData = defaultLogInfo(
            req,
            moduleName,
            "fileRemove",
            "FILE_REMOVE"
          );
          if (![null, undefined, ""].includes(tokenData)) {
            logData.accountID = tokenData.accountID;
          }
          if (err) {
            logData.message = err;
            // logger.error(logData);
            resolve({
              state: "ERROR",
              err,
            });
          } else {
            // logger.info(logData);
            resolve({
              state: "success",
              value: file,
            });
          }
        });
      }
    });
  } catch (err) {
    throw err;
  }
};

const fileExist = async (req, file, path) => {
  try {
    return new Promise(async (resolve, reject) => {
      fs.access(`${path}${file}`, fs.F_OK, (err) => {
        let tokenData = req.tokenData;
        let logData = defaultLogInfo(
          req,
          moduleName,
          "fileExist",
          "FILE_EXISTS"
        );
        if (![null, undefined, ""].includes(tokenData)) {
          logData.accountID = tokenData.accountID;
        }
        if (err) {
          logData.message = err;
          // logger.error(logData);
          resolve({
            state: "ERROR",
            err,
          });
        } else {
          // logger.info(logData);
          resolve({
            state: "success",
            value: file,
          });
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

const fileToData = async (file) => {
  try {
    return new Promise(async (resolve, reject) => {
      // convert binary data to base64 encoded string
      if (
        file &&
        file.hasOwnProperty("data") &&
        file.hasOwnProperty("mimetype")
      ) {
        let fileString = await new Buffer.from(file.data, "base64").toString(
          "base64"
        );
        resolve("data:" + file.mimetype + ";base64," + fileString);
      } else {
        resolve(null);
      }
    });
  } catch (err) {
    throw err;
  }
};

const CSVReader = (req, file) => {
  try {
    return new Promise(async (resolve, reject) => {
      if (
        ![null, undefined, ""].includes(file) &&
        (![null, undefined, ""].includes(file.Body) ||
          ![null, undefined, ""].includes(file.data))
      ) {
        // fileContent = fs.readFileSync(file.Body, { encoding: 'utf8' })
        let body = file.Body || file.data;
        fileContent = body
          .toString("utf-8")
          .toString() // convert Buffer to string
          .split("\n") // split string to lines
          .map((e) => e.trim()) // remove white spaces for each line
          .map((e) =>
            e.split(",").map((e) => {
              if (e.length % 2 == 0) {
                e = `${e}`;
              } else if (Math.abs(e.length % 2) == 1) {
                e = `0${e}`;
              }
              return e.trim();
            })
          ); // split each line to array
        resolve({
          state: "SUCCESS",
          records: fileContent,
        });
      }
    });
  } catch (err) {
    throw err;
  }
};

const reverseString = (str) => {
  return str.split("").reverse().join("");
};

const strpos = (str, pos = 0) => {
  return str.split("")[pos];
};

const strreplace = (str, from, to) => {
  let regex = new RegExp(from, "g");
  return str.replace(regex, to);
};

const generateFileName = (str = ``) => {
  let fileNameArr = str.split(".");
  let name = ``;
  let fileExt = ``;
  fileNameArr.map((resp, index) => {
    if (fileNameArr.length === index + 1) {
      fileExt += `${resp}`;
    } else {
      name += `${resp}`;
    }
  });
  return `${getUUID()}.${fileExt}`;
};

const getGlobbedPaths = (globPatterns, excludes) => {
  // URL paths regex
  let urlRegex = new RegExp("^(?:[a-z]+:)?//", "i");
  // The output array
  let output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.map((globPattern) => {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map((file) => {
          if (_.isArray(excludes)) {
            for (let i in excludes) {
              file = file.replace(excludes[i], "");
            }
          } else {
            file = file.replace(excludes, "");
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }
  return output;
};

const pad = (value) => {
  return value < 10 ? "0" + value : value;
};

const getUTCOffset = (date = null) => {
  if (date === null) {
    date = new Date();
  }
  const sign = date.getTimezoneOffset() > 0 ? "-" : "+";
  const offset = Math.abs(date.getTimezoneOffset());
  const hours = pad(Math.floor(offset / 60));
  const minutes = pad(offset % 60);
  return sign + hours + ":" + minutes;
};

/**
 * @description To get difference between given two dates.
 * @param {date} from From date.
 * @param {date} to To date.
 * @param {string} preference Preferred period.
 * @return {string} Altered value.
 */
const dateDif = (
  from,
  to,
  preference = null,
  format = "YYYY-MM-DD HH:MM:SS"
) => {
  // const sec = 1000;
  // const min = 1000 * 60;
  // const hour = 1000 * 60 * 60;
  // const day = 1000 * 60 * 60 * 24;
  if (![null, "", undefined].includes(preference)) {
    if (preference === "second") {
      to = moment(to);
      from = moment(from);
      return to.diff(from, "seconds", true);
      // const diff = Math.floor(to.getTime() - from.getTime());
      // return Math.floor(diff / sec);
    } else if (preference === "minute") {
      to = moment(to);
      from = moment(from);
      return to.diff(from, "minutes", true);
      // const diff = Math.floor(to.getTime() - from.getTime());
      // return Math.floor(diff / min);
    } else if (preference === "hour") {
      to = moment(to);
      from = moment(from);
      return to.diff(from, "hours", true);
      // const diff = Math.floor(to.getTime() - from.getTime());
      // return Math.floor(diff / hour);
    } else if (preference === "day") {
      to = moment(moment(to).format(format));
      from = moment(moment(from).format(format));
      return to.diff(from, "days", true);
      // const diff = Math.floor(to.getTime() - from.getTime());
      // const days = Math.floor(diff / day);
      // return days;
    } else if (preference === "month") {
      to = moment(moment(to).format(format));
      from = moment(moment(from).format(format));
      return to.diff(from, "months", true);
      // const diff = Math.floor(to.getTime() - from.getTime());
      // const days = Math.floor(diff / day);
      // const months = Math.floor(days / 31);
      // return months;
    } else if (preference === "year") {
      to = moment(moment(to).format(format));
      from = moment(moment(from).format(format));
      return to.diff(from, "years", true);
      // const diff = Math.floor(to.getTime() - from.getTime());
      // const days = Math.floor(diff / day);
      // const months = Math.floor(days / 31);
      // const years = Math.floor(months / 12);
      // return years;
    } else {
      to = moment(moment(to).format(format));
      from = moment(moment(from).format(format));
      return to.diff(from, "days", true);
      // const diff = Math.floor(to.getTime() - from.getTime());
      // const days = Math.floor(diff / day);
      // return days;
    }
  } else {
    to = moment(moment(to).format(format));
    from = moment(moment(from).format(format));
    return to.diff(from, "days", true);
    // const diff = Math.floor(to.getTime() - from.getTime());
    // const days = Math.floor(diff / day);
    // return days;
  }
};

const formatDate = (
  date,
  format = "yyyy-mm-dd hh:mm:ss",
  zone = getUTCOffset(new Date())
) => {
  return moment(date).utcOffset(zone).format(format);
};

/**
 *This function is to get days from month or year
 * @param date value format %m-%Y
 */
const getDays = (date) => {
  let splitDate = date.split("-");
  let isLeapYear =
    splitDate[1] % 400 === 0 ||
    (splitDate[1] % 100 !== 0 && splitDate[1] % 4 === 0);
  let monthInDays = new Date(splitDate[1], splitDate[0], 0).getDate();
  let YearInDays = isLeapYear ? 366 : 365;
  return {
    monthInDays,
    YearInDays,
  };
};

/**
 * @desc Alter the date from given date or current date by default.
 * @param string type - plus / minus.
 * @param string days - Numbers of days to alter from given date.
 * @param data fromDate - Start date.
 * @return Date - Altered Date.
 */
const alteredDate = (
  method = "plus",
  type = "days",
  count = 0,
  fromDate = null
) => {
  if ([null, undefined, ""].includes(fromDate)) {
    fromDate = new Date();
  } else if (typeof fromDate === "number") {
    fromDate = new Date(fromDate);
  }

  let dateVal;

  if (type === "months") {
    dateVal =
      method === "minus"
        ? new Date(fromDate).getMonth() - count
        : new Date(fromDate).getMonth() + count;
    return new Date(fromDate.setMonth(dateVal));
  } else {
    dateVal =
      method === "minus"
        ? new Date(fromDate).getDate() - count
        : new Date(fromDate).getDate() + count;
    return new Date(fromDate.setDate(dateVal));
  }
};

/**
 * @desc-Remove duplicate value from array data.
 * @param arr - array data.
 * @param key - null (when using object value).
 * @return array value.
 */

//   let obj = {};
//   for (let i = 0; i < arr.length; i++) {
//     if (key) {
//       obj[arr[i][key]] = true;
//     } else {
//       obj[arr[i]] = true;
//     }
//   }
//   let arrData = [];
//   for (let key in obj) {
//     if (typeof parseInt(key) === 'number') {
//       key = parseInt(key);
//     }
//     arrData.push(key);
//   }
//   if (key != null) {
//     let data = [];
//     arrData.map((resp) => {
//       if (arr.length) {
//         data.push(arr.find((items) => items[key] == resp));
//       }
//     });
//     return data;
//   } else {
//     return arrData;
//   }
// };

/**
 * @description Round up the number by forcing to return with float point.
 * @param {number} value that to be processed.
 * @param {number} precision Decimal digit length.
 * @return {number} Rounded value.
 */
const precisionRoundFloat = (value, precision = 2) => {
  const finalValue = precisionRound(value).toString();
  return parseFloat(finalValue).toFixed(precision);
};

/**
 * @description Round up the given number.
 * @param {number} value that to be processed.
 * @param {number} precision Decimal digit length.
 * @return {number} Rounded value.
 */
const precisionRound = (value, precision = 2) => {
  const data = Math.pow(10, precision);
  return Math.round(value * data) / data || 0;
};

/**
 *This function is to add leading zeros
 * @param num value number
 * @param length value length of the number
 */
const zeroPad = (num, length = 10) => {
  return String(num).padStart(length, "0");
};

const encriptHmac = (message, password) => {
  return crypto
    .createHmac("sha256", password)
    .update(message)
    .digest("base64")
    .toString();
};

const ISOTime = () => {
  const dt = new Date().toISOString();
  const dtArr = dt.split(".");
  return dtArr[0] + "Z";
};

const convertToFormData = (apiValues) => {
  const FormData = require("form-data");
  const formData = new FormData();
  for (const key of Object.keys(apiValues)) {
    const value = apiValues[key];
    formData.append(key, value);
  }
  return formData;
};

/**
 * @description To remove file in a folder
 * @param {String} filePath file path
 */
const removeFile = async (filePath) => {
  return await new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      resolve();
    });
  });
};

/**
 * This function is to file move one path to another path
 * @param {String} currentFilePath - current file path
 * @param {String} newFilePath - New file path
 */
const fileMove = async (currentFilePath, newFilePath) => {
  try {
    return await fs.rename(currentFilePath, newFilePath, (err) => {
      if (err) {
        throw err;
      } else {
        console.log("Successfully moved the file!");
      }
    });
  } catch (err) {
    throw err;
  }
};

/**
 * This function is to generate single page thumbnail for pdf
 * @param {String} filePath - current folder path for pdf (without pdf file name)
 * @param {String} fileName - PDF file name
 */

/**
 * This function is to generate single page thumbnail for pdf only for AWS
 * @param {String} filePath - current folder path for pdf (without pdf file name)
 * @param {String} fileName - PDF file name
 */

/**
 * @desc Get start & end timestamp of the given timestamp.
 * @param date fromDate - Start date.
 * @param Number count - days count to get end timestamp
 * @return timestamp - start and end timestamp.
 */
const getDateStartAndEndTimestamp = async (
  fromDate = timeStamp(),
  endDate = timeStamp()
) => {
  let timeStamps = {};
  timeStamps.start = timeStamp(moment(fromDate).startOf("day").toString());
  timeStamps.end = timeStamp(moment(endDate).endOf("day").toString());
  timeStamps.end += 999;
  return timeStamps;
};

/**
 * @desc Get start & end timestamp of the given timestamp.
 * @param date fromDate - Start date.
 * @param Number count - days count to get end timestamp
 * @return timestamp - start and end timestamp.
 */
const getDateStartAndEndTimestampWithTimeZone = async (
  fromDate = timeStamp(),
  endDate = timeStamp(),
  time_zone
) => {
  let timeStamps = {};
  timeStamps.start = timeStamp(
    moment(fromDate).utcOffset(time_zone).startOf("day").toString()
  );
  timeStamps.end = timeStamp(
    moment(endDate).utcOffset(time_zone).endOf("day").toString()
  );
  timeStamps.end += 999;
  return timeStamps;
};

/**
 * @desc Get start & end timestamp of the given timestamp.
 * @param date fromDate - Start date.
 * @param Number count - days count to get end timestamp
 * @return timestamp - start and end timestamp.
 */
const getDateDifferenceTimestampWithTimeZone = async (
  fromDate = timeStamp(),
  endDate = timeStamp(),
  time_zone
) => {
  let from = moment(fromDate).utcOffset(time_zone);
  let to = moment(endDate).utcOffset(time_zone);
  return to.diff(from, "days");
};
/**
 * @desc Used to swap array data based on index
 * @param Array arr - Array data.
 * @param Number from - from value
 * @return Array - swapping array.
 */
const arrayMovetoBottom = (arr, value) => {
  let arrIndex = arr.findIndex((x) => x === value);
  arr.splice(arrIndex, 1);
  arr.push(value);
  return arr;
};

let inviteTokenValidation = async (req, res) => {
  try {
    if (![null, undefined, ""].includes(req.headers["reg-token"])) {
      let curTime = parseInt(timeStamp() / 1000);
      let token = decodeURIComponent(req.headers["reg-token"]);
      let decodedData = await decodeTokenData(token);
      let invalid = false;
      if ([null, undefined, ""].includes(decodedData.exp)) {
        invalid = true;
      }
      if (invalid) {
        // throw 'Token is invalid.';
        throw {
          type: "unauthorized",
          errorCode: cfg.errorCode.unauthorized.invalidToken,
        };
      } else if (decodedData.exp < curTime) {
        // throw 'Token is expired.';
        throw {
          type: "unauthorized",
          errorCode: cfg.errorCode.unauthorized.tokenExpired,
        };
      }
      req.tokenData = decodedData;
      req.headers.domainid = decodedData.domainID;
      return true;
    } else {
      throw {
        type: "unauthorized",
        errorCode: cfg.errorCode.unauthorized.tokenExpected,
      };
    }
  } catch (err) {
    throw err;
    // catchHandler(err, res, {});
  }
};

/**
 * @desc Used to download file from external url
 * @param String url - External URL.
 * @param String path - Path to download
 * callback - ()
 */
const externalFileDownload = async (url, path, callback) => {
  return await new Promise((resolve, reject) => {
    return reqModule.head(url, async (err, res, body) => {
      await reqModule(url)
        .pipe(fs.createWriteStream(path))
        .on("close", callback);
      resolve();
    });
  });
};

const getBase64URL = async (path = null, url = null, fileName = null) => {
  try {
    return await new Promise(async (resolve, reject) => {
      if (url) {
        await base64Img.requestBase64(url, async (err, res, body) => {
          if (err) {
            reject(err.message || err);
          }
          resolve(body);
        });
      } else if (path && fileName) {
        resolve(base64Img.base64Sync(pathMod.join(path, fileName)));
      } else {
        reject("Need parameter path or fileName or url");
      }
    });
  } catch (err) {
    throw err;
  }
};

/**
 * This function is to generate single page thumbnail for pdf only for AWS
 * @param {String} filePath - current folder path for pdf (without pdf file name)
 * @param {String} fileName - PDF file name
 */
const generateVideoThumbnailForAWSFile = async (
  dir,
  fileName,
  destinationPath
) => {
  try {
    //<--For Downloading a s3 image-->//
    await AWS.s3Download(
      fileName,
      dir,
      pathMod.join(config.UPLOAD_PATH.TEMP, fileName)
    );
    let newFileName = `${getUUID()}.png`;
    let targetPath = `${cfg.UPLOAD_PATH.TEMP}${newFileName}`;
    let thumbnail = await thumb({
      source: pathMod.join(`${cfg.UPLOAD_PATH.TEMP}`, `${fileName}`),
      target: targetPath,
      width: 720, // thumb's width
      height: 480, // thumb's height
      seconds: 1,
    });
    return await new Promise((resolve, reject) => {
      let fileStream = fs.createReadStream(targetPath);
      fileStream.on("error", async (err) => {
        if (err) {
          reject(err);
        }
      });
      let deleteImg = [fileName];
      fileStream.on("open", async () => {
        await AWS.uploadStream(newFileName, destinationPath, fileStream);
        deleteImg.push(`${newFileName}`);
        for (let tempIMG of deleteImg) {
          await removeFile(`${cfg.UPLOAD_PATH.TEMP}/${tempIMG}`);
        }
        resolve(newFileName);
      });
    });
  } catch (err) {
    throw err;
  }
};

const validateNumber = async (dataJson) => {
  try {
    let mobilenumber;
    let type = req.body.type;
    let token = dataJson.token;
    var decodedData = jwt_decode(token);
    console.log(decodedData);
    if (decodedData.email !== undefined) {
      dataJson = {
        email: decodedData.email,
      };
      let validateEmail = await DAL.login(dataJson);
      if (validateEmail.status === 0) {
        return res.status(403).send(
          JSON.stringify({
            response: "Wrong email id.",
          })
        );
      } else {
        console.log(validateEmail.records[0].mobilenumber);
        mobilenumber = validateEmail.records[0].mobilenumber;
        console.log(mobilenumber);
      }
    } else {
      mobilenumber = decodedData.phone_number.substring(3);
    }
  } catch (err) {
    throw err;
  }
};
/**
 * Exporting the modules
 */
module.exports = {
  authorization,
  generatePassword,
  validatePassword,
  refreshAuthorization,
  okResponseHandler,
  timeStamp,

  objectToQuerystring,

  parameterized,
  JSONMerge,
  randomizer,
  accessControl,
  getClientIP,
  getClientBrowser,
  catchHandler,
  fileToData,
  fileUpload,
  fileRemove,
  CSVReader,
  reverseString,
  strpos,
  strreplace,
  generateFileName,

  getGlobbedPaths,
  getUTCOffset,
  dateDif,
  formatDate,
  getUUID,
  getDays,
  alteredDate,

  precisionRoundFloat,
  precisionRound,
  zeroPad,
  encriptHmac,
  ISOTime,
  convertToFormData,
  getNewOTP,
  options,
  tokenValidation,
  randomAlphanumeric,
  removeFile,
  fileMove,

  getDateStartAndEndTimestamp,
  getRandomValueFromArray,
  getRndBetween,
  getRandomXValueFromArray,
  arrayMovetoBottom,
  inviteTokenValidation,
  externalFileDownload,
  getDateStartAndEndTimestampWithTimeZone,
  getDateDifferenceTimestampWithTimeZone,

  getBase64URL,
  decodeTokenData,
  generateVideoThumbnailForAWSFile,
  validateNumber,
  JSONBuilder,
};
