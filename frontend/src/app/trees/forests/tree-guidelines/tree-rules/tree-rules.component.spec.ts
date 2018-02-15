import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { forest } from '../../../../_mocks/forest.mock';
import { TreeRulesComponent } from './tree-rules.component';
import { UtilService } from '../../../../_services/util.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TreeRulesComponent', () => {
  let component: TreeRulesComponent;
  let fixture: ComponentFixture<TreeRulesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeRulesComponent],
        providers: [UtilService],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [HttpClientTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRulesComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
