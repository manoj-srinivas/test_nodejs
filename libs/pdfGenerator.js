var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template

  const pdfCreate = async (req, res) => {
    try {
      let response = {};
        var html = fs.readFileSync("index.html", "utf8");
        const filename = Math.random() + '_doc' + '.pdf';
        var options = {
        
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Last 5 Transactions</div>'
            },
            footer: {
                height: "28mm",
                contents: {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
        };
        var transaction = [
            {
              plan: "Xtraplan",
              price: 110,
              pack: "Data Pack",
              status:"Successful",
              date:"09 May, 2022 02:20 PM",
              paymentMode:"upi",
              refrenceNo:"asdlkfjsd11"
            },
            {
              plan: "Xtraplan",
              price: 120,
              pack: "Data Pack",
              status:"Successful",
              date:"10 May, 2022 02:20 PM",
              paymentMode:"upi",
              refrenceNo:"asdlkfjsd11c"
            },
            {
              plan: "Xtraplan",
              price: 130,
              pack: "Data Pack",
              status:"Successful",
              date:"11 May, 2022 02:20 PM",
              paymentMode:"upi",
              refrenceNo:"asdlkfjsd11b"
            },
            {
              plan: "Xtraplan",
              price: 140,
              pack: "Data Pack",
              status:"Successful",
              date:"12 May, 2022 02:20 PM",
              paymentMode:"upi",
              refrenceNo:"asdlkfjsd11a"
            },
          ];
          var document = {
            html: html,
            data: {
              transaction: transaction,
            },
            path: "./uploads/pdf/"+filename,
            type: "",
          };

          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(pdf.create(document, options)
              .then((res) => {
                response.state='success';
               
               response={
                    "title":"Download pdf",
                    "pdf":res
                }
                return response;        
              })
              .catch((error) => {
                console.error(error);
              }));
            }, 500);
          });

    } catch (err) {
        throw (err);
    }
}

module.exports = {
   pdfCreate
}