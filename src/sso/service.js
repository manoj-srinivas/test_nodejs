const DAL = require('./dal');
const common = require('../../utils/common'); 
const tokenVal = require("../../libs/tokenVal");


const login = async (req, res) => { 
  try { 
    let dataJson={
      email:req.body.email
    }
   let loginRes = await DAL.JWTVal(dataJson);
   return res.status(200).send(
    JSON.stringify(
      {
    
        response: loginRes,             
      }
    )
    );
    
  } catch (err) {
	  let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
};
 
 

const number = async (req, res) => { 
  try { 
    let mobilenumber=req.body.mobilenumber;
    let mobilenumberCheck = await tokenVal.mtnNumbers(mobilenumber);
    if(mobilenumberCheck.status=='1'){ 
      let dataJson={
        mobilenumber:mobilenumber,
        googleInfo:req.body.googleInfo
      }
      let loginRes = await DAL.validateNumbers(dataJson);
      return res.status(200).send(
       JSON.stringify(
         {
       
           response: loginRes,             
         }
       )
       );
    }else{
      return res.status(403).send(
        JSON.stringify(
          {
        
            response: "Invalid Mobile Number (Non MTN)",             
          }
        )
      )
    }
 
    
  } catch (err) {
	  let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
  
};


module.exports = {   
  login,
  number
}

