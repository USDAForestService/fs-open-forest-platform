import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrackScrollDirective } from './../_directives/scroll.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TrackScrollDirective],
  exports: [AppRoutingModule, TrackScrollDirective, CommonModule, ReactiveFormsModule, FormsModule]
})
export class SharedModule {}
