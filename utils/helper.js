'use strict';
const mysql = require('../libs/mysqlDB');
const AWS = require('../libs/AWS');
const config = require('./config');
const common = require('./common');
const mailTemplate = require('./mail-template');
const validation = require('./validation');
const redis = require('../libs/redis');

const drawerState = (draw, secure) => {
  let state = null;
  if (draw === '0' && secure === '0') {
    state = 'CS';
  } else if (draw === '0' && secure === '1') {
    state = 'CU';
  } else if (draw === '1' && secure === '1') {
    state = 'OU';
  } else {
    state = 'CS';
  }
  return state;
}

const customFilter = ((filterData) => {

  try {
    if (filterData.hasOwnProperty('customFilter')) {
      if (filterData.customFilter.hasOwnProperty('seperator') && !filterData.hasOwnProperty(filterData.customFilter.seperator)) {
        filterData[filterData.customFilter.seperator] = {};
      }
      for (let dateVal of filterData.customFilter.fields) {
        if (dateVal.type === "date") {
          let converter = true;
          if (dateVal.format.includes('H') || dateVal.format.includes('h')) {
            converter = true;
          }
          // let tempDate = new Date(dateVal.val).toString();
          // if (tempDate === 'Invalid Date') {
          //   dateVal.val = `${dateVal.val}:00`;
          //   tempDate = new Date(dateVal.val);
          //   const timeZoneArr = dateVal.zone.split(':');
          //   // tempDate.setHours( tempDate.getHours() - parseInt(timeZoneArr[0]) );
          //   tempDate.setMinutes( tempDate.getMinutes() + parseInt(timeZoneArr[1]) );
          // }
          // let newTimeStamp = Date.parse(tempDate.toString());
          // console.log(dateVal.val, tempDate, Date.parse(tempDate), newTimeStamp);
          if (filterData.hasOwnProperty(filterData.customFilter.seperator)) {
            filterData[filterData.customFilter.seperator][dateVal.col] = mysql.Sequelize.literal(`DATE_FORMAT( ${(converter) ? 'CONVERT_TZ(' : ''} FROM_UNIXTIME( SUBSTRING(${dateVal.col}, 1, 10), '%Y-%m-%d %H:%i:%s' ) ${(converter) ? `, '+00:00', '${dateVal.zone}')` : ''} , '${dateVal.format}') ${config.conditions[dateVal.condition]} ${(Array.isArray(dateVal.val)) ? `DATE_FORMAT( ${(converter) ? 'CONVERT_TZ(' : ''} FROM_UNIXTIME( SUBSTRING('${dateVal.val[0]}', 1, 10), '%Y-%m-%d %H:%i:%s' ) ${(converter) ? `, '+00:00', '${dateVal.zone}')` : ''},'${dateVal.format}') AND DATE_FORMAT(${(converter) ? 'CONVERT_TZ(' : ''} FROM_UNIXTIME( SUBSTRING('${dateVal.val[1]}', 1, 10), '%Y-%m-%d %H:%i:%s' ) ${(converter) ? `, '+00:00', '${dateVal.zone}')` : ''}, '${dateVal.format}')` : `DATE_FORMAT( ${(converter) ? 'CONVERT_TZ(' : ''} FROM_UNIXTIME( SUBSTRING('${dateVal.val}', 1, 10), '%Y-%m-%d %H:%i:%s' ) ${(converter) ? `, '+00:00', '${dateVal.zone}')` : ''}, '${dateVal.format}')`} `);
          } else {
            filterData[dateVal.col] = mysql.Sequelize.literal(`DATE_FORMAT( ${(converter) ? 'CONVERT_TZ(' : ''} FROM_UNIXTIME( SUBSTRING(${dateVal.col}, 1, 10), '%Y-%m-%d %H:%i:%s' ) ${(converter) ? `, '+00:00', '${dateVal.zone}')` : ''} , '${dateVal.format}') ${config.conditions[dateVal.condition]} ${(Array.isArray(dateVal.val)) ? `DATE_FORMAT( ${(converter) ? 'CONVERT_TZ(' : ''} FROM_UNIXTIME( SUBSTRING('${dateVal.val[0]}', 1, 10), '%Y-%m-%d %H:%i:%s' ) ${(converter) ? `, '+00:00', '${dateVal.zone}')` : ''},'${dateVal.format}') AND DATE_FORMAT(${(converter) ? 'CONVERT_TZ(' : ''} FROM_UNIXTIME( SUBSTRING('${dateVal.val[1]}', 1, 10), '%Y-%m-%d %H:%i:%s' ) ${(converter) ? `, '+00:00', '${dateVal.zone}')` : ''}, '${dateVal.format}')` : `DATE_FORMAT( ${(converter) ? 'CONVERT_TZ(' : ''} FROM_UNIXTIME( SUBSTRING('${dateVal.val}', 1, 10), '%Y-%m-%d %H:%i:%s' ) ${(converter) ? `, '+00:00', '${dateVal.zone}')` : ''}, '${dateVal.format}')`} `);
          }
        }
      }
      delete filterData.customFilter;
      return filterData;
    } else {
      return filterData;
    }
  } catch (err) {
    throw (err);
  }

});

