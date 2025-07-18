const common = require("../../utils/common");
const mockResponse = require("../../libs/mockResponse");

const dashboardPlan = async (req, res) => {
  try {
    var dataJson = {
      AltMobileNumber: req.body.AltMobileNumber,
    };
    var response = await mockResponse.dashboardPlan(dataJson);
    return res.status(200).send(
      JSON.stringify({
        response: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const mysubscription = async (req, res) => {
  try {
    let dataJson = {
      AltMobileNumber: req.body.AltMobileNumber,
    };
    let response = await mockResponse.mysubscription(dataJson);
    return res.status(200).send(
      JSON.stringify({
        response: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
module.exports = {
  dashboardPlan,
  mysubscription,
};
