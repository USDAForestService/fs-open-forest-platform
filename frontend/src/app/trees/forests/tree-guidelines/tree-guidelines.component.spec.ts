import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { TreeGuidelinesComponent } from './tree-guidelines.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../../../_services/util.service';
import { Title } from '@angular/platform-browser';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

describe('TreeGuidelinesComponent', () => {
  let component: TreeGuidelinesComponent;
  let fixture: ComponentFixture<TreeGuidelinesComponent>;
  const mockRoute = {
    params: Observable.of({ id: 1 }),
    data: Observable.of({
      forest: {
        forestName: 'forest name',
        species: {
          status: 'test'
        }
      }
    })
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeGuidelinesComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          UtilService,
          { provide: Title, useClass: Title },
          { provide: SidebarConfigService, useClass: SidebarConfigService }
        ],
        imports: [HttpModule, HttpClientTestingModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: mockRoute });
    fixture = TestBed.createComponent(TreeGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set forest on init', () => {
    const forest: any = component.forest;
    expect(forest.forestName).toEqual('forest name');
  });
});
