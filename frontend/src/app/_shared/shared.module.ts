import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from '../home/app-button.component';
import { ProgressComponent } from '../progress/progress.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { SectionHeadingComponent } from './../sidebar/section-heading.component';
import { SpacesToDashesPipe } from './../_pipes/spaces-to-dashes.pipe';
import { TrackScrollDirective } from './../_directives/scroll.directive';
import { InViewportModule } from 'ng-in-viewport';

@NgModule({
  imports: [CommonModule, AppRoutingModule, InViewportModule.forRoot()],
  declarations: [
    TrackScrollDirective,
    AppButtonComponent,
    ProgressComponent,
    SectionHeadingComponent,
    SpacesToDashesPipe,
    SidebarComponent
  ],
  exports: [
    AppRoutingModule,
    TrackScrollDirective,
    CommonModule,
    InViewportModule,
    ReactiveFormsModule,
    FormsModule,
    AppButtonComponent,
    SectionHeadingComponent,
    SpacesToDashesPipe,
    SidebarComponent,
    ProgressComponent
  ]
})
export class SharedModule {}
