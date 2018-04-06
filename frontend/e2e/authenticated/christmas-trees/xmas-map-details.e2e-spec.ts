import { TreesSidebarPage } from './xmas-tree-info.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Map details page', () => {
  let page: TreesSidebarPage;
  let redLink, sulphurLink, elkLink, clackamasLink, zigzagLink: any;

  describe('ARP', () => {
    beforeAll(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('arp');
      browser.sleep(800);
      page.getTreeLocationLink().click();
      browser.sleep(800);
    });

    it('should have link to long alt text for Sulphur District', () => {
      sulphurLink = element.all(by.css('.screen-reader-only')).get(0);
      expect<any>(sulphurLink.getText()).toEqual('Sulphur Ranger District map description');
    });

    it('should have link to long alt text for Elk Creek', () => {
      elkLink = element.all(by.css('.screen-reader-only')).get(1);
      expect<any>(elkLink.getText()).toEqual('Elk Creek Cutting Area map description');
    });

    it('should have link to long alt text for Red Feather Lakes', () => {
      redLink = element.all(by.css('.screen-reader-only')).get(2);
      expect<any>(redLink.getText()).toEqual('Red Feather Lakes Cutting Area map description');
    });

    describe('red feather lakes map description', () => {
      beforeAll(() => {
        browser.get('christmas-trees/forests/arp/maps/red-feather-lakes');
        browser.sleep(500);
      });

      it('should contain the map image', () => {
        expect<any>(element(by.id('map-image'))).toBeTruthy();
      });

      it('should contain the map description', () => {
        expect<any>(element(by.id('map-description'))).toBeTruthy();
      });
    });

    describe('sulphur district map description', () => {
      beforeAll(() => {
        browser.get('christmas-trees/forests/arp/maps/sulphur');
        browser.sleep(500);
      });

      it('should contain the map image', () => {
        expect<any>(element(by.id('map-image'))).toBeTruthy();
      });

      it('should contain the map description', () => {
        expect<any>(element(by.id('map-description'))).toBeTruthy();
      });
    });

    describe('elk creek map description', () => {
      beforeAll(() => {
        browser.get('christmas-trees/forests/arp/maps/elk-creek');
        browser.sleep(500);
      });

      it('should contain the map image', () => {
        expect<any>(element(by.id('map-image'))).toBeTruthy();
      });

      it('should contain the map description', () => {
        expect<any>(element(by.id('map-description'))).toBeTruthy();
      });
    });
  });

  describe('Mt Hood', () => {
    beforeAll(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('mthood');
      browser.sleep(800);
      page.getTreeLocationLink().click();
      browser.sleep(800);
    });

    it('should have link to long alt text for Clackamas', () => {
      clackamasLink = element.all(by.css('.screen-reader-only')).get(0);
      expect<any>(clackamasLink.getText()).toEqual('Clackamas River Ranger District map description');
    });

    it('should have link to long alt text for Zigzag', () => {
      zigzagLink = element.all(by.css('.screen-reader-only')).get(1);
      expect<any>(zigzagLink.getText()).toEqual('Zigzag Ranger District map description');
    });

    describe('clackamas map description', () => {
      beforeAll(() => {
        browser.get('christmas-trees/forests/mthood/maps/clackamas');
        browser.sleep(500);
      });

      it('should contain the map image', () => {
        expect<any>(element(by.id('map-image'))).toBeTruthy();
      });

      it('should contain the map description', () => {
        expect<any>(element(by.id('map-description'))).toBeTruthy();
      });
    });

    describe('clackamas map description', () => {
      beforeAll(() => {
        browser.get('christmas-trees/forests/mthood/maps/zigzag');
        browser.sleep(500);
      });

      it('should contain the map image', () => {
        expect<any>(element(by.id('map-image'))).toBeTruthy();
      });

      it('should contain the map description', () => {
        expect<any>(element(by.id('map-description'))).toBeTruthy();
      });
    });
  });
});