// const rawFilter = ((filterData, prefix = null, operation = null) => {
//   let whereCondition = '';
//   let whereJson = {};
//   Object.keys(filterData).map((key, index) => {
//     let crtData = filterData[key];

//     if ([null, ''].includes(prefix) && ((typeof crtData === 'object' && Object.keys(crtData).length) || (typeof crtData === 'string' || typeof crtData === 'number' || Array.isArray(crtData)))) {
//       whereCondition += ` AND`;
//     }

//     if (typeof crtData === 'object' && Object.keys(crtData).length && !Array.isArray(crtData)) {
//       if (key === '$and') {
//         whereCondition += ' (';
//         let rawFilterData = rawFilter(crtData, 'AND');
//         whereCondition += ` ${rawFilterData.whereCondition}`;
//         whereCondition += ' )';
//         whereJson = common.JSONMerge(whereJson, rawFilterData.whereJson);
//       } else if (key === '$or') {
//         whereCondition += ' (';
//         let rawFilterData = rawFilter(crtData, 'OR');
//         whereCondition += ` ${rawFilterData.whereCondition}`;
//         whereCondition += ' )';
//         whereJson = common.JSONMerge(whereJson, rawFilterData.whereJson);
//       } else {
//         let rawFilterData = rawFilter(crtData, key, prefix);
//         whereCondition += ` ${rawFilterData.whereCondition}`;
//         whereJson = common.JSONMerge(whereJson, rawFilterData.whereJson);
//       }
//     } else if (typeof crtData === 'object' && Array.isArray(crtData)) {
//       if (key === '$between') {
//         let prefixString = ``;
//         if (operation) {
//           prefixString += operation + '_';
//         }
//         if (prefix) {
//           prefixString += prefix + '_';
//         }
//         let betweenStart = common.strreplace(`${(prefixString) ? prefixString + 'BetweenStart' : 'betweenStart'}`, '[.$]', '');
//         let betweenEnd = common.strreplace(`${(prefixString) ? prefixString + 'BetweenEnd' : 'betweenEnd'}`, '[.$]', '');
//         whereCondition += ` ${prefix} BETWEEN :${betweenStart} AND :${betweenEnd}`;
//         whereJson = common.JSONMerge(whereJson, {
//           [betweenStart]: crtData[0],
//           [betweenEnd]: crtData[1]
//         });
//       } else if (key === '$not') {
//         let prefixString = ``;
//         if (key) {
//           prefixString += operation + '_';
//         }
//         if (prefix) {
//           prefixString += prefix + '_';
//         }
//         let prefixKey = common.strreplace(`${(prefixString) ? prefixString + 'In' : 'in'}`, '[.$]', '');
//         whereCondition += ` ${prefix} NOT IN (:${prefixKey})`;
//         whereJson = common.JSONMerge(whereJson, {
//           [prefixKey]: crtData
//         });
//       } else {
//         let prefixString = ``;
//         if (key) {
//           prefixString += key + '_';
//         }
//         if (prefix) {
//           prefixString += prefix + '_';
//         }
//         let prefixKey = common.strreplace(`${(prefixString) ? prefixString + 'In' : 'in'}`, '[.$]', '');
//         whereCondition += ` ${key} IN (:${prefixKey})`;
//         whereJson = common.JSONMerge(whereJson, {
//           [prefixKey]: crtData
//         });
//       }
//     } else if ((typeof crtData === 'object' && Object.keys(crtData).length) || (typeof crtData === 'string' || typeof crtData === 'number' || typeof crtData === 'boolean' || Array.isArray(crtData))) {

//       let prefixString = ``;
//       if (operation) {
//         prefixString += operation + '_';
//       }
//       if (prefix) {
//         prefixString += prefix + '_';
//       }

//       let jsonKey = common.strreplace(`${prefixString}${key}`, '[.$]', '');
//       whereJson[jsonKey] = crtData;
//       if (key === '$not') {
//         whereCondition += ` ${prefix} != :${jsonKey}`;
//       } else if (key === '$substring') {
//         whereJson[jsonKey] = `%${crtData}%`;
//         whereCondition += ` ${prefix} LIKE :${jsonKey}`;
//       } else if (key === 'val') {
//         whereCondition += ` ${crtData}`;
//       } else {
//         whereCondition += ` ${key} = :${jsonKey}`;
//       }
//     }

