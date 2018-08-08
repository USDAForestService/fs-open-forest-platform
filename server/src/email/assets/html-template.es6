'use strict';

const htmlTemplateStyle = require('./html-template-style.es6');

const template = {};

template.forestService = (content, title) => {
  return `
    ${htmlTemplateStyle}
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>${title}</title>
    </head>
    <body>
        <div class="header">
      <table role="presentation" class="borderless">
        <tr>
          <td><a href="https://www.usda.gov/"><img alt="USDA" class="logo" src="cid:usdalogopng" /></a></td>
          <td><a href="https://www.fs.fed.us/"><img alt="Department of Agriculture - US Forest Service" class="logo" src="cid:forestservicelogopng" /></a></td>
        </tr>
      </table>
    </div>
    <div class="body">
    ${content}
    </div>
    <p>Please do not reply to this message.
      This email message was sent from a notification-only address that cannot accept incoming email.</p>
    </body>
    </html>
  `;
};

template.attachments = [
  {
    filename: 'forest-service-logo.png',
    path: 'src/email/assets/forest-service-logo.png',
    cid: 'forestservicelogopng'
  },
  {
    filename: 'usda-logo.png',
    path: 'src/email/assets/usda-logo.png',
    cid: 'usdalogopng'
  }
];

module.exports = template;
