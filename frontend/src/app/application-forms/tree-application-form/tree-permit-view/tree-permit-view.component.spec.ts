import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreePermitViewComponent } from './tree-permit-view.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';

describe('TreePermitViewComponent', () => {
  let component: TreePermitViewComponent;
  let fixture: ComponentFixture<TreePermitViewComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreePermitViewComponent],
        providers: [
          { provide: Title, useClass: Title },
          {
            provide: ActivatedRoute,
            useValue: {
              data: Observable.of({
                forest: { id: '1', forestName: 'Mt Hood', orgStructureCode: '123', treeCost: 10, maxNumTrees: 5 },
                permit: { permitId: '123', totalCost: 0, quantity: 0, emailAddress: '' }
              })
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
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
});
