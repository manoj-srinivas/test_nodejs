const jwt_decode = require("jwt-decode");
const DAL = require("../src/sso/dal");

const getTokenVal = async (token) => {
  try {
    let decodedData = jwt_decode(token);
    let responseNumber;
    console.log("token gen data", decodedData);
    if (decodedData.mobilenumber != undefined) {
      return (responseNumber = decodedData.mobilenumber);
    } else {
      if (decodedData.email !== undefined) {
        dataJson = {
          email: decodedData.email,
        };
        let validateEmail = await DAL.JWTVal(dataJson);
        if (validateEmail.status === 0) {
          return (responseNumber = "Wrong");
        } else {
          return (responseNumber = validateEmail.records[0].mobilenumber);
        }
      } else {
        return (responseNumber = decodedData.phone_number);
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const mtnNumbers = async (number) => {
  try {
    let dataJson = {
      mobilenumber: number,
    };
    return (validateNumbers = await DAL.validateNumbers(dataJson));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const dateTime = () => {
  try {
    return (
      date=new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};
/**
 * Exporting the modules
 */
module.exports = {
  getTokenVal,
  mtnNumbers,
  dateTime,
};
