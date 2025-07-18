// Import required modules
const express = require('express');
const config = require('../utils/config');
const router = express.Router(config.routerOptions);
const common = require('../utils/common');


// Modules Routing
const userRouter = require('./user/index');
const balanceRouter= require('./balance/index');
const getSubscriberDetailsRouter = require('./getSubscriberDetails/index');
const countryRouter = require('./country/index');
const CreatepinRouter = require('./createpin/index');
const paymentRouter = require('./payment/index');
const ninRouter = require('./nin/index');
const borrowRouter = require('./borrow/index');
const shareRouter = require('./share/index');
const pushNotificationRouter = require('./pushNotification/index');
const gameRouter = require('./game/index');
const helpRouter = require('./help/index');
const callerTuneRouter = require('./callerTune/index');
const tariffPlanRouter = require('./tariffPlan/index');
const bunddleRouter = require('./bundels/index');
const dashboardRouter = require('./dashboard/index');
const rechargeRouter = require('./recharge/index');
const postpaidRouter = require('./postpaid/index');
const topUpRouter = require('./topUp/index');
const billRouter = require('./bills/index');
const logRouter = require('./logs/index');
const langRouter = require('./lang/index');
const ssoRouter = require('./sso/index');
const spotifyRouter = require('./spotify/index');
// URLs
const routes = () => {
  router.use(function (req, res, next) {
    if (process.env.SHOWORIGINALURL) {
      console.log('URL:', req.originalUrl);
    }
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-HTTP-Method-Override, X-Requested-With, Content-Type, Accept, Token, AccountID, CustomerID, TemplateID, Field-Access, Access-By, EventID, LocationName, portalDNS, domainid, lanCode,time_zone, cancelable, reg-token'
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    
    res.header("Cache-Control", "no-cache");

    // need to delete after authorisation
    req.SessionUserDetails = {};
    next();
  });

  router.route('/status').get((req, res, next) => {
    res.render('status', {
      basePath: config.basePath,
      title: `${process.env.SITETITLE} node server is running...`
    });
  });
  router.route('/').get((req, res, next) => {
    res.render('index', {
      basePath: config.basePath,
      title: `Node JS web APIs for ${process.env.SITETITLE}`
    });
  });
  router.route('/config').get((req, res, next) => {
    res.render('status', {
      basePath: config.basePath,
      title: `CPU: Test & Memory: Test`
    });
  });
  router.use('/uploads/', (req, res, next) => {
    if (Object.keys(req.query).length && ![null, undefined, ''].includes(req.query.token)) {
      req.headers.token = req.query.token;
    }
    next();
  });
  router.use(common.options, (req, res, next) => {
    next();
  });

  router.use('/user', userRouter());
  router.use('/getSubscriberDetails', getSubscriberDetailsRouter());
  router.use('/balance', balanceRouter());
  router.use('/country', countryRouter());
  router.use('/pin', CreatepinRouter());
  router.use('/payment', paymentRouter());
  router.use('/nin', ninRouter()); 
  router.use('/share', shareRouter()); 
  router.use('/borrow', borrowRouter()); 
  router.use('/pushNotification', pushNotificationRouter());   
  router.use('/game', gameRouter()); 
  router.use('/help', helpRouter());   
  router.use('/callertune',callerTuneRouter());  
    router.use('/bundle',bunddleRouter());  
  router.use('/dashboard',dashboardRouter());  
  router.use('/tariff',tariffPlanRouter());  
  router.use('/recharge',rechargeRouter());  
  router.use('/postpaid',postpaidRouter());  
  router.use('/topup',topUpRouter());  
  router.use('/bills',billRouter());  
  router.use('/logs',logRouter());  
  router.use('/lang',langRouter());  
  router.use('/sso',ssoRouter());  
  router.use('/spotify',spotifyRouter());  
  return router; 
};

module.exports = routes;
