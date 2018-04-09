import { BuyPermitBarComponent } from './buy-permit-bar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { forest } from '../../../../_mocks/forest.mock';
import { WindowRef } from '../../../../_services/native-window.service';
import * as sinon from 'sinon';


describe('BuyPermitBarComponent', () => {
  let component: BuyPermitBarComponent;
  let fixture: ComponentFixture<BuyPermitBarComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BuyPermitBarComponent],
        providers: [
          WindowRef
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPermitBarComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  beforeEach(() => {
    forest['isSeasonOpen'] = true;
    component.forest = forest;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default so the bar is off screen', () => {
    expect(component.top).toEqual('-100px');
  });

  it('should have an onScroll watcher', () => {
    const windowRef = TestBed.get(WindowRef);
    const element = component.doc.createElement('div');
    element.setAttribute('id', 'static-buy-permit-link');

    const stub = sinon.stub(component.doc, 'getElementById');
    stub.returns(element);

    const scrollEvent = component.doc.createEvent('CustomEvent');
    scrollEvent.initCustomEvent( 'scroll', false, false, null );
    windowRef.getNativeWindow().dispatchEvent(scrollEvent);
    expect(component.top).toEqual('-100px');
    stub.restore();
  });

});
