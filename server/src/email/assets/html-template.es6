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
      
      a { 
        color: #076727;
      }
      
      h1 {
        color: #076727;
      }

      h2 {
        font-size: 2rem;
        font-weight: 700;
      }

      h3 {
        font-size: 1.5rem;
        font-weight: 700;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: "Merriweather", "Georgia", "Cambria", "Times New Roman", "Times", serif;
        clear: both;
        line-height: 1.3;
        margin-bottom: .5em;
        margin-top: 1em;
      }

      img {
        max-width: 100%;
      }

      table, 
      th, 
      td {
       border: 0;
      }

      table.bordered {
        width: 100%;
        border: 1px solid #dfe2e5;
      }
      
      .bordered td, 
      .bordered th {
        font-weight: 400;
        padding: 1em;
      }

      .border-bottom {
        border-bottom: 1px solid #dfe2e5;
      }
      
      .border-right {
        border-right: 1px solid #dfe2e5;
      }
      
      hr {
        background-color: #656565;
        border: none;
        height: 1px;
        margin: 30px 0;
      }

      ul {
        padding-left: 1em;
        margin-bottom: 2em;
      }
      
      .logo {
        max-height: 100px;
      }
      
    </style>
    <div class="header">
      <table role="presentation" class="borderless">
        <tr>
          <td><a href="https://www.usda.gov/"><img alt="USDA" class="logo" src="cid:usdalogopng" /></a></td>
          <td><a href="https://www.fs.fed.us/"><img alt="Department of Agriculture - US Forest Service" class="logo" src="cid:forestservicelogopng" /></a></td>
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
