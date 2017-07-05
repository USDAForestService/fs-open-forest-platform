import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-help-me-pick',
  templateUrl: './help-me-pick.component.html'
})
export class HelpMePickComponent implements OnInit {

  id: number;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  goToStep(id) {
    this.router.navigate(['/help-me-pick', id]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      switch ('' + this.id + '' ) {
        case '1':
          this.title = 'Are you charging a participation fee for your activity?';
          this.titleService.setTitle(this.title);
          break;
        case '2':
          this.title = 'Is the purpose of your activity selling goods or services?';
          this.titleService.setTitle(this.title);
          break;
        case '3':
          this.title = 'Does your activity involve more than 75 people (spectators and participants)?';
          this.titleService.setTitle(this.title);
          break;
        case '4':
          this.title = 'Your activity does not require a permit.';
          this.titleService.setTitle(this.title);
          break;
        case '5':
          this.title = 'Does your activity involve guiding or outfitting?';
          this.titleService.setTitle(this.title);
          break;
        case '6':
          this.title = 'Your activity requires a permit, but not one available online.';
          this.titleService.setTitle(this.title);
          break;
        case '7':
          this.title = 'The correct permit for you is the "noncommercial group use application."';
          this.titleService.setTitle(this.title);
          break;
        case '8':
          this.title = 'The correct permit for you is the "temporary outfitter and guide permit."';
          this.titleService.setTitle(this.title);
          break;
      }
    });
  }

}
