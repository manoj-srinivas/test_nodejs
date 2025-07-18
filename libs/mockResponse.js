

const mySubscribedCallertune = async (req, res) => {
    try {
      let  response = {
            "respCode": "0",
            "respMsg": "Profile Query is successfully executed",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "subscriberDetails":
            {
                "holdStatus": 1,
                "srcMsisdn": "666990021",
                "provStatus": "Active",
                "langType": "Arabic",
                "giftFlag": 1,
                "corpId": "0",
                "circleId": "DEL",
                "prodId": "LP_comvi_SUBSC_901",
                "optedPlanId": "LP_comvi_SUBSC_901",
                "availableCount": 0,
                "smsLanguageType": "Arabic",
                "viralLanguageType": "",
                "preRbtStatus": 1,
                "plusRbtStatus": 2,
                "autoRenewalFlag": -1,
                "subscriberSubType": 0,
                "graceFreeCount": 0,
                "shortCode": "",
                "operatorLang": -1,
                "ctmFlag": "1",
                "udsFlag": null,
                "aPartyDnDFlag": "0",
                "brandId": "-1",
                "brandName": null,
                "enableDate": "2022-03-08",
                "enableTime": "20:15:19",
                "existingPreserveProfile": "R",
                "subPlanPrice": null,
                "subPlanValidity": 30,
                "plusRbtAvailability": false,
                "reservedParameters": "",
                "provDate": "2022-03-08T20:15:19",
                "lastBillDate": null,
                "nextRenewalDate": "2022-04-07",
                "viralPromotionFlag": "1"
            },
            "toneDetails": null,
            "blacklistDetails": null,
            "corporateProfile":
            {
                "holdStatus": "0",
                "errCode": "0",
                "srcMsisdn": "666990021",
                "provStatus": "Inactive",
                "langType": "Arabic",
                "giftFlag": "1",
                "corpId": "",
                "circleId": "DEL",
                "prodId": "",
                "optedPlanId": "",
                "parentMsisdn": ""
            },
            "settings": null,
            "giftInboxDetails": null
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const subscription = async (req, res) => {
    try {
        let response = {
            "respCode": "0",
            "respMsg": "Your request has been accepted. User will receive a confirmation SMS if tone is newly added in Inbox.",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const listOfAllAvailableCallertunes = async (req, res) => {
    try {
        response = {
            "respCode": "0",
            "respMsg": "Content fetched successfully",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "data": {
                "totalContent": 200,
                "nextContentAvailable": true,
                "currentOffset": 1,
                "totalCat": 0,
                "nextCatAvailable": false,
                "nextCatOffset": 0,
                "content": [
                    {
                        "contentPlan": "LP_comvi_TONE_902",
                        "contentPrice": "500",
                        "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Love_Story_Taylor_Swift-Ringtonestar.Net.mp3",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/null.jpg",
                        "contentArtist": "RAJESH KHANNA,REKHA,ASRANI",
                        "contentAlbum": "Namak Haraam",
                        "contentType": "tone",
                        "ccode": "0698757",
                        "shortCode": "R98757",
                        "genre": "FESTIVAL AND OCCASION SPECIAL",
                        "subGenre": "PREMIUM",
                        "subSubGenre": "PREMIUM",
                        "cpName": "SAREGAMA",
                        "subscriptionPrice": null,
                        "subscriptionValidity": null,
                        "contentValidityType": null,
                        "subscriptionValidityType": null,
                        "currencyCode": null,
                        "language": null,
                        "orderInfo": null,
                        "info": null,
                        "uploadTime": null,
                        "copyrightEndDate": null,
                        "toneApprovalTime": null,
                        "toneUpdatedTime": null,
                        "cpCode": null,
                        "artistNameLetter": null,
                        "artistSex": null,
                        "toneNameLetter": null,
                        "toneCode": null,
                        "hdTonePath": null,
                        "contentLanguage": null,
                        "status": null,
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Nadiya Se Dariya",
                        "id": "010505070698757"
                    },
                    {
                        "contentPlan": "LP_comvi_TONE_903",
                        "contentPrice": "500",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET/1020/912/00/00/01/102091200000193.wav",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/null.jpg",
                        "contentArtist": "DHANUSH,ASRANI",
                        "contentAlbum": "Namak Haraam",
                        "contentType": "tone",
                        "ccode": "0698757",
                        "shortCode": "R98757",
                        "genre": "FESTIVAL AND OCCASION SPECIAL",
                        "subGenre": "PREMIUM",
                        "subSubGenre": "PREMIUM",
                        "cpName": "SAREGAMA",
                        "subscriptionPrice": null,
                        "subscriptionValidity": null,
                        "contentValidityType": null,
                        "subscriptionValidityType": null,
                        "currencyCode": null,
                        "language": null,
                        "orderInfo": null,
                        "info": null,
                        "uploadTime": null,
                        "copyrightEndDate": null,
                        "toneApprovalTime": null,
                        "toneUpdatedTime": null,
                        "cpCode": null,
                        "artistNameLetter": null,
                        "artistSex": null,
                        "toneNameLetter": null,
                        "toneCode": null,
                        "hdTonePath": null,
                        "contentLanguage": null,
                        "status": null,
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Nadiya Se Dariya",
                        "id": "010505070698757"
                    },
                    {
                        "contentPlan": "LP_comvi_TONE_904",
                        "contentPrice": "500",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET/1020/912/00/00/01/102091200000193.wav",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/null.jpg",
                        "contentArtist": "ANIRUTH,ASRANI",
                        "contentAlbum": "Namak Haraam",
                        "contentType": "tone",
                        "ccode": "0698757",
                        "shortCode": "R98757",
                        "genre": "FESTIVAL AND OCCASION SPECIAL",
                        "subGenre": "PREMIUM",
                        "subSubGenre": "PREMIUM",
                        "cpName": "SAREGAMA",
                        "subscriptionPrice": null,
                        "subscriptionValidity": null,
                        "contentValidityType": null,
                        "subscriptionValidityType": null,
                        "currencyCode": null,
                        "language": null,
                        "orderInfo": null,
                        "info": null,
                        "uploadTime": null,
                        "copyrightEndDate": null,
                        "toneApprovalTime": null,
                        "toneUpdatedTime": null,
                        "cpCode": null,
                        "artistNameLetter": null,
                        "artistSex": null,
                        "toneNameLetter": null,
                        "toneCode": null,
                        "hdTonePath": null,
                        "contentLanguage": null,
                        "status": null,
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Nadiya Se Dariya",
                        "id": "010505070698757"
                    }
                ],
                "category": null,
                "parentId": null,
                "parentTitle": null
            }
        }
        return response;

    } catch (err) {
        throw (err);
    }
}

const toneDelete = async (req, res) => {
    try {
        let   response = {
            "respCode": "0",
            "respMsg": "Your callertune removed successfully.",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const unsubscribeFromRBTservice = async (req, res) => {
    try {
        let   response = {
            "respCode": "0",
            "respMsg": "Unsubscription request submitted successfully",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const tariffPlan = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "subcategory_id": "2",
                "title": "MTN Plus",
                "currency": "R",
                "price": 10,
                "plantype": "Month",
                "weight": 1,
                "attributes": {
                    "internet": "Unlimited",
                    "speed": "Upto 100 Mbps",
                    "calls": "Unlimited",
                    "body": "Save 10.20 with annual plan 120",
                    "text": "Netflix and 2 more benefits",
                    "label": "bestseller",
                    "status": "Active",
                }
            },
            {
                "id": 2,
                "category": "1",
                "subcategory_id": "2",
                "title": "MTN Plus Monthly",
                "currency": "R",
                "price": 20,
                "plantype": "Month",
                "weight": 1,
                "attributes": {
                    "internet": "Unlimited",
                    "speed": "Upto 1000 Mbps",
                    "calls": "Unlimited",
                    "body": "Save 10.20 with annual plan 120",
                    "text": "Netflix and more benefits",
                    "label": "bestseller",
                    "status": "Active",
                }
            },
            {
                "id": 3,
                "category": "1",
                "subcategory_id": "2",
                "title": "MTN Plus Yearly",
                "currency": "R",
                "price": 40,
                "plantype": "Yearly",
                "weight": 1,
                "attributes": {
                    "internet": "Unlimited",
                    "speed": "Upto 2000 Mbps",
                    "calls": "Unlimited",
                    "body": "Save 10.20 with annual plan 120",
                    "text": "Netflix and more benefits",
                    "label": "bestseller",
                    "status": "Active",
                }
            },
            {
                "id": 4,
                "category": "1",
                "subcategory_id": "2",
                "title": "210 MB MTN Plus",
                "currency": "R",
                "price": 200,
                "plantype": "Month",
                "weight": 1,
                "attributes": {
                    "internet": "Unlimited",
                    "speed": "Upto 210 Mbps",
                    "calls": "Unlimited",
                    "body": "Save 10.20 with annual plan 120",
                    "text": "Netflix and more benefits",
                    "label": "bestseller",
                    "status": "Active",
                }
            }

            ]

        };
        

        return response;

    } catch (err) {
        throw (err);
    }
}

function filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].toString().toLowerCase().includes(string.toString().toLowerCase())));
}
const tarrifSearch = async (dataJson) => {

    try {
        let plan= dataJson.plan;
        let  price= dataJson.price;
        
        let array=[{
            "id": 1,
            "category": "1",
            "subcategory_id": "2",
            "title": "MTN Plus",
            "currency": "R",
            "price": 100,
            "plantype": "Month",
            "weight": 1,
            "attributes": {
                "internet": "Unlimited",
                "speed": "Upto 300 Mbps",
                "calls": "Unlimited",
                "body": "Save 10.20 with annual plan 120",
                "text": "Netflix and more benefits",
                "label": "bestseller",
                "status": "Active",
            }
        }

        ];
        
        if(plan!=undefined && price==undefined){
            var results=filterByValue(array, plan); 
        }else if(plan==undefined && price!=undefined){
            var results=filterByValue(array, price); 
        }else{
            var results=(filterByValue(array, (plan || price))); 
        }
        if(results.length>0){
        response = {
            "rows":results,
            "pager": {
                "current_page": 0,
                "total_items": 5,
                "total_pages": 2,
                "items_per_page": 4
            }  

        };
    }else{
        response =  {
            "Status": "Not found any records",
        }
    }

        return response;

    } catch (err) {
        throw (err);
    }
}
const dashboardPlan = async (dataJson) => {

    try {

        let response = {
            "GetSubscriberDetailsResponse": {
                "TransactionID": 223232,
                "RequestStatus": {
                    "StatusCode": 0,
                    "StatusInfo": "Request has been Processed Successfully"
                },
                "PersonalInformation": {
                    "Title": "",
                    "FirstName": "Thiru",
                    "MiddleName": "",
                    "LastName": "M",
                    "Nationality": "INDIAN",
                    "Gender": "Male",
                    "MaritalStatus": "",
                    "DOB": "1998/09/28"
                },
                "PhoneCommunication": {
                    "TelephoneNumber": +919840175953,
                    "AltTelephoneNumber": +919840175953,
                    "SMSNumber": +919840175953,
                    "AltMobileNumber": dataJson.AltMobileNumber
                },
                "AddressDetails": {
                    "ResedentialAddress": {
                        "Type": "",
                        "Line1": 1,
                        "Line2": "MTN PLAZA",
                        "Line3": "FALOMO",
                        "Street": "",
                        "StreetDesc": "IKOYI",
                        "City": "LA08",
                        "CityDesc": "ETI OSA",
                        "District": "LA",
                        "DistrictDesc": "LAGOS",
                        "Country": "NGA",
                        "CountryDesc": "NIGERIA",
                        "POBox": ""
                    },
                    "PhysicalAddress": {
                        "Type": "",
                        "Line1": 1,
                        "Line2": "MTN PLAZA",
                        "Line3": "FALOMO",
                        "Street": "",
                        "StreetDesc": "IKOYI",
                        "City": "LA08",
                        "CityDesc": "ETI OSA",
                        "District": "LA",
                        "DistrictDesc": "LAGOS",
                        "Country": "NGA",
                        "CountryDesc": "NIGERIA",
                        "POBox": ""
                    },
                    "PostalAddress": {
                        "Type": 7,
                        "Line1": "",
                        "Line2": "",
                        "Line3": "FALOMO",
                        "Street": "",
                        "StreetDesc": "IKOYI",
                        "City": "LA08",
                        "CityDesc": "ETI OSA",
                        "District": "LA",
                        "DistrictDesc": "LAGOS",
                        "Country": "NGA",
                        "CountryDesc": "NIGERIA",
                        "POBox": ""
                    },
                    "BusinessAddress": {
                        "Type": 8,
                        "Line1": "",
                        "Line2": "",
                        "Line3": "",
                        "Street": "",
                        "StreetDesc": "",
                        "City": "LA08",
                        "CityDesc": "ETI OSA",
                        "District": "LA",
                        "DistrictDesc": "LAGOS",
                        "Country": "NGA",
                        "CountryDesc": "NIGERIA",
                        "POBox": ""
                    }
                },
                "EmailID": "vijay@comviva.com",
                "RegistrationDetails": {
                    "Status": {
                        "StatusCode": "AC",
                        "StatusInfo": "RegisteredComplete"
                    },
                    "ContractType": "P",
                    "SubscriberCode": 354234954,
                    "AccountCode": 2000140866,
                    "IDNumber": "",
                    "ActvationDate": "28/09/2018",
                    "AdditionalDetails": {
                        "IdExpiry": "",
                        "StateOfOrigin": "",
                        "StateOfOriginDesc": "",
                        "LGA": "",
                        "LGAOfOrigin": "",
                        "LGAOfOriginDesc": "",
                        "RegistrationCity": "",
                        "Resident": "",
                        "NationalityDesc": "",
                        "State": "",
                        "MotherMaidenName": "",
                        "OtherName": "",
                        "Flag": ""
                    }
                }
            }
        };

        // let response = "222";
        return response;
    } catch (err) {
        throw (err);
    }
}
const toneProfile = async (dataJson) => {
    try {
        let DTM=dataJson.DTM;
        let DTM_next=dataJson.DTM_next;
        let date=DTM.slice(0, DTM.lastIndexOf(" "));
        let next_date=DTM_next.slice(0, DTM_next.lastIndexOf(" "));
        response = {
            "respCode": "0",
            "respMsg": "Profile Query is successfully executed",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "subscriberDetails": null,
            "toneDetails": {
                "toneCnt": 3,
                "plusRBTSettingTones": [],
                "allCaller": [
                    {
                        "enableDate": DTM,
                        "lastBillDate": DTM,
                        "toneExpiryDate": DTM_next,
                        "toneTypeIdx": 1,
                        "callingPartyCnt": 1,
                        "callingPartyMsisdn": "D",
                        "timeOfDay": "0",
                        "dayOfWeek": 0,
                        "conditionalDays": null,
                        "splDate": "0",
                        "toneId": "152077030735958",
                        "toneFlag": "T",
                        "seriesStartTime": DTM,
                        "seriesEndTime": DTM_next,
                        "seriesStartDate": null,
                        "seriesEndDate": null,
                        "conditionalSettingType": "X",
                        "optedPlan": "LP_comvi_TONE_002",
                        "soRame": "love story",
                        "referencePack": "",
                        "shortCode": "",
                        "reservedParameters": "Resv-param",
                        "contentType": "T",
                        "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Love_Story_Taylor_Swift-Ringtonestar.Net.mp3",
                        "contentImagePath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/LoveStoryTaylorSwift.jpg",
                        "bundledToneId": "null",
                        "vcodeType": "5",
                        "contentArtist": "Taylor Swift - Love Story",
                        "contentAlbum": "Love Story",
                        "contentValidity": "30",
                        "nextRenewalDate": next_date,
                        "lastChargedAmount": "30.0",
                        "contentValidityType": "Days",
                        "currencyCode": "EGP",
                        "enableTime": "14:45:19",
                        "nextRenewalTime": "20:15:19",
                        "lastBillingTime": "20:15:19",
                        "enableDateTime": DTM,
                        "nextRenewalDateTime": DTM_next,
                        "lastBillingDateTime": DTM,
                        "contentExpiryDate": DTM,
                        "contentPrice": "30",
                        "specialSetting": null,
                        "status": "Active",
                        "toneStatus": "ACTIVE"
                    }
                ],
                "specialCaller": [
                    {
                        "enableDate": DTM,
                        "lastBillDate": DTM,
                        "toneExpiryDate": DTM_next,
                        "toneTypeIdx": 1,
                        "callingPartyCnt": 1,
                        "callingPartyMsisdn": "66728222222",
                        "timeOfDay": "0",
                        "dayOfWeek": 0,
                        "conditionalDays": null,
                        "splDate": "0",
                        "toneId": "010775080693677",
                        "toneFlag": "T",
                        "seriesStartTime": DTM,
                        "seriesEndTime": DTM_next,
                        "seriesStartDate": null,
                        "seriesEndDate": null,
                        "conditionalSettingType": "X",
                        "optedPlan": "LP_comvi_TONE_902",
                        "soRame": "Pagal Ma Banna Sakchhu Female",
                        "referencePack": "",
                        "shortCode": "",
                        "reservedParameters": "Resv-param",
                        "contentType": "T",
                        "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Cover_Me_In_Sunshine-Ringtonestar.Net.mp3",
                        "contentImagePath":  process.env.PUBLIC_ORIGIN+"/uploads/callertune/coverme.jpg",
                        "bundledToneId": "null",
                        "vcodeType": "0",
                        "contentArtist": "RAJINA RIMAL",
                        "contentAlbum": "Rhythm",
                        "contentValidity": "30",
                        "nextRenewalDate": DTM_next,
                        "lastChargedAmount": "30.0",
                        "contentValidityType": "Days",
                        "currencyCode": "EGP",
                        "enableTime": "14:55:12",
                        "nextRenewalTime": "20:25:12",
                        "lastBillingTime": "20:25:12",
                        "enableDateTime": DTM,
                        "nextRenewalDateTime": DTM_next,
                        "lastBillingDateTime": DTM,
                        "contentExpiryDate": DTM_next,
                        "contentPrice": "30",
                        "specialSetting": null,
                        "status": "Active",
                        "toneStatus": "ACTIVE"
                    }
                ],
                "groupCaller": [
                    {
                        "enableDate": DTM,
                        "lastBillDate": DTM,
                        "toneExpiryDate": DTM_next,
                        "toneTypeIdx": 1,
                        "callingPartyCnt": 1,
                        "callingPartyMsisdn": "FAMILY",
                        "timeOfDay": "0",
                        "dayOfWeek": 0,
                        "conditionalDays": null,
                        "splDate": "0",
                        "toneId": "145277030726962",
                        "toneFlag": "T",
                        "seriesStartTime": DTM,
                        "seriesEndTime": DTM_next,
                        "seriesStartDate": null,
                        "seriesEndDate": null,
                        "conditionalSettingType": "X",
                        "optedPlan": "LP_comvi_TONE_902",
                        "soRame": "Yo Jyan Ko",
                        "referencePack": "",
                        "shortCode": "",
                        "reservedParameters": "Resv-param",
                        "contentType": "T",
                        "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Touch_It-Ringtonestar.Net.mp3",
                        "contentImagePath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/toughin.jpg",
                        "bundledToneId": "null",
                        "vcodeType": "6",
                        "contentArtist": "GYAN LAMA",
                        "contentAlbum": "Kaha Ho Timro Gau",
                        "contentValidity": "30",
                        "nextRenewalDate": DTM,
                        "lastChargedAmount": "30.0",
                        "contentValidityType": "Days",
                        "currencyCode": "EGP",
                        "enableTime": "14:55:31",
                        "nextRenewalTime": "20:25:31",
                        "lastBillingTime": "20:25:31",
                        "enableDateTime": DTM,
                        "nextRenewalDateTime": DTM_next,
                        "lastBillingDateTime": DTM,
                        "contentExpiryDate": DTM,
                        "contentPrice": "30",
                        "specialSetting": null,
                        "status": "Active",
                        "toneStatus": "ACTIVE"
                    }
                ],
                "statusTune": [],
                "prayerRbtTune": [],
                "corporateTune": [],
                "reverseRbt": [],
                "doaServiceTones": []
            },
            "blacklistDetails": null,
            "corporateProfile": null,
            "settings": null,
            "giftInboxDetails": null
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const jukebox = async (req, res) => {

    try {

        let response = {
            "respCode": "0",
            "respMsg": "FAILURE",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "errCode": "0",
            "srcMsisdn": "668287272",
            "toneCnt": 1,
            "jukeToneDetails": {
                "jukeBoxTones": [
                    {
                        "toneId": "150877030733906",
                        "soRame": "Kinideuna Sailadai Antara",
                        "gifterMsisdn": "668287271",
                        "toneDownInterface": "C",
                        "toneDownSubInterface": "null",
                        "enableDate": "2022-03-08",
                        "lastBillDate": "2022-03-08",
                        "toneValidity": 30,
                        "nextRenewalDate": "2022-04-07",
                        "lastChargeAmount": 30.0,
                        "toneFlag": "T",
                        "packId": "LP_comvi_GIFTE_916",
                        "status": "1",
                        "toneSetStatus": "1",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.wav",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/1508/770/30/73/39/150877030733906.jpg",
                        "artist": "SADHANA SARGAM",
                        "contentType": "T",
                        "contentValidityType": "Days",
                        "currencyCode": "EGP",
                        "toneStatus": "Active",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.awb",
                        "toneNameLetter": "KSA",
                        "artistNameLetter": "SS",
                        "artistSex": "null",
                        "reOrderMode": "0",
                        "contentLanguage": "null",
                        "lastChargedDuration": "30",
                        "cpName": "Digitainment_Ge",
                        "cpCode": "508",
                        "toneCode": "0733906",
                        "singerName": "SADHANA SARGAM",
                        "copyRightUptodate": "2025-09-30",
                        "lastBillTime": "21:30:33",
                        "enableTime": "21:30:33",
                        "nextRenewalTime": "21:30:33",
                        "autoRenewalFlag": "-1",
                        "copyRightUptotime": null,
                        "contentValidity": "30",
                        "contentPrice": "0",
                        "channelId": "CUSTOMER SERVICE",
                        "info": "1",
                        "duration": "1 Min"
                    }, {
                        "toneId": "150877030733906",
                        "soRame": "Kinideuna Sailadai Antara",
                        "gifterMsisdn": "668287271",
                        "toneDownInterface": "C",
                        "toneDownSubInterface": "null",
                        "enableDate": "2022-03-08",
                        "lastBillDate": "2022-03-08",
                        "toneValidity": 30,
                        "nextRenewalDate": "2022-04-07",
                        "lastChargeAmount": 30.0,
                        "toneFlag": "T",
                        "packId": "LP_comvi_GIFTE_916",
                        "status": "1",
                        "toneSetStatus": "1",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.wav",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/1508/770/30/73/39/150877030733906.jpg",
                        "artist": "SADHANA SARGAM",
                        "contentType": "T",
                        "contentValidityType": "Days",
                        "currencyCode": "EGP",
                        "toneStatus": "Active",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.awb",
                        "toneNameLetter": "KSA",
                        "artistNameLetter": "SS",
                        "artistSex": "null",
                        "reOrderMode": "0",
                        "contentLanguage": "null",
                        "lastChargedDuration": "30",
                        "cpName": "Digitainment_Ge",
                        "cpCode": "508",
                        "toneCode": "0733906",
                        "singerName": "SADHANA SARGAM",
                        "copyRightUptodate": "2025-09-30",
                        "lastBillTime": "21:30:33",
                        "enableTime": "21:30:33",
                        "nextRenewalTime": "21:30:33",
                        "autoRenewalFlag": "-1",
                        "copyRightUptotime": null,
                        "contentValidity": "30",
                        "contentPrice": "0",
                        "channelId": "CUSTOMER SERVICE",
                        "info": "1",
                        "duration": "1 Min"
                    }, {
                        "toneId": "150877030733906",
                        "soRame": "Kinideuna Sailadai Antara",
                        "gifterMsisdn": "668287271",
                        "toneDownInterface": "C",
                        "toneDownSubInterface": "null",
                        "enableDate": "2022-03-08",
                        "lastBillDate": "2022-03-08",
                        "toneValidity": 30,
                        "nextRenewalDate": "2022-04-07",
                        "lastChargeAmount": 30.0,
                        "toneFlag": "T",
                        "packId": "LP_comvi_GIFTE_916",
                        "status": "1",
                        "toneSetStatus": "1",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.wav",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/1508/770/30/73/39/150877030733906.jpg",
                        "artist": "SADHANA SARGAM",
                        "contentType": "T",
                        "contentValidityType": "Days",
                        "currencyCode": "EGP",
                        "toneStatus": "Active",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.awb",
                        "toneNameLetter": "KSA",
                        "artistNameLetter": "SS",
                        "artistSex": "null",
                        "reOrderMode": "0",
                        "contentLanguage": "null",
                        "lastChargedDuration": "30",
                        "cpName": "Digitainment_Ge",
                        "cpCode": "508",
                        "toneCode": "0733906",
                        "singerName": "SADHANA SARGAM",
                        "copyRightUptodate": "2025-09-30",
                        "lastBillTime": "21:30:33",
                        "enableTime": "21:30:33",
                        "nextRenewalTime": "21:30:33",
                        "autoRenewalFlag": "-1",
                        "copyRightUptotime": null,
                        "contentValidity": "30",
                        "contentPrice": "0",
                        "channelId": "CUSTOMER SERVICE",
                        "info": "1",
                        "duration": "1 Min"
                    }, {
                        "toneId": "150877030733906",
                        "soRame": "Kinideuna Sailadai Antara",
                        "gifterMsisdn": "668287271",
                        "toneDownInterface": "C",
                        "toneDownSubInterface": "null",
                        "enableDate": "2022-03-08",
                        "lastBillDate": "2022-03-08",
                        "toneValidity": 30,
                        "nextRenewalDate": "2022-04-07",
                        "lastChargeAmount": 30.0,
                        "toneFlag": "T",
                        "packId": "LP_comvi_GIFTE_916",
                        "status": "1",
                        "toneSetStatus": "1",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.wav",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/1508/770/30/73/39/150877030733906.jpg",
                        "artist": "SADHANA SARGAM",
                        "contentType": "T",
                        "contentValidityType": "Days",
                        "currencyCode": "EGP",
                        "toneStatus": "Active",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.awb",
                        "toneNameLetter": "KSA",
                        "artistNameLetter": "SS",
                        "artistSex": "null",
                        "reOrderMode": "0",
                        "contentLanguage": "null",
                        "lastChargedDuration": "30",
                        "cpName": "Digitainment_Ge",
                        "cpCode": "508",
                        "toneCode": "0733906",
                        "singerName": "SADHANA SARGAM",
                        "copyRightUptodate": "2025-09-30",
                        "lastBillTime": "21:30:33",
                        "enableTime": "21:30:33",
                        "nextRenewalTime": "21:30:33",
                        "autoRenewalFlag": "-1",
                        "copyRightUptotime": null,
                        "contentValidity": "30",
                        "contentPrice": "0",
                        "channelId": "CUSTOMER SERVICE",
                        "info": "1",
                        "duration": "1 Min"
                    }, {
                        "toneId": "150877030733906",
                        "soRame": "Kinideuna Sailadai Antara",
                        "gifterMsisdn": "668287271",
                        "toneDownInterface": "C",
                        "toneDownSubInterface": "null",
                        "enableDate": "2022-03-08",
                        "lastBillDate": "2022-03-08",
                        "toneValidity": 30,
                        "nextRenewalDate": "2022-04-07",
                        "lastChargeAmount": 30.0,
                        "toneFlag": "T",
                        "packId": "LP_comvi_GIFTE_916",
                        "status": "1",
                        "toneSetStatus": "1",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.wav",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/1508/770/30/73/39/150877030733906.jpg",
                        "artist": "SADHANA SARGAM",
                        "contentType": "T",
                        "contentValidityType": "Days",
                        "currencyCode": "EGP",
                        "toneStatus": "Active",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.awb",
                        "toneNameLetter": "KSA",
                        "artistNameLetter": "SS",
                        "artistSex": "null",
                        "reOrderMode": "0",
                        "contentLanguage": "null",
                        "lastChargedDuration": "30",
                        "cpName": "Digitainment_Ge",
                        "cpCode": "508",
                        "toneCode": "0733906",
                        "singerName": "SADHANA SARGAM",
                        "copyRightUptodate": "2025-09-30",
                        "lastBillTime": "21:30:33",
                        "enableTime": "21:30:33",
                        "nextRenewalTime": "21:30:33",
                        "autoRenewalFlag": "-1",
                        "copyRightUptotime": null,
                        "contentValidity": "30",
                        "contentPrice": "0",
                        "channelId": "CUSTOMER SERVICE",
                        "info": "1",
                        "duration": "1 Min"
                    }, {
                        "toneId": "150877030733906",
                        "soRame": "Kinideuna Sailadai Antara",
                        "gifterMsisdn": "668287271",
                        "toneDownInterface": "C",
                        "toneDownSubInterface": "null",
                        "enableDate": "2022-03-08",
                        "lastBillDate": "2022-03-08",
                        "toneValidity": 30,
                        "nextRenewalDate": "2022-04-07",
                        "lastChargeAmount": 30.0,
                        "toneFlag": "T",
                        "packId": "LP_comvi_GIFTE_916",
                        "status": "1",
                        "toneSetStatus": "1",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.wav",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/1508/770/30/73/39/150877030733906.jpg",
                        "artist": "SADHANA SARGAM",
                        "contentType": "T",
                        "contentValidityType": "Days",
                        "currencyCode": "EGP",
                        "toneStatus": "Active",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET/1508/770/30/73/39/150877030733906.awb",
                        "toneNameLetter": "KSA",
                        "artistNameLetter": "SS",
                        "artistSex": "null",
                        "reOrderMode": "0",
                        "contentLanguage": "null",
                        "lastChargedDuration": "30",
                        "cpName": "Digitainment_Ge",
                        "cpCode": "508",
                        "toneCode": "0733906",
                        "singerName": "SADHANA SARGAM",
                        "copyRightUptodate": "2025-09-30",
                        "lastBillTime": "21:30:33",
                        "enableTime": "21:30:33",
                        "nextRenewalTime": "21:30:33",
                        "autoRenewalFlag": "-1",
                        "copyRightUptotime": null,
                        "contentValidity": "30",
                        "contentPrice": "0",
                        "channelId": "CUSTOMER SERVICE",
                        "info": "1",
                        "duration": "1 Min"
                    }
                ]
            }
        };

        // let response = "222";
        return response;
    } catch (err) {
        throw (err);
    }
}
const toneActivation = async (dataJson) => {
    try {
        response = {
            "respCode": "0",
            "respMsg": "Your have successfully activated the callertune.",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const filter = async (req, res) => {
    try {
        response = {
            "respCode": "0",
            "respMsg": "Tone fetched successfully",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "title": null,
            "artist": null,
            "movie": null,
            "album": null,
            "nametune": null,
            "data": {
                "totalContent": 1,
                "nextContentAvailable": false,
                "currentOffset": 10,
                "content": [
                    {
                        "contentPlan": "LP_comvi_TONE_902",
                        "contentPrice": "500",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET//1563/770/30/77/02/156377030770213.wav",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images//1563/770/30/77/02/156377030770213.jpg",
                        "contentArtist": "PT. JASRAJ, BHAI NIRMAL SINGH, SONU NIGAM, KAILASH KHER, PUNEET",
                        "contentAlbum": "Nanak Shah Fakir",
                        "contentType": "tone",
                        "ccode": "0770213",
                        "shortCode": "R70213",
                        "genre": "HINDI SONGS",
                        "subGenre": "LATEST RELEASES SONGS",
                        "subSubGenre": "PREMIUM",
                        "cpName": "hungama",
                        "subscriptionPrice": "0",
                        "subscriptionValidity": "30",
                        "contentValidityType": "Days",
                        "subscriptionValidityType": "Days",
                        "currencyCode": "EGP",
                        "language": "en",
                        "orderInfo": "1",
                        "info": "",
                        "uploadTime": "2021-10-12T11:17:32",
                        "copyrightEndDate": "2025-09-30T15:49:49",
                        "toneApprovalTime": "2021-10-12T11:17:32",
                        "toneUpdatedTime": "2021-10-12T11:17:32",
                        "cpCode": "563",
                        "artistNameLetter": "PJBNSSNKKP",
                        "artistSex": "",
                        "toneNameLetter": "NA",
                        "toneCode": "0770213",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET//1563/770/30/77/02/156377030770213.awb",
                        "contentLanguage": "HINDI",
                        "status": "0",
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Nanak Aaya",
                        "id": "156377030770213"
                    }
                ],
                "contentList": null

            }
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const searchContent = async (req, res) => {
    try {
        response = {
            "respCode": "0",
            "respMsg": "Tone fetched successfully",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "title": {
                "totalContent": 1058,
                "nextContentAvailable": true,
                "currentOffset": 1,
                "content": [
                    {
                        "contentPlan": "LP_comvi_TONE_902",
                        "contentPrice": "500",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET//1520/770/30/73/59/152077030735963.wav",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images//1520/770/30/73/59/152077030735963.jpg",
                        "contentArtist": "THE SCRIPT",
                        "contentAlbum": "Love Not Lovers The Script",
                        "contentType": "tone",
                        "ccode": "0735963",
                        "shortCode": "R35963",
                        "genre": "ENGLISH SONGS",
                        "subGenre": "LATEST RELEASES SONGS",
                        "subSubGenre": "PREMIUM",
                        "cpName": "sony_music",
                        "subscriptionPrice": "0",
                        "subscriptionValidity": "30",
                        "contentValidityType": "Days",
                        "subscriptionValidityType": "Days",
                        "currencyCode": "EGP",
                        "language": "en",
                        "orderInfo": "1",
                        "info": "",
                        "uploadTime": "2021-10-12T11:17:32",
                        "copyrightEndDate": "2025-09-30T15:49:49",
                        "toneApprovalTime": "2021-10-12T11:17:32",
                        "toneUpdatedTime": "2021-10-12T11:17:32",
                        "cpCode": "520",
                        "artistNameLetter": "TS",
                        "artistSex": "",
                        "toneNameLetter": "LNL",
                        "toneCode": "0735963",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET//1520/770/30/73/59/152077030735963.awb",
                        "contentLanguage": "ENGLISH",
                        "status": "0",
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Love Not Lovers",
                        "id": "152077030735963"
                    }
                ],
                "contentList": null
            },
            "artist": {
                "totalContent": 31,
                "nextContentAvailable": true,
                "currentOffset": 1,
                "content": [
                    {
                        "contentPlan": "LP_comvi_TONE_902",
                        "contentPrice": "500",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET//1000/912/00/00/01/100091200000160.wav",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images//1000/912/00/00/01/100091200000160.jpg",
                        "contentArtist": "SUPERLOVE",
                        "contentAlbum": "SINGLE",
                        "contentType": "tone",
                        "ccode": "0000160",
                        "shortCode": "R00160",
                        "genre": "SONG OF THE DAY",
                        "subGenre": "PREMIUM",
                        "subSubGenre": "PREMIUM",
                        "cpName": "Jeff_Music",
                        "subscriptionPrice": "0",
                        "subscriptionValidity": "30",
                        "contentValidityType": "Days",
                        "subscriptionValidityType": "Days",
                        "currencyCode": "EGP",
                        "language": "en",
                        "orderInfo": "1",
                        "info": "",
                        "uploadTime": "2021-10-12T11:17:32",
                        "copyrightEndDate": "2025-09-30T15:49:49",
                        "toneApprovalTime": "2021-10-12T11:17:32",
                        "toneUpdatedTime": "2021-10-12T11:17:32",
                        "cpCode": "84",
                        "artistNameLetter": "S",
                        "artistSex": "",
                        "toneNameLetter": "S",
                        "toneCode": "0000160",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET//1000/912/00/00/01/100091200000160.awb",
                        "contentLanguage": "ENGLISH",
                        "status": "0",
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Superlove",
                        "id": "100091200000160"
                    }
                ],
                "contentList": null
            },
            "movie": {
                "totalContent": 811,
                "nextContentAvailable": true,
                "currentOffset": 1,
                "content": [
                    {
                        "contentPlan": "LP_comvi_TONE_902",
                        "contentPrice": "500",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET//1547/770/30/74/05/154777030740500.wav",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images//1547/770/30/74/05/154777030740500.jpg",
                        "contentArtist": "DHAMENDRA SEWAN NIKITA THAPA",
                        "contentAlbum": "LOVE LOVE LOVE",
                        "contentType": "tone",
                        "ccode": "0740500",
                        "shortCode": "R40500",
                        "genre": "NEPALI SONGS",
                        "subGenre": "FOLK SONGS",
                        "subSubGenre": "PREMIUM",
                        "cpName": "Highlights_Nepal",
                        "subscriptionPrice": "0",
                        "subscriptionValidity": "30",
                        "contentValidityType": "Days",
                        "subscriptionValidityType": "Days",
                        "currencyCode": "EGP",
                        "language": "en",
                        "orderInfo": "1",
                        "info": "",
                        "uploadTime": "2021-10-12T11:17:32",
                        "copyrightEndDate": "2025-09-30T15:49:49",
                        "toneApprovalTime": "2021-10-12T11:17:32",
                        "toneUpdatedTime": "2021-10-12T11:17:32",
                        "cpCode": "547",
                        "artistNameLetter": "DSNT",
                        "artistSex": "",
                        "toneNameLetter": "D",
                        "toneCode": "0740500",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET//1547/770/30/74/05/154777030740500.awb",
                        "contentLanguage": "NEPALI",
                        "status": "0",
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Dhuntanana",
                        "id": "154777030740500"
                    }
                ],
                "contentList": null
            },
            "album": {
                "currentOffset": 1,
                "totalContent": 0,
                "nextContentAvailable": false,
                "content": []
            },
            "nametune": {
                "totalContent": 1,
                "nextContentAvailable": true,
                "currentOffset": 1,
                "content": [
                    {
                        "contentPlan": "LP_comvi_TONE_902",
                        "contentPrice": "500",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET//9999/999/12/51/62/999999912516207.wav",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/null.jpg",
                        "contentArtist": "Sreelata",
                        "contentAlbum": "Name Tunes",
                        "contentType": "tone",
                        "ccode": "6918699",
                        "shortCode": "",
                        "genre": "NAMETUNES",
                        "subGenre": "PREMIUM",
                        "subSubGenre": "PREMIUM",
                        "cpName": "cpuser",
                        "subscriptionPrice": "0",
                        "subscriptionValidity": "30",
                        "contentValidityType": "Days",
                        "subscriptionValidityType": "Days",
                        "currencyCode": "EGP",
                        "language": "en",
                        "orderInfo": "1",
                        "info": "",
                        "uploadTime": "2021-10-12T11:17:32",
                        "copyrightEndDate": "2025-09-30T15:49:49",
                        "toneApprovalTime": "2021-10-12T11:17:32",
                        "toneUpdatedTime": "2021-10-12T11:17:32",
                        "cpCode": "0",
                        "artistNameLetter": "S",
                        "artistSex": "",
                        "toneNameLetter": "LCS",
                        "toneCode": "6918699",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET//9999/999/12/51/62/999999912516207.awb",
                        "contentLanguage": "English",
                        "status": "0",
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Love Christmas Special",
                        "id": "999999912516207"
                    }
                ],
                "contentList": null
            },
            "data": null

        }


        return response;

    } catch (err) {
        throw (err);
    }
}
const searchContentMetadata = async (dataJson) => {
    try {
        response = {
            "respCode": "0",
            "respMsg": "Tone fetched successfully",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "title": null,
            "artist": null,
            "movie": null,
            "album": null,
            "nametune": null,
            "data": {
                "totalContent": 1045,
                "nextContentAvailable": true,
                "currentOffset": 1,
                "content": [
                    {
                        "contentPlan": "LP_comvi_TONE_902",
                        "contentPrice": "500",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET//1520/770/30/73/59/152077030735963.wav",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images//1520/770/30/73/59/152077030735963.jpg",
                        "contentArtist": "THE SCRIPT",
                        "contentAlbum": "Love Not Lovers The Script",
                        "contentType": "tone",
                        "ccode": "0735963",
                        "shortCode": "R35963",
                        "genre": "ENGLISH SONGS",
                        "subGenre": "LATEST RELEASES SONGS",
                        "subSubGenre": "PREMIUM",
                        "cpName": "sony_music",
                        "subscriptionPrice": "0",
                        "subscriptionValidity": "30",
                        "contentValidityType": "Days",
                        "subscriptionValidityType": "Days",
                        "currencyCode": "EGP",
                        "language": "en",
                        "orderInfo": "1",
                        "info": "",
                        "uploadTime": "2021-10-12T11:17:32",
                        "copyrightEndDate": "2025-09-30T15:49:49",
                        "toneApprovalTime": "2021-10-12T11:17:32",
                        "toneUpdatedTime": "2021-10-12T11:17:32",
                        "cpCode": "520",
                        "artistNameLetter": "TS",
                        "artistSex": "",
                        "toneNameLetter": "LNL",
                        "toneCode": "0735963",
                        "hdTonePath": "https://dmxp.comviva.com:3048/tonesET//1520/770/30/73/59/152077030735963.awb",
                        "contentLanguage": "ENGLISH",
                        "status": "0",
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Love Not Lovers",
                        "id": "152077030735963"
                    }
                ],
                "contentList": null
            }

        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const category = async (dataJson) => {
    try {
        response = {
            "respCode": "0",
            "respMsg": "Content fetched successfully",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "data": {
                "totalContent": 0,
                "nextContentAvailable": false,
                "currentOffset": 0,
                "totalCat": 44,
                "nextCatAvailable": true,
                "nextCatOffset": 1,
                "content": null,
                "category": [
                    {
                        "id": "1055",
                        "title": "LATEST SONGS",
                        "imagePath": "http://172.30.24.58:5007/content/image/category/1055.jpg",
                        "type": "Tone"
                    }
                ],
                "parentId": null,
                "parentTitle": null
            }
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const subCategory = async (dataJson) => {
    try {
        response = {
            "respCode": "0",
            "respMsg": "Content fetched successfully",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "data": {
                "totalContent": 1,
                "nextContentAvailable": false,
                "currentOffset": 1,
                "totalCat": 1,
                "nextCatAvailable": false,
                "nextCatOffset": 1,
                "content": [
                    {
                        "contentPlan": "",
                        "contentPrice": "",
                        "contentPath": "https://dmxp.comviva.com:3048/tonesET/1020/912/00/00/01/102091200000193.wav",
                        "contentValidity": "",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/1020/912/00/00/01/102091200000193.jpg",
                        "contentArtist": "TYLOR SHIFT",
                        "contentAlbum": "FEARLESS",
                        "contentType": "T",
                        "ccode": "0000193",
                        "shortCode": "R00193",
                        "genre": "LOVE SONGS",
                        "subGenre": "PREMIUM",
                        "subSubGenre": "PREMIUM",
                        "cpName": "Tele_Magic",
                        "subscriptionPrice": null,
                        "subscriptionValidity": null,
                        "contentValidityType": null,
                        "subscriptionValidityType": null,
                        "currencyCode": null,
                        "language": null,
                        "orderInfo": null,
                        "info": null,
                        "uploadTime": null,
                        "copyrightEndDate": null,
                        "toneApprovalTime": null,
                        "toneUpdatedTime": null,
                        "cpCode": null,
                        "artistNameLetter": null,
                        "artistSex": null,
                        "toneNameLetter": null,
                        "toneCode": null,
                        "hdTonePath": null,
                        "contentLanguage": null,
                        "status": null,
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "love story",
                        "id": "102091200000193"
                    }
                ],
                "category": [
                    {
                        "id": "452",
                        "title": "PREMIUM",
                        "imagePath": "http://172.30.24.58:5007/content/image/subcategory/452.jpg",
                        "type": "Tone"
                    }
                ],
                "parentId": "4",
                "parentTitle": "LOVE SONGS"

            }
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const specialCategory = async (dataJson) => {
    try {
        response = {
            "respCode": "0",
            "respMsg": "Content fetched successfully",
            "resultCode": 0,
            "result": null,
            "transactionId": null,
            "childTrId": null,
            "data": {
                "totalContent": 200,
                "nextContentAvailable": true,
                "currentOffset": 1,
                "totalCat": 0,
                "nextCatAvailable": false,
                "nextCatOffset": 0,
                "content": [
                    {
                        "contentPlan": "LP_comvi_TONE_902",
                        "contentPrice": "500",
                        "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Love_Story_Taylor_Swift-Ringtonestar.Net.mp3",
                        "contentValidity": "30",
                        "contentImagePath": "https://dmxp.comviva.com:3048/images/null.jpg",
                        "contentArtist": "RAJESH KHANNA,REKHA,ASRANI",
                        "contentAlbum": "Namak Haraam",
                        "contentType": "tone",
                        "ccode": "0698757",
                        "shortCode": "R98757",
                        "genre": "FESTIVAL AND OCCASION SPECIAL",
                        "subGenre": "PREMIUM",
                        "subSubGenre": "PREMIUM",
                        "cpName": "SAREGAMA",
                        "subscriptionPrice": null,
                        "subscriptionValidity": null,
                        "contentValidityType": null,
                        "subscriptionValidityType": null,
                        "currencyCode": null,
                        "language": null,
                        "orderInfo": null,
                        "info": null,
                        "uploadTime": null,
                        "copyrightEndDate": null,
                        "toneApprovalTime": null,
                        "toneUpdatedTime": null,
                        "cpCode": null,
                        "artistNameLetter": null,
                        "artistSex": null,
                        "toneNameLetter": null,
                        "toneCode": null,
                        "hdTonePath": null,
                        "contentLanguage": null,
                        "status": null,
                        "contentId": null,
                        "contentInPlaylist": "R",
                        "title": "Nadiya Se Dariya",
                        "id": "010505070698757"
                    }
                ],
                "category": null,
                "parentId": null,
                "parentTitle": null

            }
        }
        return response;

    } catch (err) {
        throw (err);
    }
}
const tariffCategory = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "name": "Personal",
                "parent": "Null",
                "weight": 1
            },
            {
                "id": 2,
                "name": "Business",
                "parent": "Null",
                "weight": 2
            },
            {
                "id": 3,
                "name": "Mtn plus",
                "parent": 1,
                "weight": 3
            },
            {
                "id": 4,
                "name": "Mtn plus",
                "parent": 2,
                "weight": 4
            },
            {
                "id": 5,
                "name": "Mtn plus Month",
                "parent": 1,
                "weight": 5
            },{
                "id": 6,
                "name": "Mtn plus Month",
                "parent": 2,
                "weight": 6
            },{
                "id": 7,
                "name": "Mtn XtraSpecial",
                "parent": 1,
                "weight": 7
            },
            {
                "id": 8,
                "name": "Mtn XtraSpecial",
                "parent": 2,
                "weight": 8
            },
            {
                "id": 9,
                "name": "Mtn BetaTalk",
                "parent": 1,
                "weight": 9
            },
            {
                "id": 10,
                "name": "Mtn BetaTalk",
                "parent": 2,
                "weight": 10
            }
            ]
        };
        return response;
    } catch (err) {
        throw (err);
    }
}
const plan = async (req, res) => {
    try {
        console.log("plan");
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "title": "MTN Plus",
                "currency": "R",
                "price": 10,
                "plantype": "Month",
                "weight": 1,
                "attributes": {
                    "internet": "Unlimited",
                    "speed": "Upto 100 Mbps",
                    "calls": "Unlimited",
                    "body": "Save 10.20 with annual plan 120",
                    "text": "Netflix and more benefits",
                    "label": "bestseller"
                }
            },
            {
                "id": 2,
                "category": "2",
                "subcategory_id": "3",
                "title": "MTN XtraPlus",
                "currency": "R",
                "price": 50,
                "plantype": "Month",
                "weight": 2,
                "attributes": {
                    "internet": "Unlimited",
                    "speed": "Upto 200 Mbps",
                    "calls": "Unlimited",
                    "body": "Save 10.20 with annual plan 120",
                    "text": "Netflix and more benefits",
                    "label": "bestseller"
                }
            }
            ],
            "pager": {
                "current_page": null,
                "total_items": 1,
                "total_pages": 1,
                "items_per_page": 10
            }
        };

        return response;
    } catch (err) {
        throw (err);
    }
}
const currentplan = async (req, res) => {
    try {
        console.log("currentplan");
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "subcategory_id": "2",
                "title": "MTN Plus",
                "currency": "R",
                "price": 10,
                "plantype": "Month",
                "weight": 1,
                "attributes": {
                    "internet": "Unlimited",
                    "speed": "Upto 100 Mbps",
                    "calls": "Unlimited",
                    "body": "Save 10.20 with annual plan 120",
                    "text": "Netflix and more benefits",
                    "label": "bestseller"
                }
            }

            ]

        };

        return response;
    } catch (err) {
        throw (err);
    }
}
const rechargeCategory = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "name": "Data Bundles",
                "parent": "Null",
                "weight": 1
            },
            {
                "id": 2,
                "name": "Hynetflex Bundles",
                "parent": "Null",
                "weight": 2
            },
            {
                "id": 3,
                "name": "Data & Voice Bundles",
                "parent": "Null",
                "weight": 2
            },
            {
                "id": 4,
                "name": "Hot Deals",
                "parent": 2,
                "weight": 3
            },
            {
                "id": 5,
                "name": "Weekly",
                "parent": 2,
                "weight": 4
            }
            ]
        };
        return response;
    } catch (err) {
        throw (err);
    }
}

const rechargePlan = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "currency": "R",
                "price": 10,
                "weight": 1,
                "attributes": {
                    "validity": "2 Days",
                    "data": "2GB",
                    "calls": "Unlimited"

                }
            },
            {
                "id": 2,
                "category": 2,
                "currency": "R",
                "price": 100,
                "weight": 1,
                "attributes": {
                    "validity": "30 Days",
                    "data": "5GB",
                    "calls": "Unlimited"
                }
                },

                {
                    "id": 3,
                    "category": 5,
                    "currency": "R",
                    "price": 300,
                    "weight": 1,
                    "attributes": {
                        "validity": "30 Days",
                        "data": "7GB",
                        "calls": "Unlimited"
                    }
                    },
                    {
                        "id": 4,
                        "category": 5,
                        "currency": "R",
                        "price": 400,
                        "weight": 1,
                        "attributes": {
                            "validity": "30 Days",
                            "data": "7GB",
                            "calls": "Unlimited"
        
                        }
            }
            ],
            "pager": {
                "current_page": null,
                "total_items": 1,
                "total_pages": 1,
                "items_per_page": 10
            }
        };
        return response;
    } catch (err) {
        throw (err);
    }
}

