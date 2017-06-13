import { Application } from '../admin/application';
import { ApplicationService } from '../admin/application.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  providers: [ ApplicationService ],
  selector: 'app-application-submitted',
  styleUrls: ['./application-submitted.component.scss'],
  templateUrl: './application-submitted.component.html'
})
export class ApplicationSubmittedComponent implements OnInit {

  application = new Application();

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.applicationService.getOne(params['id'])
        .subscribe(
          application => this.application = application,
          (e: any) => {
            // TODO: Get feedback from Peter on how to handle
            console.log(e);
          }
        );
      });
  }

};
