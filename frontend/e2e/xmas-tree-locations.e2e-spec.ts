import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas tree  - Where to Find Your Tree page', () => {
  let page: TreesSidebarPage;

  describe( 'Mt Hood', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo('mthood');
      browser.sleep(800);
      page.getTreeLocationLink().click();
      browser.sleep(800);
    });

    it('should have a link to the external forest maps-pubs', () => {
      expect<any>(element(by.id('forest-maps-pubs-link')).getAttribute('href')).toEqual('https://www.fs.usda.gov/main/mthood/maps-pubs');
    });

    it('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
        'Where to find your tree'
      );
    });

    it('should have a cutting areas sub-section link', () => {
      expect<any>(element(by.id('tree-locations-allowed-link')).getText()).toEqual(
        'Cutting area maps'
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
    });

  });

  describe( 'Shoshone', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo('shoshone');
      browser.sleep(800);
      page.getTreeLocationLink().click();
      browser.sleep(100);
    });

    it('should have a link to the external forest maps-pubs', () => {
      expect<any>(element(by.id('forest-maps-pubs-link')).getAttribute('href')).toEqual('https://www.fs.usda.gov/main/shoshone/maps-pubs');
    });


    it('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
        'Where to find your tree'
      );
    });

    it('should have a cutting areas sub-section link', () => {
      expect<any>(element(by.id('tree-locations-allowed-link')).getText()).toEqual(
        'Cutting area maps'
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
      page.navigateTo('arp');
      browser.sleep(800);
      page.getTreeLocationLink().click();
      browser.sleep(100);
    });

    it('should have a link to the external forest maps-pubs', () => {
      expect<any>(element(by.id('forest-maps-pubs-link')).getAttribute('href')).toEqual('https://www.fs.usda.gov/main/arp/maps-pubs');
    });


    it('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
        'Where to find your tree'
      );
    });

    it('should have a cutting areas sub-section link', () => {
      expect<any>(element(by.id('tree-locations-allowed-link')).getText()).toEqual(
        'Cutting area maps'
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
    });
  });

  describe( 'Flathead', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo('flathead');
      browser.sleep(900);
      page.getTreeLocationLink().click();
      browser.sleep(100);
    });

    it('should have a link to the external forest maps-pubs', () => {
      expect<any>(element(by.id('forest-maps-pubs-link')).getAttribute('href')).toEqual('https://www.fs.usda.gov/main/flathead/maps-pubs');
    });

    it('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
        'Where to find your tree'
      );
    });

    it('should have a cutting areas sub-section link', () => {
      expect<any>(element(by.id('tree-locations-allowed-link')).getText()).toEqual(
        'Cutting area maps'
      );
    });

    it('should have a prohibited areas sub-section link', () => {
      expect<any>(element(by.id('tree-locations-prohibited-link')).getText()).toEqual(
        'Prohibited areas and restrictions'
      );
    });

  });


});
