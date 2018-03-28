import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { TreePermitRulesComponent } from './tree-permit-rules.component';
import { SpacesToDashesPipe } from '../../../_pipes/spaces-to-dashes.pipe';
import { UtilService } from '../../../_services/util.service';
import { forest } from '../../../_mocks/forest.mock';
import { MarkdownService } from 'ngx-md';
import { MockMarkdownService } from '../../../_mocks/markdownService.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChristmasTreesInfoService } from '../../../trees/_services/christmas-trees-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TreePermitRulesComponent', () => {
  let component: TreePermitRulesComponent;
  let fixture: ComponentFixture<TreePermitRulesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreePermitRulesComponent, FilterPipe, SpacesToDashesPipe],
        providers: [UtilService, ChristmasTreesInfoService, { provide: MarkdownService, useClass: MockMarkdownService }],
        imports: [HttpClientTestingModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePermitRulesComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
