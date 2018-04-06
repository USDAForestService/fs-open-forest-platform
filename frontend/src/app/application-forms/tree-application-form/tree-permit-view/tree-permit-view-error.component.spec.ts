import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreePermitViewComponent } from './tree-permit-view.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { WindowRef } from '../../../_services/native-window.service';
import { ChristmasTreesApplicationService } from '../../../trees/_services/christmas-trees-application.service';
import { McBreadcrumbsConfig, McBreadcrumbsModule, McBreadcrumbsService } from 'ngx-breadcrumbs';
import { BreadcrumbsComponent } from '../../../breadcrumbs/breadcrumbs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TreePermitViewComponent', () => {
  let component: TreePermitViewComponent;
  let fixture: ComponentFixture<TreePermitViewComponent>;
  const mockActivatedRoute = {
    queryParams: [{t: '123'}],
    data: Observable.of({
      permit: {
        error: {
          errors: [
            {
              status: 400,
              errorCode: '123',
              message:
                'The application does not accept credit cards or the transaction exceeds the maximum daily limit for credit card transactions. The transaction will not be processed.',
              permit: {
                permitId: '123',
                totalCost: 0,
                quantity: 0,
                emailAddress: '',
                forest: { forestName: 'Mt Hood', forestAbbr: 'mthood' }
              }
            }
          ]
        }
      }
    })
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, McBreadcrumbsModule],
        declarations: [TreePermitViewComponent, BreadcrumbsComponent],
        providers: [
          McBreadcrumbsConfig,
          McBreadcrumbsService,
          { provide: ChristmasTreesApplicationService },
          { provide: WindowRef, useClass: WindowRef },
          { provide: ActivatedRoute, useValue: mockActivatedRoute }
          ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePermitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display error', () => {
    expect(component.error).toBeTruthy();
    expect(component.error.errors[0].status).toEqual(400);
  });
});