//     if (prefix && typeof filterData === 'object' && Object.keys(filterData).length && index < (Object.keys(filterData).length - 1)) {
//       whereCondition += ` ${prefix}`;
//     }

//   });
//   if (Object.keys(whereJson).length === 0) {
//     whereCondition = "";
//   }
//   return {
//     whereCondition,
//     whereJson
//   }
// });

const locationParentChildIDs = ((locationData) => {
  let locationIDs = [];
  if (locationData.length) {
    for (let locationID of locationData) {
      if (locationID.hasOwnProperty('ID') && !locationIDs.includes(locationID.ID)) {
        locationIDs.push(locationID.ID)
      }
      if (locationID.hasOwnProperty('children') && locationID.children.length) {
        locationIDs = locationIDs.concat(locationParentChildIDs(locationID.children));
      }
    }
  }
  return locationIDs;
});

const locationParentChildTitles = ((locationData) => {
  let locationTitles = [];
  if (locationData.length) {
    for (let locationTitle of locationData) {
      if (locationTitle.hasOwnProperty('title') && !locationTitles.includes(locationTitle.title)) {
        locationTitles.push(locationTitle.title)
      }
      if (locationTitle.hasOwnProperty('children') && locationTitle.children.length) {
        locationTitles = locationTitles.concat(locationParentChildTitles(locationTitle.children));
      }
    }
  }
  return locationTitles;
});

const getPortalDNS = ((headerData) => {
  try {
    let baseURL = headerData.host;
    if (headerData.hasOwnProperty('origin')) {
      let hostSplit = headerData.origin.split('//');
      baseURL = hostSplit[1];
    }
    return baseURL;
  } catch (err) {
    throw (err);
  }
});

const getEventDescription = async (headerData, ID) => {

  try {
    const eventDAL = require('../src/event/dal');
    let params = {};
    params.filterData = {
      ID: ID
    };

    params.extraProperties = {
      baseURL: headerData.portaldns
    };
    params.attributes = ['description'];

    let eventData = await eventDAL.detail(params);
    return eventData;
  } catch (err) {
    throw (err);
  }

};

const defaultLogInfo = async (request, moduleName = '', method = '', actionType = null, description = null) => {
  let returnData = {};
  returnData = {
    // accessedOn: moment(timeStamp()).format("DD-MM-YYYY HH:mm:ss"),
    moduleName: moduleName,
    method: method,
    actionType: actionType,
    description: description,
    browser: common.getClientBrowser(request.headers['user-agent']),
    ipAddress: common.getClientIP(request),
    createdAt: common.timeStamp()
  };

  if (request.tokenData && request.tokenData.hasOwnProperty('accountID')) {
    returnData.accountID = request.tokenData.accountID;
  }
  return returnData;
};

const eventMasterReplacement = ((ID, string, dataVal) => {

  try {
    let results = [];
    let regexPattern = /{([^}]+)}/g;
    let matches;
    ID = ID - 1;
    while (matches = regexPattern.exec(string)) {
      results.push(matches[1]);
    }
    config.eventMasterReplacementData[ID].map((resp) => {
      if (results.includes(resp)) {
        string = string.replace(new RegExp('{' + resp + '}', 'gi'), dataVal[resp]);
      }
    });
    results.map((notMatchResp) => {
      if (!(results.includes(config.eventMasterReplacementData[ID]))) {
        string = string.replace(new RegExp('{' + notMatchResp + '}', 'gi'), '(-)');
      }
    });

    return string;
  } catch (err) {
    throw (err);
  }
});

const accessControl = async (moduleName, session, access, baseURL) => {
  let dbSearch = {
    portalDNSName: baseURL
  };
  const currentConnection = await mysql.dynamicDB(dbSearch);
  try {
    if (session) {
      let role = session.role;
      let accountType = session.accountType;

      let roleType = JSON.parse(JSON.stringify(await currentConnection.roleType.findOne({
        where: {
          key: accountType
        },
        attributes: ['permission']
      })));
      if (typeof moduleName !== 'string' || ['', undefined, null].includes(moduleName)) {
        throw new Error(`Invalid module name.`);
      }

      if (typeof role !== 'string' || ['', undefined, null].includes(role) || !roleType.permission) {
        throw new Error(`Invalid role.`);
      }

      if (typeof access !== 'string' || ['', undefined, null].includes(access)) {
        throw new Error(`Invalid access code.`);
      }

      // if ((role === 'USER' || role === 'ADMIN') && roletype.permission) {
      // if (cfg.permissions[role][accountType]) {
      if (roleType.permission[moduleName]) {
        if (roleType.permission[moduleName][access]) {
          return;
        }
        throw `${access} permission from ${moduleName} module is not accessible to you.`;
      }
    }

    return;

  } catch (err) {
    throw (err);
  } finally {
    if (process.env.MYSQL_DATABASE !== currentConnection.DB.config.database) {
      currentConnection.DB.close();
    }
  }
};

