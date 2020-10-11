import { Title, Meta } from '@angular/platform-browser';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';
import * as moment from 'moment-timezone';
import { environment } from '../../../../environments/environment';
import { FirewoodInfoService } from '../../_services/firewood-info.service';
import { FirewoodApplicationService } from '../../_services/firewood-application.service';
import { WindowRef } from '../../../_services/native-window.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-firewood-info',
  templateUrl: './firewood-guidelines.component.html'
})
export class FirewoodGuidelinesComponent implements OnInit {
  template: string;
  forest: any = [];
  id: any;
  nativeWindow: any;
  sidebarItems;
  isSeasonOpen = true;
  seasonOpenAlert = 'Firewood season is closed and online permits are not available.';
  user;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private firewoodInfoService: FirewoodInfoService,
    private firewoodApplicationService: FirewoodApplicationService,
    private configService: SidebarConfigService,
    private meta: Meta,
    public renderer: Renderer2,
    private winRef: WindowRef,
    @Inject(DOCUMENT) private document: any
  ) {
    this.nativeWindow = winRef.getNativeWindow();
    this.meta.addTag({
      name: 'description',
      content: `Learn more about how to purchase a Firewood permit with the\
       United States Forest Service on your National Forest with Open Forest.`
    });

  }

  minCost() {
    return this.forest.woodCost * this.forest.minCords;
  }

  printLoadTag = () => {
    // use dummy data for now
    let dummy_data = {
      forestName: 'Flathead National Park',
      quantity: 2,
      permitNumber: 'OF00021',
      tagNumber: 'OF00021-2',
      expirationDate: '12/21/2021'
    }
    const loadTags = this.generateLoadTagsHTML(dummy_data);
    const popupWin = this.nativeWindow.open('FirewoodLoadTags', '_blank', 'top=0,left=0,height=auto,width=auto');

    popupWin.document.open();

    popupWin.document.write(loadTags);

    popupWin.document.close();

  }

  generateLoadTagsHTML = (data) => {
    let styleHtml = `<style>`

    // position the four main load tag squares
    styleHtml += `
    .load-tags-section-one {
      position: absolute;
      top: 0px;
      left: 0px;
      width: calc(50% - 2px);
      height: calc(50% - 2px);
      border: 1px dotted black;
      transform: rotate(180deg);
    }
    .load-tags-section-two {
      position: absolute;
      top: 0px;
      right: 0px;
      width: calc(50% - 2px);
      height: calc(50% - 2px);
      transform: rotate(180deg);
      text-align: center;
    }
    .load-tags-section-three {
      text-align: center;
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: calc(50% - 2px);
      height: calc(50% - 2px);
    }
    .load-tags-section-four {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: calc(50% - 2px);
      height: calc(50% - 2px);
    }`

    // fold arrow
    styleHtml += `.fold-arrow {
      transform: translateX(-50%);
      left: 50%;
      top: 4px;
      font-size: 30px;
      height: 10px;
      width: 20px;
      color: lightgray;
      position: absolute;
    }`

    styleHtml += `.folding-text {
      font-weight: bold;
      color: lightgray;
      transform: rotate(180deg);
      position: relative;
      top: 44px;
    }`

    // punch hole
    styleHtml += `.punch-hole {
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      height: 40px;
      width: 40px;
      background: white;
      border: 1px dotted black;
      border-radius: 100%;
    }`

    // month / day / info box
    styleHtml += `.load-tags-info-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
    }`
    styleHtml += `.month-day-boxes {
      display: flex;
      flex-direction: row;
    }`
    styleHtml += `.month-box {
      border: 1px black solid;
      height: 90px;
      width: 90px;
      margin-right: 5px;
    }`
    styleHtml += `.month-box-caption {
      position: relative;
      height: 30px;
      max-width: 50px;
      top: -7px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      background: white;
      font-size: 12px;
      font-weight: bold;
    }`
    styleHtml += `.day-box {
      border: 1px black solid;
      height: 90px;
      width: 90px;
      margin-left: 5px;
    }`
    styleHtml += `.day-box-caption {
      max-width: 30px;
      position: relative;
      height: 30px;
      top: -7px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      background: white;
      font-size: 12px;
      font-weight: bold;
    }`
    styleHtml += `.cord-count {
      background: black;
      color: white;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      margin-top: 10px;
    }`
    styleHtml += `.permit-number-input {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid black;
    }`
    styleHtml += `.tag-number-input {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid black;
    }`
    styleHtml += `.expires-input {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid black;
    }`
    styleHtml += `.permit-number-input-label {
      font-size: 12px;
      font-weight: bold;
    }`
    styleHtml += `.tag-number-input-label {
      font-size: 12px;
      font-weight: bold;
    }`
    styleHtml += `.expires-input-label {
      font-size: 12px;
      font-weight: bold;
    }`

    // styles for the section one and four (logo)
    styleHtml += `
    .load-tags-logo-section {
      padding: 3px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 60%;
      width: 60%;
      background: white;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
    .load-tags-logo-image {
      max-width: 87%;
      margin-bottom: 10px;
    }
    .watermark-container {
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .wavy-text-container {
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }`

    // generate style rules for watermark text
    const numOfWatermarkLines = 24
    for (let x = 1; x <= numOfWatermarkLines; x++) {
      const watermarkline = `.watermark-text-${x} {
        color: lightgray;
        white-space: nowrap;
        font-family: Public Sans ExtraLight;
        position: relative;
        left: -${x * 50}px;
      }`
      styleHtml += watermarkline;
    }

    // generate style rules for wavy text
    const numOfWavyLines = 15;
    for (let x = 1; x <= numOfWavyLines; x++) {
      const wavyline = `.wavy-text-${x} {
        max-width: 100%;
        white-space: nowrap;
        position: absolute;
        font-family: Public Sans Black;
        font-weight: bold;
        left: 0px;
        top: ${(x - 1) * (100/8)}%;
      }`
      styleHtml += wavyline;
    }

    // generate a container element for each "2021"
    const numOfTwentyTwentyOnes = 30;
    for (let x = 1; x <= numOfTwentyTwentyOnes; x++) {
      styleHtml += `.twenty-twentyone-${x} {
        position: absolute;
        bottom: 0px;
        left: ${(x - 1) * 200}px;
        font-size: 28px;
      }`
    }

    // generate arc text style rules for each character in "2021"
    let numOfCharacters = 16;
    let degrees = 0;
    // first arc
    for (let x = 1; x <= 4; x++) {
      const char = `.character-${x} {
        transform-origin: bottom center;
        height: 143px;
        width: 20px;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 50px;
        transform: rotate(${degrees}deg);
      }`;
      degrees += 6;
      styleHtml += char;
    }

    degrees += -6;
    // second arc
    for (let x = 5; x <= 8; x++) {
      const char = `.character-${x} {
        transform-origin: bottom center;
        height: 143px;
        width: 20px;
        text-align: center;
        position: absolute;
        left: 15px;
        bottom: 48px;
        transform: rotate(${degrees}deg);
      }`;
      degrees += 6;
      styleHtml += char;
    }
    degrees = 0;
    for (let x = 9; x <= 12; x++) {
      const char = `.character-${x} {
        transform-origin: bottom center;
        height: 143px;
        width: 20px;
        text-align: center;
        position: absolute;
        left: -12px;
        bottom: 173px;
        transform: rotate(${degrees}deg) scaleX(-1) scaleY(-1);
      }`;
      degrees += 6;
      styleHtml += char;
    }

    // fourth arc
    for (let x = 13; x <= 16; x++) {
      const char = `.character-${x} {
        transform-origin: bottom center;
        height: 143px;
        width: 20px;
        text-align: center;
        position: absolute;
        left: -12px;
        bottom: 173px;
        transform: rotate(${degrees}deg) scaleX(-1) scaleY(-1);
      }`;
      degrees += 6;
      styleHtml += char;
    }

    styleHtml += `</style>`

    let elementsHtml = `
    <html>
      <head>
        <title></title>
      </head>
      <body onload="window.focus(); setTimeout(window.print(), 1000);  window.onmousemove=function(){ window.close()}">

          <div class="load-tags-section-one">
          <div class="watermark-container">
          `;
          // generate watermark lines
          for (let x = 1; x <= numOfWatermarkLines; x++) {
            elementsHtml +=`
            <div class="watermark-text-${x}">`;
            for (let y = 1; y <= 20; y++) {
              elementsHtml += `${data.forestName} &bullet;&nbsp;`;
            }
            elementsHtml += `</div>`;
          }
          elementsHtml += `</div>`

          elementsHtml += `<div class="wavy-text-container">`
          // generate wavy lines
          for (let x = 1; x <= numOfWavyLines; x++) {
            elementsHtml +=`
            <div class="wavy-text-${x}">`;
            for (let y = 1; y <= numOfTwentyTwentyOnes; y++) {
              // 2021
              elementsHtml += `<div class="twenty-twentyone-${y}">`;
              // individual characters in "2021" block
              elementsHtml += `<span class="character-1">2</span>`;
              elementsHtml += `<span class="character-2">0</span>`;
              elementsHtml += `<span class="character-3">2</span>`;
              elementsHtml += `<span class="character-4">1</span>`;

              elementsHtml += `<span class="character-5">2</span>`;
              elementsHtml += `<span class="character-6">0</span>`;
              elementsHtml += `<span class="character-7">2</span>`;
              elementsHtml += `<span class="character-8">1</span>`;

              elementsHtml += `<span class="character-9">2</span>`;
              elementsHtml += `<span class="character-10">0</span>`;
              elementsHtml += `<span class="character-11">2</span>`;
              elementsHtml += `<span class="character-12">1</span>`;

              elementsHtml += `<span class="character-13">2</span>`;
              elementsHtml += `<span class="character-14">0</span>`;
              elementsHtml += `<span class="character-15">2</span>`;
              elementsHtml += `<span class="character-16">1</span>`;
              elementsHtml += `</div>`;
            }
            elementsHtml += `</div>`;
          }
          elementsHtml += `</div>`

          // punch hole element
          elementsHtml += `<div class="punch-hole"></div>`

          elementsHtml += `
          <div class="load-tags-logo-section">
            <img class="load-tags-logo-image" src="/assets/img/site-wide/load-tags-usda-logo.png"/>
            <div class="load-tags-sub-logo-text">
              <div class="load-tags-forest-name">${data.forestName}</div>
              <div class="firewood-load-tag-text">Firewood Load Tag</div>
            </div>
          </div>
          </div>

          <div class="load-tags-section-two">
          <div class="fold-arrow">&#8593;</div>
          <div class="folding-text">Fold and display this section outward</div>
          <div class="load-tags-info-box">
            <div class="month-day-boxes">
              <div class="month-box">
                <div class="month-box-caption">MONTH</div>
              </div>
              <div class="day-box">
                <div class="day-box-caption">DAY</div>
              </div>
            </div>
            <div class="cord-count">
              1/${data.quantity} CORD
            </div>
            <div class="permit-number-input">
              <span class="permit-number-input-label">Permit number:&nbsp;</span>
              <span class="permit-number-input-value">${data.permitNumber}</span>
            </div>
            <div class="tag-number-input">
              <span class="tag-number-input-label">Tag number:&nbsp;</span>
              <span class="tag-number-input-value">${data.tagNumber}</span>
            </div>
            <div class="expires-input">
              <span class="expires-input-label">Expires:&nbsp;</span>
              <span class="expires-input-value">${data.expirationDate}</span>
            </div>
          </div>
          </div>

          <div class="load-tags-section-three">
            <div class="fold-arrow">&#8593;</div>
            <div class="folding-text">Fold and display this section outward</div>
            <div class="load-tags-info-box">
              <div class="month-day-boxes">
                <div class="month-box">
                  <div class="month-box-caption">MONTH</div>
                </div>
                <div class="day-box">
                  <div class="day-box-caption">DAY</div>
                </div>
              </div>
              <div class="cord-count">
                1/${data.quantity} CORD
              </div>
              <div class="permit-number-input">
                <span class="permit-number-input-label">Permit number:&nbsp;</span>
                <span class="permit-number-input-value">${data.permitNumber}</span>
              </div>
              <div class="tag-number-input">
                <span class="tag-number-input-label">Tag number:&nbsp;</span>
                <span class="tag-number-input-value">${data.tagNumber}</span>
              </div>
              <div class="expires-input">
                <span class="expires-input-label">Expires:&nbsp;</span>
                <span class="expires-input-value">${data.expirationDate}</span>
              </div>
            </div>
          </div>

          <div class="load-tags-section-four">
            <div class="watermark-container">
            `;
            // generate watermark lines
            for (let x = 1; x <= numOfWatermarkLines; x++) {
              elementsHtml +=`
              <div class="watermark-text-${x}">`;
              for (let y = 1; y <= 20; y++) {
                elementsHtml += `${data.forestName} &bullet;&nbsp;`;
              }
              elementsHtml += `</div>`;
            }
            elementsHtml += `</div>`

            elementsHtml += `<div class="wavy-text-container">`
            // generate wavy lines
            for (let x = 1; x <= numOfWavyLines; x++) {
              elementsHtml +=`
              <div class="wavy-text-${x}">`;
              for (let y = 1; y <= numOfTwentyTwentyOnes; y++) {
                // 2021
                elementsHtml += `<div class="twenty-twentyone-${y}">`;
                // individual characters in "2021" block
                elementsHtml += `<span class="character-1">2</span>`;
                elementsHtml += `<span class="character-2">0</span>`;
                elementsHtml += `<span class="character-3">2</span>`;
                elementsHtml += `<span class="character-4">1</span>`;

                elementsHtml += `<span class="character-5">2</span>`;
                elementsHtml += `<span class="character-6">0</span>`;
                elementsHtml += `<span class="character-7">2</span>`;
                elementsHtml += `<span class="character-8">1</span>`;

                elementsHtml += `<span class="character-9">2</span>`;
                elementsHtml += `<span class="character-10">0</span>`;
                elementsHtml += `<span class="character-11">2</span>`;
                elementsHtml += `<span class="character-12">1</span>`;

                elementsHtml += `<span class="character-13">2</span>`;
                elementsHtml += `<span class="character-14">0</span>`;
                elementsHtml += `<span class="character-15">2</span>`;
                elementsHtml += `<span class="character-16">1</span>`;
                elementsHtml += `</div>`;
              }
              elementsHtml += `</div>`;
            }
            elementsHtml += `</div>`

            // punch hole element
            elementsHtml += `<div class="punch-hole"></div>`

            elementsHtml += `
            <div class="load-tags-logo-section">
              <img class="load-tags-logo-image" src="/assets/img/site-wide/load-tags-usda-logo.png"/>
              <div class="load-tags-sub-logo-text">
                <div class="load-tags-forest-name">${data.forestName}</div>
                <div class="firewood-load-tag-text">Firewood Load Tag</div>
              </div>
            </div>
          </div>

      </body>
    </html>
    `;
    const loadTagsTemplate = styleHtml + elementsHtml;
    return loadTagsTemplate;
  }

  /**
   *  @returns set forest data from route resolver
   */
  ngOnInit() {
    this.template = 'sidebar';
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.data.subscribe(data => {
      this.user = data.user;
      this.forest = data.forest;
      if (this.forest) {
        this.titleService.setTitle(`${this.forest.forestName} | U.S. Forest Service Open Forest`);
        this.configService.getJSON('firewood').subscribe(configData => {
          this.sidebarItems = configData;
        });
      }
    });
  }
}
