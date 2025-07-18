// Importing the required modules
const nodemailer = require('../libs/nodemailer');

const sendMail = async (templateID, mailData, mailOptions) => {
  if (![null, undefined, ''].includes(templateID)) {
    if (!mailOptions.hasOwnProperty('from') || [null, undefined, ''].includes(mailOptions.from)) {
      throw 'Missing property: from';
    } else if (!mailOptions.hasOwnProperty('to') || [null, undefined, ''].includes(mailOptions.to)) {
      throw 'Missing property: to';
    }
    let htmlContent = mailTemplateBody();
    let html = htmlContent.find((items) => items.templateID === templateID).content;
    if (html) {
      let replaceArray = [];
      let replaceWith = [];
      if (templateID === 1) {
        replaceArray = [
          'registrationLink',
          'message',
          'userName',
          'companyName',
          'reportLink',
          'origin'
        ];
        replaceWith = [
          mailData.registrationLink,
          mailData.message,
          mailData.userName,
          mailData.companyName,
          mailData.reportLink,
          mailData.origin
        ];
      } else if (templateID === 2) {
        replaceArray = [
          'userName',
          'OTP',
          'reportLink',
          'origin'
        ];
        replaceWith = [
          mailData.userName,
          mailData.OTP,
          mailData.reportLink,
          mailData.origin
        ];
      } else if (templateID === 'ANS05') {
        replaceArray = ['QuestionTitle', 'origin'];
        replaceWith = [mailData.QuestionTitle, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'AS03') {
        replaceArray = ['Title', 'origin'];
        replaceWith = [mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'AS04') {
        replaceArray = ['Username', 'Title', 'origin'];
        replaceWith = [mailData.Username, mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'AS05') {
        replaceArray = ['Title', 'origin'];
        replaceWith = [mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'AS08') {
        replaceArray = ['Username', 'Title', 'origin'];
        replaceWith = [mailData.Username, mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'CSE01') {
        replaceArray = ['Title', 'origin'];
        replaceWith = [mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'RGS01') {
        replaceArray = ['Username', 'Title', 'origin'];
        replaceWith = [mailData.Username, mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'RGS02') {
        replaceArray = ['Title', 'origin'];
        replaceWith = [mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'RGS03') {
        replaceArray = ['Title', 'origin'];
        replaceWith = [mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'MOD01') {
        replaceArray = ['Username', 'Title', 'origin'];
        replaceWith = [mailData.Username, mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'MOD04') {
        replaceArray = ['Username', 'Title', 'origin'];
        replaceWith = [mailData.Username, mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'MOD06') {
        replaceArray = ['Username', 'Title', 'origin'];
        replaceWith = [mailData.Username, mailData.Title, process.env.CLIENT_ORIGIN];
      }  else if (templateID === 'INV01') {
        replaceArray = ['Username', 'origin'];
        replaceWith = [mailData.Username, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'MOD08') {
        replaceArray = ['Title', 'origin'];
        replaceWith = [mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'MOD09') {
        replaceArray = ['Title', 'origin'];
        replaceWith = [mailData.Title, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG04') {
        replaceArray = ['Username', 'origin'];
        replaceWith = [mailData.Username, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG12') {
        replaceArray = ['Username', 'genderKeyHisHer', 'genderKeyHeShe', 'origin'];
        replaceWith = [mailData.Username, mailData.genderKeyHisHer, mailData.genderKeyHeShe, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG05') {
        replaceArray = ['Username', 'origin'];
        replaceWith = [mailData.Username, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG06') {
        replaceArray = ['Username', 'genderKey', 'origin'];
        replaceWith = [mailData.Username, mailData.genderKey, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG11') {
        replaceArray = ['Username', 'genderKeyHisHer', 'origin'];
        replaceWith = [mailData.Username, mailData.genderKeyHisHer, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG02') {
        replaceArray = ['Username', 'origin'];
        replaceWith = [mailData.Username, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG03') {
        replaceArray = ['Username', 'origin'];
        replaceWith = [mailData.Username, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG07') {
        replaceArray = ['Username', 'genderKey', 'origin'];
        replaceWith = [mailData.Username, mailData.genderKey, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG08') {
        replaceArray = ['Username', 'origin'];
        replaceWith = [mailData.Username, process.env.CLIENT_ORIGIN];
      } else if (templateID === 'WG13') {
        replaceArray = ['Username', 'groupName', 'origin'];
        replaceWith = [mailData.Username, mailData.groupName, process.env.CLIENT_ORIGIN];
      }

      if (replaceArray.length && replaceWith.length) {
        for (var i = 0; i < replaceArray.length; i++) {
          html = html.replace(new RegExp('{' + replaceArray[i] + '}', 'gi'), replaceWith[i]);
        }
      }

      mailOptions.html = html;
      return await nodemailer.sendMail(mailOptions);
    }
  } else {
    throw 'Template ID is required';
  }
};

const bulkMailSend = async (sendInfo) => {
  const htmlContent = mailTemplateBody();
  sendInfo.forEach(async (item, index) => {
    if (item.hasOwnProperty('mailOptions') && item.mailOptions.bcc.length) {
      let html = htmlContent.find((items) => items.templateID === item.templateID).content;
      if (html) {
        let replaceArray = [];
        let replaceWith = [];
        if (item.templateID === 'ANS01') {
          replaceArray = ['Username', 'QuestionTitle', 'origin'];
          replaceWith = [item.Username, item.QuestionTitle, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'ANS02') {
          replaceArray = ['Username', 'QuestionTitle', 'origin'];
          replaceWith = [item.Username, item.QuestionTitle, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'ANS03') {
          replaceArray = ['QuestionTitle', 'origin'];
          replaceWith = [item.QuestionTitle, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'ANS04') {
          replaceArray = ['QuestionTitle', 'origin'];
          replaceWith = [item.Title, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'ANS06') {
          replaceArray = ['Username', 'QuestionTitle', 'origin'];
          replaceWith = [item.Username, item.QuestionTitle, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'AS01') {
          replaceArray = ['Username', 'Title', 'origin'];
          replaceWith = [item.Username, item.Title, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'AS07') {
          replaceArray = ['Username', 'Title', 'origin'];
          replaceWith = [item.Username, item.Title, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'CSE02') {
          replaceArray = ['Username', 'Title', 'origin'];
          replaceWith = [item.Username, item.Title, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'MOD02') {
          replaceArray = ['Title', 'origin'];
          replaceWith = [item.Title, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'MOD03') {
          replaceArray = ['Title', 'origin'];
          replaceWith = [item.Title, process.env.CLIENT_ORIGIN];
        }  else if (item.templateID === 'RGS04') {
          replaceArray = ['Username', 'Title', 'origin'];
          replaceWith = [item.Username, item.Title, process.env.CLIENT_ORIGIN];
        }  else if (item.templateID === 'RGS05') {
          replaceArray = ['Username', 'Title', 'origin'];
          replaceWith = [item.Username, item.Title, process.env.CLIENT_ORIGIN];
        }  else if (item.templateID === 'RGS06') {
          replaceArray = ['Username', 'Title', 'origin'];
          replaceWith = [item.Username, item.Title, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'RGS07') {
          replaceArray = ['Title', 'origin'];
          replaceWith = [item.Title, process.env.CLIENT_ORIGIN];
        }  else if (item.templateID === 'RC09') {
          replaceArray = ['Username', 'Title', 'origin'];
          replaceWith = [item.Username, item.Title, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'RC10') {
          replaceArray = ['Username', 'Title', 'origin'];
          replaceWith = [item.Username, item.Title, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'WG09') {
          replaceArray = ['Username', 'genderKeyHisHer', 'origin'];
          replaceWith = [item.Username, item.genderKeyHisHer, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'WG01') {
          replaceArray = ['Username', 'genderKey', 'origin'];
          replaceWith = [item.Username, item.genderKey, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'WG05') {
          replaceArray = ['Username', 'origin'];
          replaceWith = [item.Username, process.env.CLIENT_ORIGIN];
        } else if (item.templateID === 'WG10') {
          replaceArray = ['Username', 'genderKeyHisHer', 'origin'];
          replaceWith = [item.Username, item.genderKeyHisHer, process.env.CLIENT_ORIGIN];
        }
        if (replaceArray.length && replaceWith.length) {
          for (var i = 0; i < replaceArray.length; i++) {
            html = html.replace(new RegExp('{' + replaceArray[i] + '}', 'gi'), replaceWith[i]);
          }
        }

        item.mailOptions.html = html;
        await nodemailer.sendMail(item.mailOptions);
      }
    }
  });

  return 'SUCCESS';
};

const mailTemplateBody = () => {
  let bodyArr = [];
  let prefix = `<html>
  <head>
	<style>
		html {
			height: 100%;
		}

		body {
			height: 100%;
			width: 100%;
			margin: 0;
		}

		.mail-container {
			box-shadow: 0 0 2px #9e9e9e;
			background-color: #bdbdbd2e;
			margin: 0px;
			width: 100%;
			height: 100%;
			min-width: 100%;
			min-height: 100%;
			flex-direction: column;
			display: flex;
		}


		.template-container {
			margin: 5px auto;
			width: 100%;
			max-width: 600px;
		}

		.template-container .template-content {
			background-color: white;
			flex-direction: column;
			padding: 30px 20px 10px 20px;
			margin: 0 auto;
		}

		.template-container.invitation .template-content .invite-info {
			font-size: 14px;
			color: #000000;
			font-weight: 400;
			line-height: 1.3em;
		}

		.template-container.invitation .template-content .user-message {
			padding: 33px 25px;
			color: #000000;
			font-size: 18px;
			font-weight: 400;
			line-height: 1.3em;
		}

		.template-container.pin-temp .template-content .user-pin-info {
			color: #000000;
			font-size: 17px;
			font-weight: 400;
			font-family: sans-serif;
		}


		.template-container.pin-temp  .template-content .pin-message {
			padding: 8px 25px;
			color: #0000009e;
			font-size: 18px;
		}

		.template-container .btn-block {
			text-align: center;
		}

		.template-container .btn-block .join-btn {
			background-color: #0d77d2;
			border: none;
			color: white;
			padding: 10px 38px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 16px;
			margin: 4px 2px;
			cursor: pointer;
			outline: none;
		}

		.template-container .template-content .logo .bility-logo {
			width: 100px;
			height: 60px;
			object-fit: contain;
		}

		.template-container .report-msg {
			font-size: 14px;
			color: #424242;
			font-weight: 400;
			line-height: 1.3em;
			margin: 13px 22px;
		}

		.template-container .report-msg .hyperlink {
			color: #0d77d2;
			text-decoration: none;
		}
	</style>
  </head>

  <body>

    <div class="mail-container">`;
  let suffix = `</div> </body> </html> `;
  bodyArr = [{
      templateID: 1,
      content: `${prefix}
      <div class="template-container invitation">
        <div class="template-content">
				  <p class="invite-info">
            Hello!
            <br>
            {userName} from {companyName} has invited you to join <b>bility, your engagement-driven learning
              platform.</b>
          </p>
        <div class="user-message">{message}</div>
        <div class="btn-block">
          <a class="join-btn" href="{registrationLink}">Join</a>
        </div>
        <div class="logo">
          <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
        </div>
      </div>
      <p class="report-msg">If you are not the intended recipient of this message, <a class="hyperlink" href="{reportLink}">report</a>.</p>
    </div>
${suffix}`
    },
    {
      templateID: 2,
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p class="user-pin-info">{userName},<br>
              Your PIN to Sign into bility is <b>{OTP}</b></p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
          <p class="report-msg">If you didn't initiate this sign in, <a class="hyperlink" href="{reportLink}">report</a>.</p>
        </div>
    ${suffix}`
    },
    {
      templateID: 'ANS01',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has answered <b>{QuestionTitle}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'ANS02',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has answered <b>{QuestionTitle}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'ANS03',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>The Question <b>{QuestionTitle}</b> has been closed for answers.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'ANS04',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>The asker has marked an answer as 'Asker’s choice' for <b>{QuestionTitle}</b></p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'ANS05',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>Your answer has been marked as ‘Asker’s choice’ for <b>{QuestionTitle}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'ANS06',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has asked you  <b>{QuestionTitle}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'AS01',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has assigned <b>{Title}</b> to you.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'AS03',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>The assignment <b>{Title}</b> has been reassinged.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'AS04',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>{Username} has submitted the assignment <b>{Title}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'AS05',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>The assignment <b>{Title}</b> has been accepted/evaluated.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'AS07',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has assigned your resource <b>{Title}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'AS08',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>{Username} has marked the assignment <b>{Title}</b> as completed.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'CSE01',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>You have enrolled into the course <b>{Title}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'CSE02',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has enrolled into the course <b>{Title}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'MOD02',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>Your post <b>{Title}</b> has been published.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'MOD03',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>Your post <b>{Title}</b> has been declined.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'RGS01',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has requested for registration for <b>{Title}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'RGS02',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>Your request for registration for <b>{Title}</b> has been approved.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'RGS03',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>Your request for registration for <b>{Title}</b> has been declined.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'RGS04',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}’s</b> request for registration for <b>{Title}</b> has been approved.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'RGS05',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}’s</b> request for registration for <b>{Title}</b> has been declined.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'RGS06',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> did not attend <b>{Title}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'RGS07',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>You have registered for <b>{Title}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'RC09',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has rated <b>{Title}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'RC10',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has forwarded <b>{Title}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'MOD01',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has submitted the <b>{Title}</b> for moderation.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'MOD04',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> post <b>{Title}</b> has been published.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'MOD06',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has submitted <b>{Title}</b> for moderation.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'INV01',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has registered into the system.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'MOD08',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>Your post <b>{Title}</b> has been published.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'MOD09',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>Your post <b>{Title}</b> has been declined.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG09',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has removed you from {genderKeyHisHer} workgroup.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG10',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has removed you from {genderKeyHisHer} workgroup.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG04',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has requested to join your Workgroup.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG01',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has invited you to join {genderKey} Workgroup.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG05',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>You have been added to <b>{Username}'s</b> Workgroup.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG12',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>Your Request to <b>{Username}</b> to join {genderKeyHisHer} Workgroup has been aborted because {genderKeyHeShe} directly or indirectly belongs to your Workgroup. Cyclic reference is not allowed.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG06',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has declined your request to join {genderKey} Workgroup</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG11',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p>Your Invite to <b>{Username}</b> to join your Workgroup has been aborted because you directly or indirectly belong to {genderKeyHisHer} Workgroup. Cyclic reference is not allowed.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG02',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has joined your workgroup.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG03',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has declined invitation to join your Workgroup.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG07',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has revoked the invitation to join {genderKey} Workgroup.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG08',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has revoked the request to join your Workgroup.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
    {
      templateID: 'WG13',
      content: `${prefix}
        <div class="template-container pin-temp">
          <div class="template-content">
            <p><b>{Username}</b> has quit your workgroup <b>{groupName}</b>.</p>
            <div class="logo">
              <img class="bility-logo" src="{origin}/assets/img/bility-logo-tm.png">
            </div>
          </div>
        </div>
    ${suffix}`
    },
  ];
  return bodyArr;
};


// bodyArr = [{
//     templateID: 1,
//     content: `${prefix}
//   <div>
// 	<p>Hi {firstName} {lastName},</p>
// 	<p>Welcome to ${process.env.SITETITLE}!</p>
// 	<p>You are all set up and ready to go! We can't wait to help you secure your valuables and give you
// 	  actionable
// 	  security information.</p>
// 	<p>Here is your account information:</p>
// 	<p style="margin-left: 30px;">
// 	  <b>Your unique URL: <a href="{origin}/#/{portalDNSName}">{origin}/#/{portalDNSName}</a></b>
// 	</p>
// 	<p style="margin-left: 30px;">
// 	  <b>User name: {userName}</b>
// 	</p>
// 	<p style="margin-left: 30px;">
// 	  <b>Account ID: {portalDNSName}</b>
// 	</p>
// 	<p style="color: #202020;">Learn more about our products and how customers use them to do great work at <a
// 		href="${process.env.SITEURL}">${process.env.SITEURL}</a> and <a
// 		href="${process.env.BLOG}">${process.env.BLOG}</a></p>
//   </div>
//     ${suffix}`
//   },
//   {
//     templateID: 4,
//     content: `${prefix}
// 			<div>
// 			  <p>Hi {firstName},</p>
// 			  <p>Welcome to ${process.env.SITETITLE}! Please click <a href="{origin}/#/{portalDNSName}/auth/{userID}/password/set/{tempKey}?type=set">here</a> to complete your user registration.</p>
// 			  <p>If you think you have received this email as an error, please ignore this message.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 5,
//     content: `${prefix}
// 			<div>
// 			  <p>Dear {firstName},</p>
// 			  <p>You recently requested a password reset for your ${process.env.SITETITLE} account. To complete the process, please click the link below:</p>
// 			  <p><a href="{origin}/#/{portalDNSName}/auth/{userID}/password/set/{tempKey}?type={type}">{origin}/#/{portalDNSName}/auth/{userID}/password/set/{tempKey}?type={type}</a></p>
// 			  <p>After you click the above URL, you'll be prompted to complete the following steps:</p>
// 			  <p>1. Enter new password.</p>
// 			  <p>2. Confirm your new password.</p>
// 			  <p>3. Hit Submit.</p>
// 			  <p>This link is valid for one-time use only and will expire in 4 hours.</p>
// 			  <p>If you didn't request this password reset, please disregard this email.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 6,
//     content: `${prefix}
//   <div>
// 	<p>Hi {firstName} {lastName},</p>
// 	<p>Welcome to ${process.env.SITETITLE}! Your username and password are mentioned below.</p>
// 	<p style="margin-left: 30px;">
// 	  <b>User name: {userName}</b>
// 	</p>
// 	<p style="margin-left: 30px;">
// 	  <b>Password: {password}</b>
// 	</p>
// 	<p>If you didn't request this account creation, please disregard this email.</p>
//   </div>
//               ${suffix}`
//   },
//   {
//     templateID: 11,
//     content: `${prefix}
// 			<div>
// 			  <p>Hi,</p>
// 			  <p>{mailContent}</p>
// 			</div>
// 			</div>
// 		  </div>
// 		  </div>
// 		</div>
// 	  </body>
// 	  </html>`
//   },
//   {
//     templateID: 13,
//     content: `${prefix}
// 			<div>
// 			  <p>Dear User,</p>
// 			  <p>Your Senseon Plus software subscription is expiring 30 days from today <b style="color:red;">({currentDate})</b>. You will no longer be able to access your site after this date, and your data will be permanently deleted soon after.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 14,
//     content: `${prefix}
//   <div>
// 	<p>Dear User,</p>
// 	<p>Your Senseon Plus software subscription is expiring 14 days from today <b style="color:red;">({currentDate})</b>. You will no longer be able to access your site after this date, and your data will be permanently deleted soon after.</p>
//   </div>
//               ${suffix}`
//   },
//   {
//     templateID: 15,
//     content: `${prefix}
//   <div>
// 	<p>Dear User,</p>
//   <p>We are informing you that your current Senseon Plus subscription plan is coming to an end tomorrow. To avoid any service disruption to you, your subscription will renew for the same subscription plan. You may also take this opportunity to switch to another subscription plan before the new plan takes effect.</p>
//   <p>We look forward to providing the same great service to help safeguard your valuables and provide valuable insights to increase their security.</p>
//   </div>
//               ${suffix}`
//   },
//   {
//     templateID: 16,
//     content: `${prefix}
// 			<div>
//       <p>Hi {firstName} {lastName},</p>
// 			  <p><b>Payment success notice</b></p>
// 			  <p>Thanks for choosing Senseon Plus Cloud. This email is to confirm that we received payment for your subscription for the month of {month}.</p>
// 			  <p>Please <a href="${process.env.CONTACT_US}">contact us</a> with any questions, we're always happy to assist.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 17,
//     content: `${prefix}
// 			<div>
// 			  <p>Dear {firstName},</p>
// 			  <p>You recently requested for email address change for your <Site title> account. To complete the change process, please click the link below.</p>
// 			  <p><a href="{origin}/#/{portalDNSName}/auth/{userID}/verification/{tempKey}/{emailID}?type=emailID">{origin}/#/{portalDNSName}/auth/{userID}/verification/{tempKey}/{emailID}?type=emailID</a></p>
// 			  <p>This link is valid for one-time use only and will expire in 4 hours.</p>
// 			  <p>If you didn't request this email id change, please disregard this email.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 18,
//     content: `${prefix}
// 			<div>
// 			  <p>Dear {firstName} {lastName},</p>
// 			  <p>This is the confirmation that you have successfully updated your Payment Information.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 19,
//     content: `${prefix}
// 			<div>
// 			  <p>Hi {firstName} {lastName},</p>
// 			  <p><b>Payment failure notice</b></p>
// 			  <p>Your subscription payment could not be deducted from your bank account. Please update your payment information so you don’t have service interruption.</p>
// 			  <p>The use of Senseon Plus software is subject to the terms and conditions as outlined in your invoice.</p>
// 			  <p>Please <a href="${process.env.CONTACT_US}">contact us</a> with any questions, we're always happy to assist.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 22,
//     content: `${prefix}
// 			<div>
//         <p>Dear User,</p>
//         <h2 style="color:rgb(0, 32, 79);text-align:center;">Upgrade to your subscription</h2>
// 			  <p>Congratulations on upgrading your subscription plan from <b style="color:red;">{planFrom}</b> to <b style="color:red;">{planTo}</b>. We look forward to keep providing you with security insights that unlock real business value for you!  </p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 23,
//     content: `${prefix}
// 			<div>
//       <p>Hi {firstName} {lastName},</p>
// 			  <p><b>Payment success notice</b></p>
// 			  <p>Thanks for choosing Senseon Plus Cloud. This email is to confirm that we received payment for your subscription for the year of {year}. The invoice is attached as a PDF for your records.</p>
// 			  <p>The use of Senseon Plus software is subject to the terms and conditions as outlined in your invoice.</p>
// 			  <p>Please <a href="${process.env.CONTACT_US}">contact us</a> with any questions, we're always happy to assist.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 24,
//     content: `${prefix}
// 			<div>
// 			  <h2 style="color:rgb(0, 32, 79);text-align:center;">Let’s stay together</h2>
//         <p>We still have not received payment for your subscription plan that was due on <b style="color:red;">{lastPaymentDate}</b>, and this puts your account in violation of the Senseon Plus Cloud software Terms of Service Agreement. We are suspending your access to your account’s audit trail data and reports.</p>
//         <p>Please update the payment information on your account profile as early as possible. If we don’t receive your payment by <b style="color:red;">{nextPaymentDate}</b>, your account data and reports will be purged, and you will not be able to retrieve it. Also, your account may be referred to a debt collector.</p>
// 			  <p>Please <a href="${process.env.CONTACT_US}">contact us</a> at our toll-free number to make a payment over the phone and resolve your account balance.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 25,
//     content: `${prefix}
// 			<div>
// 			  <h2 style="color:rgb(0, 32, 79);text-align:center;">FINAL NOTICE – IMMEDIATE ACTION REQUIRED</h2>
//         <p>Despite our good faith efforts, we have been unable to secure payment of your account. Since we have not received payment 30 days past your subscription due date, your account has been blocked from accessing Senseon Plus Cloud.</p>
//         <p>You are obligated to pay for the services provided. We strongly urge that you take advantage of this FINAL opportunity.Please <a href="${process.env.CONTACT_US}">contact us</a> at our toll-free number to make a payment over the phone.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 26,
//     content: `${prefix}
//   <div>
// 	<p>Dear User,</p>
//   <p>Since you have turned off your auto-renewal setting, we are informing you that your current Senseon Plus subscription plan is coming to an end tomorrow and you will lose access to your Senseon Plus cloud benefits.</p>
//   <p>In order to continue to enjoy access to Senseon Plus cloud and to avoid any service disruption to you, you may choose a subscription plan by logging into your account -> Account Management -> Subscription.</p>
//   <p>Senseon Plus cloud software give you access to the exclusive features:</p>
//   <ul>
//     <li>Audit trail log filtering</li>
//     <li>Custom Reports across sites, regions, employees and fixtures</li>
//     <li>Multiple admins per location</li>
//     <li>Differentiate levels of access</li>
//     <li>Access to this data from anywhere in the world</li>
//     <li>And more</li>
//   </ul>
//   <p>We look forward to providing the same great service to help safeguard your valuables and provide valuable insights to increase their security.</p>
//   </div>
//               ${suffix}`
//   },
//   {
//     templateID: 27,
//     content: `${prefix}
// 			<div>
// 			  <h2 style="color:rgb(0, 32, 79);text-align:center;">Your trial has ended. What's next?</h2>
//         <p>It's okay; we all get busy! Your trial of Senseon Plus Cloud has ended, but you can still select a subscription plan and keep the momentum going by selecting a subscription plan by logging into your account -> Account Management -> Subscription.</p>
//         <p>Learn more about our products and how customers use them to do great work at www.senseon.com and https://www.senseon.com/blog.</p>
// 			</div>
//               ${suffix}`
//   },
//   {
//     templateID: 28,
//     content: `${prefix}
//       <div>
//         <p>Dear {firstName} {lastName},</p>
//         <p>You have opted out of automatic renewal for your Senseon Plus cloud software subscription. Your subscription will end on {renewalCancellationDate} and you will lose access to your Senseon Plus features at the end of your membership period.</p>
//         <p>You can opt back in to automatic renewal at any time. To view and manage your subscription, please log into your account and go to Account Management -> Subscription. </p>
//         <p>We look forward to providing the same great service to help safeguard your valuables and provide valuable insights to increase their security.</p>
// 			</div>
//               ${suffix}`
//   }
// ];
/**
 * Exporting the modules
 */
module.exports = {
  sendMail,
  bulkMailSend
};
