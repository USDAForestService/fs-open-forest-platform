import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForestAdminNavComponent } from './forests-admin-nav.component';
import { ChristmasTreesAdminService } from '../trees/admin/christmas-trees-admin.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../_services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from '../_services/util.service';

describe('ForestAdminNavComponent', () => {
  let component: ForestAdminNavComponent;
  let fixture: ComponentFixture<ForestAdminNavComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [AuthenticationService, UtilService, ChristmasTreesAdminService],
        declarations: [ForestAdminNavComponent],
        imports:[RouterTestingModule, HttpClientTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestAdminNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the forest admin nav items', () => {
    expect(component.forestAdminNavItems).not.toBeNull();
  });
});
