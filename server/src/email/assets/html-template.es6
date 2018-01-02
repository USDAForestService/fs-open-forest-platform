'use strict';

const template = {};

template.forestService = `
    <style>
      .header {
        background-color: #eeece5;
        padding: 1em;
      }
      
      .body {
        color: #212121;
        font-family: "Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
        padding: 1em 0;
      }
      
      h1 {
        color: #076727;
      }

      a { 
        color: #076727;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: "Merriweather", "Georgia", "Cambria", "Times New Roman", "Times", serif;
      }
      
      img {
        max-width: 100%;
      }
      
      table, th, td {
       border: 0;
      }
      
      .logo {
        max-height: 100px;
      }

      .float-right {
        float: right;
      }
    </style>
    <div class="header">
      <table>
        <tr>
          <td><a href="https://www.usda.gov/"><img alt="USDA logo" class="logo" src="cid:usdalogopng" /></a></td>
          <td><a href="https://www.fs.fed.us/"><img alt="US Forest Service Logo" class="logo" src="cid:forestservicelogopng" /></a></td>
        </tr>
      </table>
    </div>
  `;

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
