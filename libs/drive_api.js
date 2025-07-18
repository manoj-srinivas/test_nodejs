const fs = require('fs');
const {
  google
} = require('googleapis');
// var async = require('async');
// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const path = require('path');
const credentialPath = path.join(__dirname, '/..', process.env.DRIVE_CREDENTIALS_JSON);
const tokenPath = path.join(__dirname, '/..', process.env.DRIVE_TOKEN_JSON);
const getCredential = async () => {
  // try {
  return JSON.parse(fs.readFileSync(credentialPath));
  // } catch (err) {
  //   throw {
  //     propertyError: "Error loading client secret file",
  //     err: err
  //   }
  // }
}

const authorize = async () => {
  const credential = await getCredential();
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credential.installed;
  let oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(tokenPath)));
  return oAuth2Client;
}
/**
 * This function is to clear db and create db with initial data.
 */
const getFilesList = async (params) => {
  try {
    let auth = await authorize();
    const drive = google.drive({
      version: 'v3',
      auth
    });

    var files = [];
    //var pageToken = `~!!~AI9FV7SSXcUR4ELBLM1cvNDKY1htzKXDgOTDNHSSGmafvveLuUZMB4cqLMZtXeWnvco_MfcWfE-RQXN6A7JUPrflSJ7TtSFOGMge3twbFgkao2jbYYW45kdEeAGpkHjaRfCxXjNPZ0QnMV4hP7Bl-mM64LoqaIK9_O4CPWSi86_Fphbq6ZKvlFNocFkbGYvYFwMATmjSvshdiQnHAIQc88g_w374UdKO_2bfUCJZE-6FhklCLjFCmBfzNY18PKu6jv3DOqRjwX1k_ig1zHamFXa6hJYRyuK7WD1052YMs9S_5gAZwwtjuwebL042adGxdWK1KKzNOHbO1o2bBRkv06C0-6sxlVEFsqC5x8q1EAuphfLROPzaB9cqoj9nsjJJ3Hl1kKsT3rLo`;

    // do {
    let res = await drive.files.list({
      // q: "mimeType='image/jpeg'",
      // q: "fullText contains 'anandaraj@unifioilandgas.com'",
      q: `name contains '${params.search}' or fullText contains '${params.search}'`,
      // q: "'rajeev@unimity.com' in writers",
      // fields: 'nextPageToken, files(*)',
      pageSize: params.limit,
      fields: 'nextPageToken, files(id, name, mimeType,iconLink,webViewLink,thumbnailLink)',
      spaces: 'drive',
      pageToken: params.pageToken
    });
    files = files.concat(res.data.files);
    pageToken = res.data.nextPageToken;
    // } while (!!pageToken)
    return {
      count: files.length,
      files,
      pageToken
    };
  } catch (err) {
    throw err;
  }
}

// Exporting modules
module.exports = {
  getFilesList
}