const rechargeMobile = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "currency": "R",
                "price": 10,
                "weight": 1,
                "attributes": {
                    "validity": "2 Days",
                    "data": "2GB",
                    "calls": "Unlimited"

                }
            },
            {
                "id": 2,
                "category": 2,
                "currency": "R",
                "price": 100,
                "weight": 1,
                "attributes": {
                    "validity": "30 Days",
                    "data": "5GB",
                    "calls": "Unlimited"
                }
                },

                {
                    "id": 2,
                    "category": 5,
                    "currency": "R",
                    "price": 300,
                    "weight": 1,
                    "attributes": {
                        "validity": "30 Days",
                        "data": "7GB",
                        "calls": "Unlimited"
                    }
                    },
                    {
                        "id": 2,
                        "category": 5,
                        "currency": "R",
                        "price": 400,
                        "weight": 1,
                        "attributes": {
                            "validity": "30 Days",
                            "data": "7GB",
                            "calls": "Unlimited"
        
                        }
            }
            ],
            "pager": {
                "current_page": null,
                "total_items": 1,
                "total_pages": 1,
                "items_per_page": 10
            }
        };
        return response;
    } catch (err) {
        throw (err);
    }
}

const emergency = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "currency": "R",
                "price": 10,
                "weight": 1,
                "attributes": {
                    "validity": "24 Hrs",
                    "data": "100 MB",
                    "calls": "Truly Unlimited"

                }
            },
            {
                "id": 2,
                "category": 2,
                "currency": "R",
                "price": 20,
                "weight": 1,
                "attributes": {
                    "validity": "24 Hrs",
                    "data": "200 MB",
                    "calls": "Truly Unlimited"
                }
                },

                {
                    "id": 3,
                    "category": 5,
                    "currency": "R",
                    "price": 30,
                    "weight": 1,
                    "attributes": {
                        "validity": "24 Hrs",
                        "data": "300 MB",
                        "calls": "Truly Unlimited"
                    }
                    },
                    {
                        "id": 4,
                        "category": 5,
                        "currency": "R",
                        "price": 40,
                        "weight": 1,
                        "attributes": {
                            "validity": "24 Hrs",
                            "data": "400 MB",
                            "calls": "Truly Unlimited"
        
                        }
            }
            ],
            "pager": {
                "current_page": null,
                "total_items": 1,
                "total_pages": 1,
                "items_per_page": 10
            }
        };
        return response;
    } catch (err) {
        throw (err);
    }
}
const rechargeNumber = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "currency": "R",
                "price": 2000,
                
                "weight": 1,
                "name":"Mideen",
                "number":"+919940828655",
                "plan":{
                    "ProductName": "100GB 1-Month Plan",
                    "ProductID": "199",
                    "Category": "DataPlan",
                    "SubCategory": "DataPlan 60Days",
                    "Price": "2000",
                    "Data": 30,
                "Calls": 2000,

                    "Validity": "60 days",
                    "Renewal": "true",
                    "isConsentRequired": "true",
                    "BuyForOthers": "true",
                    "PaymentMode": "SCAPv2",
                    "Description": "Get 100GB for N20,000. Valid for 60 days.",
                    "Status": "ACTIVE_FOR_MARKET",
                    "OfferId": "914",
                    "GracePeriod": "30 days",
                    "DataShareDenomination": "NA",
                    "FixedRenewalDate": "NA",
                    "LastModifiedDate": "2021-1-30 3:30:44",
                    "promotionApplicable": "false",
                    "Parking": "Yes",
                    "Action": "Subscription:RACT_NG_Data_199",
                    "deactivationId": "RSDeprovisionProduct:DACT_NG_Data_199",
                    "optin": "Opt-In:199",
                    "optout": "Opt-Out:199"
                }
            },
            {
                "id": 2,
                "category": "1",
                "currency": "R",
                "price": 256,
                "weight": 1,
                "name":"Thiru",
                "number":"+919840175953",
                "plan":{
                    "ProductName": "350MB Weekly data plan",
            "ProductID": "152",
            "Category": "DataPlan",
            "SubCategory": "DataPlan Weekly",
            "Price": "256",
            "Data": 30,
            "Calls": 2000,
            "Validity": "7 days",
            "Renewal": "true",
            "isConsentRequired": "true",
            "BuyForOthers": "true",
            "PaymentMode": "SCAPv2,PULSE",
            "Description": "Get 350MB for N300. Valid for 7 days.",
            "Status": "ACTIVE_FOR_MARKET",
            "OfferId": "952",
            "GracePeriod": "24 days",
            "DataShareDenomination": "NA",
            "FixedRenewalDate": "NA",
            "LastModifiedDate": "2021-10-11 10:54:19",
            "promotionApplicable": "true",
            "Parking": "Yes",
            "Action": "Subscription:RACT_NG_Data_152",
            "deactivationId": "RSDeprovisionProduct:DACT_NG_Data_152",
            "optin": "Opt-In:152",
            "optout": "Opt-Out:152"
                }
            },
            {
                "id": 3,
                "category": "1",
                "currency": "R",
                "price": 1000,
                "weight": 1,
                "name":"Chandan",
                "number":"+27718565770",
                "plan":{
                    "ProductName": "160GB 2-Month Plan",
                        "ProductID": "210",
                        "Category": "DataPlan",
                        "SubCategory": "DataPlan 60Days",
                        "Price": "1000",
                        "Data": 30,
                         "Calls": 2000,
                        "Validity": "60 days",
                        "Renewal": "true",
                        "isConsentRequired": "true",
                        "BuyForOthers": "true",
                        "PaymentMode": "SCAPv2",
                        "Description": "Get 160GB for N30,000. Valid for 60 days.",
                        "Status": "ACTIVE_FOR_MARKET",
                        "OfferId": "969",
                        "GracePeriod": "60 days",
                        "DataShareDenomination": "NA",
                        "FixedRenewalDate": "NA",
                        "LastModifiedDate": "2021-1-30 3:35:23",
                        "promotionApplicable": "false",
                        "Parking": "Yes",
                        "Action": "Subscription:RACT_NG_Data_210",
                        "deactivationId": "RSDeprovisionProduct:DACT_NG_Data_210",
                        "optin": "Opt-In:210",
                        "optout": "Opt-Out:210"
                }
            },
             
            ],
            "pager": {
                "current_page": null,
                "total_items": 1,
                "total_pages": 1,
                "items_per_page": 10
            }
        };
        return response;
    } catch (err) {
        throw (err);
    }
}