/**
 * This function is to add file path for resource columns
 * @param {Integer} userID user ID.
 */
const addFilePath = async (records, domainID, type = null) => {
  try {
    let baseCDNDomainURL = `${process.env.CDN_URL}${process.env.FOLDER_PATH}/${(domainID).toLowerCase().replace(/\W/g, "")}`;
    for (let dataResp of records) {
      if (dataResp.resource && dataResp.resource.hasOwnProperty('file') && dataResp.resourceFormat && dataResp.resourceFormat !== config.resourceFormat.link) {
        Object.keys(config.resourceFormat).map(formatResp => {
          if (config.resourceFormat[formatResp] === dataResp.resourceFormat) {
            // dataResp.resource.file = `${process.env.NODE_ORIGIN}/uploads/${formatResp}/${dataResp.resource.file}`;
            dataResp.resource.file = `${baseCDNDomainURL}${config.AWSUploadFolder[dataResp.resourceFormat]}${dataResp.resource.file}`;
          }
        });
      }
      if (dataResp.resource && dataResp.resource.hasOwnProperty('image') && dataResp.resourceFormat && dataResp.resourceFormat === config.resourceFormat.image) {
        for (let resourceDta of dataResp.resource.image) {
          Object.keys(config.resourceFormat).map(formatResp => {
            if (config.resourceFormat[formatResp] === dataResp.resourceFormat) {
              resourceDta.file = `${baseCDNDomainURL}${config.AWSUploadFolder[dataResp.resourceFormat]}${resourceDta.file}`;
              // resourceDta.file = `${process.env.NODE_ORIGIN}/uploads/${formatResp}/${resourceDta.file}`;
            }
          });
        }
      }
      if (dataResp.resource && dataResp.resourceFormat !== config.resourceFormat.link && dataResp.resource.hasOwnProperty('thumbnail')) {
        // dataResp.resource.thumbnail = `${process.env.NODE_ORIGIN}/uploads/thumbnail/${dataResp.resource.thumbnail}`;
        dataResp.resource.thumbnail = `${baseCDNDomainURL}${config.AWSUploadFolder.thumbnail}${dataResp.resource.thumbnail}`;
      }
      //<--For Evidence file-->//
      if (dataResp.evidence) {
        let getFormat = /[^.]+$/.exec(dataResp.evidence);
        if (getFormat[0] === 'pdf') {
          dataResp.evidence = `${baseCDNDomainURL}${config.AWSUploadFolder[1]}${dataResp.evidence}`;
        } else {
          dataResp.evidence = `${baseCDNDomainURL}${config.AWSUploadFolder.thumbnail}${dataResp.evidence}`;
        }
      }
      if (dataResp.thumbnail) {
        dataResp.thumbnail = `${baseCDNDomainURL}${config.AWSUploadFolder.thumbnail}${dataResp.thumbnail}`;
      }
      //<--For Elastic resource authors-->//
      if (type === 'elastic') {
        if (dataResp.authors && dataResp.authors.length > 0) {
          for (let author of dataResp.authors) {
            // author.profilePicURL = `${process.env.NODE_ORIGIN}/uploads/${author.profilePicURL}`;
            author.profilePicURL = `${baseCDNDomainURL}${author.profilePicURL}`;
          }
        }
        if (dataResp.profilePicURL) {
          // dataResp.profilePicURL = `${process.env.NODE_ORIGIN}/uploads/${dataResp.profilePicURL}`;
          dataResp.profilePicURL = `${baseCDNDomainURL}${dataResp.profilePicURL}`;
        }
      }

      if (dataResp.resourceTypeID === config.resourceType.polls && dataResp.infoFields && dataResp.infoFields.hasOwnProperty('options') && Object.keys(dataResp.infoFields.options).length > 0) {
        Object.keys(dataResp.infoFields.options).map((respKey) => {
          if (dataResp.infoFields.options[respKey].file) {
            dataResp.infoFields.options[respKey].file = `${baseCDNDomainURL}${config.AWSUploadFolder[config.resourceFormat.image]}${dataResp.infoFields.options[respKey].file}`;
          }
        });
      }
    }
    return records;
  } catch (err) {
    throw err;
  }
}

