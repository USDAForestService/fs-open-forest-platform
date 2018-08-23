import { Component } from '@angular/core';
import { SpecialUseInfoService } from '../_services/special-use-info.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  forest: string;
  constructor(
    private specialUseInfoService: SpecialUseInfoService,
  ) {
    this.forest = this.specialUseInfoService.getOne('0605');
  }
}
