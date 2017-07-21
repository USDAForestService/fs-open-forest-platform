import { SpecialUseApplication } from '../../_models/special-use-application';
import { ApplicationService } from '../../_services/application.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  providers: [ApplicationService],
  selector: 'app-application-submitted',
  templateUrl: './application-submitted.component.html'
})
export class ApplicationSubmittedComponent implements OnInit {
  application = new SpecialUseApplication();
  // TODO Use type in teh template to filter content. type = 'noncommercial' or 'temp-outfitter'
  type: string;

  constructor(private applicationService: ApplicationService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.applicationService.getOne(params['id']).subscribe(
        application => (this.application = application),
        (e: any) => {
          // TODO: Get feedback from Peter on how to handle
          console.log(e);
        }
      );
    });
  }
}
