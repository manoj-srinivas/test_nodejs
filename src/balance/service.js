const DAL = require("./dal");
const common = require("../../utils/common");
const tokenVal = require("../../libs/tokenVal");

const data = async (req, res) => {
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
    if (!token) {
      let responseMessage = " Non-Authoritative Information, token empty";
      return res.status(403).send(
        JSON.stringify({
          messageDescription: responseMessage,
        })
      );
    } else {
      if (req.body.mobilenumber != undefined) {
        mobilenumber = req.body.mobilenumber;
        if (req.body.mobilenumber != mobilenumber) {
          let switchMobilenumber = req.body.mobilenumber;
          let dataJsonTwo = {
            addMobilenumber: switchMobilenumber,
            mobilenumber: mobilenumber,
          };
          let verifyNumberaddedOrNot = await DAL.verifyNumberaddedOrNot(
            dataJsonTwo
          );
          if (verifyNumberaddedOrNot.status == "0") {
            let responseMessage = "Please link this mobilenumber";
            return res.status(403).send(
              JSON.stringify({
                messageDescription: responseMessage,
              })
            );
          } else {
            console.log("277 if work", verifyNumberaddedOrNot.status);
            switchMobilenumber = req.body.mobilenumber;
            mobilenumber = switchMobilenumber;
          }
      
        }
      } 
      let dataJson = {
        mobilenumber: mobilenumber,
      };
      let response = await DAL.userBalanceDetails(dataJson);
      if (response.message == "empty") {
        let responseMessage = " dataEmpty";
        return res.status(403).send(
          JSON.stringify({
            messageDescription: responseMessage,
          })
        );
      } else {
        console.log("responsesss", response.records);
        return res.status(200).send(
          JSON.stringify({
            status: 1,
            result: response.records[0],
          })
        );
      }
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

module.exports = {
  data,
};
