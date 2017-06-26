import { Application } from '../../_models/application';
import { ApplicationService } from '../../_services/application.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  providers: [ ApplicationService ],
  selector: 'app-permit-application-confirm',
  templateUrl: './permit-application-confirm.component.html'
})
export class PermitApplicationConfirmComponent implements OnInit {

  id: string;
  application = new Application();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
  ) { }

  getApplication(id) {
    this.applicationService.getOne(id)
      .subscribe(
        application => this.application = application,
        (e: any) => {
          // TODO: talk to Peter about how to handle
          console.log(e);
        }
      );
  }

  updateApplicationStatus(application, status) {
    application.status = status;
    this.applicationService.update(application)
      .subscribe(
        (data: any) => {
          this.router.navigate(['admin/applications']);
        },
        (e: any) => {
          // TODO: talk to Peter about how to handle
          console.log(e);
        }
      );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getApplication(this.id);
    });
  }
}
