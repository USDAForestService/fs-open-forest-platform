import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForestAdminNavComponent } from './forests-admin-nav.component';
import { ChristmasTreesAdminService } from '../trees/admin/christmas-trees-admin.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from '../_services/util.service';
import { Observable } from 'rxjs/Observable';
import { WindowRef } from '../_services/native-window.service';

class MockAuthenticationService {
  getAuthenticatedUser(): Observable<{}> {
    return Observable.of({ role: 'admin', forests: ['mthood'] });
  }
  setUser(obj) {
    return '';
  }
}

describe('ForestAdminNavComponent', () => {
  let component: ForestAdminNavComponent;
  let fixture: ComponentFixture<ForestAdminNavComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [
          WindowRef,
          UtilService,
          ChristmasTreesAdminService
        ],
        declarations: [ForestAdminNavComponent],
        imports: [RouterTestingModule, HttpClientTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestAdminNavComponent);
    component = fixture.componentInstance;
    component.menuBtnTop = '20px';
    component.menuBtnPosition = 'absolute';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the forest admin nav items', () => {
    expect(component.forestAdminNavItems).not.toBeNull();
  });

  it('should set absolute position if top of the container is greater than items times offset', () => {
    spyOn(document, 'getElementById').and.callFake(function() {
      return {
        value: 'test',
        getBoundingClientRect() {
          return { top: 0 };
        }
      };
    });
    spyOn(window, 'innerHeight').and.callFake(function() {
      return 0;
    });
    component.track(new Event('scroll'));
    expect(component.menuBtnTop).toEqual('');
    expect(component.menuBtnPosition).toEqual('absolute');
  });
});

