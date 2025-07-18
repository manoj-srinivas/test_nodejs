const DAL = require("./dal");
const common = require("../../utils/common");

const countrylist = async (req, res) => {
  try {
    let dataJson = {};

    let response = await DAL.countrylist(dataJson);
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(
      JSON.stringify({
        countryList: response.records,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

module.exports = {
  countrylist,
};
