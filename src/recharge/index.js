// Import required modules
const express = require("express");
const router = express.Router();
const service = require("./service");
const common = require("../../utils/common");


const routes = () => {
  router.get("/category", service.rechargeCategory);
  router.get("/plan", service.rechargePlan);
  router.get("/recentRecharge/:number(\\d+)", service.recentRechargeNumber);

  router.post("/searchRecharge", service.search);
  router.get("/rechargeNumber/:number(\\d+)", service.rechargeNumber);
  router.post("/rechargeMobile", service.recharge);
  router.post("/emergency", service.emergency);
  return router;
};

module.exports = routes;
