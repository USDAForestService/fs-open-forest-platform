import { Application } from '../../_models/application';
import { ApplicationService } from '../../_services/application.service';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  providers: [ ApplicationService ],
  selector: 'app-permit-application-view',
  templateUrl: './permit-application-view.component.html'
})
export class PermitApplicationViewComponent implements OnInit {

  id: string;
  application = new Application();
  fixedCtas = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
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

  enter() {
    this.fixedCtas = false;
  }

  leave() {
    this.fixedCtas = true;
  }

}
