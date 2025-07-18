const mockResponse = require('../../libs/mockResponse');
const common = require('../../utils/common'); 
const DAL = require('./dal');
const tokenVal = require('../../libs/tokenVal'); 
const moment = require('moment');
  function dateandtime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}


const tariffCategory = async (req, res) => { 
  try { 
     response = await DAL.tariffCategory();
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

const tariffPlan = async (req, res) => { 
  try { 
    response = await DAL.tariffPlan();
    return res.status(200).send(
      JSON.stringify(
        {
          response: response,    
          "pager": {
            "current_page": 0,
            "total_items": 5,
            "total_pages": 2,
            "items_per_page": 4
        }      
        }
      )
      );
      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}; 

const tariffCurrentplan = async (req, res) => { 
  try { 
    var planid = req.params.planid; 
    console.log("planId",planid);  
     response = await mockResponse.tariffCurrentplan(); 
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
const planById = async (req, res) => { 
  try { 
    let dataJson={
      planid:req.params.planid
    }
     response = await DAL.planById(dataJson); 
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
const tarrifSearch = async (req, res) => { 
  try { 
    //search is based on the plan or amount
    dataJson={
      plan:req.query.plan,
      price:req.query.price
    }
    response = await DAL.tarrifSearch(dataJson);
    // console.log("response", dataJson); 
    return res.status(200).send(
      JSON.stringify(
        {
          response: response,  
          "pager": {
            "current_page": 0,
            "total_items": 5,
            "total_pages": 2,
            "items_per_page": 4
        }        
        }
      )
      );

      
  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
}; 
const activate = async (req, res) => { 
  try { 
    dataJson={
      planid:req.body.id,
      mobilenumber:req.body.mobilenumber,
      DTM:dateandtime()
    }
    response = await DAL.activate(dataJson);
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
  tariffPlan, 
  tariffCategory,
  // plan,
  tariffCurrentplan,
  tarrifSearch,
  planById,
  activate
}

