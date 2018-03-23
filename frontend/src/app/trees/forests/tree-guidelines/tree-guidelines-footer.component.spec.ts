
import { TreeGuidelinesFooterComponent } from './tree-guidelines-footer.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { forest } from '../../../_mocks/forest.mock';
import { WindowRef } from '../../../_services/native-window.service';

class MockWindowRef {
  location = { hash: 'WAOW-MOCK-HASH' };
  getNativeWindow() {
    return {
      open() {
        return { document: { open() {}, write() {}, close() {} } };
      },
      scrollY: 100,
      innerHeight: 100
    };
  }
}

describe('TreeGuidelinesFooterComponent', () => {
  let component: TreeGuidelinesFooterComponent;
  let fixture: ComponentFixture<TreeGuidelinesFooterComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeGuidelinesFooterComponent],
        providers: [
          { provide: WindowRef, useClass: MockWindowRef }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeGuidelinesFooterComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the footer to fixed', () => {
    const scrollEvent = document.createEvent('CustomEvent');
    scrollEvent.initCustomEvent( 'scroll', false, false, null );

    window.dispatchEvent(scrollEvent);
    expect(component.fixed).toBeFalsy();
  });
});
