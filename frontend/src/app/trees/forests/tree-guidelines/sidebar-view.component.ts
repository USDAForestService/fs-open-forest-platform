import { Component, Input, HostListener, OnInit } from '@angular/core';
import { UtilService } from '../../../_services/util.service';

@Component({
  selector: 'app-sidebar-view',
  templateUrl: './sidebar-view.component.html'
})
export class SidebarViewComponent {
  @Input() forest: any;

  sidebarItems = [
    {
      id: 'cutting-dates',
      title: 'When to cut your tree'
    },
    {
      id: 'tree-selection',
      title: 'How to choose your tree'
    },
    {
      id: 'cutting-instructions',
      title: 'How to cut your tree',
      sections: [
        {
          id: 'cutting-instructions-before-you-cut',
          title: 'Before you cut'
        },
        {
          id: 'cutting-instructions-when-you-cut',
          title: 'When you cut'
        }
      ]
    }
  ];

  constructor(public util: UtilService) {}
}