const seachRecharge = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "currency": "R",
                "price": 10,
                "weight": 1,
                "attributes": {
                    "validity": "2 Days",
                    "data": "2GB",
                    "calls": "Unlimited"

                }
            },
            {
                "id": 2,
                "category": 2,
                "currency": "R",
                "price": 100,
                "weight": 1,
                "attributes": {
                    "validity": "30 Days",
                    "data": "5GB",
                    "calls": "Unlimited"
                }
                },

                {
                    "id": 3,
                    "category": 5,
                    "currency": "R",
                    "price": 300,
                    "weight": 1,
                    "attributes": {
                        "validity": "30 Days",
                        "data": "7GB",
                        "calls": "Unlimited"
                    }
                    },
                    {
                        "id": 4,
                        "category": 5,
                        "currency": "R",
                        "price": 400,
                        "weight": 1,
                        "attributes": {
                            "validity": "30 Days",
                            "data": "7GB",
                            "calls": "Unlimited"
        
                        }
            }
            ],
            "pager": {
                "current_page": null,
                "total_items": 1,
                "total_pages": 1,
                "items_per_page": 10
            }
        };
        return response;
    } catch (err) {
        throw (err);
    }
}
const recentRechargePlans = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "currency": "R",
                "price": 10,
                "weight": 1,
                "attributes": {
                    "validity": "2 Days",
                    "data": "1GB",
                    "calls": "Unlimited"
                }
            },
            {
                "id": 2,
                "currency": "R",
                "price": 20,
                "weight": 1,
                "attributes": {
                    "validity": "7 Days",
                    "data": "5GB",
                    "calls": "Unlimited"

                }
            }
            ],
            "pager": {
                "current_page": null,
                "total_items": 1,
                "total_pages": 1,
                "items_per_page": 10
            }
        };
        return response;
    } catch (err) {
        throw (err);
    }
}

