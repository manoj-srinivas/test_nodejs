const http = require("http");
const DAL = require("./dal");
const common = require("../../utils/common");
const fs = require("fs");
const path = require("path");
const request = require("request");

const language = async (req, res) => {
  try {
    let dataJson = {
      filename: req.params.filename,
    };
    response = await DAL.language(dataJson);
    filePath = path.join(__dirname, response.records[0].files);
    fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
      if (!err) {
        console.log("received data: " + data);
        return res.status(200).send(JSON.parse(data));
      } else {
        let error = JSON.stringify(err);
        common.catchHandler(err, res, error);
      }
    });
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const fileUpload = async (req, res) => {
  try {
    var file = req.files.file;
    var filename = req.body.filename;
    var dataJson = {
      files: file,
    };

    var response = await DAL.uploadFile(dataJson);
    if (response.state == "success") {
      console.log("response", response.value);
      var files = response.value;
      var dataJson = {
        files: files,
        filename: filename,
      };
      var response = await DAL.pathupdate(dataJson);
      console.log("response", response);
      let responseMessage = "File uploaded.";
      let responseCode = "200";
      return res.status(200).send(
        JSON.stringify({
          //  messageDescription: profileImage,
          response: responseMessage,
        })
      );
    } else {
      return res.status(423).send(
        JSON.stringify({
          messageDescription: "File is not uploaded.",
        })
      );
    }
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

module.exports = {
  language,
  fileUpload,
};
