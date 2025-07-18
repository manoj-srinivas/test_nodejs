require('dotenv').config();
const fs = require('fs');
const nodemailer = require('nodemailer');
const config = require('../utils/config');
const sendMail = async (dataJson) => {
    try {
        let response = {};
        path = "./uploads/pdf/transactionhistory.pdf";
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "rishikant@unimity.com",
                pass: "admin@92042R",
            },
        });

        let mailOptions =
        {
            from: "rishikant@unimity.com",
            to: dataJson.to,
            // subject: "",
            text: `${"Dear Customer,\n \n Please find the Statement of Account for your MTN Number " + dataJson.mobilenumber + "(Login user mobile number) \n \n With Love, \n \n MTN \n "}`,
            attachments: [
                {
                    path: path
                }
            ]
        }
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    response.status = "failed";
                    resolve("Mail not sent.");
                    return res.end(err)
                } else {
                    console.log(`mail sent ${info.response}`);
                    resolve(info);

                }

                return response;
            });

        });

    } catch (err) {
        throw err;
    }

}
const deleteFile = (path) => {
    // Unlink the file.
    fs.unlink(path, (error) => {
        if (!error) {
            console.log('file is deleted');
        } else {
            console.log('file is not deleted');
        }
    })
};
// const TransportConfig = config.Mail.Transport;
// const transporter = nodemailer.createTransport(TransportConfig);

// const sendMail = async (mailData) => {
//   try {
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(mailData, (err, info) => {
//         if (err) {
//           resolve("Mail not sent.");
//         } else {
//           resolve(info);
//         }
//       });
//     });
//   } catch (err) {
//     throw err;
//   }
// }

// Exporting modules
module.exports = {
    sendMail,
    deleteFile
}