const patternReplacement = ((string, dataVal) => {

  try {
    let results = [];
    let regexPattern = /{([^}]+)}/g;
    let matches;
    // ID = ID - 1;
    while (matches = regexPattern.exec(string)) {
      results.push(matches[1]);
    }
    results.map((resp) => {
      // if (results.includes(resp)) {
      string = string.replace(new RegExp('{' + resp + '}', 'gi'), dataVal[resp]);
      string = string.replace(new RegExp('<[^>]*>', 'g'), '')
      // }
    });

    results.map((notMatchResp) => {
      // if (!(results.includes(config.eventMasterReplacementData[ID]))) {
      string = string.replace(new RegExp('{' + notMatchResp + '}', 'gi'), '(-)');
      // }
    });

    return string;
  } catch (err) {
    throw (err);
  }
});


/**
 * This function is to check the authorization
 */
const getFunctionIDs = async (dataJson) => {
  try {
    dataJson.functionIDs = [];
    dataJson.isDeleted = config.Boolean.false;
    //<--If permissionGroupID or userID not exists return empty array-->//
    if (!dataJson.permissionGroupID && !dataJson.userID) {
      return dataJson.functionIDs;
    }
    //<--Get superAdmin ID by using system getSettings function-->//
    let superAdminSettingsData = await getSettings({
      moduleID: 'SUPERADMIN',
      domainID: dataJson.domainID
    });
    //<--Check If the currentUserID is superAdmin.If superAdmin, get module functionID based on subscription & that module functionIDs push to functionIDs array-->//
    if (superAdminSettingsData && superAdminSettingsData.ID && superAdminSettingsData.ID.includes(dataJson.userID)) {
      let getModFunctionIDs = await getModuleFunctionIDs(dataJson);
      dataJson.functionIDs = dataJson.functionIDs.concat(getModFunctionIDs);
      dataJson.superAdmin = true;
    }
    let result;
    dataJson.defaultPermission = 'Default permission';
    let condition = [`term = :defaultPermission`];
    if (!dataJson.superAdmin) {
      //<--Get permissionGroupID for that user when permissionGroupID not exists fro input parameter-->//
      if (dataJson.userID && !dataJson.permissionGroupID) {
        let getRole = await mysql.selectData(`SELECT permissionGroupID from userprofile JOIN useraccount ON userprofile.userID = useraccount.userID where userprofile.userID = :userID AND useraccount.isDeleted= :isDeleted`, dataJson, dataJson.txn, dataJson.domainID);
        dataJson.permissionGroupID = getRole[0].permissionGroupID;
      }
      //<--Get permissionID by using permissionGroupID-->//
      if (dataJson.permissionGroupID) {
        result = await mysql.selectData(`SELECT attributes->'$.permission' as permissionID FROM term WHERE termID=:permissionGroupID`, dataJson, dataJson.txn, dataJson.domainID);
        dataJson.permissionID = result[0].permissionID;
      }
      if (result.length > 0 && result[0].permissionID && result[0].permissionID.length > 0) {
        condition.push(`termID IN (:permissionID)`);
        dataJson.permissionID = result[0].permissionID;
      }
    }
    //<--To get user functionIDs-->//
    result = await mysql.selectData(`SELECT attributes->'$.functionID' as functionID FROM term WHERE ${condition.join(' OR ')}`, dataJson, dataJson.txn, dataJson.domainID);
    if (result.length > 0) {
      for (let functionIDs of result) {
        if (functionIDs.functionID) {
          for (let ID of functionIDs.functionID) {
            if (!dataJson.functionIDs.includes(ID)) {
              dataJson.functionIDs.push(ID);
            }
          }
        }
      }
    }
    dataJson.subscriptionFunctionIDs = [];
    if (dataJson.functionIDs.length > 0) {
      //<--To get domain subscription-->//
      let getSubscription = await mysql.selectData(`SELECT subscription FROM domain WHERE domainID=:domainID`, dataJson, dataJson.txn, dataJson.domainID);
      dataJson.domainSubscription = getSubscription[0].subscription;
      //<--To get domain subscription modules-->//
      let getSubModules = await mysql.selectData(`SELECT JSON_ARRAYAGG(moduleID) as moduleID FROM packagemodules WHERE subscription=:domainSubscription`, dataJson, dataJson.txn, dataJson.domainID);
      if (!getSubModules[0].moduleID) {
        return dataJson.subscriptionFunctionIDs;
      }
      dataJson.domainSubModuleIDs = getSubModules[0].moduleID;
      //<--To get domain subscription modules functionIDs-->//
      let getSubModulesFunctionIDs = await mysql.selectData(`SELECT functionID FROM modules M WHERE moduleID IN (:domainSubModuleIDs)`, dataJson, dataJson.txn, dataJson.domainID);
      if (getSubModulesFunctionIDs.length === 0) {
        return dataJson.subscriptionFunctionIDs;
      }
      getSubModulesFunctionIDs.map((respFunctionIDsArray) => {
        if (respFunctionIDsArray.functionID.length > 0) {
          respFunctionIDsArray.functionID.map((respFunctionIDs) => {
            if (dataJson.functionIDs.includes(respFunctionIDs) && !dataJson.subscriptionFunctionIDs.includes(respFunctionIDs)) {
              dataJson.subscriptionFunctionIDs.push(respFunctionIDs);
            }
          });
        }
      });
    }
    return dataJson.subscriptionFunctionIDs;
  } catch (err) {
    throw err;
  }
};

