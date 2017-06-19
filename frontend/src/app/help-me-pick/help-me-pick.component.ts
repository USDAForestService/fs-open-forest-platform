import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-help-me-pick',
  templateUrl: './help-me-pick.component.html'
})
export class HelpMePickComponent implements OnInit {

  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  goToStep(id) {
    this.router.navigate(['/help-me-pick', id]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
