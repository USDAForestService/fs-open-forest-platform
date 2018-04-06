import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-help-me-pick',
  templateUrl: './help-me-pick.component.html'
})
export class HelpMePickComponent implements OnInit {
  id: number;
  title: string;

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title) {}

  goToStep(id) {
    this.router.navigate(['/help-me-pick', id]);
  }

  setTitle(id) {
    switch (id) {
      case '1':
        this.title = 'Are you charging a participation fee for your activity?';
        break;
      case '2':
        this.title = 'Is the purpose of your activity selling goods or services?';
        break;
      case '3':
        this.title = 'Does your activity involve more than 75 people (spectators and participants)?';
        break;
      case '4':
        this.title = 'Your activity does not require a permit.';
        break;
      case '5':
        this.title = 'Does your activity involve guiding or outfitting?';
        break;
      case '6':
        this.title = 'Your activity requires a permit, but not one available online.';
        break;
      case '7':
        this.title = 'The correct permit for you is the "noncommercial group use application."';
        break;
      case '8':
        this.title = 'The correct permit for you is the "temporary outfitter and guide permit."';
        break;
    }
  }

  ngOnInit() {
    if (this.route) {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.setTitle(this.id);
        this.titleService.setTitle(this.title);
      });
    }
  }
}
