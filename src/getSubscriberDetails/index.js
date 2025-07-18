
const express = require("express");
const router = express.Router();
const service = require("./service");

const routes = () => {
  router.post("/create", service.otpCreate);
  router.post("/verify", service.otpVerify);
  router.post("/bypassLogin", service.bypassLogin);
  router.get("/demoNumbers", service.demoNumbers);
  router.post("/chatdata", service.chatData);
  router.post("/tokenverify", service.tokenValidation);
  router.post("/verifyToken", service.verifyToken);
  router.post("/resendotp", service.resend_otp);
  router.post("/update", service.profieUpdate);
  router.post("/photo", service.picupdate);
  router.post("/addlink", service.addlink);
  router.post("/addlink/verify", service.addlinkverify);
  router.get("/addlinklist", service.addlinkList);
  router.post("/unlink", service.unlink);
  router.post("/switchNumber", service.switchNumber);
  router.put("/logout", service.logout);
  router.get("/GetOffers", service.GetOffers);
  router.post("/blockUsers", service.blockUsers);
  router.get("/blackListedUsers", service.blackListedUsers);
  router.get("/allUsers", service.allUsers);
  router.get("/transactions/:mobilenumber(\\d+)", service.transactions);
  router.post("/category", service.category);
  router.put("/categoryChat/:catid(\\d+)", service.categoryChat);
  router.get("/getCategory", service.getCategory);
  router.put("/updateCategory/:catid(\\d+)", service.updateCategory);
  router.delete("/deleteCategory/:catid(\\d+)", service.deleteCategory);
  router.post("/subscription", service.subscription);
  router.put(
    "/updateSubscription/:subscriptionId(\\d+)",
    service.updateSubscription
  );
  router.get("/subscriptionList", service.subscriptionList);
  router.delete(
    "/deleteSubscription/:subscriptionId(\\d+)",
    service.deleteSubscription
  );
  router.post("/subscriptionDetails", service.subscriptionDetails);
  router.post("/purchaseSubscription", service.purchaseSubscription);
  router.get("/fetchSubscription/:number(\\d+)", service.fetchSubscription);
  return router;
};

module.exports = routes;
