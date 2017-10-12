import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from '../home/app-button.component';
import { ProgressComponent } from '../progress/progress.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { TrackScrollDirective } from './../_directives/scroll.directive';

@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [TrackScrollDirective, AppButtonComponent, ProgressComponent, SidebarComponent],
  exports: [
    AppRoutingModule,
    TrackScrollDirective,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppButtonComponent,
    SidebarComponent,
    ProgressComponent
  ]
})
export class SharedModule {}
