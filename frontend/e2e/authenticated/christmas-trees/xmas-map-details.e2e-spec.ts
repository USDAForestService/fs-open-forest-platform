import { TreesSidebarPage } from './xmas-tree-info.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Map details page', () => {
  let page: TreesSidebarPage;
  let redLink, sulphurLink, elkLink, clackamasLink, zigzagLink: any;

  describe('ARP', () => {
    beforeEach(() => {
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

    it('should redirect to description', () => {
      redLink.click();
      browser.sleep(900);
      expect(browser.getCurrentUrl()).toContain('http://localhost:4200/christmas-trees/forests/arp/maps/red-feather-lakes');
    });

    it('should contain the map image', () => {
      expect<any>(element(by.id('map-image'))).toBeTruthy();
    })

    it('should contain the map description', () => {
      expect<any>(element(by.id('map-description'))).toBeTruthy();
    })

    it('should have link to long alt text for Sulphur District', () => {
      sulphurLink = element(by.partialLinkText('Click here for Sulphur'));
      expect<any>(sulphurLink.getText()).toEqual('Click here for Sulphur Ranger District map description');
    });

    it('should redirect to description', () => {
      sulphurLink.click();
      browser.sleep(900);
      expect(browser.getCurrentUrl()).toContain('http://localhost:4200/christmas-trees/forests/arp/maps/sulphur');
    });

    it('should contain the map image', () => {
      expect<any>(element(by.id('map-image'))).toBeTruthy();
    })

    it('should contain the map description', () => {
      expect<any>(element(by.id('map-description'))).toBeTruthy();
    })

    it('should have link to long alt text for Elk Creek', () => {
      elkLink = element(by.partialLinkText('Click here for Elk'));
      expect<any>(elkLink.getText()).toEqual('Click here for Elk Creek Cutting Area map description');
    });

    it('should redirect to description', () => {
      elkLink.click();
      browser.sleep(900);
      expect(browser.getCurrentUrl()).toContain('http://localhost:4200/christmas-trees/forests/arp/maps/elk-creek');
    });

    it('should contain the map image', () => {
      expect<any>(element(by.id('map-image'))).toBeTruthy();
    })

    it('should contain the map description', () => {
      expect<any>(element(by.id('map-description'))).toBeTruthy();
    })
    
  })

  describe('Mt Hood', () => {
    beforeEach(() => {
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

    it('should redirect to description', () => {
      clackamasLink.click();
      browser.sleep(900);
      expect(browser.getCurrentUrl()).toContain('http://localhost:4200/christmas-trees/forests/mthood/maps/clackamas');
    });

    it('should contain the map image', () => {
      expect<any>(element(by.id('map-image'))).toBeTruthy();
    })

    it('should contain the map description', () => {
      expect<any>(element(by.id('map-description'))).toBeTruthy();
    })

    it('should have link to long alt text for Zigzag', () => {
      zigzagLink = element(by.partialLinkText('Click here for Zigzag'));
      expect<any>(zigzagLink.getText()).toEqual('Click here for Zigzag Ranger District map description');
    });

    it('should redirect to description', () => {
      zigzagLink.click();
      browser.sleep(900);
      expect(browser.getCurrentUrl()).toContain('http://localhost:4200/christmas-trees/forests/mthood/maps/zigzag');
    });

    it('should contain the map image', () => {
      expect<any>(element(by.id('map-image'))).toBeTruthy();
    })

    it('should contain the map description', () => {
      expect<any>(element(by.id('map-description'))).toBeTruthy();
    })

  });
})