/**
 * This function is to get module functionIDs
 */
const getModuleFunctionIDs = async (dataJson) => {
  try {
    dataJson.subscriptionFunctionIDs = [];
    //<--To get domain subscription-->//
    let getSubscription = await mysql.selectData(`SELECT subscription FROM domain WHERE domainID=:domainID`, dataJson, dataJson.txn, dataJson.domainID);
    dataJson.domainSubscription = getSubscription[0].subscription;
    //<--To get domain subscription modules-->//
    let getSubModules = await mysql.selectData(`SELECT JSON_ARRAYAGG(moduleID) as moduleID FROM packagemodules WHERE subscription=:domainSubscription`, dataJson, dataJson.txn, dataJson.domainID);
    if (!getSubModules[0].moduleID) {
      return dataJson.subscriptionFunctionIDs;
    }
    dataJson.domainSubModuleIDs = getSubModules[0].moduleID;
    //<--To get domain subscription modules functionIDs-->//
    let getSubModulesFunctionIDs = await mysql.selectData(`SELECT functionID FROM modules M WHERE moduleID IN (:domainSubModuleIDs)`, dataJson, dataJson.txn, dataJson.domainID);
    if (getSubModulesFunctionIDs.length === 0) {
      return dataJson.subscriptionFunctionIDs;
    }
    getSubModulesFunctionIDs.map((respFunctionIDsArray) => {
      if (respFunctionIDsArray.functionID.length > 0) {
        respFunctionIDsArray.functionID.map((respFunctionIDs) => {
          if (!dataJson.subscriptionFunctionIDs.includes(respFunctionIDs)) {
            dataJson.subscriptionFunctionIDs.push(respFunctionIDs);
          }
        });
      }
    });
    return dataJson.subscriptionFunctionIDs;
  } catch (err) {
    throw err;
  }
};

const addPastReporting = async (dataJson) => {
  try {
    let validate = [{
        fld: 'reporteeUserID',
        value: dataJson.reporteeUserID,
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.one,
        maxValue: config.maximumValue.integer
      },
      {
        fld: 'reportedToUserID',
        value: dataJson.reportedToUserID,
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.one,
        maxValue: config.maximumValue.integer
      },
      {
        fld: 'workgroupID',
        value: dataJson.workgroupID,
        isRequired: false,
        type: config.validationType.Integer,
        maxValue: config.maximumValue.integer
      }
    ];
    const processValidation = await validation.processValidation(validate);
    if (processValidation.hasOwnProperty('error') && processValidation.error.length) {
      throw {
        propertyError: processValidation.error
      };
    } else {
      let columns = [`reporteeUserID, reportedToUserID, createdAt`];
      let columnsVal = [`:reporteeUserID, :reportedToUserID, :createdAt`];
      if (dataJson.workgroupID) {
        columns.push(`workgroupID`);
        columnsVal.push(`:workgroupID`);
      }
      dataJson.createdAt = common.timeStamp();
      return await mysql.insertData(`INSERT INTO pastreporting (${columns.join(', ')}) VALUES (${columnsVal.join(', ')})`, dataJson, dataJson.txn, dataJson.domainID);
    }
  } catch (err) {
    throw err;
  }
};

const getCompetenciesForSkills = async (dataJson) => {
  try {
    let validate = [{
      fld: 'skillID',
      value: dataJson.skillID,
      isRequired: true,
      type: config.validationType.ArrayOfInteger
    }];
    const processValidation = await validation.processValidation(validate);
    if (processValidation.hasOwnProperty('error') && processValidation.error.length) {
      throw {
        propertyError: processValidation.error
      };
    } else {
      dataJson.skillIDString = JSON.stringify(dataJson.skillID);
      let result = await mysql.selectData(`SELECT DISTINCT(competencyID) FROM competency COMP INNER JOIN JSON_TABLE( :skillIDString , "$[*]" COLUMNS( skillID JSON PATH "$" NULL ON ERROR NULL ON EMPTY )) AS skillList ON skillList.skillID = COMP.skillID;`, dataJson, dataJson.txn, dataJson.domainID);
      dataJson.competencies = [];
      if (result.length > 0) {
        for (let respCompetencies of result) {
          dataJson.competencies.push(respCompetencies.competencyID);
        }
      }
      return dataJson.competencies;
    }
  } catch (err) {
    throw err;
  }
};


