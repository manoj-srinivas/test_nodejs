const axios = require('axios');
const https = require('https');
const DAL = require('./dal');
const mockResponse = require('../../libs/mockResponse');
const common = require('../../utils/common');


const agent = new https.Agent({
  rejectUnauthorized: false,
});
  
const rechargeCategory = async (req, res) => { 
  try { 
    let response = await mockResponse.rechargeCategory();
    return res.status(200).send(
      JSON.stringify(
        {
          response: response,          
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
};

const rechargePlan = async (req, res) => { 
  try { 
    response = await mockResponse.rechargePlan();
    // console.log("response", dataJson); 
    return res.status(200).send(
      JSON.stringify(
        {
          response: response,          
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}; 

const rechargeNumber = async (req, res) => { 
  try { 
    
    let dataJson={
      mobilenumber:req.params.number,
    }
    response = await mockResponse.rechargeNumber();
    
      await DAL.notification(dataJson);
    return res.status(200).send(
      JSON.stringify(
        {
          message:"Recent Recharge",
          response: response,             
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}; 
const recentRechargeNumber = async (req, res) => { 
  try { 
    
    let dataJson={
      mobilenumber:req.params.number,
    }
    response = await mockResponse.rechargeNumber();
   
    return res.status(200).send(
      JSON.stringify(
        {
          message:"Recent Recharge",
          response: response,             
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}; 
const recharge = async (req, res) => { 
  try { 
     
    response = await mockResponse.rechargeMobile();
    return res.status(200).send(
      JSON.stringify(
        {
          message:"Recent Recharge",
          response: response,         
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
};
const emergency = async (req, res) => { 
  try { 
    let dataJson={
      mobilenumber:req.body.mobilenumber
    }
    response = await mockResponse.emergency();
    // console.log("response", dataJson); 
    return res.status(200).send(
      JSON.stringify(
        {
          message:"Recent Recharge",
          response: response          
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
};
const recentRechargePlans = async (req, res) => { 
  try { 
     response = await mockResponse.recentRechargePlans(); 
    // console.log("response", dataJson); 
    return res.status(200).send(
      JSON.stringify(
        {
          response: response,               
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}; 
const search = async (req, res) => { 
  try { 
    //search is based on the plan or amount
    let dataJson={
      amount:req.body.amount,
      plan:req.body.plan
    }
    response = await mockResponse.seachRecharge();
    // console.log("response", dataJson); 
    return res.status(200).send(
      JSON.stringify(
        {
          response: response,               
        }
      )
      );

      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}; 

module.exports = {   
  rechargeCategory,
  rechargePlan,
  recentRechargePlans,
  search,
  rechargeNumber,
  recentRechargeNumber,
  recharge,
  emergency
}

