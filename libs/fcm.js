// var admin = require("firebase-admin");
// // Fetch the service account key JSON file contents
// var serviceAccount = require("../key/admin-sdk-key.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // The database URL depends on the location of the database
// });


// const getTopic = async (dataJson) => {
//   try {
//     let topic=`/topics/${dataJson.followeeID}`;
//     return topic;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// const subscribeTopicNotification = async (dataJson) => {
//   try {
//     var topic;
//     topic = await getTopic(dataJson);
//     let logPayload = {
//       "topic": topic,
//       "deviceToken": dataJson.deviceToken
//     };

//     return new Promise(async (resolve, reject) => {
//       admin.messaging().subscribeToTopic(dataJson.deviceToken, topic)
//         .then(async function (response) {
//           console.log("Subscribed to topic:", response);
//           resolve('success');
//         })
//         .catch(function (error) {
//           console.log("Error subscribing to topic:", error);
//           resolve('error');
//         });
//     });
//   } catch (err) {
//     throw err;
//   }

// };

// const sendTopicNotification = async (dataJson) => {
//   try {
//     var payload = {
//       notification: {
//         title: "Notification",
//         body: `This is just testing message.`,
//       }
//     };
//     topic = dataJson.topic;
   
//     admin.messaging().sendToTopic(topic, payload)
//       .then(function (response) {
//         console.log("Successfully sent message:", response);
//       })
//       .catch(function (error) {
//         console.log("Error sending message:", error);
//       });

//   } catch (err) {
//     throw err;
//   }
// };



// const unsubscribeFromTopic = async (dataJson) => {
//   try {
//     var topic;
//     topic = await getTopic(dataJson);
//     // console.log(topic);
//     let logPayload = {
//       "topic": topic,
//       "deviceToken": dataJson.deviceToken
//     };

//     return new Promise(async (resolve, reject) => {
//       admin.messaging().unsubscribeFromTopic(dataJson.deviceToken, topic)
//         .then(async function (response) {
//           console.log("unsubscribed to topic:", response);
//           resolve('success');
//         })
//         .catch(function (error) {
//           console.log("Error subscribing to topic:", error);
//           resolve('error');
//         });
//     });
//   } catch (err) {
//     throw err;
//   }

// };


// const sendNotification = async (dataJson) => {
//   try {
// let result;
// let response={};
//     var payload = {
//       notification: {
//         title: dataJson.title,
//         body: dataJson.body,
    
//       },
//       token:dataJson.deviceToken
//     };
//     result= await admin.messaging().send(payload)
//       .then(function (response) {
//         console.log("Successfully sent message:", response);
//       })
//       .catch(function (error) {
//         console.log("Error sending message:", error);
//       });
//     response.status = `success`;   
//     return response;
     
   
//   } catch (err) {
//     throw err;
//   }
// };
// /**
//  * Exporting the modules
//  */
// module.exports = {
//   subscribeTopicNotification,
//   getTopic,
//   sendTopicNotification,
//   unsubscribeFromTopic,
//   sendNotification
// };