const tariffCurrentplan = async (req, res) => {
    try {
        console.log("currentplan");
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "subcategory_id": "2",
                "Validity": "56 days",
                "data": "5",
                "data_type":'GB',
                "currency": "R",
                "price": 156,
                "calls": "Truly Unlimited Data - 1.5GB/day",
                "sms":"100/day",
                "weight": 1,
               
            }

            ]

        };

        return response;
    } catch (err) {
        throw (err);
    }
}
const postpaidCategory = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": "1",
                "name": "personal",
                "weight": 1
            }, {
                "id": "2",
                "name": "business",
                "weight": 2
            }]


        };
        return response;
    } catch (err) {
        throw (err);
    }
}
const postpaidPlan = async (req, res) => {
    try {
        response = {
            "rows": [{
                "id": 1,
                "category": "1",
                "title": "MTN Postpaid Monthly",
                "currency": "R",
                "price": 256,
                "plantype": "Month",
                "weight": 1,
                "attributes": {
                    "description": "Limitless calls, data, SMS in a single pack",
                    "data": "No Data Limit for you",
                    "calls": "Unlimited local/Roaming",
                    "sms": "300 per month",
                    "info": "Netflix and more benefits",
                    "label": "bestseller"
                }
            },
            {
                "id": 2,
                "category": "1",
                "title": "MTN Postpaid Plan",
                "currency": "R",
                "price": 356,
                "plantype": "Month",
                "weight": 2,
                "attributes": {
                    "body_1": "Limitless calls, data, SMS in a single pack",
                    "data": "No Data Limit for you",
                    "calls": "Unlimited local/Roaming",
                    "sms": "3000 per month",
                    "text": "Netflix and more benefits",
                    "label": "2 Connections"
                }

            },
            {
                "id": 3,
                "category": "1",
                "title": "MTN Postpaid plan 2",
                "currency": "R",
                "price": 456,
                "plantype": "Month",
                "weight": 3,
                "attributes": {
                    "body_1": "Limitless calls, data, SMS in a single pack",
                    "data": "No Data Limit for you",
                    "calls": "Unlimited local/Roaming",
                    "sms": "3000 per month",
                    "text": "Netflix and more benefits",
                    "label": "2 Connections"
                }

            },
            {
                "id": 4,
                "category": "1",
                "title": "MTN Postpaid yearly",
                "currency": "R",
                "price": 656,
                "plantype": "Year",
                "weight": 4,
                "attributes": {
                    "body_1": "Limitless calls, data, SMS in a single pack",
                    "data": "No Data Limit for you",
                    "calls": "Unlimited local/Roaming",
                    "sms": "3000 per year",
                    "text": "Netflix and more benefits",
                    "label": "2 Connections"
                }

            }
            ],
            "pager": {
                "current_page": 0,
                "total_items": 5,
                "total_pages": 2,
                "items_per_page": 4
            }



        };
        return response;
    } catch (err) {
        throw (err);
    }
}
const mysubscription = async (req,res) => {
    try {
            
        response = {
            "upcomingRenewal": [{
                "id": 1,
                "title": "Ayoba",
                "validity": "Expires on 11th Aug 2021",
                "image": "http://125.16.139.20:8448/uploads/temp/image_ayoba_container@2x.png",
                "status": "Renew Now",
                 "description": "Chat.Listen.Share.Play.Pay",
                "amount": "100",
                "cycle": "Monthly",
                "autorenew": "yes",
                "reminder": "yes",
                "firstBill": "12 June 2020",
                "renew" : '',
                "weight": 1,
                "currency": "R",
                
                
            },
            {
                "id": 2,
                "title": "BBC 1 minute",
                "validity": "Expires on 11th Aug 2021",
                "image": process.env.PUBLIC_ORIGIN+"/uploads/temp/image_caller_tunez_container@2x.png",
                "status": "Renew Now",
                "description": "Chat.Listen.Share.Play.Pay",
                "amount": "200",
                "cycle": "Monthly",
                "autorenew": "yes",
                "reminder": "yes",
                "firstBill": "20 June 2021",
                "renew" : '',
                "weight":2,
                "currency": "R",
            }
            ],
            "expiredSubscription": [{
                "id": 3,
                "title": "TIDAL",
                "validity": "Expires on 11th Aug 2021",
                "image": process.env.PUBLIC_ORIGIN+"/uploads/temp/image_tidal_container@2x.png",
                "status": "Subscribed Again",
                "description": "Chat.Listen.Share.Play.Pay",
                "amount": "300",
                "cycle": "Monthly",
                "autorenew": "yes",
                "reminder": "yes",
                "firstBill": "20 June 2020",
                "renew" : '',
                "weight":3,
                "currency": "R",
                
            },
            {
                "id": 4,
                "title": "Gamer Pro",
                "validity": "Expires on 11th Aug 2021",
                "image": process.env.PUBLIC_ORIGIN+"/uploads/temp/image_gamer_pro_container@2x.png",
                "status": "Subscribed Again",
                "description": "Chat.Listen.Share.Play.Pay",
                "amount": "400",
                "cycle": "Monthly",
                "autorenew": "yes",
                "reminder": "yes",
                "firstBill": "21 July 2020",
                "renew" : '',
                "weight":4,
                "currency": "R",
            }
            ],
            "allYourSubscription": [{
                "id": 5,
                "title": "UduX",
                "validity": "Valid till 30th July 2022",
                "image":process.env.PUBLIC_ORIGIN+"/uploads/temp/image_udux_container@2x.png",
                "description": "Chat.Listen.Share.Play.Pay",
                "amount": "500",
                "cycle": "Monthly",
                "autorenew": "yes",
                "reminder": "yes",
                "firstBill": "12 August 2021",
                "renew" : '',
                "weight":5,
                "currency": "R",
                
            },
            {
                "id": 6,
                "title": "Lucky Number",
                "validity": "Valid till 30th July 2022",
                "image": process.env.PUBLIC_ORIGIN+"/uploads/temp/Bitmap Copy 4@2x.png",
                "description": "Chat.Listen.Share.Play.Pay",
                "amount": "600",
                "cycle": "Monthly",
                "autorenew": "yes",
                "reminder": "yes",
                "firstBill": "24 August 2021",
                "renew" : '',
                "weight":6,
                "currency": "R",
                
            },
            {
                "id": 7,
                "title": "Caller Tunez",
                "validity": "Valid till 30th July 2022",
                "image": process.env.PUBLIC_ORIGIN+"/uploads/temp/image_caller_tunez_container@2x.png",
                "description": "Chat.Listen.Share.Play.Pay",
                "amount": "700",
                "cycle": "Monthly",
                "autorenew": "yes",
                "reminder": "yes",
                "firstBill": "20 January 2022",
                "renew" : '',
                "weight":7,
                "currency": "R",
                
            },
            {
                "id": 8,
                "title": "Football Story",
                "validity": "Valid till 30th July 2022",
                "image": process.env.PUBLIC_ORIGIN+"/uploads/temp/image_football_story_container@2x.png",
                "description": "Chat.Listen.Share.Play.Pay",
                "amount": "800",
                "cycle": "Monthly",
                "autorenew": "yes",
                "reminder": "yes",
                "firstBill": "12 June 2021",
                "renew" : '',
                "weight":8,
                "currency": "R",
                
            },
            {
                "id": 9,
                "title": "Showmax",
                "validity": "Valid till 30th July 2022",
                "image": process.env.PUBLIC_ORIGIN+"/uploads/temp/image_showmax_container@2x.png",
                "description": "Chat.Listen.Share.Play.Pay",
                "amount": "900",
                "cycle": "Monthly",
                "autorenew": "yes",
                "reminder": "yes",
                "firstBill": "1 June 2020",
                "renew" : '',
                "weight":9,
                "currency": "R",
                
            },
            ],
            "pager": {
                "current_page": 0,
                "total_items": 5,
                "total_pages": 2,
                "items_per_page": 4
            }



        };
        return response;
    } catch (err) {
        throw (err);
    }
}
 
