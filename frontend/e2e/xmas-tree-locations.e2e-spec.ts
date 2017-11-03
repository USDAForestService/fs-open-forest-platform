import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas tree  - Where to Find Your Tree page', () => {
  let page: TreesSidebarPage;

  describe( 'Mt Hood', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo(3);
      browser.sleep(400);
      page.getTreeLocationLink().click();
    });

    it('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
        'Where to find your tree'
      );
    });

    it('should have a places to try sub-section link', () => {
      expect<any>(element(by.id('tree-locations-allowed-link')).getText()).toEqual(
        'Places to try'
      );
    });

    it('should have a prohibited areas sub-section link', () => {
      expect<any>(element(by.id('tree-locations-prohibited-link')).getText()).toEqual(
        'Prohibited areas and restrictions'
      );
    });

    it('should have a cutting area maps section header', () => {
      expect<any>(element(by.id('tree-locations-maps')).getText()).toEqual(
        'Cutting area maps'
      );
    });

    it('should have cutting area maps', () => {
      expect<any>(element(by.id('tree-locations-maps-0')).isPresent()).toBeTruthy();
      expect<any>(element(by.id('tree-locations-maps-1')).isPresent()).toBeTruthy();
    });

  });

  describe( 'Shoshone', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo(4);
      browser.sleep(400);
      page.getTreeLocationLink().click();
    });

    it('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
        'Where to find your tree'
      );
    });

    it('should have a places to try sub-section link', () => {
      expect<any>(element(by.id('tree-locations-allowed-link')).getText()).toEqual(
        'Places to try'
      );
    });

    it('should have a prohibited areas sub-section link', () => {
      expect<any>(element(by.id('tree-locations-prohibited-link')).getText()).toEqual(
        'Prohibited areas and restrictions'
      );
    });

    it('should have a cutting area map', () => {
      expect<any>(element(by.id('tree-locations-maps-0')).isPresent()).toBeTruthy();
    });
  });

  describe( 'Arapaho/Roosevelt', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo(1);
      browser.sleep(400);
      page.getTreeLocationLink().click();
    });

    it('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
        'Where to find your tree'
      );
    });

    it('should have a places to try sub-section link', () => {
      expect<any>(element(by.id('tree-locations-allowed-link')).getText()).toEqual(
        'Places to try'
      );
    });

    it('should have a prohibited areas sub-section link', () => {
      expect<any>(element(by.id('tree-locations-prohibited-link')).getText()).toEqual(
        'Prohibited areas and restrictions'
      );
    });

    it('should have cutting area maps', () => {
      expect<any>(element(by.id('tree-locations-maps-0')).isPresent()).toBeTruthy();
      expect<any>(element(by.id('tree-locations-maps-1')).isPresent()).toBeTruthy();
      expect<any>(element(by.id('tree-locations-maps-2')).isPresent()).toBeTruthy();
    });
  });

  describe( 'Flathead', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo(2);
      browser.sleep(400);
      page.getTreeLocationLink().click();
    });

    it('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
        'Where to find your tree'
      );
    });

    it('should have a places to try sub-section link', () => {
      expect<any>(element(by.id('tree-locations-allowed-link')).getText()).toEqual(
        'Places to try'
      );
    });

    it('should have a prohibited areas sub-section link', () => {
      expect<any>(element(by.id('tree-locations-prohibited-link')).getText()).toEqual(
        'Prohibited areas and restrictions'
      );
    });

  });


});
