import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-view',
  templateUrl: './sidebar-view.component.html'
})
export class SidebarViewComponent {
  @Input() forest: any;
}
