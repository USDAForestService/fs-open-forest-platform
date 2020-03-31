import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-page-header',
  templateUrl: './header.component.html'
})
export class PageHeaderComponent {
  browserName: string;
  warningMessage: string;

  constructor(
    private meta: Meta) {
    this.warningMessage = '';
  }

  getBrowserName() {
    const  userAgent = navigator.userAgent;
    let browserInfo = userAgent.match (/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    let parsedBrowserInfo;

        if (/trident/i.test(browserInfo[1])) {

          parsedBrowserInfo = /\brv[ :]+(\d+)/g.exec(userAgent) || [];

          return { name: 'IE', version: (parsedBrowserInfo[1] || '') };

        }

    if (browserInfo[1] === 'Chrome') {

        parsedBrowserInfo = userAgent.match (/\bOPR|Edge\/(\d+)/);

        if (parsedBrowserInfo != null)   {

            return { name: 'Opera', version: parsedBrowserInfo[1] };

          }

        }

      browserInfo = browserInfo[2] ? [browserInfo[1], browserInfo[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if (( parsedBrowserInfo = userAgent.match(/version\/(\d+)/i)) != null) {

      browserInfo.splice(1, 1, parsedBrowserInfo[1]);

    }

     this.browserName = browserInfo[0];

     return this.browserName;

 }

}
