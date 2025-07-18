const category = async (req, res) => {
  try {
    let response = {
      ResponseCode: "0",
      Status: "SUCCESS",
      ResponseDescription: "List of categories and subcategory",
      categories: [
        {
          id: 1,
          category: "DataBundle",
          subcategory: [
            {
              id: 1,
              title: "DataPlan Daily",
            },
            {
              id: 2,
              title: "DataPlan Weekly",
            },
            {
              id: 3,
              title: "DataPlan Monthly",
            },
            {
              id: 4,
              title: "DataPlan 60Days",
            },
            {
              id: 5,
              title: "DataPlan 90Days",
            },
            {
              id: 7,
              title: "DataPlan 180Days",
            },
            {
              id: 8,
              title: "DataPlan Yearly",
            },
          ],
        },
        {
          id: 2,
          category: "DATA AND VOICE",
          subcategory: [
            {
              id: 1,
              title: "XtraData",
            },
            {
              id: 2,
              title: "XtraTalk",
            },
          ],
        },
        {
          id: 3,
          category: "IDB",
          subcategory: [
            {
              id: 1,
              title: "IDB300",
            },
            {
              id: 2,
              title: "IDB500",
            },
            {
              id: 3,
              title: "IDB1500",
            },
          ],
        },
        {
          id: 4,
          category: "Roaming Bundles",
          subcategory: [
            {
              id: 1,
              title: "Roaming Data Bundle",
            },
            {
              id: 2,
              title: "Roaming Voice and Data Bundle",
            },
            {
              id: 3,
              title: "Roaming Voice Bundle",
            },
            {
              id: 4,
              title: "Roaming Data MTN Countries",
            },
          ],
        },
        {
          id: 5,
          category: "Social Bundles",
          subcategory: [
            {
              id: 1,
              title: "WhatsApp",
            },
            {
              id: 2,
              title: "Social Mega Bundle",
            },
            {
              id: 3,
              title: "FaceBook",
            },
            {
              id: 4,
              title: "Instagram",
            },
            {
              id: 5,
              title: "WeChat",
            },
            {
              id: 6,
              title: "2Go",
            },
            {
              id: 7,
              title: "Youtube Plus",
            },
            {
              id: 7,
              title: "Opera Mini",
            },
            {
              id: 8,
              title: "WhatsApp and Facebook",
            },
            {
              id: 9,
              title: "Social Bundle",
            },
            {
              id: 10,
              title: "YouTube/Instagram/TikTok",
            },
            {
              id: 11,
              title: "IG/TikTok Bundle",
            },
            {
              id: 12,
              title: "Pulse Nightlife",
            },
            {
              id: 13,
              title: "Ayoba",
            },
            {
              id: 14,
              title: "TikTok",
            },
            {
              id: 15,
              title: "SME BizPlus",
            },
            {
              id: 16,
              title: "SME Data Share Bundles",
            },
          ],
        },
      ],
    };
    return response;
  } catch (err) {
    throw err;
  }
};

const buildbunbles = async (req, res) => {
  try {
    response = {
      Status: "SUCCESS",
      ResponseDescription: "Build your bundles",
      categories: [
        {
          id: 1,
          weight: 1,
          title: "Voice Bundle",
          currency: "R",
          amount: 1000,
          description: "N41000 talk time for",
        },
        {
          id: 2,
          weight: 2,
          title: "Data Voice Bundle",
          currency: "R",
          amount: 1500,
          description: "N41500 talk time for",
        },
        {
          id: 3,
          weight: 3,
          title: "Roaming Add On's",
          currency: "R",
          amount: 2000,
          description: "N42000 talk time for",
        },
        {
          id: 4,
          weight: 4,
          title: "International Calling Bundles",
          currency: "R",
          amount: 2500,
          description: "N3000 talk time for",
        },
        {
          id: 5,
          weight: 5,
          title: "Roaming data & voice bundle",
          currency: "R",
          amount: 3000,
          description: "N4100 talk time for",
        },
      ],
    };
    return response;
  } catch (ex) {
    console.err(ex);
    throw ex;
  }
};
module.exports = {
  category,

  buildbunbles,
};
