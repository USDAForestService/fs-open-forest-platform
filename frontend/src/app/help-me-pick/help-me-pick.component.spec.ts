import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HelpMePickComponent } from './help-me-pick.component';
import { MockActivatedRoute, MockRouter } from '../_mocks/routes.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('HelpMePickComponent', () => {
  let component: HelpMePickComponent;
  let fixture: ComponentFixture<HelpMePickComponent>;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(
    async(() => {
      mockActivatedRoute = new MockActivatedRoute({ id: '1' });
      mockRouter = new MockRouter();
      TestBed.configureTestingModule({
        declarations: [HelpMePickComponent],
        providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: Router, useValue: mockRouter }
        ],
        imports: [HttpClientModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpMePickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    component.goToStep('2');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/help-me-pick', '2']);
  });

  it('should change title based on page id', () => {
    component.getTitle('2');
    expect(component.title).toEqual('Is the purpose of your activity selling goods or services?');
    component.getTitle('3');
    expect(component.title).toEqual('Does your activity involve more than 75 people (spectators and participants)?');
    component.getTitle('4');
    expect(component.title).toEqual(
      `Your activity does not require a permit. However, if you are planning a large group activity, it may be
       helpful to contact your local office to find out about any special restrictions, or get helpful information.`);
    component.getTitle('5');
    expect(component.title).toEqual('Does your activity involve guiding or outfitting?');
    component.getTitle('6');
    expect(component.title).toEqual('Your activity requires a permit, but not one available online.');
    component.getTitle('7');
    expect(component.title).toEqual('The correct permit for you is the "noncommercial group use application."');
    component.getTitle('8');
    expect(component.title).toEqual('The correct permit for you is the "temporary outfitter and guide permit."');
  });
});
