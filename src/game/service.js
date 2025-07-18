const axios = require('axios');
const https = require('https');
const DAL = require('./dal');
const moment = require('moment');
const jwt_decode = require('jwt-decode');
const common = require('../../utils/common');
const tokenVal = require('../../libs/tokenVal');

function dateandtime() {
  let now = tokenVal.dateTime();
  let dateStringWithTime = moment(new Date(now)).toISOString(true);
  return dateStringWithTime;
}

const addGame =  async (req, res) => {
  try {
    var token = req.headers['x-access-token'];
  
    var images = req.files.images;
    console.log("955", images);
    var dataJson = {
      files:req.files.images,
    }
    var DTM = dateandtime();
    var response = await DAL.picupload(dataJson);
    if (response.state == "success") {
      console.log("response", response.value);
      var gameImage = response.value;
      var dataJson = {
        images: gameImage,
        title: req.body.title,
        description: req.body.description,
        features:req.body.features,
        url:req.body.url,
        category: req.body.category,
        rating: req.body.rating,
        price: req.body.price,
        currency: req.body.currency,
        createdAt:DTM 
      }
      var response = await DAL.addGame(dataJson);
      console.log("response", response);
      let responseMessage = "Records added successfully";
    
      return res.status(200).send(
        JSON.stringify(
          {
            //  messageDescription: profileImage, 
            responseCode:200,
            message: responseMessage,
          }
        ));
    } else {
      return res.status(423).send(
        JSON.stringify(
          {
            messageDescription: "Game image is not uploaded",
          }
        ));
    }

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}

const update = async (req, res) => {
  try {
    var token = req.headers['x-access-token'];
      
    var images = req.files.images;
    console.log("955", images);
    var dataJson = {
      files:req.files.images,
    }
    var DTM = dateandtime();
    var response = await DAL.picupload(dataJson);
    if (response.state == "success") {
      console.log("response", response.value);
      var gameImage = response.value;
      var dataJson = {
        id:req.body.id,
        images: gameImage,
        title: req.body.title,
        description: req.body.description,
        features:req.body.features,
        url:req.body.url,
        category: req.body.category,
        rating: req.body.rating,
        price: req.body.price,
        currency: req.body.currency,
        createdAt:DTM 
      }
      var response = await DAL.updateGame(dataJson);
      console.log("response", response);
      let responseCode = "200";
 
      return res.status(200).send(
        JSON.stringify(
          {
            message: response.message,
            responseCode:responseCode,
      
          }
        ));
    } else {
    
      return res.status(423).send(
        JSON.stringify(
          {
            messageDescription: "Some error occured",
          }
        ));
    }

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}


const gamelist = async (req, res) => {
  try {
    var token = req.headers['x-access-token'];
      var response = await DAL.gamelist();
      console.log("response", response);
      let responseMessage = "List of games";
      let records=response.records;
      if(records>=0){
        responseMessage="Not found any records.";
      }
    
      return res.status(200).send(
        JSON.stringify(
          {
            message:responseMessage,
            responseCode:200,
            records: records, 
          }
        ));
   

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}
const category = async (req, res) => {
  try {
    var token = req.headers['x-access-token'];
      var response = await DAL.category();
      console.log("response", response);
      let responseCode = "200";
      return res.status(200).send(
        JSON.stringify(
          {
            message:  response.message,
            responseCode:responseCode,
            records: response.records, 
          }
        ));
   

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}
const deletegame = async (req, res) => {
  try {
    var token = req.headers['x-access-token'];
  
      dataJson={
        id: parseInt(req.params.id),
      }
      var response = await DAL.deleteGame(dataJson);
      let responseCode = "200";
      return res.status(200).send(
        JSON.stringify(
          {
            responseCode:responseCode,
            response: response.message
          }
        ));
   

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}
const details = async (req, res) => {
  try {
    var token = req.headers['x-access-token'];
    let mobilenumber = await tokenVal.getTokenVal(token);
    if(mobilenumber=='Wrong'){
     res.status(403).send(
       JSON.stringify(
         {
           response: "Wrong email id.",             
         }
       )
       );
    }
      dataJson={
        id: parseInt(req.params.id),
      }
      var response = await DAL.details(dataJson);
      console.log("response", response);
      let responseMessage = "Game details";
      let responseCode = "200";

      return res.status(200).send(
        JSON.stringify(
          {
            message: responseMessage,
            responseCode:responseCode,
            records: response.records, 
          }
        ));
   

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}
const pinwheel = async (req, res) => {
  try {
    var token = req.headers['x-access-token'];
      let responseCode = "200";

      return res.status(200).send(
        JSON.stringify(
          {
            responseCode:responseCode,
            response: {
              "entityId": "9898989898",
              "goalName": "spinwheel_goal",
              "spinwheel": {
                               "reward_type": "coupon",
                             "reward_reference": "6298a63dece12a5e2c96926d",
                             "balance": 3,
                             "total": 5,
                             "spoke": 2,
                             "imageUrl": "bruce.png",
                             "display_name": "Lifestyle_coupon",
                             "imagePath": "//public/6274b95411f9ac77ac528f5b//spinwheel/bruce.png"
              },
              "spokeData": [{
                             "reward_type": "cashback",
                             "reward_reference": 0,
                             "points_expiry_typ	e": 2,
                             "points_expiry": 10,
                             "balance": -1,
                             "total": -1,
                             "spoke": 8,
                             "imageUrl": "tom.png",
                             "display_name": "0",
                             "imagePath": "//public/6274b95411f9ac77ac528f5b//spinwheel/tom.png"
              }, {
                             "reward_type": "loyalty_points",
                             "reward_reference": 10,
                             "points_expiry_type": 2,
                             "poin	ts_expiry": 10,
                             "balance": 0,
                             "total": 1,
                             "spoke": 7,
                             "imageUrl": "steve.png",
                             "display_name": "10",
                             "imagePath": "//public/6274b95411f9ac77ac528f5b//spinwheel/steve.png"
              }, {
                             "reward_type": "game_points",
                             "reward_reference": 100,
                             "points_expiry_type": 2,
                             "points_expiry	": 10,
                             "balance": 0,
                             "total": 1,
                             "spoke": 6,
                             "imageUrl": "sarah.png",
                             "display_name": "100",
                             "imagePath": "//public/6274b95411f9ac77ac528f5b//spinwheel/sarah.png"
              }, {
                          "reward_type": "game_points",
                             "reward_reference": 200,
                             "points_expiry_type": 2,
                             "points_expiry": 10,
                             "ba	lance": 0,
                             "total": 0,
                             "spoke": 5,
                             "imageUrl": "rose.png",
                             "display_name": "200",
                             "imagePath": "//public/6274b95411f9ac77ac528f5b//spinwheel/rose.png"
              }, {
                             "reward_type": "game_points",
                             "reward_reference": 500,
                             "points_expiry_type": 2,
                             "points_expiry": 10,
                             "balance": 0,
                             "total": 0,
                             "spoke": 4,
                             "imageUrl": "mary.png",
                             "display_name": "500",
                             "imagePath": "//public/6274b95411f9ac77ac528f5b//spinwheel/mary.png"
              }, {
                             "reward_type": "game_points",
                             "reward_reference": 1000,
                             "points_expiry_type": 2,
                             "points_expiry": 10,
                             "balance": 0,
                             "total": 0,
                             "spoke": 1,
                             "imageUrl": "alex.png",
                             "display_name": "1000",
                             "imagePath": "//public/6274b95411f9ac77ac528f5b//spinwheel/alex.png"
              }, {
                             "reward_type": "coupon",
                             "reward_reference": "6298a63dece12a5e2c96926d",
                             "balance": 3,
                             "total": 5,
                             "spoke": 2,
                             "imageUrl": "bruce.png",
                             "display_name": "Lifestyle_coupon",
                             "imagePath": "//public/6274b95411f9ac77ac528f5b//spinwheel/bruce.png"
              }, {
                             "reward_type": "certificate",
                             "reward_reference": "6298a648ece12a5e2c969270",
                             "balance": 3,
                             "total": 4,
                             "spoke": 3,
                             "imageUrl": "jane.png",
                             "display_name": "max_coupon",
                             "imagePath": "//public/6274b95411f9ac77ac528f5b//spinwheel/jane.png"
              }]
  }
   
   
          }
        ));
   

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}
const search = async (req, res) => {
  try {
    var dataJson = {
      category:req.query.category,
    }
    var token = req.headers['x-access-token'];
      var response = await DAL.gameSearch(dataJson);
      console.log("response", response);
      let responseMessage = "List of games";
      let responseCode = "200";
      let records=response.records;
      if(records>=0){
        responseMessage="Not found any records.";
      }
   
      return res.status(200).send(
        JSON.stringify(
          {
            message: response.message,
            responseCode:responseCode,
            records:records, 
          }
        ));
   

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}
const gamification = async (req, res) => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
  });
    let productId=req.query.productId;
    let type=req.query.type;
    let dur=req.query.dur;
    let arrays=[];
    const config = {
      method: 'get',
      url: 'https://gamification.comviva.com/v1/leaderboard',
      params: {
        productId:productId,
        type:type,
        dur:dur,

      },
      headers: { 
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/xml'
    },
    httpsAgent: agent 
  
  }

  let resp1 = await axios(config)

  let resp=resp1.data.leaderboard;
     for(let i=0;i<=resp.length;i++){
      let dataJson={
        appName:resp[i].appName,
        cashback:resp[i].cashback,
        cashback_redeemed:resp[i].cashback_redeemed,
        durationPoints:resp[i].durationPoints,
        entityId:resp[i].entityId,
        game_points:resp[i].game_points,
        game_points_redeemed:resp[i].game_points_redeemed,
        id:resp[i].id,
        loyalty_points:resp[i].loyalty_points,
        loyalty_points_redeemed:resp[i].loyalty_points_redeemed,
        rank:resp[i].rank,

      }
      var response = await DAL.gamification(dataJson);
      if(response.records==undefined){
        // console.log("Records not found");
      }else{
        var record=response.records;
       let res= Object.assign(record,dataJson);
        arrays.push(res);
      
      }

      if(i==resp.length-1){
        return res.status(200).send(
          JSON.stringify(
            {
              message:response.message,
               records: arrays, 
            }
          ));
      } 
     }     
    
  } catch (err) {
    throw (err);
  }
};
const updategamification = async (req, res) => {
  try {
    var images = req.files.images;
    console.log("955", images);
    var dataJson = {
      files:req.files.images,
    }
    var response = await DAL.picupload1(dataJson);
    if (response.state == "success") {
      console.log("response", response.value);
      var gameImage = response.value;
      var dataJson = {
        entityId:req.body.entityId,
        images: gameImage,
        name: req.body.name,
        
      }
      var response = await DAL.updateGamification(dataJson);
      console.log("response", response);
      let responseMessage = "Records updated successfully";
      let responseCode = "200";

      return res.status(200).send(
        JSON.stringify(
          {
            message:responseMessage,
            responseCode:responseCode,
            
          }
        ));
    } else {
      // console.log("response",response);
      let responseMessage = "Some error occured";
      return res.status(423).send(
        JSON.stringify(
          {
            message:responseMessage
          }
        ));
    }

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}
const gamificationlist = async (req, res) => {
  try {
     
      var response = await DAL.gamificationlist();
      console.log("response", response);
      let responseMessage = "List of gamification";
      let responseCode = "200";
      let records=response.records;
      if(records>=0){
        responseMessage="Not found any records.";
      }
   
      return res.status(200).send(
        JSON.stringify(
          {
            message:responseMessage,
            responseCode:responseCode,
            records: records, 
          }
        ));
   

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
}
module.exports = {
  addGame,
  update,
  dateandtime,
  gamelist,
  deletegame,
  details,
  category,
  pinwheel,
  search,
  gamification,
  updategamification,
  gamificationlist

}

