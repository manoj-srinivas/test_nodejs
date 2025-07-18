const https = require("https");
const DAL = require("./dal");

const common = require("../../utils/common");
const moment = require("moment");

function dateandtime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}

const category = async (req, res) => {
  try {
    var dataJson = {
       
    };
    var response = await DAL.categories(dataJson);
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
    var dataJson = {
      catid: parseInt(req.params.catid),
      category: req.body.category,
      status: req.body.status,
      description: req.body.description,
    };
    var response = await DAL.updateCategories(dataJson);
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
    var dataJson = {
      catid: parseInt(req.params.catid),
    };
    var response = await DAL.deleteCategories(dataJson);
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

const getCategory = async (req, res) => {
  try {
    let response = await DAL.getCategory();
    if (response.state == "success") {
      console.log("response", response.records);
      let responseMessage = "List of  users";
      return res.status(200).send(
        JSON.stringify({
          active_records: response.active_records.length,
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
    var dataJson = {
      catid: parseInt(req.params.catid),
      number: req.body.number,
      status: req.body.status,
      message: req.body.message,
    };
    var response = await DAL.categoriesChat(dataJson);
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

module.exports = {
 
  category,
  getCategory,
  updateCategory,
  deleteCategory,
  categoryChat,

  // upload
};
