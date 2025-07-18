const mysql = require("../../libs/mysqlDB");
const validation = require("../../utils/validation");
const common = require("../../utils/common");
const config = require("../../utils/config");

const createCategory = async (dataJson) => {
  try {
  let  response = {};
    let validate = [
      {
        fld: "category",
        value: dataJson.category,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar100,
      },
      {
        fld: "flag",
        value: dataJson.flag,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar100,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      if (
        processValidation.hasOwnProperty("replacements") &&
        processValidation.replacements.length
      ) {
      
      }

      let columns = [];
      let columnsValue = [];
      columns.push(`category,catid,flag`);
      columnsValue.push(`:category,0,:flag`);
      let check = await mysql.selectData(
        `SELECT category FROM  bundelcategory where category='${dataJson.category}'`
      );
      console.log(check.length);
      if (check.length > 0) {
        response.message = `${dataJson.category} is already exists`;
      } else {
        let result = await mysql.insertData(
          `INSERT INTO bundelcategory (${columns}) VALUES (${columnsValue})`,
          dataJson
        );
        if (result[1] <= 0) {
          // throw `Data not updated`;
          throw {
            type: "unprocessableentity",
            errorCode: config.errorCode.unProcessableEntity.recordNotFound,
          };
        }

        response.message = `${dataJson.category} as category added successfully`;
      }

      return response;
    }
  } catch (err) {
    throw err;
  }
};

const updateCategory = async (dataJson) => {
  try {
  let  response = {};
    let result = await mysql.updateData(
      `UPDATE  bundelcategory set category='${dataJson.category}',flag='${dataJson.flag}' where id='${dataJson.catid}'`
    );
    response.message = `Category  updated successfully`;
    return response;
  } catch (err) {
    throw err;
  }
};

const deleteCategory = async (dataJson) => {
  try {
  let  response = {};
    let result = await mysql.deleteData(
      `DELETE from bundelcategory  where id='${dataJson.catid}'`
    );
    response.message = `Category deleted successfully`;
    return response;
  } catch (err) {
    throw err;
  }
};
const createSubCategory = async (dataJson) => {
  try {
    let response = {};
    let validate = [
      {
        fld: "category",
        value: dataJson.category,
        isRequired: false,
        type: config.validationType.String,
        maxLength: config.variableLength.varChar100,
      },
      {
        fld: "catid",
        value: dataJson.catid,
        isRequired: false,
        type: config.validationType.Integer,
      },
    ];
    const processValidation = await validation.processValidation(validate);
    if (
      processValidation.hasOwnProperty("error") &&
      processValidation.error.length
    ) {
      throw {
        propertyError: processValidation.error,
      };
    } else {
      let columns = [];
      let columnsValue = [];
      columns.push(`category,catid`);
      columnsValue.push(`:category,:catid`);
      let check = await mysql.selectData(
        `SELECT category FROM  bundelcategory where category='${dataJson.category}'`
      );
      console.log(check.length);
      if (check.length > 0) {
        response.message = `${dataJson.category} is already exists`;
      } else {
        let result = await mysql.insertData(
          `INSERT INTO bundelcategory (${columns}) VALUES (${columnsValue})`,
          dataJson
        );
        if (result[1] <= 0) {
          // throw `Data not updated`;
          throw {
            type: "unprocessableentity",
            errorCode: config.errorCode.unProcessableEntity.recordNotFound,
          };
        }
        response.message = `${dataJson.category} as category added successfully`;
      }
      return response;
    }
  } catch (err) {
    throw err;
  }
};

const category = async (dataJson) => {
  try {
    let   response = {};
    let catid;
    let category;
    let subcategory;
    let categories = [];
    let result = await mysql.selectData(
      `SELECT  id,category,flag from bundelcategory where catid=0`
    );
    for (let i = 0; i < result.length; i++) {
      id = result[i].id;
      category = result[i].category;
      flag = result[i].flag;
      subcategory = await mysql.selectData(
        `SELECT  id,category as title from bundelcategory where catid=${id}`
      );
      categories.push({
        id: id,
        category: category,
        flag: flag,
        subcategory: subcategory,
      });
    }

    response.categories = categories;
    return response;
  } catch (err) {
    throw err;
  }
};

const createBundles = async (dataJson) => {
  try {
    let  response = {};
    if (dataJson.data_type == "GB") {
      dataJson.Data = dataJson.Data * 1000;
    }
    let columns = [];
    let columnsValue = [];
    let rs = await mysql.selectData(
      `SELECT category from bundelcategory where id=${dataJson.Category}`
    );
    let type = rs[0].category;

    columns.push(
      `ProductName,Category,SubCategory,type,Price,Data,data_type,Calls,Validity,Renewal,isConsentRequired,BuyForOthers,PaymentMode,Description,Status,OfferId,GracePeriod,DataShareDenomination,FixedRenewalDate,LastModifiedDate,promotionApplicable,Parking,Action,deactivationId,optin,optout`
    );
    columnsValue.push(
      `:ProductName,:Category,:SubCategory,'${type}',:Price,:Data,:data_type,:Calls,:Validity,:Renewal,:isConsentRequired,:BuyForOthers,:PaymentMode,:Description,:Status,:OfferId,:GracePeriod,:DataShareDenomination,:FixedRenewalDate,:LastModifiedDate,:promotionApplicable,:Parking,:Action,:deactivationId,:optin,:optout`
    );
    let result = await mysql.insertData(
      `INSERT INTO bundle (${columns}) VALUES (${columnsValue})`,
      dataJson
    );
    if (result[1] <= 0) {
      throw {
        type: "unprocessableentity",
        errorCode: config.errorCode.unProcessableEntity.recordNotFound,
      };
    }
    response.message = `Added in bundle successfully`;
    return response;
  } catch (err) {
    throw err;
  }
};

const updateBundles = async (dataJson) => {
  try {
    let  response = {};
    if (dataJson.data_type == "GB") {
      dataJson.Data = dataJson.Data * 1000;
    }

    let rs = await mysql.selectData(
      `SELECT category from bundelcategory where id=${dataJson.Category}`
    );
    let type = rs[0].category;

    let result = await mysql.updateData(
      `UPDATE  bundle SET ProductName=:ProductName,Category=:Category,SubCategory=:SubCategory,Price=:Price,Data=:Data,data_type=:data_type,Calls=:Calls,Validity=:Validity,Renewal=:Renewal,isConsentRequired=:isConsentRequired,BuyForOthers=:BuyForOthers,PaymentMode=:PaymentMode,Description=:Description,Status=:Status,OfferId=:OfferId,GracePeriod=:GracePeriod,DataShareDenomination=:DataShareDenomination,FixedRenewalDate=:FixedRenewalDate,LastModifiedDate=:LastModifiedDate,promotionApplicable=:promotionApplicable,Parking=:Parking,Action=:Action,deactivationId=:deactivationId,optin=:optin,optout=:optout,type='${type}' WHERE ProductID=:ProductID`,
      dataJson
    );
    if (result[1] <= 0) {
      throw {
        type: "unprocessableentity",
        errorCode: config.errorCode.unProcessableEntity.recordNotFound,
      };
    }
    response.message = `Bundle is updated successfully.`;
    return response;
  } catch (err) {
    throw err;
  }
};
const deleteBundles = async (dataJson) => {
  try {
    let    response = {};
    let result = await mysql.deleteData(
      `DELETE from bundle  where ProductID='${dataJson.ProductID}'`
    );
    response.message = `Bundle deleted successfully`;
    return response;
  } catch (err) {
    throw err;
  }
};

const bundles = async (dataJson) => {
  try {
    let  response = {};
    let cat;
    let subcat;
    let record;
    if (dataJson.type !== undefined && dataJson.subtype !== undefined) {
      var result = await mysql.selectData(
        `SELECT  ProductID,ProductName,Category,SubCategory,type,Price,Data,data_type,Calls,Validity,Renewal,isConsentRequired,BuyForOthers,PaymentMode,Description,Status,OfferId,GracePeriod,DataShareDenomination,FixedRenewalDate,LastModifiedDate,promotionApplicable,Parking,Action,deactivationId,optin,optout,currency,validity_type from bundle where Category='${dataJson.type}' and SubCategory='${dataJson.subtype}'`
      );
    } else {
      var result = await mysql.selectData(
        `SELECT  ProductID,ProductName,Category,SubCategory,type,Price,Data,data_type,Calls,Validity,Renewal,isConsentRequired,BuyForOthers,PaymentMode,Description,Status,OfferId,GracePeriod,DataShareDenomination,FixedRenewalDate,LastModifiedDate,promotionApplicable,Parking,Action,deactivationId,optin,optout,currency,validity_type from bundle`
      );
    }

    if (result.length > 0) {
      for (let i of result) {
        var Category = i.Category;
        var SubCategory = i.SubCategory;
        cat = await mysql.selectData(
          `SELECT category from bundelcategory where id=${Category}`
        );
        subcat = await mysql.selectData(
          `SELECT category from bundelcategory where id=${SubCategory}`
        );
        Category = cat[0].category;
        SubCategory = subcat[0].category;

        record = result.map((item) => ({
          ...item,
          Category: Category,
          SubCategory: SubCategory,
          Data: item.data_type == "GB" ? item.Data / 1000 : item.Data,
        }));
      }
      response.ProductDetails = record;
    } else {
      response.ProductDetails = [];
    }
    return response;
  } catch (err) {
    throw err;
  }
};

const search = async (dataJson) => {
  try {
    let  response = {};
    let cat;
    let subcat;
    let record;
    if (dataJson.plan != "") {
      let keyword=dataJson.plan;
      var result = await mysql.selectData(
        `SELECT ProductID,ProductName,Category,SubCategory,type,Price,Data,data_type,Calls,Validity,Renewal,isConsentRequired,BuyForOthers,PaymentMode,Description,Status,OfferId,GracePeriod,DataShareDenomination,FixedRenewalDate,LastModifiedDate,promotionApplicable,Parking,Action,deactivationId,optin,optout,currency from bundle where type like '%${keyword}%' or ProductName like '%${keyword}%'  or Data = '%${keyword}%'  or Validity like '%${keyword}%'  or price ='${keyword}'`
      );
    } else {
     var  result = await mysql.selectData(
        `SELECT  ProductID,ProductName,Category,SubCategory,type,Price,Data,data_type,Calls,Validity,Renewal,isConsentRequired,BuyForOthers,PaymentMode,Description,Status,OfferId,GracePeriod,DataShareDenomination,FixedRenewalDate,LastModifiedDate,promotionApplicable,Parking,Action,deactivationId,optin,optout,currency from bundle`
      );
    }

    if (result.length > 0) {
      for (let i of result) {
        let Category = i.Category;
        let SubCategory = i.SubCategory;
        cat = await mysql.selectData(
          `SELECT category from bundelcategory where id=${Category}`
        );
        subcat = await mysql.selectData(
          `SELECT category from bundelcategory where id=${SubCategory}`
        );
        Category = cat[0].category;
        SubCategory = subcat[0].category;

        record = result.map((item) => ({
          ...item,
          Category: Category,
          SubCategory: SubCategory,
          Data: item.data_type == "GB" ? item.Data / 1000 : item.Data,
        }));
      }
      response.ProductDetails = record;
    } else {
      response.ProductDetails = [];
    }
    return response;
  } catch (err) {
    throw err;
  }
};
/**
 * Exporting the modules
 */
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  createSubCategory,
  category,
  createBundles,
  updateBundles,
  deleteBundles,
  bundles,
  search,
};