const getStats = async (dataJson) => {
  try {
    let validate = [{
      fld: 'resourceID',
      value: dataJson.resourceID,
      isRequired: true,
      type: config.validationType.Integer,
      minValue: config.minimumValue.one,
      maxValue: config.maximumValue.integer
    }];

    const processValidation = await validation.processValidation(validate);
    if (processValidation.hasOwnProperty('error') && processValidation.error.length) {
      throw {
        propertyError: processValidation.error
      };
    } else {
      let response = {};
      const cacheResults = await redis.getCache({
        getType: 'stats',
        resourceID: dataJson.resourceID,
        domainID: dataJson.domainID,
        languageCode: null //dataJson.lanCode
      });
      if (!cacheResults) {
        //<--For getting resource forward count-->//
        response = await statsDBCalculation(dataJson);
        await redis.addCache({
          getType: 'stats',
          result: response,
          resourceID: dataJson.resourceID,
          tag: [],
          domainID: dataJson.domainID,
          languageCode: null //dataJson.lanCode
        });
      } else {
        response = cacheResults;
      }
      return response;
    }
  } catch (err) {
    throw err;
  }
}

const statsDBCalculation = async (dataJson) => {
  try {
    let result = await mysql.selectData(`SELECT resourcestats FROM resourcestats WHERE resourcestats->'$.resourceID'=:resourceID`, dataJson, dataJson.txn, dataJson.domainID);
    return result[0].resourcestats;
  } catch (err) {
    throw err;
  }
};


const updateCacheStats = async (dataJson) => {
  try {
    let getstatsData = await getStats(dataJson);
    let statsData = getstatsData;
    if (dataJson.type === 'readCount') {
      statsData.readCount = statsData.readCount + 1;
    } else if (dataJson.type === 'rating') {
      let avgRating = (statsData.avgRating * statsData.ratingCount) + dataJson.rating;
      if (dataJson.ratingIncrementCount === 0) {
        avgRating = avgRating - dataJson.oldRating.rating;
      } else {
        statsData.ratingCount = statsData.ratingCount + dataJson.ratingIncrementCount;
      }
      // result = await mysql.selectData(`select sum(json_extract(rating ,'$.rating'))/count(json_extract(rating ,'$.rating')) as avgRating from rating where json_contains(rating,':resourceID','$.resourceID')`, dataJson, dataJson.txn, dataJson.domainID);
      statsData.avgRating = avgRating / statsData.ratingCount;
    } else if (dataJson.type === 'assignmentCount') {
      statsData.assignmentCount = statsData.assignmentCount + dataJson.assignmentCount;
    } else if (dataJson.type === 'forwardingCount') {
      statsData.forwardingCount = statsData.forwardingCount + dataJson.increaseCount;
    } else if (dataJson.type === 'conversationCount') {
      if (dataJson.status === 'remove') {
        statsData.conversationCount = ((statsData.conversationCount - 1) < 0 ? 0 : statsData.conversationCount - 1);
      } else {
        statsData.conversationCount = statsData.conversationCount + 1;
      }
    } else if (dataJson.type === 'likesCount') {
      statsData.likesCount = statsData.likesCount + 1;
    }
    dataJson.statsData = JSON.stringify(statsData);
    await mysql.updateData(`update resourcestats SET resourcestats = :statsData where resourcestats->'$.resourceID'=:resourceID`, dataJson, dataJson.txn, dataJson.domainID);
    let cacheData = {
      resourceID: dataJson.resourceID,
      domainID: dataJson.domainID,
      getType: 'stats'
    };
    cacheData.result = statsData;
    cacheData.tag = [];
    await redis.addCache(cacheData);
    return "success";
  } catch (err) {
    throw err;
  }
};


