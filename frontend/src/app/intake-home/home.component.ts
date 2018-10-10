import { Component } from '@angular/core';
import { SpecialUseInfoService } from '../_services/special-use-info.service';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  forest: string;
  constructor(
    private specialUseInfoService: SpecialUseInfoService,
    private meta: Meta
  ) {
    this.forest = this.specialUseInfoService.getOne('0605');
    this.meta.addTags([
      { name: 'description', content: 'Use Open Forest to apply for noncommercial\
and temporary outfitter permits with the United States Forest Service.' },
      { name: 'keywords', content: 'Angular, Meta Service' }
    ]);
  }
}
