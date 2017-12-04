import { browser, element, by } from 'protractor';

export class FrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

export class NoncommercialGroupForm {
  navigateTo() {
    return browser.get('/applications/noncommercial-group-use/new');
  }
}

export class TempOutfittersForm {
  navigateTo() {
    return browser.get('/applications/temp-outfitters/new');
  }
}

export class AdminApplicationList {
  navigateTo() {
    return browser.get('/admin/applications');
  }
}

export class AdminApplicationView {
  navigateTo() {
    return browser.get('/admin/applications/noncommercial/234');
  }
}

export class TreesSidebarPage {
  navigateTo(forestId) {
    return browser.get('/christmas-trees/forests/' + forestId + '/tree-guidelines');
  }

  getTreeSelectionLink() {
    return element(by.id('tree-selection-link'));
  }

  getTreeLocationLink() {
    return element(by.id('tree-locations-link'));
  }

  getTreeSpecies(type, index) {
    return element(by.id(`tree-${type}-species-${index}`))
  }

  cuttingAreaDates(index) {
    return element(by.id(`tree-cutting-areas-dates-${index}`));
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
    return element(by.id('cutting-dates-link'));
  }

  cuttingDatesSection() {
    return element(by.id('cutting-dates'));
  }

  cuttingDatesSeasonStartAndEnd() {
    return element(by.id('cutting-season-start-end-date'));
  }

  cuttingDatesHoursDefault() {
    return element(by.id('cutting-season-daily-hours-default'));
  }

  whenToCutDatesSection() {
    return element(by.id('cutting-dates'));
  }

  whenToCutDatesSectionLink() {
    return element(by.id('cutting-dates-link'));
  }
}

export class TreesForestFinderPage {
  navigateTo() {
    return browser.get('/christmas-trees/forests');
  }
}


export class HelpMePick {
  questionStep(cta, question) {
    it('should have a question', () => {
      expect<any>(element(by.css('app-root h1')).getText()).toEqual(question);
    });

    it('should have yes and no buttons', () => {
      expect<any>(element(by.css('.yes')).isDisplayed()).toBeTruthy();
      expect<any>(element(by.css('.no')).isDisplayed()).toBeTruthy();
    });

    it('should go to next question when ' + cta + ' is clicked', () => {
      element(by.css('.' + cta)).click();
      expect<any>(element(by.css('app-root h1')).isDisplayed()).toBeTruthy();
    });
  }

  landingPage(heading, message) {
    it('should have a heading', () => {
      expect<any>(element(by.css('app-root h1')).getText()).toEqual(heading);
    });
    it('should have a message', () => {
      expect<any>(element(by.css('.message')).getText()).toEqual(message);
    });

    it('should go back to step one', () => {
      browser.get('/');
      element(by.id('help-find-permit')).click();
      expect<any>(element(by.css('app-root h1')).getText()).toEqual(
        'Are you charging a participation fee for your activity?'
      );
    });
  }
}