const postpaidSearch = async (req,res) => {
    try {
        let plan= dataJson.plan;
        let  price= dataJson.price;
        let array= [{
            "id": 1,
            "category": "1",
            "title": "MTN Postpaid",
            "currency": "R",
            "price": 156,
            "plantype": "Month",
            "weight": 1,
            "attributes": {
                "description": "Limitless calls, data, SMS in a single pack",
                "data": "No Data Limit for you",
                "calls": "Unlimited local/Roaming",
                "sms": "3000 per month",
                "info": "Netflix and more benefits",
                "label": "bestseller"
            }
        },
        {
            "id": 2,
            "category": "1",
            "title": "MTN Postpaid plan",
            "currency": "R",
            "price": 256,
            "plantype": "Month",
            "weight": 2,
            "attributes": {
                "body_1": "Limitless calls, data, SMS in a single pack",
                "data": "No Data Limit for you",
                "calls": "Unlimited local/Roaming",
                "sms": "4000 per month",
                "text": "Netflix and more benefits",
                "label": "2 Connections"
            }

        }
        ];
    
       
        if(plan!=undefined && price==undefined){
            var results=filterByValue(array, plan); 
        }else if(plan==undefined && price!=undefined){
            var results=filterByValue(array, price); 
        }else{
            var results=(filterByValue(array, (plan || price))); 
        }
        if(results.length>0){
        response = {
            "rows":results,
            "pager": {
                "current_page": 0,
                "total_items": 5,
                "total_pages": 2,
                "items_per_page": 4
            } 

        };
    }else{
        response =  {
            "Status": "Not found any records",
        }
    }

     
        return response;
    } catch (err) {
        throw (err);
    }
}
const all = async (req, res) => {
    try {
        response = {
            "responseCode": {
                "respCode": "0",
                "respMsg": "Content fetched successfully",
                "resultCode": 0,
                "result": null,
                "transactionId": null,
                "childTrId": null,
                "data": {
                    "totalContent": 200,
                    "nextContentAvailable": true,
                    "currentOffset": 1,
                    "totalCat": 0,
                    "nextCatAvailable": false,
                    "nextCatOffset": 0,
                    "content": [
                        {
                            "contentPlan": "LP_comvi_TONE_001",
                            "contentPrice": "200",
                            "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Sugar_Crash-Ringtonestar.Net.mp3",
                            "contentValidity": "30",
                            "contentImagePath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/sugarcrash.jpg",
                            "contentArtist": "ElyOtto",
                            "contentAlbum": "SugarCrash",
                            "contentType": "tone",
                            "ccode": "0698757",
                            "shortCode": "R98757",
                            "genre": "POP",
                            "subGenre": "PREMIUM",
                            "subSubGenre": "PREMIUM",
                            "cpName": "SAREGAMA",
                            "subscriptionPrice": null,
                            "subscriptionValidity": null,
                            "contentValidityType": null,
                            "subscriptionValidityType": null,
                            "currencyCode": null,
                            "language": null,
                            "orderInfo": null,
                            "info": null,
                            "uploadTime": null,
                            "copyrightEndDate": null,
                            "toneApprovalTime": null,
                            "toneUpdatedTime": null,
                            "cpCode": null,
                            "artistNameLetter": null,
                            "artistSex": null,
                            "toneNameLetter": null,
                            "toneCode": null,
                            "hdTonePath": null,
                            "contentLanguage": null,
                            "status": null,
                            "contentId": null,
                            "contentInPlaylist": "R",
                            "title": "ElyOtto  SugarCrash",
                            "id": "152077030735959"
                        },
        
        {
                            "contentPlan": "LP_comvi_TONE_002",
                            "contentPrice": "300",
                            "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Love_Story_Taylor_Swift-Ringtonestar.Net.mp3",
                            "contentValidity": "30",
                            "contentImagePath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/LoveStoryTaylorSwift.jpg",
                            "contentArtist": "Taylor Swift",
                            "contentAlbum": "Love Story",
                            "contentType": "tone",
                            "ccode": "06988965",
                            "shortCode": "R98736",
                            "genre": "POP",
                            "subGenre": "PREMIUM",
                            "subSubGenre": "PREMIUM",
                            "cpName": "SAREGAMA",
                            "subscriptionPrice": null,
                            "subscriptionValidity": null,
                            "contentValidityType": null,
                            "subscriptionValidityType": null,
                            "currencyCode": null,
                            "language": null,
                            "orderInfo": null,
                            "info": null,
                            "uploadTime": null,
                            "copyrightEndDate": null,
                            "toneApprovalTime": null,
                            "toneUpdatedTime": null,
                            "cpCode": null,
                            "artistNameLetter": null,
                            "artistSex": null,
                            "toneNameLetter": null,
                            "toneCode": null,
                            "hdTonePath": null,
                            "contentLanguage": null,
                            "status": null,
                            "contentId": null,
                            "contentInPlaylist": "R",
                            "title": "Taylor Swift - Love Story",
                            "id": "152077030735958"
                        },
        {
                            "contentPlan": "LP_comvi_TONE_003",
                            "contentPrice": "100",
                            "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Cover_Me_In_Sunshine-Ringtonestar.Net.mp3",
                            "contentValidity": "30",
                            "contentImagePath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/coverme.jpg",
                            "contentArtist": "Willow Sage Hart",
                            "contentAlbum": "Cover Me In Sunshine",
                            "contentType": "tone",
                            "ccode": "06988966",
                            "shortCode": "R98737",
                            "genre": "POP",
                            "subGenre": "PREMIUM",
                            "subSubGenre": "PREMIUM",
                            "cpName": "SAREGAMA",
                            "subscriptionPrice": null,
                            "subscriptionValidity": null,
                            "contentValidityType": null,
                            "subscriptionValidityType": null,
                            "currencyCode": null,
                            "language": null,
                            "orderInfo": null,
                            "info": null,
                            "uploadTime": null,
                            "copyrightEndDate": null,
                            "toneApprovalTime": null,
                            "toneUpdatedTime": null,
                            "cpCode": null,
                            "artistNameLetter": null,
                            "artistSex": null,
                            "toneNameLetter": null,
                            "toneCode": null,
                            "hdTonePath": null,
                            "contentLanguage": null,
                            "status": null,
                            "contentId": null,
                            "contentInPlaylist": "R",
                            "title": "P!nk, Willow Sage Hart - Cover Me In Sunshine",
                            "id": "152077030735957"
                        },
        
        {
                            "contentPlan": "LP_comvi_TONE_004",
                            "contentPrice": "150",
                            "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Stereo_Hearts-Ringtonestar.Net.mp3",
                            "contentValidity": "30",
                            "contentImagePath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/stereoheart.jpg",
                            "contentArtist": "Adam Levine",
                            "contentAlbum": "Stereo Hearts ft",
                            "contentType": "tone",
                            "ccode": "06988967",
                            "shortCode": "R98738",
                            "genre": "POP",
                            "subGenre": "PREMIUM",
                            "subSubGenre": "PREMIUM",
                            "cpName": "SAREGAMA",
                            "subscriptionPrice": null,
                            "subscriptionValidity": null,
                            "contentValidityType": null,
                            "subscriptionValidityType": null,
                            "currencyCode": null,
                            "language": null,
                            "orderInfo": null,
                            "info": null,
                            "uploadTime": null,
                            "copyrightEndDate": null,
                            "toneApprovalTime": null,
                            "toneUpdatedTime": null,
                            "cpCode": null,
                            "artistNameLetter": null,
                            "artistSex": null,
                            "toneNameLetter": null,
                            "toneCode": null,
                            "hdTonePath": null,
                            "contentLanguage": null,
                            "status": null,
                            "contentId": null,
                            "contentInPlaylist": "R",
                            "title": "Gym Class Heroes: Stereo Hearts ft. Adam Levine",
                            "id": "152077030735956"
                        },
        {
                            "contentPlan": "LP_comvi_TONE_004",
                            "contentPrice": "150",
                            "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Stereo_Hearts-Ringtonestar.Net.mp3",
                            "contentValidity": "30",
                            "contentImagePath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/stereoheart.jpg",
                            "contentArtist": "Adam Levine",
                            "contentAlbum": "Stereo Hearts ft",
                            "contentType": "tone",
                            "ccode": "06988967",
                            "shortCode": "R98738",
                            "genre": "POP",
                            "subGenre": "PREMIUM",
                            "subSubGenre": "PREMIUM",
                            "cpName": "SAREGAMA",
                            "subscriptionPrice": null,
                            "subscriptionValidity": null,
                            "contentValidityType": null,
                            "subscriptionValidityType": null,
                            "currencyCode": null,
                            "language": null,
                            "orderInfo": null,
                            "info": null,
                            "uploadTime": null,
                            "copyrightEndDate": null,
                            "toneApprovalTime": null,
                            "toneUpdatedTime": null,
                            "cpCode": null,
                            "artistNameLetter": null,
                            "artistSex": null,
                            "toneNameLetter": null,
                            "toneCode": null,
                            "hdTonePath": null,
                            "contentLanguage": null,
                            "status": null,
                            "contentId": null,
                            "contentInPlaylist": "R",
                            "title": "Gym Class Heroes: Stereo Hearts ft. Adam Levine",
                            "id": "152077030735955"
                        },
        {
                            "contentPlan": "LP_comvi_TONE_005",
                            "contentPrice": "450",
                            "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Touch_It-Ringtonestar.Net.mp3",
                            "contentValidity": "30",
                            "contentImagePath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/toughin.jpg",
                            "contentArtist": "Busta Rhymes",
                            "contentAlbum": "Touch It",
                            "contentType": "tone",
                            "ccode": "06988969",
                            "shortCode": "R98739",
                            "genre": "POP",
                            "subGenre": "PREMIUM",
                            "subSubGenre": "PREMIUM",
                            "cpName": "SAREGAMA",
                            "subscriptionPrice": null,
                            "subscriptionValidity": null,
                            "contentValidityType": null,
                            "subscriptionValidityType": null,
                            "currencyCode": null,
                            "language": null,
                            "orderInfo": null,
                            "info": null,
                            "uploadTime": null,
                            "copyrightEndDate": null,
                            "toneApprovalTime": null,
                            "toneUpdatedTime": null,
                            "cpCode": null,
                            "artistNameLetter": null,
                            "artistSex": null,
                            "toneNameLetter": null,
                            "toneCode": null,
                            "hdTonePath": null,
                            "contentLanguage": null,
                            "status": null,
                            "contentId": null,
                            "contentInPlaylist": "R",
                            "title": "Busta Rhymes - Touch It",
                            "id": "152077030735954"
                        },
        
        {
                            "contentPlan": "LP_comvi_TONE_006",
                            "contentPrice": "650",
                            "contentPath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/Shape_Of_You-Ringtonestar.Net.mp3",
                            "contentValidity": "30",
                            "contentImagePath": process.env.PUBLIC_ORIGIN+"/uploads/callertune/shapeofyou.jpg",
                            "contentArtist": "Ed Sheeran",
                            "contentAlbum": "Shape of You",
                            "contentType": "tone",
                            "ccode": "06978967",
                            "shortCode": "R56739",
                            "genre": "POP",
                            "subGenre": "PREMIUM",
                            "subSubGenre": "PREMIUM",
                            "cpName": "SAREGAMA",
                            "subscriptionPrice": null,
                            "subscriptionValidity": null,
                            "contentValidityType": null,
                            "subscriptionValidityType": null,
                            "currencyCode": null,
                            "language": null,
                            "orderInfo": null,
                            "info": null,
                            "uploadTime": null,
                            "copyrightEndDate": null,
                            "toneApprovalTime": null,
                            "toneUpdatedTime": null,
                            "cpCode": null,
                            "artistNameLetter": null,
                            "artistSex": null,
                            "toneNameLetter": null,
                            "toneCode": null,
                            "hdTonePath": null,
                            "contentLanguage": null,
                            "status": null,
                            "contentId": null,
                            "contentInPlaylist": "R",
                            "title": "Ed Sheeran - Shape of You",
                            "id": "152077030735963"
                        }
        
                    ],
                    "category": null,
                    "parentId": null,
                    "parentTitle": null
                }
            }
        }
        
        return response;

    } catch (err) {
        throw (err);
    }
}
module.exports = {
    mySubscribedCallertune,
    listOfAllAvailableCallertunes,
    toneDelete,
    unsubscribeFromRBTservice,
    tariffPlan,
    tariffCategory,
    tariffCurrentplan,
    plan,
    currentplan,
    dashboardPlan,
    toneProfile,
    jukebox,
    subscription,
    toneActivation,
    filter,
    searchContent,
    searchContentMetadata,
    category,
    subCategory,
    specialCategory,
    rechargeCategory,
    rechargePlan,
    recentRechargePlans,
    postpaidCategory,
    postpaidPlan,
    postpaidSearch,
    tarrifSearch,
    seachRecharge,
    rechargeNumber,
    rechargeMobile,
    emergency,
    mysubscription,
    all
}