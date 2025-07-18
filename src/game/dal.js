const mysql = require('../../libs/mysqlDB');
const config = require('../../utils/config');
const common = require('../../utils/common');


const picupload = async(dataJson) =>{ 
  try{   
    pic = dataJson.files;
    let uploadTempFile = await common.fileUpload(null, dataJson.files, config.UPLOAD_PATH.game);
    return uploadTempFile;
  }catch(err){
    throw(err);
  }
}
const picupload1 = async(dataJson) =>{ 
  try{   
    pic = dataJson.files;
    let uploadTempFile = await common.fileUpload(null, dataJson.files, config.UPLOAD_PATH.image);
    return uploadTempFile;
  }catch(err){
    throw(err);
  }
}
const addGame = async (dataJson) => {
  try {
      let response = {};
     dataJson.createdAt;
    
      let columns = [];
      let columnsValue = [];
      columns.push(`title,description,features,url,category,images,rating,price,currency,createdAt`);
      columnsValue.push(`:title,:description,:features,:url,:category,:images,:rating,:price,:currency,:createdAt`);
      let result = await mysql.insertData(`INSERT INTO games (${columns}) VALUES (${columnsValue})`, dataJson);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `Records added successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const updateGame = async (dataJson) => {
  try {
      let response = {};
     dataJson.createdAt;
     result = await mysql.updateData(`UPDATE games SET title=:title,description=:description,features=:features,url=:url,category=:category,images=:images,rating=:rating,price=:price,currency=:currency,updateAt=:createdAt WHERE id=:id`, dataJson);
     console.log(result);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `Records updated successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const gamelist = async () => {
  try {
      let response = {};
      let result = await mysql.selectData(`SELECT * from games`);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `Records founds successfully`;
    
      const record = result.map((item) => ({
        ...item,
        images: item.images?process.env.PUBLIC_ORIGIN+"/uploads/game/"+item.images:'', 
      }));
      response.records = record;
      // console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const deleteGame = async (dataJson) => {
  try {
      let response = {};
      let result = await mysql.deleteData(`delete  from games where id=${dataJson.id}`);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `Records deleted successfully`;
      response.records = result;
      console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const details = async (dataJson) => {
  try {
      let response = {};
      let result = await mysql.selectData(`select * from games where id=${dataJson.id}`);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `Records deleted successfully`;
      response.records = result;
      console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const category = async () => {
  try {
      let response = {};
      let result = await mysql.selectData(`SELECT * from gamecategory`);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `List of game categories`;
      response.records = result;
      console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const gameSearch = async (dataJson) => {
  try {
      let response = {};
      let category=dataJson.category;
      let result = await mysql.selectData(`SELECT * from games where category like '%${category}%'`);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `Records founds successfully`;
    
      const record = result.map((item) => ({
        ...item,
        images: item.images?process.env.PUBLIC_ORIGIN+"/uploads/game/"+item.images:'', 
      }));
      response.records = record;
      // console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const gamification = async (dataJson) => {
  try {
      let response = {};
      let result = await mysql.selectData(`SELECT nick_name,profile_image from profile where mobilenumber='${dataJson.entityId}'`);
      response.message = `Records found successfully`;
        const record = result.map((item) => ({
        ...item,
        profile_image: item.profile_image?process.env.PUBLIC_ORIGIN+"/uploads/profile/image/"+item.profile_image:'', 
      }));
      response.records = record[0];
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const updateGamification = async (dataJson) => {
  try {
    
      let response = {};
     result = await mysql.updateData(`UPDATE gamification SET name=:name,images=:images WHERE entityId=:entityId`, dataJson);
     console.log(result);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `Records updated successfully`;
      response.records = result[0];
      console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
const gamificationlist = async () => {
  try {
      let response = {};
      let result = await mysql.selectData(`SELECT * from gamification`);
      if (result[0] <= 0) {
        // throw `Data not updated`;
        throw {
          type: 'unprocessableentity',
          errorCode: config.errorCode.unProcessableEntity.recordNotFound
        };
      }
      response.message = `Records founds successfully`;
    
      const record = result.map((item) => ({
        ...item,
        images: item.images?process.env.PUBLIC_ORIGIN+"/uploads/profile/image/"+item.images:'', 
      }));
      response.records = record;
      // console.log(response.records); 
      return response;
    // }
  } catch (err) {
    throw err;
  }
};
/**
 * Exporting the modules
 */
module.exports = { 
  addGame,
  updateGame,
  picupload,
  picupload1,
  gamelist,
  deleteGame,
  details,
  category,
  gameSearch,
  gamification,
  updateGamification,
  gamificationlist
};

