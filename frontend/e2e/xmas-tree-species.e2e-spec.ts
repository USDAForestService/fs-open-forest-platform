import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas tree species page', () => {
  let page: TreesSidebarPage;

  describe('Mt Hood', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo('mthood');
      browser.sleep(500);
      page.getTreeSelectionLink().click();
      browser.sleep(100);
    });

    it('should have a species section link', () => {
      expect<any>(element(by.id('tree-selection-link')).getText()).toEqual('How to choose your tree');
    });

    describe('recommended species', () => {
      it('should display Noble fir first', () => {
        const treeOne = page.getTreeSpecies('recommended', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Noble Fir');
      });
      it('should display Pacific Silver fir second', () => {
        const treeOne = page.getTreeSpecies('recommended', 1);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Pacific Silver Fir');
      });
    });

    describe('not recommended species', () => {
      it('should display Douglas fir', () => {
        const treeOne = page.getTreeSpecies('not-recommended', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Douglas-fir');
      });
    });

    describe('prohibited species', () => {
      it('should display Pacific yew', () => {
        const treeOne = page.getTreeSpecies('prohibited', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Pacific Yew');
      });
      it('should display a prohibited badge', () => {
        const treeOne = page.getTreeSpecies('prohibited', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-status')).getText()).toEqual('PROHIBITED');
      });
    });
  });

  describe('Arapaho/Roosevelt', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo('arp');
      browser.sleep(500);
      page.getTreeSelectionLink().click();
      browser.sleep(100);
    });

    it('should have a species section link', () => {
      expect<any>(element(by.id('tree-selection-link')).getText()).toEqual('How to choose your tree');
    });

    describe('recommended species', () => {
      it('should display Engelmann first', () => {
        const treeOne = page.getTreeSpecies('recommended', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Engelmann Spruce');
      });
      it('should display Douglas-fir second', () => {
        const treeOne = page.getTreeSpecies('recommended', 1);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Douglas-fir');
      });
      it('should display Subalpine Fir third', () => {
        const treeOne = page.getTreeSpecies('recommended', 2);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Subalpine Fir');
      });
    });
  });

  describe('Shoshone', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo('shoshone');
      browser.sleep(500);
      page.getTreeSelectionLink().click();
      browser.sleep(100);
    });

    it('should have a species section link', () => {
      expect<any>(element(by.id('tree-selection-link')).getText()).toEqual('How to choose your tree');
    });

    describe('recommended species', () => {
      it('should display Engelmann first', () => {
        const treeOne = page.getTreeSpecies('recommended', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Engelmann Spruce');
      });
      it('should display Douglas-fir second', () => {
        const treeOne = page.getTreeSpecies('recommended', 1);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Douglas-fir');
      });
      it('should display Lodgepole pine third', () => {
        const treeOne = page.getTreeSpecies('recommended', 2);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Lodgepole Pine');
      });
      it('should display Subalpline Fir fourth', () => {
        const treeOne = page.getTreeSpecies('recommended', 3);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Subalpine Fir');
      });
      it('should display Blue Spruce fifth', () => {
        const treeOne = page.getTreeSpecies('recommended', 4);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Blue Spruce');
      });
    });

    describe('prohibited species', () => {
      it('should display Whitebark Pine', () => {
        const treeOne = page.getTreeSpecies('prohibited', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Whitebark Pine');
      });
      it('should display a prohibited badge', () => {
        const treeOne = page.getTreeSpecies('prohibited', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-status')).getText()).toEqual('PROHIBITED');
      });
    });
  });

  describe('Flathead', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo('flathead');
      browser.sleep(500);
      page.getTreeSelectionLink().click();
      browser.sleep(100);
    });

    it('should have a species section link', () => {
      expect<any>(element(by.id('tree-selection-link')).getText()).toEqual('How to choose your tree');
    });

    describe('recommended species', () => {
      it('should display Engelmann first', () => {
        const treeOne = page.getTreeSpecies('recommended', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Engelmann Spruce');
      });
      it('should display Douglas-fir second', () => {
        const treeOne = page.getTreeSpecies('recommended', 1);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Douglas-fir');
      });
      it('should display Grand Fir third', () => {
        const treeOne = page.getTreeSpecies('recommended', 2);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Grand Fir');
      });
      it('should display Lodgepole pine fourth', () => {
        const treeOne = page.getTreeSpecies('recommended', 3);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Lodgepole Pine');
      });
      it('should display Subalpine Fir fifth', () => {
        const treeOne = page.getTreeSpecies('recommended', 4);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Subalpine Fir');
      });
    });
    describe('prohibited species', () => {
      it('should display Whitebark Pine', () => {
        const treeOne = page.getTreeSpecies('prohibited', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-name')).getText()).toEqual('Whitebark Pine');
      });
      it('should display a prohibited badge', () => {
        const treeOne = page.getTreeSpecies('prohibited', 0);
        expect<any>(treeOne.isDisplayed()).toBeTruthy();
        expect<any>(treeOne.element(by.css('.tree-status')).getText()).toEqual('PROHIBITED');
      });
    });
  });
});
