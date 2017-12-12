import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SidebarViewComponent } from './sidebar-view.component';
import { UtilService } from '../../../_services/util.service';
import { HttpModule, ResponseOptions, XHRBackend} from '@angular/http';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';

describe('SidebarViewComponent', () => {
  let component: SidebarViewComponent;
  let fixture: ComponentFixture<SidebarViewComponent>;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SidebarViewComponent],
        providers: [UtilService, SidebarConfigService],
        imports: [HttpModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarViewComponent);
    component = fixture.debugElement.componentInstance;
    component.forest = { forestName: 'Mt. Hood' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have a config file', () => {
    fixture.whenStable().then(() => {
      expect(component.sidebarItems.length).toEqual(6);
    });
  });

});