const sendMailNotification = async (dataJson) => {
  try {
    if (dataJson.userID && !Array.isArray(dataJson.userID)) {
      dataJson.userID = [dataJson.userID];
    }
    if (!dataJson.userID || (dataJson.userID && dataJson.userID.length === 0)) {
      return;
    }
    let getUserEmailID = await mysql.selectData(`SELECT JSON_ARRAYAGG(emailID) as emailID FROM useraccount WHERE userID IN (:userID)`, dataJson, dataJson.txn, dataJson.domainID);
    if (getUserEmailID.length > 0 && getUserEmailID[0].emailID && getUserEmailID[0].emailID.length > 0) {
      let mailOptions = {
        from: `"bility" ${config.Mail.From}`,
        cc: config.Mail.CC,
        subject: `General Notification`
      };

      if (dataJson.type === 'BCC') {
        mailOptions.bcc = getUserEmailID[0].emailID;
        let resDataBCC = {
          templateID: dataJson.templateID,
          mailOptions: mailOptions
        };
        resDataBCC = Object.assign(resDataBCC, dataJson.replaceValue);
        return await mailTemplate.bulkMailSend([resDataBCC]);
      }

      mailOptions.to = getUserEmailID[0].emailID;
      return await mailTemplate.sendMail(dataJson.templateID, dataJson.replaceValue, mailOptions);
    }
  } catch (err) {
    throw err;
  }
};

const AWSFileUpload = async (file, resourceFormat = null, domainID, type = null) => {
  try {
    let fileNameArr = file.name.split('.');
    let fileName = `${common.getUUID()}.${fileNameArr[fileNameArr.length - 1]}`;
    // if (oldFileName) {
    //   fileName = oldFileName;
    // }
    file.name = fileName;
    let folderPath;
    if (resourceFormat) {
      folderPath = `${process.env.FOLDER_PATH}/${(domainID).toLowerCase().replace(/\W/g, "")}${config.AWSUploadFolder[resourceFormat]}`;
    } else if (type === 'uploads') {
      folderPath = `${process.env.FOLDER_PATH}/${(domainID).toLowerCase().replace(/\W/g, "")}/`;
    } else {
      folderPath = `${process.env.FOLDER_PATH}/${(domainID).toLowerCase().replace(/\W/g, "")}${config.AWSUploadFolder.thumbnail}`;
    }
    await AWS.s3Upload(file, folderPath);
    return fileName;
  } catch (err) {
    throw err;
  }
};


/**
 * This function is to get settings
 * @param {Object} dataJson values.
 */
const getSettings = async (dataJson) => {
  try {
    let validate = [{
      fld: 'moduleID',
      value: dataJson.moduleID,
      isRequired: true,
      type: config.validationType.String,
      maxLength: config.variableLength.varChar100
    }];

    const processValidation = await validation.processValidation(validate);
    if (processValidation.hasOwnProperty('error') && processValidation.error.length) {
      throw {
        propertyError: processValidation.error
      };
    } else {
      let response = {};
      let cacheData = {
        moduleID: dataJson.moduleID,
        domainID: dataJson.domainID,
        getType: 'settings'
      };
      const cacheResults = await redis.getCache(cacheData);
      if (cacheResults) {
        response = cacheResults;
      } else {
        let result = await mysql.selectData(`SELECT settings FROM settings WHERE moduleID=:moduleID`, dataJson, dataJson.txn, dataJson.domainID);
        if (result.length === 0) {
          response.noContent = true;
          return response;
        }
        cacheData.result = result[0].settings;
        cacheData.tag = [];
        await redis.addCache(cacheData);
        response = cacheData.result;
      }
      return response;
    }
  } catch (err) {
    throw err;
  }
};

const jsonExtract = (column, keys = [], prefix = null, options = {}) => {
  let selectString = ``;
  keys.forEach(key => {
    if (selectString != '') selectString += `, `;
    if (options) {
      if (options.hasOwnProperty('unquote') && options.unquote.includes(key)) {
        selectString += `JSON_UNQUOTE(`;
      }
    }
    selectString += `${prefix ? prefix + '.' : ''}${column}->"$.${key}"`;
    if (options) {
      if (options.hasOwnProperty('unquote') && options.unquote.includes(key)) {
        selectString += `)`;
      }
      if (options.alias) {
        let currentField = options.alias.find(item => item.field === key);
        if (currentField) {
          key = currentField.as;
        }
      }
    }
    selectString += ` AS '${key}'`;
  });
  return selectString;
}

/**
 * Exporting the modules
 */
module.exports = {
  drawerState,
  customFilter,
  // rawFilter,
  locationParentChildIDs,
  locationParentChildTitles,
  getPortalDNS,
  getEventDescription,
  defaultLogInfo,
  eventMasterReplacement,
  accessControl,
  addFilePath,
  patternReplacement,
  getFunctionIDs,
  addPastReporting,
  getCompetenciesForSkills,
  getStats,
  statsDBCalculation,
  updateCacheStats,
  getModuleFunctionIDs,
  sendMailNotification,
  AWSFileUpload,
  getSettings,
  jsonExtract
}
