"use strict";
const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const config = require("../utils/config");

// Set the region
AWS.config.update({
  region: config.AWS.REGION,
});

const s3Init = async (
  params = {
    accessKeyId: config.AWS.IAM_USER_KEY,
    secretAccessKey: config.AWS.IAM_USER_SECRET,
    Bucket: config.AWS.BUCKET_NAME,
  }
) => {
  const s3bucket = new AWS.S3(params);
  return s3bucket;
};

const s3Upload = async (file, dir = "") => {
  try {
    if (![null, undefined, ""].includes(file)) {
      return new Promise(async (resolve, reject) => {
        let s3bucket = await s3Init();
        const params = {
          Bucket: config.AWS.BUCKET_NAME,
          Key: `${dir}${file.name}`,
          Body: file.data,
          ContentDisposition: "inline",
          ContentType: file.mimetype,
        };
        s3bucket.upload(params, (err, data) => {
          if (err) {
            reject(err.message || err);
          } else {
            resolve(data);
          }
        });
      });
    } else {
      throw err;
    }
  } catch (ex) {
    console.err(ex);
    throw ex;
  }
};

const s3Download = async (file, downloadPath) => {
  try {
    if (![null, undefined, ""].includes(file)) {
      let s3bucket = await s3Init();
      const params = {
        Bucket: config.AWS.BUCKET_NAME, //replace example bucket with your s3 bucket name
        Key: `${dir}${file}`, // replace file location with your s3 file location
      };
      let writeStream = fs.createWriteStream(downloadPath);
      return new Promise((resolve, reject) => {
        s3bucket
          .getObject(params)
          .createReadStream()
          .on("end", () => {
            return resolve();
          })
          .on("error", (error) => {
            return reject(error);
          })
          .pipe(writeStream);
      });
    } else {
      throw err;
    }
  } catch (ex) {
    console.err(ex);
    throw ex;
  }
};

const uploadStream = async (file, binary) => {
  if (![null, undefined, ""].includes(file)) {
    return new Promise(async (resolve, reject) => {
      let s3bucket = await s3Init();
      const params = {
        Bucket: config.AWS.BUCKET_NAME,
        Key: `${dir}${file}`,
        Body: binary,
      };
      s3bucket.putObject(params, (err, data) => {
        if (err) {
          reject(err.message || err);
        } else {
          resolve(data);
        }
      });
    });
  } else {
    throw err;
  }
};

const s3Delete = async (fileObjects) => {
  try {
    if (fileObjects && fileObjects.length > 0) {
      return new Promise(async (resolve, reject) => {
        let s3bucket = await s3Init();
        const params = {
          Bucket: config.AWS.BUCKET_NAME,
          Delete: {
            Objects: fileObjects,
          },
        };
        s3bucket.deleteObjects(params, (err, data) => {
          if (err) {
            reject(err.message || err);
          } else {
            resolve(data);
          }
        });
      });
    } else {
      throw err;
    }
  } catch (ex) {
    console.err(ex);
    throw ex;
  }
};

const getCDNSignedUrl = async (file) => {
  try {
    if (![null, undefined, ""].includes(file)) {
      return new Promise(async (resolve, reject) => {
        let publicReadContent = fs.readFileSync(
          `${config.UPLOAD_PATH.KEYS}/bility-publickey.pem`,
          "utf8"
        );
        let privateReadContent = fs.readFileSync(
          `${config.UPLOAD_PATH.KEYS}/bility-privatekey.pem`,
          "utf8"
        );

        const cloudFront = new AWS.CloudFront.Signer(
          publicReadContent,
          privateReadContent
        );
        let params = {
          url: file,
          expires: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1, // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
        };
        cloudFront.getSignedUrl(params, (err, url) => {
          if (err) {
            reject(err.message || err);
          } else {
            resolve(url);
          }
        });
      });
    } else {
      throw err;
    }
  } catch (ex) {
    console.err(ex);
    throw ex;
  }
};

const getCDNSignedCookie = async () => {
  try {
    return new Promise(async (resolve, reject) => {
      let privateReadContent = fs.readFileSync(
        path.join(config.UPLOAD_PATH.KEYS, process.env.CDN_PRIVATE_KEY),
        "utf8"
      );
      const cloudFront = new AWS.CloudFront.Signer(
        process.env.CDN_KEYPAIR_ID,
        privateReadContent
      );
      const policy = JSON.stringify({
        Statement: [
          {
            Resource: process.env.CDN_SIGNING_URL, // http* => http and https
            Condition: {
              DateLessThan: {
                "AWS:EpochTime":
                  Math.floor(new Date().getTime() / 1000) +
                  parseInt(process.env.TOKENEXPIRY) * 86400,
                // 'AWS:EpochTime': Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1, // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
              },
            },
          },
        ],
      });

      let params = {
        policy,
      };
      cloudFront.getSignedCookie(params, (err, data) => {
        if (err) {
          reject(err.message || err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (ex) {
    console.err(ex);
    throw ex;
  }
};

const createCDNInvalidation = async (fileItems) => {
  try {
    if (fileItems.length > 0) {
      return new Promise(async (resolve, reject) => {
        const cloudfront = new AWS.CloudFront({
          accessKeyId: config.AWS.IAM_USER_KEY,
          secretAccessKey: config.AWS.IAM_USER_SECRET,
        });
        let params = {
          DistributionId: process.env.DISTRIBUTION_ID,
          InvalidationBatch: {
            CallerReference: `REF-${new Date().getTime()}`,
            Paths: {
              Quantity: fileItems.length,
              Items: fileItems,
            },
          },
        };
        cloudfront.createInvalidation(params, async (err, data) => {
          if (err) {
            console.log(err, err.stack); // an error occurred
            reject(err);
            return;
          }
          await invalidationCompleted(data.Id);
          console.log(data); // successful response
          resolve(data);
        });
      });
    } else {
      throw err;
    }
  } catch (ex) {
    console.err(ex);
    throw ex;
  }
};

const invalidationCompleted = async (inValidationID) => {
  try {
    if (inValidationID) {
      return new Promise(async (resolve, reject) => {
        const cloudfront = new AWS.CloudFront({
          accessKeyId: config.AWS.IAM_USER_KEY,
          secretAccessKey: config.AWS.IAM_USER_SECRET,
        });
        let params = {
          DistributionId: process.env.DISTRIBUTION_ID,
          Id: inValidationID,
        };
        cloudfront.waitFor("invalidationCompleted", params, (err, data) => {
          if (err) {
            console.log(err, err.stack); // an error occurred
            reject(err);
          }
          console.log(data); // successful response
          resolve(data);
        });
      });
    } else {
      throw err;
    }
  } catch (ex) {
    console.err(ex);
    throw ex;
  }
};

module.exports = {
  s3Upload,
  s3Download,
  uploadStream,
  s3Delete,
  getCDNSignedUrl,
  getCDNSignedCookie,
  createCDNInvalidation,
  invalidationCompleted,
};
