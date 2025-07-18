const https = require("https");
const DAL = require("./dal");
const bundleResponse = require("../../libs/bundleResponse");
const common = require("../../utils/common");

const categorynew = async (req, res) => {
  try {
    let response = await DAL.category();
    console.log("response", response);
    return res.status(200).send(
      JSON.stringify({
        responseData: {
          ResponseCode: "0",
          Status: "SUCCESS",
          ResponseDescription: "List of categories and subcategory",
          categories: response.categories,
        },
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

 
const search = async (req, res) => {
  try {
    console.log("req", req);
    let dataJson = {
      plan: req.query.plan,
    };

  let response = await DAL.search(dataJson);
    console.log("response", dataJson);
    return res.status(200).send(
      JSON.stringify({
        response: {
          ResoponseCode: "0",
          Status: "SUCCESS",
          SystemType: "CIS",
          ResponseDescription: "Success.",
          RequestId: "WEB_10.42.21.26_84861bb7-3fdb-425e-9a41-cf120c5a6131",
          ResponseData: {
            Action: "VIEW_CATALOGUE",
            CircleCode: "NG",
            ProductDetails: response.ProductDetails,
          },
        },
      })
    );
  } catch (err) {
    return res.status(401).send(
      JSON.stringify({
        ResoponseCode: "1",
        Status: "FAILED",
      })
    );
  }
};
const buildbunbles = async (req, res) => {
  try {
    response = await bundleResponse.buildbunbles();
    return res.status(200).send(
      JSON.stringify({
        response: response,
      })
    );
  } catch (err) {
    return res.status(401).send(
      JSON.stringify({
        ResoponseCode: "1",
        Status: "FAILED",
      })
    );
  }
};
const createCategory = async (req, res) => {
  try {
    let dataJson = {
      category: req.body.category,
      flag: req.body.flag,
    };

    response = await DAL.createCategory(dataJson);
    console.log("response", response);
    return res.status(200).send(
      JSON.stringify({
        responseData: response,
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
      category: req.body.category,
      flag: req.body.flag,
      catid: req.body.catid,
    };

    response = await DAL.updateCategory(dataJson);
    console.log("response", response);
    return res.status(200).send(
      JSON.stringify({
        responseData: response,
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
      catid: req.query.catid,
    };

    response = await DAL.deleteCategory(dataJson);
    console.log("response", response);
    return res.status(200).send(
      JSON.stringify({
        responseData: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const createSubCategory = async (req, res) => {
  try {
    let dataJson = {
      category: req.body.category,
      catid: req.body.catid,
    };

    response = await DAL.createSubCategory(dataJson);
    console.log("response", response);
    return res.status(200).send(
      JSON.stringify({
        responseData: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const createBundles = async (req, res) => {
  try {
    let dataJson = {
      ProductName: req.body.ProductName,
      Category: req.body.Category,
      SubCategory: req.body.SubCategory,
      Price: req.body.Price,
      Data: req.body.Data,
      data_type: req.body.data_type,
      Calls: req.body.Calls,
      Validity: req.body.Validity,
      Renewal: req.body.Renewal,
      isConsentRequired: req.body.isConsentRequired,
      BuyForOthers: req.body.BuyForOthers,
      PaymentMode: req.body.PaymentMode,
      Description: req.body.Description,
      Status: req.body.Status,
      OfferId: req.body.OfferId,
      GracePeriod: req.body.GracePeriod,
      DataShareDenomination: req.body.DataShareDenomination,
      FixedRenewalDate: req.body.FixedRenewalDate,
      LastModifiedDate: req.body.LastModifiedDate,
      promotionApplicable: req.body.promotionApplicable,
      Parking: req.body.Parking,
      Action: req.body.Action,
      deactivationId: req.body.deactivationId,
      optin: req.body.optin,
      optout: req.body.optout,
    };

    response = await DAL.createBundles(dataJson);
    console.log("response", response);
    return res.status(200).send(
      JSON.stringify({
        responseData: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const updateBundles = async (req, res) => {
  try {
    let dataJson = {
      ProductID: req.body.ProductID,
      ProductName: req.body.ProductName,
      Category: req.body.Category,
      SubCategory: req.body.SubCategory,
      Price: req.body.Price,
      Data: req.body.Data,
      data_type: req.body.data_type,
      Calls: req.body.Calls,
      Validity: req.body.Validity,
      Renewal: req.body.Renewal,
      isConsentRequired: req.body.isConsentRequired,
      BuyForOthers: req.body.BuyForOthers,
      PaymentMode: req.body.PaymentMode,
      Description: req.body.Description,
      Status: req.body.Status,
      OfferId: req.body.OfferId,
      GracePeriod: req.body.GracePeriod,
      DataShareDenomination: req.body.DataShareDenomination,
      FixedRenewalDate: req.body.FixedRenewalDate,
      LastModifiedDate: req.body.LastModifiedDate,
      promotionApplicable: req.body.promotionApplicable,
      Parking: req.body.Parking,
      Action: req.body.Action,
      deactivationId: req.body.deactivationId,
      optin: req.body.optin,
      optout: req.body.optout,
    };

    response = await DAL.updateBundles(dataJson);
    console.log("response", response);
    return res.status(200).send(
      JSON.stringify({
        responseData: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
const deleteBundles = async (req, res) => {
  try {
    let dataJson = {
      ProductID: req.query.ProductID,
    };

    response = await DAL.deleteBundles(dataJson);
    console.log("response", response);
    return res.status(200).send(
      JSON.stringify({
        responseData: response,
      })
    );
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};

const bundlesnew = async (req, res) => {
  try {
    console.log("req", req);
    let dataJson = {
      username: req.query.username,
      password: req.query.password,
      iname: req.query.iname,
      clientTransactionId: req.query.clientTransactionId,
      action: req.query.action,
      type: req.query.type,
      subtype: req.query.subtype,
    };
    response = await DAL.bundles(dataJson);
    console.log("response", response);
    return res.status(200).send(
      JSON.stringify({
        response: {
          ResoponseCode: "0",
          Status: "SUCCESS",
          SystemType: "CIS",
          ResponseDescription: "Success.",
          RequestId: "WEB_10.42.21.26_84861bb7-3fdb-425e-9a41-cf120c5a6131",
          ResponseData: {
            Action: "VIEW_CATALOGUE",
            CircleCode: "NG",
            ProductDetails: response.ProductDetails,
          },
        },
      })
    );
  } catch (err) {
    return res.status(401).send(
      JSON.stringify({
        ResoponseCode: "1",
        Status: "FAILED",
      })
    );
  }
};

module.exports = {
 
  bundlesnew,
  search,
  buildbunbles,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubCategory,
  createBundles,
  updateBundles,
  deleteBundles,
  categorynew,
};
