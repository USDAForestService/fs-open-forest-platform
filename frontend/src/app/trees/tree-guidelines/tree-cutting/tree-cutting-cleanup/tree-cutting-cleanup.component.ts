import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-cutting-cleanup',
  templateUrl: './tree-cutting-cleanup.component.html'
})
export class TreeCuttingCleanupComponent {
  @Input() forest: any
}
