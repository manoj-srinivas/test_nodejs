'use strict';

const Sequelize = require('sequelize');
const execSQL = require('exec-sql');
const config = require('../utils/config');

// Database Credential
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;

let connection = {};
const connectionPool = {};
const Op = Sequelize.Op;
const operatorsAliases = {
  $and: Op.and, // AND
  $or: Op.or, // OR
  $any: Op.any, // ANY ARRAY[2, 3]::INTEGER (PG only)
  $regexp: Op.regexp, // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
  $notRegexp: Op.notRegexp, // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
  $iRegexp: Op.iRegexp, // ~* '^[h|a|t]' (PG only)
  $notIRegexp: Op.notIRegexp, // !~* '^[h|a|t]' (PG only)
  $startsWith: Op.startsWith, // LIKE 'hat%'
  $endsWith: Op.endsWith, // LIKE '%hat'
  $substring: Op.substring, // LIKE '%hat%'
  $not: Op.not, // IS NOT
  $is: Op.is, // IS
  $eq: Op.eq, // =
  $gt: Op.gt, // >
  $gte: Op.gte, // >=
  $lt: Op.lt, // <
  $lte: Op.lte, // <=
  $ne: Op.ne, // !=
  $between: Op.between, // BETWEEN 6 AND 10 - [6, 10]
  $notBetween: Op.notBetween, // NOT BETWEEN 11 AND 15 - [11, 15]
  $in: Op.in, // IN [1, 2]
  $notIn: Op.notIn, // NOT IN [1, 2]
  $like: Op.like, // LIKE '%hat'
  $notLike: Op.notLike, // NOT LIKE '%hat'
  $iLike: Op.iLike, // ILIKE '%hat' (case insensitive)
  $notILike: Op.notILike, // NOT ILIKE '%hat'
  $overlap: Op.overlap, // && [1, 2] (PG array overlap operator)
  $contains: Op.contains, // @> [1, 2] (PG array contains operator)
  $contained: Op.contained, // <@ [1, 2] (PG array contained by operator)
  $all: Op.all,
  $values: Op.values,
  $col: Op.col, // = "user"."organization_id", with dialect specific column identifiers, PG in this example
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft
};

const newConnection = (database, user, password) => {
  return new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: config.sequelizeOptions.dialect,
    logging: config.sequelizeOptions.logging,
    pool: {
      max: config.sequelizeOptions.max + 20,
      min: config.sequelizeOptions.min,
      acquire: config.sequelizeOptions.acquire,
      idle: config.sequelizeOptions.idle,
      evict: config.sequelizeOptions.evict
    },
    charset: config.sequelizeOptions.charset,
    collate: config.sequelizeOptions.collate,
    define: {
      underscored: config.sequelizeOptions.underscored,
      timestamps: config.sequelizeOptions.timestamps,
      freezeTableName: config.sequelizeOptions.freezeTableName
    },
    dialectOptions: {
      // useUTC: true, //for reading from database
      dateStrings: config.sequelizeOptions.dateStrings,
      typeCast: config.sequelizeOptions.typeCast
    },
    timezone: config.sequelizeOptions.timezone, //for writing to database
    operatorsAliases
  });
}
// Database connection
connectionPool[process.env.DOMAINID] = newConnection(database, user, password);

connection = {
  getConnection: async function (domainID) {
    try {
      domainID = domainID.toUpperCase();
      if (connectionPool.hasOwnProperty(domainID)) {
        return connectionPool[domainID];
      } else {
        let result = await this.selectData(`SELECT domainID,domainName,databaseName,databaseUserName,databasePassword FROM domain WHERE domainID = :domainID`, {
          domainID: domainID
        });
        if (result.length > 0) {
          let domain = result[0];
          connectionPool[domainID] = newConnection(domain.databaseName, domain.databaseUserName, domain.databasePassword);
          return connectionPool[domainID];
        } else {
          // throw 'domain Not found : ' + domainID;
          throw {
            type: 'unprocessableentity',
            errorCode: config.errorCode.unProcessableEntity.recordNotFound
          };
        }
      }
    } catch (e) {
      throw e;
    }
  },
  getTransaction: async function (domainID) {
    try {
      domainID = domainID.toUpperCase();
      let DB = await this.getConnection(domainID);
      return DB.transaction();
    } catch (e) {
      throw e;
    }
  },
  // Insert data into the mysql database.
  insertData: async function (sqlQry, dataJson, transaction = null, domainID = process.env.DOMAINID) {
    try {
      let DB = await this.getConnection(domainID);
      let result = await DB.query(sqlQry, {
        raw: true,
        replacements: dataJson,
        type: DB.QueryTypes.CREATE,
        transaction: transaction
      });
      return result;
    } catch (e) {
      throw e;
    }
  },
  // Update data from mysql database.
  updateData: async function (sqlQry, dataJson, transaction = null, domainID = process.env.DOMAINID) {
    try {
      let DB = await this.getConnection(domainID);
      let result = await DB.query(sqlQry, {
        raw: true,
        replacements: dataJson,
        type: DB.QueryTypes.UPDATE,
        transaction: transaction
      });
      return result;
    } catch (e) {
      throw e;
    }
  },
  // Delete data from mysql database.
  deleteData: async function (sqlQry, dataJson, transaction = null, domainID = process.env.DOMAINID) {
    try {
      let DB = await this.getConnection(domainID);
      let result = await DB.query(sqlQry, {
        raw: true,
        replacements: dataJson,
        type: DB.QueryTypes.RAW,
        transaction: transaction
      });
      return [result[0].affectedRows];
    } catch (e) {
      throw e;
    }
  },
  // Select data from mysql database.
  selectData: async function (sqlQry, dataJson, transaction = null, domainID = process.env.DOMAINID) {
    try {
      let DB = await this.getConnection(domainID);
      let result = await DB.query(sqlQry, {
        raw: true,
        replacements: dataJson,
        type: DB.QueryTypes.SELECT,
        transaction: transaction
      });
      return result;
    } catch (e) {
      throw e;
    }
  },
  // Select store procedure data from mysql database.
  selectSPData: async function (sqlQry, dataJson, transaction = null, domainID = process.env.DOMAINID) {
    try {
      let DB = await this.getConnection(domainID);
      let result = await DB.query(sqlQry, {
        raw: true,
        replacements: dataJson,
        transaction: transaction
      });
      return result;
    } catch (e) {
      throw e;
    }
  },
  execSql: async (dbName, filePath) => {
    try {
      return await new Promise(async (resolve, reject) => {
        await execSQL.connect({
          'database': dbName,
          'user': user,
          'password': password
        });
        await execSQL.executeFile(filePath, async (err) => {
          if (err) {
            reject(err);
          }
          await execSQL.disconnect();
          console.log('Done!');
          resolve();
        });
      });

    } catch (e) {
      throw e;
    }
  },
};
// connection.DB = connectionPool[process.env.DOMAINID];
// Exporting modules
module.exports = connection;
