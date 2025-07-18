const redis = require('redis-tag-cache');
const pubsub = require('redis');
// const cache = new redis.default({
//   // defaultTimeout: 360,
//   redis: {
//     maxRetriesPerRequest: 2,
//     // port: process.env.REDIS_PORT,
//     // host: process.env.REDIS_HOST
//   }
// });
/**
 * This function is to add cache
 */
const addCache = async (dataJson) => {
  try {
    // if (dataJson.result.read || dataJson.result.lastTimeline || dataJson.result.completedPercent) {
    //   delete dataJson.result.read;
    //   delete dataJson.result.lastTimeline;
    //   delete dataJson.result.completedPercent;
    // }
    // if (dataJson.result.stats) {
    //   delete dataJson.result.stats;
    // }
    // if (dataJson.result.isMyWorkGroupMember) {
    //   delete dataJson.result.isMyWorkGroupMember;
    // }

    let getUserRedisKey;
    if (dataJson.getType === 'stats') {
      getUserRedisKey = `${dataJson.domainID}/resource/${dataJson.resourceID}/stats`;
    } else if (dataJson.getType === 'settings') {
      getUserRedisKey = `${dataJson.domainID}/settings/${dataJson.moduleID}`;
    } else if (dataJson.getType === 'userchannel') {
      getUserRedisKey = `${dataJson.domainID}/userchannel/${dataJson.userID}`;
    } else if (dataJson.getType === 'whitelist') {
      getUserRedisKey = `${dataJson.domainID}/${dataJson.userID}/${dataJson.getType}`;
    } else if (dataJson.getType === 'blacklist') {
      getUserRedisKey = `${dataJson.domainID}/${dataJson.userID}/${dataJson.getType}`;
    } else if (dataJson.getType === 'groups') {
      getUserRedisKey = `${dataJson.domainID}/${dataJson.userID}/${dataJson.getType}`;
    } else {
      getUserRedisKey = await getCacheKey(dataJson.domainID, dataJson.baseURL, dataJson.languageCode);
    }
    await cache.set(
      getUserRedisKey,
      dataJson.result,
      dataJson.tag
    );
    return "success";
  } catch (err) {
    return "success";
  }
};

/**
 * This function is to get cache
 */
const getCache = async (dataJson) => {
  //  Redis code start
  try {
    let getUserRedisKey;
    if (dataJson.getType === 'stats') {
      getUserRedisKey = `${dataJson.domainID}/resource/${dataJson.resourceID}/stats`;
    } else if (dataJson.getType === 'settings') {
      getUserRedisKey = `${dataJson.domainID}/settings/${dataJson.moduleID}`;
    } else if (dataJson.getType === 'userchannel') {
      getUserRedisKey = `${dataJson.domainID}/userchannel/${dataJson.userID}`;
    } else if (dataJson.getType === 'whitelist') {
      getUserRedisKey = `${dataJson.domainID}/${dataJson.userID}/${dataJson.getType}`;
    } else if (dataJson.getType === 'blacklist') {
      getUserRedisKey = `${dataJson.domainID}/${dataJson.userID}/${dataJson.getType}`;
    } else if (dataJson.getType === 'groups') {
      getUserRedisKey = `${dataJson.domainID}/${dataJson.userID}/${dataJson.getType}`;
    } else {
      getUserRedisKey = await getCacheKey(dataJson.domainID, dataJson.baseURL, dataJson.languageCode, paramsObject = {});
    }
    let cacheData = await cache.get(getUserRedisKey);
    return cacheData;
  } catch (err) {
    return null;
  }
};

/**
 * This function is to delete cache
 */
const delCache = async (data) => {
  //  Redis code start
  try {
    await cache.invalidate(data);
    return 'success';
  } catch (err) {
    return 'success';
  }
};

/**
 * This function is to create cache key
 */
const getCacheKey = async (domainID, url, languageCode = '', paramsObject = {}) => {
  try {
    //  Redis code start
    let getUserRedisKey = paramsObject.length > 0 ? domainID + url + '/' + languageCode + '/' + paramsObject : domainID + url + '/' + languageCode;
    return getUserRedisKey;
  } catch (err) {
    throw err;
  }
};
/**
 * Exporting the modules
 */
module.exports = {
  addCache,
  getCache,
  delCache
};
