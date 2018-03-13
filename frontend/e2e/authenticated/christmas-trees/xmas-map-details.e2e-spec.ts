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

    it('should have link to long alt text for Red Feather Lakes', () => {
      redLink = element(by.partialLinkText('Click here for Red'));
      expect<any>(redLink.getText()).toEqual('Click here for Red Feather Lakes Cutting Area map description');
    });

    it('should have link to long alt text for Elk Creek', () => {
      elkLink = element(by.partialLinkText('Click here for Elk'));
      expect<any>(elkLink.getText()).toEqual('Click here for Elk Creek Cutting Area map description');
    });

    it('should have link to long alt text for Sulphur District', () => {
      sulphurLink = element(by.partialLinkText('Click here for Sulphur'));
      expect<any>(sulphurLink.getText()).toEqual('Click here for Sulphur Ranger District map description');
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
        browser.get('christmas-trees/forests/arp/maps/sulphur');
        browser.sleep(500);
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
        browser.get('christmas-trees/forests/arp/maps/sulphur');
        browser.sleep(500);
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
      clackamasLink = element(by.partialLinkText('Click here for Clackamas'));
      expect<any>(clackamasLink.getText()).toEqual('Click here for Clackamas River Ranger District map description');
    });

    it('should have link to long alt text for Zigzag', () => {
      zigzagLink = element(by.partialLinkText('Click here for Zigzag'));
      expect<any>(zigzagLink.getText()).toEqual('Click here for Zigzag Ranger District map description');
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
