import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TreePermitViewComponent } from './tree-permit-view.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import * as sinon from 'sinon';

describe('TreePermitViewComponent', () => {
  let component: TreePermitViewComponent;
  let fixture: ComponentFixture<TreePermitViewComponent>;
  let mockActivatedRoute = {
    data: Observable.of({
      permit: {
        permitId: '123',
        totalCost: 0,
        quantity: 0,
        emailAddress: '',
        forest: { forestName: 'Mt Hood', forestAbbr: 'mthood' }
      }
    })
  };

  let mockActivatedRouteError = {
    data: Observable.of({
      permit: {
        status: 404,
        message: 'Error'
      }
    })
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [TreePermitViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });
    fixture = TestBed.createComponent(TreePermitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set forest on init', () => {
    expect(component.forest.forestName).toEqual('Mt Hood');
  });

  it('should set permit on init', () => {
    expect(component.permit.permitId).toEqual('123');
  });

  it('should initialize print screen', () => {
    const spy = sinon.spy(component, 'printPermit');
    component.printPermit();
    expect(spy.called).toBeTruthy();
    spy.restore;
  });
});
