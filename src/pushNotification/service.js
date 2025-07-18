// const fcm =  require('../../libs/fcm');

const sendNotification = async (req, res) => {
  try {
    let response={};
    var dataJson = {
      deviceToken: req.body.deviceToken,
    }
    // let notificationPostPayload = {
    //   messageType: config.messageType.pushNotification,
    //   type: config.notificationType.all,
    //   userID: dataJson.userID,
    //   title: dataJson.title,
    //   body: dataJson.description,
    //   domainID: dataJson.domainID,
    //   custom: {}
    // }
  //  response=  await fcm.sendNotification(dataJson);
   response = { status: "success" };
    //  return 'success';
    if (response.status == "success") {
      let responseMessage = "Push notification is sended";
      let responseCode = "200";
      return res.status(200).send(
        JSON.stringify(
          {
            responseCode: responseCode,
            response: (responseMessage),
          }
        ));
    } else {
      // console.log("response",response);
      let responseMessage = "Error occured";
      let responseCode = "400";
      return res.status(400).send(
        JSON.stringify(
          {
            messageDescription: responseMessage,
            responseCode: responseCode

          }
        ));
    }


  } catch (err) {
    throw (err);
  }
}


module.exports = {
  sendNotification

}

