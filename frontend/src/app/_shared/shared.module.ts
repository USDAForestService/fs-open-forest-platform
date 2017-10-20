import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from '../home/app-button.component';
import { ProgressComponent } from '../progress/progress.component';
import { TrackScrollDirective } from './../_directives/scroll.directive';
import { SpacesToDashesPipe } from '../_pipes/spaces-to-dashes.pipe';


@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [ SpacesToDashesPipe, TrackScrollDirective, AppButtonComponent, ProgressComponent],
  exports: [
    AppRoutingModule,
    TrackScrollDirective,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppButtonComponent,
    ProgressComponent,
    SpacesToDashesPipe
  ]
})
export class SharedModule {}
