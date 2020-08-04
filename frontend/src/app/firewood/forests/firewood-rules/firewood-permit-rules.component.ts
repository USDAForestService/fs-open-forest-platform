import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';
// import { NgxMdModule } from 'ngx-md';
import { FirewoodInfoService } from '../../_services/firewood-info.service';
// import { ChristmasTreesInfoService } from '../../../trees/_services/christmas-trees-info.service';

@Component({
  selector: 'app-firewood-permit-rules',
  templateUrl: './firewood-permit-rules.component.html',
  providers: [FilterPipe]
})
export class FirewoodPermitRulesComponent implements OnInit {
  @Input() forest: any;
  showDefaultRules: boolean;

  constructor(private firewoodInfoService: FirewoodInfoService) {
  }

// Selects the correct forest to display rules for

  ngOnInit() {}
}
