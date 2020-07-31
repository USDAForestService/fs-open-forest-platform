import { browser, element, by, ElementFinder } from 'protractor';
import { ElementRef } from '@angular/core';

export class TreesSidebarPage {
  navigateTo(forestId) {
    return browser.get('/christmas-trees/forests/' + forestId);
  }

  buyButton() {
    return element(by.id('static-buy-permit-link'));
  }

  buyButtonHeader() {
    return element(by.id('sticky-bar-container'));
  }

  getTreeSelectionLink() {
    return element(by.id('cutting-instructions-tree-selection-link'));
  }

  getTreeLocationLink() {
    return element(by.id('tree-locations-link'));
  }

  getTreeSpecies(type, index) {
    return element(by.id(`tree-${type}-species-${index}`));
  }

  cuttingAreaDates(index) {
    return element(by.id(`tree-cutting-areas-dates-${index}`));
  }

  seasonOpenAlert() {
    return element(by.id('forest-season-open-alert'));
  }

  cuttingAreaHours(index) {
    return element(by.id(`tree-cutting-areas-hours-${index}`));
  }

  contactUsSectionLink() {
    return element(by.id('contact-information-link'));
  }

  contactUsSection() {
    return element(by.id('contact-information'));
  }

  contactUsHeadquarters() {
    return element(by.id('tree-contact-headquarters-0'));
  }

  contactUsDistrict(id) {
    return element(by.id(`tree-contact-district-${id}`));
  }

  cuttingDatesSectionLink() {
    return element(by.id('season-dates-link'));
  }

  cuttingDatesSection() {
    return element(by.id('season-dates'));
  }

  cuttingDatesSeasonStartAndEnd() {
    return element(by.id('cutting-season-start-end-date'));
  }

  whenToCutDatesSection() {
    return element(by.id('season-dates'));
  }

  whenToCutDatesSectionLink() {
    return element(by.id('season-dates-link'));
  }

  rulesToKnowSectionLink() {
    return element(by.id('rules-to-know-link'));
  }

  buyPermitLink() {
    return element(by.id('buy-permit-link'));
  }

  rulesToKnowSection() {
    return element(by.id('need-to-know'));
  }
}

export class TreesForestFinderPage {
  navigateTo() {
    return browser.get('/christmas-trees/forests');
  }
}
